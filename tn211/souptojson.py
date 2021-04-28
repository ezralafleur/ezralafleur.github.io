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
object_tree = sub('\'link\'\:.+?\',', '', object_tree)
object_tree = sub('\'url\'\:.+?\',', '', object_tree)
#object_tree = sub('\'description\'\:.+?\',', '', object_tree)

with open('layertree.js', 'w') as f:
    f.write('overlaysTree={label:\'<b>All Resources</b>\', selectAllCheckbox: false, collapsed: false'+object_tree[58:]+";")

# def add_categories(input, output):
#     if 'children' in input.keys(): # is a category
#         categories = [{'label': item['name'], 'selectAllCheckbox': True, 'children':[]} for item in input['children']]
#         output['children']=categories
#         for item in input['children']:
#             add_categories(item['children'], )
#
#         output['children']=output['children']+
#         add_categories(item, output)
#     else: # is a resource
#
# add_categories(d, layer_tree)
