#include "Actor.h"
#include "Bumper.h"

#ifndef __SLIDER_H
#define __SLIDER_H

class Slider : public Actor
{
private:
    static int MAX_SPEED, MIN_SPEED, LENGTH;
    
    int enabled, direction, pulse, stops_count, pulse_value, position, start_position;
    unsigned long next_tick_time, start_time;
    Bumper *target;
    Bumper *stops[6];

    void start_movement(Bumper* target);
    void move();
    void check_position();

public:
    bool busy;

    Slider(int ena, int dir, int pul);
    void set_start(int pin);
    void set_end(int pin);
    void add_stop(int pin, int pos, String name);
    void setup();
    void tick();
    void move_to(String name);
    void move_to_start();
};

#endif