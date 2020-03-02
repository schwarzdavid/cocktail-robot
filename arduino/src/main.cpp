#include <Arduino.h>
#include <Slider.h>
#include <Bumper.h>

int BUMPER_START = 53;
int BUMPER_SOFTDRINKS = 51;
int BUMPER_ALC_1 = 49;
int BUMPER_ALC_2 = 47;
int BUMPER_ALC_3 = 45;
int BUMPER_ALC_4 = 43;
int BUMPER_END = 41;

int STEPPER_ENABLED = 48;
int STEPPER_DIR = 50;
int STEPPER_PULSE = 52;

Bumper bumper_start(BUMPER_START);
Bumper bumper_end(BUMPER_END);

Slider slider(
	STEPPER_ENABLED,
	STEPPER_DIR,
	STEPPER_PULSE);

void setup()
{
	pinMode(BUMPER_START, INPUT_PULLUP);
	pinMode(BUMPER_SOFTDRINKS, INPUT_PULLUP);
	pinMode(BUMPER_ALC_1, INPUT_PULLUP);
	pinMode(BUMPER_ALC_2, INPUT_PULLUP);
	pinMode(BUMPER_ALC_3, INPUT_PULLUP);
	pinMode(BUMPER_ALC_4, INPUT_PULLUP);
	pinMode(BUMPER_END, INPUT_PULLUP);

	slider.setup();

	Serial.begin(9600);
}

void loop()
{
	if (digitalRead(BUMPER_START) == LOW)
	{
		digitalWrite(STEPPER_ENABLED, HIGH);

		if (digitalRead(BUMPER_SOFTDRINKS) == HIGH)
		{
			digitalWrite(STEPPER_DIR, HIGH);
		}
		else
		{
			digitalWrite(STEPPER_DIR, LOW);
		}

		digitalWrite(STEPPER_PULSE, HIGH);
		delayMicroseconds(700);
		digitalWrite(STEPPER_PULSE, LOW);
		delayMicroseconds(700);
	}
	else
	{
		digitalWrite(STEPPER_ENABLED, LOW);
	}

	/*if (digitalRead(BUMPER_SOFTDRINKS) == HIGH)
  {
    Serial.println("BUMPER SOFTDRINKS HIGH");
  }
  if (digitalRead(BUMPER_ALC_1) == HIGH)
  {
    Serial.println("BUMPER ALCOHOL 1 HIGH");
  }
  if (digitalRead(BUMPER_ALC_2) == HIGH)
  {
    Serial.println("BUMPER ALCOHOL 2 HIGH");
  }
  if (digitalRead(BUMPER_ALC_3) == HIGH)
  {
    Serial.println("BUMPER ALCOHOL 3 HIGH");
  }
  if (digitalRead(BUMPER_ALC_4) == HIGH)
  {
    Serial.println("BUMPER ALCOHOL 4 HIGH");
  }
  if (digitalRead(BUMPER_END) == HIGH)
  {
    Serial.println("BUMPER END HIGH");
  }
  delay(2000);*/
}