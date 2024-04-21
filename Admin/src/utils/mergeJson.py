import json

def merge_json(json1, json2):
    merged_data = []
    for data1, data2 in zip(json1, json2):
        merged_data.append({**data1, **data2})
    return merged_data

def main():
    with open(r'output.json', 'r') as file1, open(r'Admin\src\utils\studentId.json', 'r') as file2:
        json1 = json.load(file1)
        json2 = json.load(file2)

    merged_data = merge_json(json1, json2)

    with open('merged.json', 'w') as merged_file:
        json.dump(merged_data, merged_file, indent=2)

if __name__ == "__main__":
    main()
