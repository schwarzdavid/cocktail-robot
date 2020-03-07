#include "Arduino.h"
#include "Motor.h"

int Motor::LEFT = LOW;
int Motor::RIGHT = HIGH;

int Motor::MIN_TIMEOUT = 1;
int Motor::MAX_TIMEOUT = 2;
int Motor::ACCELERATION_TICKS = 200;

Motor::Motor(int ena, int dir, int pul)
{
    pin_enabled = ena;
    pin_direction = dir;
    pin_pulse = pul;
}

void Motor::setup()
{
    pinMode(pin_enabled, OUTPUT);
    pinMode(pin_direction, OUTPUT);
    pinMode(pin_pulse, OUTPUT);
}

void Motor::enable()
{
    digitalWrite(pin_enabled, HIGH);
    enabled = true;
}

void Motor::disable()
{
    digitalWrite(pin_enabled, LOW);
    enabled = false;
}

void Motor::set_direction(int dir)
{
    if (dir == LEFT || dir == RIGHT)
    {
        digitalWrite(pin_direction, dir);
    }
    else
    {
        Serial.println("Unknown direction: " + dir);
    }
}

void Motor::move_ticks(int ticks)
{
    ticks_left = ticks;
    total_ticks = ticks;
    acceleration_ticks = min(ACCELERATION_TICKS, ticks / 2);
    linear = false;
    infinite_timeout = 0;
    move_start();
}

void Motor::move_ticks(int ticks, int speedAfter)
{
    move_ticks(ticks);
    infinite_timeout = map(speedAfter, 1, 100, MAX_TIMEOUT, MIN_TIMEOUT);
}

void Motor::move_linear(int speed)
{
    linear = true;
    linear_timeout = map(speed, 1, 100, MAX_TIMEOUT, MIN_TIMEOUT);
    move_start();
}

void Motor::move_start()
{
    moving = true;
    last_tick_time = 0;
    tick();
}

void Motor::tick()
{
    unsigned long t = micros();
    if (isMoving() && t - last_tick_time >= timeout)
    {
        if (!linear && --ticks_left == 0)
        {
            if (infinite_timeout > 0)
            {
                Serial.println("Setting to infinite timeout");
                linear = true;
                linear_timeout = infinite_timeout;
            }
            else
            {
                return move_end();
            }
        }

        digitalWrite(pin_pulse, LOW);
        digitalWrite(pin_pulse, HIGH);

        last_tick_time = t;
        timeout = (linear ? linear_timeout : get_next_timeout());
        Serial.println("Timeout: " + (String)timeout);
    }
}

void Motor::move_end()
{
    moving = false;
}

int Motor::get_next_timeout()
{
    int i = min(ticks_left, total_ticks - ticks_left);
    Serial.println((String)i);
    if (i > acceleration_ticks)
    {
        return MIN_TIMEOUT;
    }

    float fq = 1.0 / (acceleration_ticks * 4);
    float val = 0.5 * (1 + sin(2.0 * PI * fq * i));

    return MAX_TIMEOUT - (MAX_TIMEOUT - MIN_TIMEOUT) * val;
}

bool Motor::isMoving()
{
    return enabled && moving;
}