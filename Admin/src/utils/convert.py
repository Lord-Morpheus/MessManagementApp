import json

def convert_mess_name_to_id(data, mess_mapping):
    for item in data:
        preferences = []
        for preference in item['preferences']:
            for mess in mess_mapping:
                if preference.lower() == mess['name'].lower():
                    preferences.append({"id":mess['mess_id']})
                    break
        item['preferences'] = preferences
    return data

def main():
    with open('merged.json', 'r') as file:
        student_data = json.load(file)
    
    with open(r'Admin\src\utils\messId.json', 'r') as file:
        mess_mapping = json.load(file)

    converted_data = convert_mess_name_to_id(student_data, mess_mapping)

    with open('final.json', 'w') as output_file:
        json.dump(converted_data, output_file, indent=2)

if __name__ == "__main__":
    main()
