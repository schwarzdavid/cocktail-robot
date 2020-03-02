#include "Arduino.h"
#include "Bumper.h"

Bumper::Bumper(int pin, int position, String name)
{
    this->pin = pin;
    this->position = position;
    this->name = name;
}

void Bumper::setup()
{
    pinMode(pin, INPUT_PULLUP);
}

bool Bumper::isPressed() {
    return digitalRead(pin) == LOW;
}