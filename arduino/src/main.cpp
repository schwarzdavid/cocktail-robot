#include <Arduino.h>
#include <Slider.h>

int BUMPER_START = 53;
int BUMPER_SOFTDRINKS = 51;
int BUMPER_ALC_1 = 49;
int BUMPER_ALC_2 = 47;
int BUMPER_ALC_3 = 45;
int BUMPER_END = 43;

int STEPPER_ENABLED = 48;
int STEPPER_DIR = 50;
int STEPPER_PULSE = 52;

Slider slider(STEPPER_ENABLED, STEPPER_DIR, STEPPER_PULSE);

bool isAtStart = true;

void setup()
{
	Serial.begin(9600);

	slider.set_start(BUMPER_START);
	slider.set_end(BUMPER_END);
	slider.add_stop(BUMPER_SOFTDRINKS, 300, "softdrinks");
	slider.add_stop(BUMPER_ALC_1, 465, "alc1");
	slider.add_stop(BUMPER_ALC_2, 625, "alc2");
	slider.add_stop(BUMPER_ALC_3, 760, "alc3");
	slider.setup();

	slider.move_to_start();
}

void loop()
{
	slider.tick();

	if (!slider.busy)
	{
		if(isAtStart){
			slider.move_to("alc2");
			isAtStart = false;
		} else {
			slider.move_to_start();
			isAtStart = true;
		}
	}
}