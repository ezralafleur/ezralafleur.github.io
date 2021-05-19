from csv import DictReader, DictWriter
from json import dumps
from sys import argv, exit
from re import split as resplit

if len(argv)>1:
    filename = argv[1]
    if filename.lower()[-4:] != '.csv':
        print('Input file must be .csv')
        exit()
else:
    print('Please provide CSV filename as argument')
    exit()

# Read from CSV file
with open(filename, 'r', encoding='utf-8') as f:
    resources = []
    for row in DictReader(f):
        row['Coords'] = resplit(',\s*', row['Coords'])
        row['Categories'] = resplit(',\s*', row['Categories'])
        resources.append(row)

# Write to JSON file
with open(filename[:-4]+'.json', 'w', encoding='utf-8') as f:
    content = 'NPZResources=' + dumps(resources, indent=4, ensure_ascii=False)
    f.write(content)
