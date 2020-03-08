#include <Arduino.h>
#include <Actor.h>
#include <Servo.h>

#ifndef __DISPENSER_H
#define __DISPENSER_H

struct dispenser
{
    int pin, low;
    String name;
    Servo servo;
};

class Dispenser: public Actor
{
private:
    static int HIGH_INCREASE;

    int dispenser_count = 0;
    dispenser dispensers[4];

public:
    void add(int pin, String name, int low_pos);
    void setup();
    void pour(String name);
    void pour(int i);
};

#endif