/*
  Simple WebSocket client for ArduinoHttpClient library
  Connects to the WebSocket server, and sends a hello
  message every 5 seconds
  created 28 Jun 2016
  by Sandeep Mistry
  this example is in the public domain
*/
#include <ArduinoHttpClient.h>
#include <WiFi101.h>
#include "arduino_secrets.h"

///////please enter your sensitive data in the Secret tab/arduino_secrets.h
/////// Wifi Settings ///////
char ssid[] = SECRET_SSID;
char pass[] = SECRET_PASS;

//char serverAddress[] = "echo.websocket.org";  // server address
//int port = 80;
char serverAddress[] = "everyday-windows.herokuapp.com";  // server address
int port = 12591;

WiFiClient wifi;
WebSocketClient client = WebSocketClient(wifi, serverAddress);
int status = WL_IDLE_STATUS;
int count = 0;

void setup() {
  Serial.begin(9600);
  while ( status != WL_CONNECTED) {
    Serial.print("Attempting to connect to Network named: ");
    Serial.println(ssid);                   // print the network name (SSID);

    // Connect to WPA/WPA2 network:
    status = WiFi.begin(ssid, pass);
  }

  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your WiFi shield's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);
}

void loop() {
  Serial.println("starting WebSocket client");
  client.begin("select");

  while (client.connected()) {
    Serial.print("Sending ");
    Serial.println(count);

    // send a hello #
    client.beginMessage(TYPE_TEXT);
    client.print(2);
    client.endMessage();

    // increment count for next message
    count++;

    // check if a message is available to be received
    int messageSize = client.parseMessage();

    if (messageSize > 0) {
      Serial.println("Received a message:");
      Serial.println(client.readString());
    }

    // wait 2 seconds
    delay(2000);
  }

  Serial.println("disconnected");
}

