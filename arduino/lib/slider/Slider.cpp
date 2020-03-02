#include <Arduino.h>
#include "Slider.h"

int Slider::MAX_SPEED = 600;
int Slider::LENGTH = 950;

Slider::Slider(int enabled, int direction, int pulse)
{
    this->enabled = enabled;
    this->direction = direction;
    this->pulse = pulse;
}

void Slider::setup()
{
    pinMode(enabled, OUTPUT);
    pinMode(direction, OUTPUT);
    pinMode(PULSE, OUTPUT);
}