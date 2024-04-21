import json

def convert_to_preference_array(data):
    for item in data:
        item['preferences'] = [item[f'preference_{i}'] for i in range(1, 6)]
        item.pop('preference_1')
        item.pop('preference_2')
        item.pop('preference_3')
        item.pop('preference_4')
        item.pop('preference_5')
    return data

def main():
    with open(r'Admin\src\utils\studentMessPreference.json', 'r') as file:
        input_data = json.load(file)

    output_data = convert_to_preference_array(input_data)

    with open('output.json', 'w') as output_file:
        json.dump(output_data, output_file, indent=2)

if __name__ == "__main__":
    main()
