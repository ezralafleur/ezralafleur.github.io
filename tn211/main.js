const map = L.map('map');
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | created by Ezra LaFleur',
  detectRetina: true,
}).addTo(map);

tn_geom = tnshape['geometry']['coordinates'];
tn_poly = L.polyline(tn_geom, {color: '#1565c0'}).addTo(map);
map.fitBounds(tn_poly.getBounds());

L.control.layers.tree(null, overlaysTree, {collapsed: false}).addTo(map);
