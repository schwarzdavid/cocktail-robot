#include <Arduino.h>
#include <Servo.h>
//#include <Slider.h>
//#include <Dispenser.h>

int BUMPER_START = 49;
int BUMPER_SOFTDRINKS = 43;
int BUMPER_ALC_1 = 45;
int BUMPER_ALC_2 = 51;
int BUMPER_ALC_3 = 53;
int BUMPER_ALC_4 = 47;
/*
int STEPPER_ENABLED = 48;
int STEPPER_DIR = 50;
int STEPPER_PULSE = 52;
*/
int DISPENSER_ALC_1 = 23;
int DISPENSER_ALC_2 = 27;
int DISPENSER_ALC_3 = 25;
int DISPENSER_ALC_4 = 29;

int JUICE_1 = 28;
int JUICE_2 = 26;
int JUICE_3 = 24;
int JUICE_4 = 22;
/*
Slider slider(STEPPER_ENABLED, STEPPER_DIR, STEPPER_PULSE);
Dispenser dispenser;
*/

Servo servo_alc_1 = Servo();
Servo servo_alc_2 = Servo();
Servo servo_alc_3 = Servo();
Servo servo_alc_4 = Servo();

void setup()
{
	Serial.begin(9600);
	Serial3.begin(9600);

	pinMode(LED_BUILTIN, OUTPUT);

	pinMode(BUMPER_START, INPUT_PULLUP);
	pinMode(BUMPER_SOFTDRINKS, INPUT_PULLUP);
	pinMode(BUMPER_ALC_1, INPUT_PULLUP);
	pinMode(BUMPER_ALC_2, INPUT_PULLUP);
	pinMode(BUMPER_ALC_3, INPUT_PULLUP);
	pinMode(BUMPER_ALC_4, INPUT_PULLUP);

	servo_alc_1.attach(DISPENSER_ALC_1);
	servo_alc_2.attach(DISPENSER_ALC_2);
	servo_alc_3.attach(DISPENSER_ALC_3);
	servo_alc_4.attach(DISPENSER_ALC_4);
	
	digitalWrite(JUICE_1, HIGH);
	digitalWrite(JUICE_2, HIGH);
	digitalWrite(JUICE_3, HIGH);
	digitalWrite(JUICE_4, HIGH);
	pinMode(JUICE_1, OUTPUT);
	pinMode(JUICE_2, OUTPUT);
	pinMode(JUICE_3, OUTPUT);
	pinMode(JUICE_4, OUTPUT);

	/*slider.set_start(BUMPER_START);
	slider.add_stop(BUMPER_SOFTDRINKS, 280, "softdrinks");
	slider.add_stop(BUMPER_ALC_1, 465, "alc1");
	slider.add_stop(BUMPER_ALC_2, 625, "alc2");
	slider.add_stop(BUMPER_ALC_3, 790, "alc3");
	slider.add_stop(BUMPER_ALC_4, 930, "alc4");
	slider.setup();

	dispenser.add(DISPENSER_ALC_1, "alc1", 25);
	dispenser.add(DISPENSER_ALC_2, "alc2", 30);
	dispenser.add(DISPENSER_ALC_3, "alc3", 30);
	dispenser.add(DISPENSER_ALC_4, "alc4", 25);
	dispenser.setup();*/

	Serial.println(F("Im ready"));
}

void loop()
{
}