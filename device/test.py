import time
import Adafruit_DHT
import paho.mqtt.client as mqtt
import json

sensor = Adafruit_DHT.DHT11
pin = 2

broker_address="ec2.devfloors.com"
client = mqtt.client("clientPublisher")
client.connect(broker_address)


try:
    while True:
        h,t = Adafruit_DHT.read_retry(sensor,pin)
        if h is not None and t is not None:
            pub_data = {"message":true, "Temperature":t, "Humidity":h}
        else:
            pub_data = {"message":false}
        pub_data = json.dumps(pub_data)
        print(pub_data)
        client.publish("DHT11",pub_data)
        time.sleep(60)
except KeyboardInterrupt:
    print("Terminated by Keyboard")
finally:
    print("End of Program")