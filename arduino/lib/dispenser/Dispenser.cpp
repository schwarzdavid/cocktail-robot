#include "Dispenser.h"

int Dispenser::HIGH_INCREASE = 120;

void Dispenser::add(int pin, String name, int low)
{
    dispensers[dispenser_count++] = dispenser{
        pin : pin,
        low: low,
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
    dispensers[i].servo.write(dispensers[i].low + HIGH_INCREASE);
    delay(5000);
    dispensers[i].servo.write(dispensers[i].low);
    delay(3000);
}

void Dispenser::pour(String name){
    for(int i = 0; i < dispenser_count; i++){
        if(dispensers[i].name == name){
            pour(i);
            break;
        }
    }
}