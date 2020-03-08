#include "Dispenser.h"

void Dispenser::add(int pin, String name, int low, int high)
{
    dispensers[dispenser_count++] = dispenser{
        pin : pin,
        low: low,
        high: high,
        name : name,
        servo: Servo()
    };
}

void Dispenser::setup()
{
    for (int i = 0; i < dispenser_count; i++)
    {
        dispensers[i].servo.attach(dispensers[i].pin);
        dispensers[i].servo.write(dispensers[i].low);
    }
}

void Dispenser::pour(int i){
    dispensers[i].servo.write(dispensers[i].high);
    delay(4500);
    dispensers[i].servo.write(dispensers[i].low);
    delay(2000);
}

void Dispenser::pour(String name){
    for(int i = 0; i < dispenser_count; i++){
        if(dispensers[i].name == name){
            pour(i);
            break;
        }
    }
}