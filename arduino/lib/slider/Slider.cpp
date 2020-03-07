#include "Arduino.h"
#include "Slider.h"

int Slider::LENGTH = 950;

int Slider::LEFT = LOW;
int Slider::RIGHT = HIGH;

int Slider::MIN_TIMEOUT = 400;
int Slider::MAX_TIMEOUT = 4000;
int Slider::ACCELERATION_STEPS = 550;
float Slider::DISTANCE_PER_STEP = 0.2;

Slider::Slider(int enabled, int direction, int pulse)
{
    pin_enabled = enabled;
    pin_direction = direction;
    pin_pulse = pulse;

    stops_count = 1;
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

    pinMode(pin_enabled, OUTPUT);
    pinMode(pin_direction, OUTPUT);
    pinMode(pin_pulse, OUTPUT);
}

void Slider::set_start(int bumperPin)
{
    stops[0] = new Bumper(bumperPin, 0, "start");
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
            move(stops[i]);
            break;
        }
    }
}

void Slider::move_to_start()
{
    move(stops[0]);
}

void Slider::check_position()
{
    for (int i = 0; i < stops_count; i++)
    {
        if (stops[i]->isPressed())
        {
            position = stops[i]->position;
            break;
        }
    }
}

void Slider::move(Bumper *target)
{
    if (target->isPressed())
    {
        return;
    }

    check_position();
    if (position < 0)
    {
        digitalWrite(pin_direction, LEFT);
        while (position < 0)
        {
            digitalWrite(pin_pulse, HIGH);
            delayMicroseconds(MAX_TIMEOUT);
            digitalWrite(pin_pulse, LOW);
            delayMicroseconds(MAX_TIMEOUT);
            check_position();
        }
    }

    if (target->isPressed())
    {
        return;
    }

    int distance = abs(position - target->position);
    int steps = (float)distance / DISTANCE_PER_STEP;
    //TODO: remove this when finished
    steps -= 400;
    int acceleration_steps = min(ACCELERATION_STEPS, steps / 2);
    int min_timeout = map(acceleration_steps, 0, ACCELERATION_STEPS, MAX_TIMEOUT, MIN_TIMEOUT);

    int dir = position < target->position ? RIGHT : LEFT;
    digitalWrite(pin_direction, dir);

    bool target_met = false;

    for (int i = 0; i < steps; i++)
    {
        if (target->isPressed())
        {
            target_met = true;
            i = steps - min(acceleration_steps, steps - i);
        }
        int easingStep = min(i, steps - i);
        int timeout = MIN_TIMEOUT;
        if (easingStep <= acceleration_steps)
        {
            float fq = 1.0 / (acceleration_steps * 2);
            float val = 0.5 * (1 + sin(PI * fq * easingStep));
            timeout = MAX_TIMEOUT - (MAX_TIMEOUT - min_timeout) * val;
        }
        digitalWrite(pin_pulse, HIGH);
        delayMicroseconds(timeout);
        digitalWrite(pin_pulse, LOW);
        delayMicroseconds(timeout);
    }

    if (target_met)
    {
        digitalWrite(pin_direction, !dir);
    }

    while (!target->isPressed())
    {
        digitalWrite(pin_pulse, HIGH);
        delayMicroseconds(MAX_TIMEOUT);
        digitalWrite(pin_pulse, LOW);
        delayMicroseconds(MAX_TIMEOUT);
    }
}