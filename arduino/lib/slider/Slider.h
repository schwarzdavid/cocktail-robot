#include "Actor.h"
#include "Bumper.h"
#include "Motor.h"

#ifndef __SLIDER_H
#define __SLIDER_H

class Slider : public Actor
{
private:
    static int LENGTH, MIN_TIMEOUT, MAX_TIMEOUT, LEFT, RIGHT, ACCELERATION_STEPS;
    static float DISTANCE_PER_STEP;
    
    int pin_enabled, pin_direction, pin_pulse;
    int stops_count, position;
    unsigned long next_tick_time, start_time;
    Bumper *target;
    Bumper *stops[6];
    Motor *motor;

    void move(Bumper* target);
    void check_position();

public:
    Slider(int ena, int dir, int pul);
    void set_start(int pin);
    void add_stop(int pin, int pos, String name);
    void setup();
    void move_to(String name);
    void move_to_start();
};

#endif