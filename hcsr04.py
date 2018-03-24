import RPi.GPIO as GPIO
import time
import requests
import json

GPIO.cleanup()

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

frequency = 0.03

trig_front = 27
echo_front = 17

GPIO.setup(trig_front, GPIO.OUT)
GPIO.setup(echo_front, GPIO.IN)

URI = "http://172.20.10.2:8080/sensors"

GPIO.output(trig_front, False)

loop = 0
while(1):
    time.sleep(frequency)

    GPIO.output(trig_front, True)
    time.sleep(0.00001)
    GPIO.output(trig_front, False)

    while GPIO.input(echo_front)==0:
        start_impulse_front = time.time()

    while GPIO.input(echo_front)==1:
        end_impulse_front = time.time()

    distance_front = round((end_impulse_front - start_impulse_front) * 340 * 100 / 2, 1)

    dist_front = '{}'.format(distance_front)

    headers = {'Content-Type': 'application/json' }

    payload = {'front': dist_front, 'right': '400', 'back': '400', 'left' : '400'}

    if loop % 50 == 0:
        print payload
        loop = 0

    loop += 1
    res = requests.put(URI, data=json.dumps(payload), headers=headers)

GPIO.cleanup()
