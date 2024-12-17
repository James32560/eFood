// #include <Arduino.h>
// #include <ArduinoJSON.h>
// #include <HX711.h>

// #include "NimBLE.h"

// BLE ble;

// const int LOADCELL_DOUT_PIN = 16;
// const int LOADCELL_SCK_PIN = 4;
// HX711 scale;

// float previousWeight = 0;
// float weightThreshold = 1;

// int stableTimer = 0;
// int timertThreshold = 2000;
// bool stable = true;



// void setup()
// {
// 	Serial.begin(115200);

// 	scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
// 	ble.begin();

// 	// Using for getting weight factor, which is -12134/56g=-216.678
// 	// scale.set_scale();
// 	// scale.tare();
// 	// Serial.println("HX711 0 weight value: " + String(scale.get_units(10)));
// 	// for(int i = 0; i < 10; i++)
// 	// {
// 	// 	Serial.println("Counting Down: " + String(10 - i));
// 	// 	delay(1000);
// 	// }
// 	// Serial.println("HX711 56g value: " + String(scale.get_units(10)));

// 	scale.set_scale(-216.678);
// 	scale.tare();
// }

// void loop()
// {
// 	float currentWeight = scale.get_units(10);
// 	if(abs(currentWeight - previousWeight) > weightThreshold && stable)
// 	{
// 		stable = false, stableTimer = millis();
// 		Serial.println("Unstable");
// 	}
// 	else if(millis() - stableTimer > timertThreshold && !stable)
// 	{
// 		stable = true, previousWeight = currentWeight;
// 		Serial.println("Weight: " + String(currentWeight) + "g");

// 		if(ble.connection && currentWeight > 10)
// 		{
// 			JsonDocument jsonData;
// 			jsonData["weight"] = currentWeight;
// 			ble.send(jsonData);
			
// 			Serial.println("BLE data sent");
// 		}
// 		else
// 		{
// 			Serial.println("No BLE connection");
// 		}
// 	}
// }

#include <Arduino.h>
#include <NimBLEDevice.h>
#include <ArduinoJson.h>
#include <HX711.h>

#define SERVICE_UUID        "0000ffe0-0000-1000-8000-00805f9b34fb"
#define CHARACTERISTIC_UUID "0000ffe1-0000-1000-8000-00805f9b34fb"
NimBLECharacteristic* pCharacteristic;

// HX711 circuit wiring
const int LOADCELL_DOUT_PIN = 16;
const int LOADCELL_SCK_PIN = 4;

HX711 scale;
float previousWeight = 0;
const float weightThreshold = 5.0;
const unsigned long timertThreshold = 2000;
bool stable = true;
unsigned long stableTimer = 0;

class ServerCallbacks : public NimBLEServerCallbacks
{
    void onConnect(NimBLEServer* pServer, NimBLEConnInfo& connInfo) override
	{
        Serial.println("Connected");
    }

    void onDisconnect(NimBLEServer* pServer, NimBLEConnInfo& connInfo, int reason) override
	{
        Serial.println("Disconnected");
    }
};

void setup() {
    Serial.begin(115200);
    NimBLEDevice::init("ESP32");
    NimBLEServer* pServer = NimBLEDevice::createServer();
    pServer->setCallbacks(new ServerCallbacks());

	NimBLEService* pService = pServer->createService(SERVICE_UUID);
	pCharacteristic = pService->createCharacteristic(
		CHARACTERISTIC_UUID,
		NIMBLE_PROPERTY::READ |
		NIMBLE_PROPERTY::WRITE |
		NIMBLE_PROPERTY::NOTIFY
	);
	pService->start();

	NimBLEAdvertising* pAdvertising = NimBLEDevice::getAdvertising();
	pAdvertising->addServiceUUID(SERVICE_UUID);
	pAdvertising->start();

    scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
    scale.set_scale(-216.678);
    scale.tare();
}

void loop() {
    float currentWeight = scale.get_units(10);
    if(abs(currentWeight - previousWeight) > weightThreshold && stable)
	{
        stable = false;
        stableTimer = millis();
        Serial.println("Unstable");
    }
	else if(millis() - stableTimer > timertThreshold && !stable)
	{
        stable = true;
        previousWeight = currentWeight;
        Serial.println("Weight: " + String(currentWeight) + "g");

		JsonDocument jsonData;
		jsonData["weight"] = currentWeight;
		String jsonString;
		serializeJson(jsonData, jsonString);

		pCharacteristic->setValue(jsonString.c_str());
		pCharacteristic->notify();
    }
}