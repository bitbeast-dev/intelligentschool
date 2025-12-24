# ESP32 Integration Guide

## Setup Instructions

### 1. ESP32 Arduino Code

Upload this code to your ESP32:

```cpp
#include <WiFi.h>
#include <HTTPClient.h>

// WiFi credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// Next.js server URL (replace with your PC's IP address)
const char* serverUrl = "http://192.168.1.100:3000/api/esp32";

void setup() {
  Serial.begin(115200);
  
  // Connect to WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("\nWiFi connected!");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    // Replace these with your actual sensor readings
    float temperature = 27.5;  // From DHT sensor
    float humidity = 60.0;     // From DHT sensor
    int co2 = 450;             // From CO2 sensor
    int lighting = 500;        // From LDR sensor
    int noise = 45;            // From sound sensor
    float distance = 15.5;     // From ultrasonic sensor
    float voltage = 3.7;       // From voltage sensor

    // Create JSON payload
    String json = "{";
    json += "\"temperature\":" + String(temperature) + ",";
    json += "\"humidity\":" + String(humidity) + ",";
    json += "\"co2\":" + String(co2) + ",";
    json += "\"lighting\":" + String(lighting) + ",";
    json += "\"noise\":" + String(noise) + ",";
    json += "\"distance\":" + String(distance) + ",";
    json += "\"voltage\":" + String(voltage);
    json += "}";

    // Send POST request
    int httpResponseCode = http.POST(json);
    
    if (httpResponseCode > 0) {
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      String response = http.getString();
      Serial.println(response);
    } else {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
    }
    
    http.end();
  } else {
    Serial.println("WiFi Disconnected");
  }

  delay(5000); // Send data every 5 seconds
}
```

### 2. Find Your PC's IP Address

**Windows:**
```bash
ipconfig
```
Look for "IPv4 Address" (e.g., 192.168.1.100)

**Mac/Linux:**
```bash
ifconfig
```

### 3. Update ESP32 Code

Replace in the Arduino code:
- `YOUR_WIFI_SSID` with your WiFi name
- `YOUR_WIFI_PASSWORD` with your WiFi password
- `192.168.1.100` with your PC's IP address

### 4. Start Next.js Server

```bash
npm run dev
```

### 5. Upload Code to ESP32

1. Open Arduino IDE
2. Select your ESP32 board
3. Upload the code
4. Open Serial Monitor (115200 baud)
5. Watch for "WiFi connected!" message

### 6. View Live Data

Navigate to: `http://localhost:3000/analytics/comfort`

## API Endpoints

### POST /api/esp32
Receives sensor data from ESP32

**Request Body:**
```json
{
  "temperature": 27.5,
  "humidity": 60,
  "co2": 450,
  "lighting": 500,
  "noise": 45,
  "distance": 15.5,
  "voltage": 3.7
}
```

### GET /api/esp32
Returns latest sensor data

**Response:**
```json
{
  "temperature": 27.5,
  "humidity": 60,
  "co2": 450,
  "lighting": 500,
  "noise": 45,
  "distance": 15.5,
  "voltage": 3.7,
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

## Troubleshooting

1. **ESP32 can't connect to WiFi**
   - Check SSID and password
   - Ensure 2.4GHz WiFi (ESP32 doesn't support 5GHz)

2. **HTTP request fails**
   - Verify PC IP address
   - Check firewall settings
   - Ensure Next.js server is running

3. **No data on website**
   - Check browser console for errors
   - Verify API endpoint is accessible
   - Check ESP32 Serial Monitor for errors

## Next Steps

- Add database storage for historical data
- Create charts for sensor trends
- Add alerts for abnormal readings
- Implement multiple ESP32 devices
