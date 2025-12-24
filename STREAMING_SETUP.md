# ✅ WebSocket Live Streaming - Setup Complete

## Current Configuration Status

### ✅ All Components Verified

1. **server.js** - Custom Next.js server with WebSocket
   - ✅ FFmpeg spawns with RTSP input
   - ✅ Transcodes HEVC → H.264 baseline profile
   - ✅ Fixes timestamps with `-avoid_negative_ts make_zero` and `-use_wallclock_as_timestamps 1`
   - ✅ Outputs MPEG-TS to pipe (zero file storage)
   - ✅ Streams binary chunks via WebSocket
   - ✅ Auto-reconnects on FFmpeg exit (2s delay)

2. **app/LiveStreamWS.tsx** - WebSocket video player
   - ✅ MediaSource API with MPEG-TS support
   - ✅ Connects to ws://localhost:3000/api/stream-ws
   - ✅ Handles binary chunks with queue management
   - ✅ Shows connection status (connected/disconnected/error)
   - ✅ Auto-reconnects on disconnect (3s delay)
   - ✅ Loading/error states with manual reconnect button

3. **app/live/page.tsx** - Live streaming page
   - ✅ Imports and uses LiveStreamWS component
   - ✅ Professional UI with status indicators
   - ✅ Multiple camera grid layout

4. **package.json** - Dependencies and scripts
   - ✅ "type": "module" for ES6 imports
   - ✅ "ws": "^8.18.3" installed
   - ✅ Scripts use "node server.js"

## Features Implemented

### ✅ HEVC → H.264 Transcoding
- FFmpeg converts HEVC (H.265) to H.264 baseline profile
- Browser-compatible codec (all modern browsers support H.264)
- Optimized with ultrafast preset and zerolatency tune

### ✅ Timestamp Fixes
- `-avoid_negative_ts make_zero` - Shifts negative timestamps to zero
- `-use_wallclock_as_timestamps 1` - Uses system clock for timestamps
- `-fflags +genpts+igndts` - Generates presentation timestamps, ignores DTS
- `-muxdelay 0.1` - Minimal muxing delay

### ✅ Zero File Storage
- FFmpeg outputs to pipe:1 (stdout)
- Binary chunks sent directly to WebSocket
- No HLS segments, no .ts files, no .m3u8 playlist
- Pure in-memory streaming

### ✅ Auto-Reconnect
- Server: Restarts FFmpeg if it crashes (2s delay)
- Client: Reconnects WebSocket if disconnected (3s delay)
- Clears buffer queue on reconnect

### ✅ Loading/Error States
- Connection status indicator (green pulse = connected)
- Error overlay with manual reconnect button
- Status text shows: connected/disconnected/error

## How to Run

```bash
# 1. Install dependencies (if not already done)
npm install

# 2. Start the server
npm run dev

# 3. Open browser
http://localhost:3000/live
```

## Expected Behavior

1. **On page load:**
   - Status shows "disconnected" briefly
   - WebSocket connects to ws://localhost:3000/api/stream-ws
   - FFmpeg starts transcoding RTSP stream
   - Status changes to "connected" with green pulse
   - Video starts playing within 2-5 seconds

2. **During streaming:**
   - Smooth video playback with audio
   - No file creation on disk
   - Low latency (2-4 seconds)
   - Status indicator stays green

3. **On disconnect:**
   - Status shows "disconnected"
   - Auto-reconnects after 3 seconds
   - FFmpeg restarts automatically

4. **On error:**
   - Status shows "error" with red indicator
   - Error overlay appears
   - Manual reconnect button available

## Troubleshooting

### If video doesn't play:
1. Check FFmpeg is installed: `ffmpeg -version`
2. Check camera is accessible: `ffmpeg -rtsp_transport tcp -i rtsp://admin:LBEVFF@192.168.1.132:554/Streaming/Channels/101 -frames:v 1 test.jpg`
3. Check browser console for errors
4. Check server terminal for FFmpeg output

### If connection fails:
1. Ensure port 3000 is not in use
2. Check firewall settings
3. Verify camera credentials and IP address

### If FFmpeg crashes:
- Check camera stream is active
- Verify network connectivity to camera
- Check FFmpeg stderr output in terminal

## Technical Details

**Camera:** rtsp://admin:LBEVFF@192.168.1.132:554/Streaming/Channels/101
**Resolution:** 2560x1440
**FPS:** 25
**Input Codec:** HEVC (H.265)
**Output Codec:** H.264 baseline level 3.0
**Audio:** AAC 64kbps 44.1kHz
**Container:** MPEG-TS
**Transport:** WebSocket (binary)
**Storage:** Zero files (in-memory only)

## Architecture

```
RTSP Camera (HEVC)
    ↓
FFmpeg (server.js)
    ├─ Transcode to H.264
    ├─ Fix timestamps
    ├─ Output MPEG-TS to pipe
    ↓
WebSocket Server
    ├─ Send binary chunks
    ↓
WebSocket Client (LiveStreamWS.tsx)
    ├─ Receive chunks
    ├─ MediaSource API
    ├─ SourceBuffer queue
    ↓
HTML5 Video Element
    └─ Play stream
```

## Status: ✅ READY TO TEST

All components are properly configured and ready for testing.
Run `npm run dev` and visit http://localhost:3000/live
