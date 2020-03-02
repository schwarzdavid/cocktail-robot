#include "Actor.h"

#ifndef __BUMPER_H
#define __BUMPER_H

class Bumper : public Actor
{
private:
    int pin;

public:
    String name;
    int position;

    Bumper(int pin, int pos, String name);
    void setup();
    bool isPressed();
};

#endif