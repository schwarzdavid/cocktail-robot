#include "Actor.h"

#ifndef __MOTOR_H
#define __MOTOR_H

class Motor : public Actor
{
private:
    static int MAX_TIMEOUT, MIN_TIMEOUT, ACCELERATION_TICKS;

    int pin_enabled, pin_direction, pin_pulse;
    int ticks_left, total_ticks, acceleration_ticks;
    int linear_timeout, infinite_timeout;
    unsigned long last_tick_time, timeout;
    bool enabled, moving, linear;

    void move_start();
    void move_end();

    int get_next_timeout();

public:
    static int LEFT, RIGHT;

    Motor(int ena, int dir, int pul);
    void setup();
    void enable();
    void disable();
    void set_direction(int dir);
    void move_ticks(int ticks);
    void move_ticks(int ticks, int speedAfter);
    void move_linear(int speed);
    void tick();
    bool isMoving();
};

#endif