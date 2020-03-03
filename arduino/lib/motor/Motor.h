#include "Actor.h"

#ifndef __MOTOR_H
#define __MOTOR_H
class Motor: public Actor
{
private:
    static int MAX_SPEED, MIN_SPEED;

    int pinEnabled, pinDirection, pinPulse, timeout, next_tick, pulse_value;
    bool enabled;
public:
    static int LEFT, RIGHT;

    Motor(int ena, int dir, int pul);
    void setup();
    void enable();
    void disable();
    void setDirection(int dir);
    void setSpeed(int speed);
    void tick(int time);
};

#endif