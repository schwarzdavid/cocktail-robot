#include <Arduino.h>
#include <Slider.h>
#include <Dispenser.h>

int BUMPER_START = 53;
int BUMPER_SOFTDRINKS = 51;
int BUMPER_ALC_1 = 49;
int BUMPER_ALC_2 = 47;
int BUMPER_ALC_3 = 45;
int BUMPER_ALC_4 = 43;

int STEPPER_ENABLED = 48;
int STEPPER_DIR = 50;
int STEPPER_PULSE = 52;

int DISPENSER_ALC_1 = 23;
int DISPENSER_ALC_2 = 25;
int DISPENSER_ALC_3 = 27;
int DISPENSER_ALC_4 = 29;

Slider slider(STEPPER_ENABLED, STEPPER_DIR, STEPPER_PULSE);
Dispenser dispenser;

void setup()
{
	Serial.begin(9600);

	slider.set_start(BUMPER_START);
	slider.add_stop(BUMPER_SOFTDRINKS, 280, "softdrinks");
	slider.add_stop(BUMPER_ALC_1, 465, "alc1");
	slider.add_stop(BUMPER_ALC_2, 625, "alc2");
	slider.add_stop(BUMPER_ALC_3, 790, "alc3");
	slider.add_stop(BUMPER_ALC_4, 930, "alc4");
	slider.setup();

	dispenser.add(DISPENSER_ALC_1, "alc1", 60, 175);
	dispenser.add(DISPENSER_ALC_2, "alc2", 0, 110);
	dispenser.add(DISPENSER_ALC_3, "alc3", -20, 90);
	dispenser.add(DISPENSER_ALC_4, "alc4", -20, 90);
	dispenser.setup();

	digitalWrite(STEPPER_ENABLED, HIGH);
	slider.move_to("alc1");
	delay(2000);
	for(int i = 0; i < 5; i++){
		dispenser.pour("alc1");
	}
}

void loop()
{
	
}