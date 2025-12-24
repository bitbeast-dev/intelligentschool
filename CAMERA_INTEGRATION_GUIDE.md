# Physical Camera Integration Guide

## Overview
This guide explains how to integrate physical classroom cameras with the IntelligentSchool live streaming system.

## Architecture Components

### 1. Camera Hardware
- **IP Cameras**: Network-enabled cameras (e.g., Axis, Hikvision, Dahua)
- **Camera Specifications**:
  - Resolution: 1080p minimum (4K recommended)
  - Frame Rate: 30fps
  - Network: Ethernet/WiFi connectivity
  - Protocols: RTSP, ONVIF support

### 2. Streaming Server Infrastructure
```
Physical Cameras → Media Server → CDN → Web Application
```

#### Required Servers:
- **RTMP Server**: Nginx with RTMP module or Node Media Server
- **HLS Server**: For HTTP Live Streaming
- **WebRTC Server**: For low-latency streaming
- **API Server**: Camera management and control

### 3. Streaming Protocols

#### RTMP (Real-Time Messaging Protocol)
```javascript
// Camera RTMP stream URL format
rtmp://streaming-server.school.com/live/{room_id}
```

#### HLS (HTTP Live Streaming)
```javascript
// HLS playlist URL format
https://streaming-server.school.com/hls/{room_id}/playlist.m3u8
```

#### WebRTC (Web Real-Time Communication)
```javascript
// WebRTC signaling server
wss://streaming-server.school.com/webrtc/{room_id}
```

## Implementation Steps

### Step 1: Camera Network Setup
1. **Network Configuration**:
   ```bash
   # Assign static IP addresses to cameras
   Camera A101: 192.168.1.101
   Camera B205: 192.168.1.102
   Camera C301: 192.168.1.103
   ```

2. **RTSP Stream URLs**:
   ```
   rtsp://192.168.1.101:554/stream1
   rtsp://192.168.1.102:554/stream1
   rtsp://192.168.1.103:554/stream1
   ```

### Step 2: Media Server Setup

#### Option A: Nginx RTMP Module
```nginx
# nginx.conf
rtmp {
    server {
        listen 1935;
        chunk_size 4096;
        
        application live {
            live on;
            
            # HLS settings
            hls on;
            hls_path /var/www/hls;
            hls_fragment 3;
            hls_playlist_length 60;
            
            # Allow publishing from cameras
            allow publish 192.168.1.0/24;
            deny publish all;
        }
    }
}
```

#### Option B: Node Media Server
```javascript
const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    allow_origin: '*'
  },
  relay: {
    ffmpeg: '/usr/local/bin/ffmpeg',
    tasks: [
      {
        app: 'live',
        mode: 'push',
        edge: 'rtmp://127.0.0.1/hls'
      }
    ]
  }
};

const nms = new NodeMediaServer(config);
nms.run();
```

### Step 3: FFmpeg Stream Conversion
```bash
# Convert RTSP to RTMP for each camera
ffmpeg -i rtsp://192.168.1.101:554/stream1 \
       -c:v libx264 -preset veryfast -tune zerolatency \
       -c:a aac -ar 44100 -ac 2 \
       -f flv rtmp://localhost/live/room_a101

# Convert to HLS
ffmpeg -i rtsp://192.168.1.101:554/stream1 \
       -c:v libx264 -c:a aac \
       -hls_time 10 -hls_list_size 6 \
       -hls_flags delete_segments \
       /var/www/hls/room_a101/playlist.m3u8
```

### Step 4: API Endpoints

#### Camera Management API
```javascript
// /api/cameras/[cameraId]/snapshot
export async function GET(request, { params }) {
  const { cameraId } = params;
  
  // Get snapshot from camera
  const response = await fetch(`http://192.168.1.101/snapshot.jpg`, {
    headers: { 'Authorization': 'Basic ' + btoa('admin:password') }
  });
  
  return new Response(response.body, {
    headers: { 'Content-Type': 'image/jpeg' }
  });
}

// /api/cameras/[cameraId]/stream
export async function GET(request, { params }) {
  const { cameraId } = params;
  
  return Response.json({
    cameraId,
    rtmpUrl: `rtmp://streaming-server.school.com/live/${cameraId}`,
    hlsUrl: `https://streaming-server.school.com/hls/${cameraId}/playlist.m3u8`,
    status: 'online'
  });
}
```

### Step 5: Frontend Integration

#### HLS.js Integration
```javascript
// Install: npm install hls.js
import Hls from 'hls.js';

const VideoPlayer = ({ hlsUrl, cameraId }) => {
  const videoRef = useRef(null);
  
  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: false,
        lowLatencyMode: true,
        backBufferLength: 90
      });
      
      hls.loadSource(hlsUrl);
      hls.attachMedia(videoRef.current);
      
      return () => hls.destroy();
    }
  }, [hlsUrl]);
  
  return (
    <video
      ref={videoRef}
      controls
      autoPlay
      muted
      className="w-full h-64 object-cover"
    />
  );
};
```

#### WebRTC Integration
```javascript
// Install: npm install simple-peer
import Peer from 'simple-peer';

const WebRTCPlayer = ({ webRtcUrl, cameraId }) => {
  const [peer, setPeer] = useState(null);
  const videoRef = useRef(null);
  
  useEffect(() => {
    const ws = new WebSocket(webRtcUrl);
    const p = new Peer({ initiator: true, trickle: false });
    
    p.on('signal', data => {
      ws.send(JSON.stringify({ type: 'offer', data }));
    });
    
    p.on('stream', stream => {
      videoRef.current.srcObject = stream;
    });
    
    ws.onmessage = event => {
      const message = JSON.parse(event.data);
      if (message.type === 'answer') {
        p.signal(message.data);
      }
    };
    
    setPeer(p);
    
    return () => {
      p.destroy();
      ws.close();
    };
  }, [webRtcUrl]);
  
  return <video ref={videoRef} autoPlay muted className="w-full h-64" />;
};
```

## Security Considerations

### 1. Network Security
- Use VPN for camera network access
- Implement firewall rules
- Regular security updates

### 2. Authentication
```javascript
// JWT token for camera access
const cameraAuth = {
  username: process.env.CAMERA_USERNAME,
  password: process.env.CAMERA_PASSWORD,
  token: generateJWT({ cameraId, permissions: ['view', 'control'] })
};
```

### 3. Stream Encryption
- Use HTTPS for HLS streams
- Implement token-based access control
- Regular key rotation

## Monitoring & Analytics

### Camera Health Monitoring
```javascript
// /api/cameras/health
export async function GET() {
  const cameras = await Promise.all(
    CAMERA_IDS.map(async (id) => {
      try {
        const response = await fetch(`http://${getCameraIP(id)}/status`);
        return { id, status: 'online', lastSeen: new Date() };
      } catch {
        return { id, status: 'offline', lastSeen: null };
      }
    })
  );
  
  return Response.json({ cameras });
}
```

### Stream Quality Metrics
- Bitrate monitoring
- Frame rate tracking
- Latency measurement
- Connection stability

## Deployment Checklist

- [ ] Camera network configuration
- [ ] Streaming server setup
- [ ] FFmpeg installation and configuration
- [ ] API endpoints implementation
- [ ] Frontend player integration
- [ ] Security measures implementation
- [ ] Monitoring system setup
- [ ] Load testing
- [ ] Backup streaming sources
- [ ] Documentation and training

## Troubleshooting

### Common Issues
1. **High Latency**: Use WebRTC for low-latency streaming
2. **Stream Interruptions**: Implement automatic reconnection
3. **Bandwidth Issues**: Adjust video quality based on network conditions
4. **Camera Offline**: Implement health checks and alerts

### Performance Optimization
- Use CDN for stream distribution
- Implement adaptive bitrate streaming
- Cache camera snapshots
- Load balancing for multiple viewers