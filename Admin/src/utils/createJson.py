import json
import random

def generate_roll_no():
    prefix = "B22" if random.randint(0, 1) == 0 else "B21" if random.randint(0, 1) == 0 else "B23"
    middle_digit = str(random.randint(0, 3))
    last_two_digits = str(random.randint(0, 9)) + str(random.randint(0, 9))
    if prefix == "B23":
        last_two_digits = str(random.randint(0, 5)) + last_two_digits[1]
    return prefix + middle_digit + last_two_digits

def generate_name():
    first_names = ["John", "Jane", "Alice", "Bob", "Emily", "Michael", "Sarah", "David", "Emma", "William", "Olivia", "James", "Sophia", "Daniel", "Isabella"]
    last_names = ["Doe", "Smith", "Johnson", "Brown", "Davis", "Wilson", "Taylor", "Martinez", "Garcia", "Hernandez", "Young", "Lee", "Clark", "Baker", "Hill"]
    return random.choice(first_names) + " " + random.choice(last_names)

def generate_preferences():
    mess_options = ["Pine Mess", "Oak Mess", "Alder Mess", "Tulsi Mess", "Peepal Mess"]
    random.shuffle(mess_options)
    return mess_options

candidates = []
for _ in range(100):
    preferences=generate_preferences()
    candidate = {
        "name": generate_name(),
        "roll_no": generate_roll_no(),
        
        "preference_1": preferences[0],
        "preference_2": preferences[1],
        "preference_3": preferences[2],
        "preference_4": preferences[3],
        "preference_5": preferences[4]
    }
    candidates.append(candidate)

with open("studentMessPreference.json", "w") as file:
    json.dump(candidates, file, indent=2)

print("JSON file 'studentMessPreference.json' has been created successfully.")
