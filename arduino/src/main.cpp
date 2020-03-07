#include <Arduino.h>
#include <Slider.h>

int BUMPER_START = 53;
int BUMPER_SOFTDRINKS = 51;
int BUMPER_ALC_1 = 49;
int BUMPER_ALC_2 = 47;
int BUMPER_ALC_3 = 45;
int BUMPER_ALC_4 = 43;

int STEPPER_ENABLED = 48;
int STEPPER_DIR = 50;
int STEPPER_PULSE = 52;

Slider slider(STEPPER_ENABLED, STEPPER_DIR, STEPPER_PULSE);

void setup()
{
	Serial.begin(9600);

	slider.set_start(BUMPER_START);
	slider.add_stop(BUMPER_SOFTDRINKS, 280, "softdrinks");
	slider.add_stop(BUMPER_ALC_1, 465, "alc1");
	slider.add_stop(BUMPER_ALC_2, 625, "alc2");
	slider.add_stop(BUMPER_ALC_3, 760, "alc3");
	slider.add_stop(BUMPER_ALC_4, 930, "alc4");
	slider.setup();

	digitalWrite(STEPPER_ENABLED, HIGH);
	slider.move_to_start();
	delay(2000);
	slider.move_to("alc2");
	delay(2000);
	slider.move_to("softdrinks");
	delay(2000);
	slider.move_to("alc3");
	digitalWrite(STEPPER_ENABLED, LOW);
}

void loop()
{
	Serial.println((String)digitalRead(BUMPER_ALC_4));
	delay(1000);
}