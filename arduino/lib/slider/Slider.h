#include "Actor.h"
#include "Bumper.h"

#ifndef __SLIDER_H
#define __SLIDER_H

class Slider : public Actor
{
private:
    static int MAX_SPEED, LENGTH;
    int position, enabled, direction, pulse, stop_count, tick_value;
    bool busy;
    unsigned long tick_time;
    Bumper *bumper_start, *bumper_end, *target;
    Bumper *stops[4];

    void start_movement(Bumper* target);

public:
    Slider(int ena, int dir, int pul);
    void set_start(int pin);
    void set_end(int pin);
    void add_stop(int pin, int pos, String name);
    void setup();
    void tick();
    void move_to(String name);
    void move();
};

#endif