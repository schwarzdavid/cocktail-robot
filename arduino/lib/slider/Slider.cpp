#include "Arduino.h"
#include "Slider.h"

#define DIR_LEFT LOW
#define DIR_RIGHT HIGH

int Slider::MAX_SPEED = 500;
int Slider::MIN_SPEED = 1800;
int Slider::LENGTH = 950;

Slider::Slider(int enabled, int direction, int pulse)
{
    this->enabled = enabled;
    this->direction = direction;
    this->pulse = pulse;

    stops_count = 2;
    position = -1;
}

void Slider::setup()
{
    if (!stops[0] || !stops[1])
    {
        Serial.println("Slider needs start and end bumper");
        return;
    }

    for (int i = 0; i < stops_count; i++)
    {
        stops[i]->setup();
    }

    pinMode(enabled, OUTPUT);
    pinMode(direction, OUTPUT);
    pinMode(pulse, OUTPUT);
}

void Slider::set_start(int bumperPin)
{
    stops[0] = new Bumper(bumperPin, 0, "start");
}

void Slider::set_end(int bumperPin)
{
    stops[1] = new Bumper(bumperPin, Slider::LENGTH, "end");
}

void Slider::add_stop(int pin, int pos, String name)
{
    if (stops_count == sizeof(stops))
    {
        Serial.println("Too many stops have been added");
        return;
    }
    for (int i = 0; i < stops_count; i++)
    {
        if (stops[i]->name == name)
        {
            Serial.println("Stop with name " + name + " already exists");
            return;
        }
    }
    stops[stops_count++] = new Bumper(pin, pos, name);
}

void Slider::move_to(String name)
{
    for (int i = 0; i < stops_count; i++)
    {
        if (name == stops[i]->name)
        {
            start_movement(stops[i]);
            break;
        }
    }
}

void Slider::move_to_start()
{
    start_movement(stops[0]);
}

void Slider::start_movement(Bumper *target)
{
    if (target->isPressed())
    {
        return;
    }

    this->target = target;
    busy = true;
    start_time = micros();

    digitalWrite(enabled, HIGH);
    if (position > target->position || position == -1)
    {
        digitalWrite(direction, DIR_LEFT);
    }
    else
    {
        digitalWrite(direction, DIR_RIGHT);
    }
    move();
}

void Slider::check_position()
{
    for (int i = 0; i < stops_count; i++)
    {
        if (stops[i]->isPressed())
        {
            position = stops[i]->position;
        }
    }
}

void Slider::tick()
{
    if (busy)
    {
        unsigned long currMicros = micros();
        if (currMicros >= next_tick_time)
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
        return;
    }

    check_position();
    if (position < 0)
    {
        next_tick_time = micros() + MIN_SPEED;
    }
    else
    {
        // TODO: write easing function
        next_tick_time = micros() + MAX_SPEED;
    }
    pulse_value = pulse_value == HIGH ? LOW : HIGH;
    digitalWrite(pulse, pulse_value);
}