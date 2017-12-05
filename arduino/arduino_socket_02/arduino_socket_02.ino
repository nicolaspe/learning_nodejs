#include <ArduinoHttpClient.h>
#include <SPI.h>
#include <WiFi101.h>

# define button 9
# define led 8

// Arduino MKR1000 MAC address: F8:F0:5:F5:D6:19

// WiFi settings
//const char ssid[] = "itpsandbox";
//const char pass[] = "NYU+s0a!P?";
const char ssid[] = "npe_WiFi";
const char pass[] = "npescarpentier.1990";

WiFiClient wifi_client;
int port = 80;
char server[] = "everyday-windows.herokuapp.com";
//int port = 8082;
//char server[] = "138.197.122.214";
char server2[] = "www.arduino.cc";
WebSocketClient socket_client = WebSocketClient(wifi_client, server, port);

int last = LOW;



void setup() {
  Serial.begin(9600);
  
  while(!Serial){
    delay(100);     // wait for serial port to connect
  }

  pinMode(button, INPUT);
  pinMode(led, OUTPUT);
  
  connectWiFi();
  connectServer();
}


/* ===========================
 * ===== SETUP FUNCTIONS =====
 * =========================== */

void connectWiFi(){
  // check for WiFi shield
  if(WiFi.status() == WL_NO_SHIELD){
    Serial.println("NO WIFI SHIELD! D:");
    while(true);  // don't continue
  }

  // attempt to connect
  while(WiFi.status() != WL_CONNECTED){
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    WiFi.begin(ssid, pass);

    delay(200);
  }
  
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}


void connectServer(){
  Serial.print("Attempting to connect to: ");
  Serial.println(server);

  if(socket_client.connect(server, port)){
    Serial.println("Connected to server!");
    sendJsonMessage("", 0);  // send the client name and nothing else
  } else {
    Serial.println("Failed to connect");
  }
}



/* ===========================
 * ========== LOOP  ==========
 * =========================== */
 
void loop() {
  // recheck connection and attempt to reconnect
  if(WiFi.status() != WL_CONNECTED){
    Serial.print("WiFi disconnected! D:");
    connectWiFi();
  } 


  int butt = digitalRead(button);
  if(butt == HIGH && last == LOW){
    digitalWrite(led, HIGH);
    Serial.println("BUTTON PRESSEDDDDD");
    testMessage();
//    postMessage(2);
  } else {
    digitalWrite(led, LOW);
  }

  last = butt;
  
  // read incoming data
  if(socket_client.available()){
    String result = socket_client.readString();
    Serial.print(result);
  }
}



/* ===========================
 * ===== LOOP FUNCTIONS ======
 * =========================== */

void testMessage(){
  Serial.println("Attempting websocket connection");
  if(!socket_client.connected()){
    connectServer();
  }
  if (socket_client.connected()) {
    sendJsonMessage("select", 2);
    Serial.println("msg sent!");
  }
  else {
    Serial.println("connection failed");
  }
}

// This function forms a JSON message to send,
// from a key-value pair:
void sendJsonMessage(String key, int val) {
  socket_client.beginMessage(TYPE_TEXT);   // message type: text
  socket_client.print("{\"clientName\":\"MKR1000\"");
  if (key != "") {          // if there is no key, just send name
    socket_client.print(",\""); // comma, opening quotation mark
    socket_client.print(key);   // key
    socket_client.print("\":"); // closing quotation mark, colon
    socket_client.print(val);   // value
  }
  socket_client.print("}");
  socket_client.endMessage();
}

