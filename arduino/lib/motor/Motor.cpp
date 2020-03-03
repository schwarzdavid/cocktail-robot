#include "Arduino.h"
#include "Motor.h"

int Motor::LEFT = LOW;
int Motor::RIGHT = HIGH;

int Motor::MIN_SPEED = 500;
int Motor::MAX_SPEED = 4000;

Motor::Motor(int ena, int dir, int pul)
{
    pinEnabled = ena;
    pinDirection = dir;
    pinPulse = pul;

    next_tick = -1;
}

void Motor::setup()
{
    pinMode(pinEnabled, OUTPUT);
    pinMode(pinDirection, OUTPUT);
    pinMode(pinPulse, OUTPUT);
}

void Motor::enable()
{
    digitalWrite(pinEnabled, HIGH);
    enabled = true;
}

void Motor::disable()
{
    digitalWrite(pinEnabled, LOW);
    enabled = false;
}

void Motor::setDirection(int dir)
{
    if (dir == LEFT || dir == RIGHT)
    {
        digitalWrite(pinDirection, dir);
    }
    else
    {
        Serial.println("Unknown direction: " + dir);
    }
}

void Motor::setSpeed(int speed)
{
    if (speed == 0)
    {
        timeout = 0;
    }
    else
    {
        timeout = map(speed, 0, 100, MIN_SPEED, MAX_SPEED);
        tick();
    }
}

void Motor::tick(int time)
{
    if (enabled && timeout >= MIN_SPEED && next_tick <= time)
    {
        pulse_value = pulse_value == HIGH ? LOW : HIGH;
        digitalWrite(pinPulse, pulse_value);
        next_tick = time + timeout;
    }
}