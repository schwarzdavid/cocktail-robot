#include <Arduino.h>

#ifndef __BUMPER_H
#define __BUMPER_H

class Bumper
{
private:
    int pin, position;
    String name;

public:
    Bumper(/* args */);
};

#endif