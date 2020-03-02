#include "Arduino.h"
#include "Slider.h"

int Slider::MAX_SPEED = 50;
int Slider::LENGTH = 950;

Slider::Slider(int enabled, int direction, int pulse)
{
    this->enabled = enabled;
    this->direction = direction;
    this->pulse = pulse;

    bumper_start = nullptr;
    bumper_end = nullptr;

    stop_count = 0;
    position = this->LENGTH;
}

void Slider::setup()
{
    if (!bumper_start || !bumper_end)
    {
        Serial.println("Slider needs start and end bumper");
        return;
    }

    bumper_start->setup();
    bumper_end->setup();

    for (int i = 0; i < stop_count; i++)
    {
        stops[i]->setup();
    }

    pinMode(enabled, OUTPUT);
    pinMode(direction, OUTPUT);
    pinMode(pulse, OUTPUT);
}

void Slider::set_start(int bumperPin)
{
    bumper_start = new Bumper(bumperPin, 0, "start");
}

void Slider::set_end(int bumperPin)
{
    bumper_end = new Bumper(bumperPin, Slider::LENGTH, "end");
}

void Slider::add_stop(int pin, int pos, String name)
{
    if (stop_count == sizeof(stops))
    {
        Serial.println("Too many stops have been added");
    }
    stops[stop_count++] = new Bumper(pin, pos, name);
}

void Slider::move_to(String name)
{
    if (name == bumper_start->name)
    {
        start_movement(bumper_start);
    }
    else if (name == bumper_end->name)
    {
        start_movement(bumper_end);
    }
    else
    {
        for (int i = 0; i < stop_count; i++)
        {
            if (name == stops[i]->name)
            {
                start_movement(stops[i]);
                break;
            }
        }
    }
}

void Slider::start_movement(Bumper *target)
{
    if (target->isPressed())
    {
        return;
    }

    this->target = target;
    busy = true;

    digitalWrite(enabled, HIGH);
    if (position > target->position)
    {
        digitalWrite(direction, LOW);
    }
    else
    {
        digitalWrite(direction, HIGH);
    }
    move();
}

void Slider::tick()
{
    if (busy)
    {
        unsigned long currMicros = micros();
        if (currMicros >= tick_time + MAX_SPEED)
        {
            move();
        }
    }
}

void Slider::move()
{
    if (target->isPressed())
    {
        busy = false;
        position = target->position;
    }
    tick_time = micros();
    if (tick_value == HIGH)
    {
        tick_value = LOW;
    }
    else
    {
        tick_value = HIGH;
    }
    digitalWrite(pulse, tick_value);
}