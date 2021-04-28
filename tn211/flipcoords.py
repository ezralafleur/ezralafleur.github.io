from ast import literal_eval

f = open('tnshape.geojson', 'r')
shape = f.read()
f.close()
d = literal_eval(shape[8:])

for coord in d['geometry']['coordinates'][0][0]:
    coord[0], coord[1] = coord[1], coord[0]

f = open('tnshape.geojson', 'w')
shape = f.write('tnshape='+str(d))
f.close()
