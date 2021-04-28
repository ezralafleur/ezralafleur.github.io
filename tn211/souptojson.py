import json
from ast import literal_eval
from re import sub
from json import dumps

resource_file_path = 'resourcedirectory.txt'
resource_file = open(resource_file_path, 'r')
resources = resource_file.read()
#d = literal_eval(resources.replace('\n', ''))

layer_tree = {
    'label': 'TN 211 Resources',
    'selectAllCheckbox': True,
    'children': []
}

object_tree = resources.replace('\'children\'', 'selectAllCheckbox: true, collapsed: true, children')
object_tree = object_tree.replace("'name':", "label:")
object_tree = object_tree.replace("\\n", '')
object_tree = sub('\'link\'\:.+?\', ', '', object_tree)
object_tree = sub('\'url\'\:.+?\', ', '', object_tree)
object_tree = sub('\'description\'\:.+?(\'|\").*?(\'|\"), \'address\'', 'address', object_tree)

with open('layertree.js', 'w') as f:
    f.write('overlaysTree={label:\'<b>All Resources</b>\', selectAllCheckbox: false, collapsed: false'+object_tree[57:]+";")
