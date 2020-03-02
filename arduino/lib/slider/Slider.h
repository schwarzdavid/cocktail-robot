#include "Actor.h"

#ifndef __SLIDER_H
#define __SLIDER_H

class Slider: public Actor
{
private:
    static int MAX_SPEED, LENGTH;
    int position, enabled, direction, pulse;

public:
    Slider(int, int, int);
    void setup();
};

#endif