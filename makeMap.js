subzoneCaptains=[ // Used to mark popups on subzone areas
"<a href='https://marthaobryan.org/' target='_blank'>Martha O’Bryan Center</a>",
"<a href='https://www.edgehillneighborhoodpartnership.org/' target='_blank'>Edgehill Neighborhood Partnership</a>",
"<a href='https://www.woodbinecommunity.org/' target='_blank'>Woodbine Community Organization</a>",
"<a href='https://www.conexionamericas.org/' target='_blank'>Conexión Américas</a>",
"<a href='https://ulmt.org/' target='_blank'>Urban League of Middle Tennessee</a>",
"<a href='https://www.stlch.org/' target='_blank'>St. Luke’s Community House</a>"
];

subzoneColors=["#04363B",
"#0C5221",
"#626C16",
"#E2B414",
"#E47758",
"#3975FE"
];

npz=[ // list of census tracts in NPZ sorted by subzone
["019300",
"012600",
"011800",
"011900",
"019200"],

["016400",
"016300",
"016200",
"016100"],

["016000",
"014800",
"015900",
"015802",
"015803",
"015804",
"019600"],

["017200",
"017300",
"017401",
"017402",
"017500",
"980200",
"018901",
"019006",
"019005"],

["013500",
"013601",
"013602",
"013700",
"013800",
"013900",
"014200",
"014300",
"014400",
"019400",
"012702",
"012701"],

["018101",
"013202",
"013300"]
];

var map = L.map('map').setView([36.157, -86.786], 12);

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | created by Ezra LaFleur',
    detectRetina: true
}).addTo(map);

// Draw the subzones via census tracts

for (i in NPZCensusTracts['features'])
{
  var c;
  tract=NPZCensusTracts['features'][i];
  tractName=tract['properties']['NAME'];
  for (j=0;j<npz.length;j++)
  {
    if (npz[j].includes(tract['properties']['TRACTCE']))
    {
      c=subzoneColors[j];
      var sub=j+1;
      var cap=subzoneCaptains[j];
    }
  }
  L.polygon(tract['geometry']['coordinates'][0][0],
  {
  stroke:false,
  weight:1,
  color:c,
  fillOpacity:0.4
}).addTo(map).bindPopup("Subzone "+sub+"<br>Captain: "+cap);
}

// Add the markers for organizations

categories = {
  "Education": [],
  "Employment": [],
  "Food": [],
  "Housing": [],
  "Legal": [],
  "Medical": [],
  "Transportation": []
};

for (i=0;i<NPZResources.length;i++)
{
  // Create the content of the popup for the marker
  if (NPZResources[i]['link'] != '')
  {
    content="<a target='_blank' href='"+NPZResources[i]['link']+"'>"+NPZResources[i]["name"]+"</a>";
  }
  else
  {
    content="<b>"+NPZResources[i]["name"]+"</b>";
  }

  if (NPZResources[i]['phone'].length>0)
  {
    content+="</br><a style='font-weight:normal;' href='tel:"+NPZResources[i]['phone'].match(/\d/g).join('')+"'>"+NPZResources[i]['phone']+"</a>";
  }

  if (NPZResources[i]['email'].length>0)
  {
    content+="</br><a style='font-weight:normal;' href='mailto:"+NPZResources[i]['email']+"'>"+NPZResources[i]['email']+"</a>";
  }

  if (NPZResources[i]['address'].length>0)
  {
    content+="</br>"+NPZResources[i]['address'];
  }

  if (NPZResources[i]['description'].length>0)
  {
    content+="</br><small>"+NPZResources[i]['description']+"</small>";
  }

  if (NPZResources[i]['coords']!='')
  {
    for (c in categories)
    {
      if (NPZResources[i]['categories'].includes(c))
      {
        categories[c].push(L.marker(NPZResources[i]['coords']).bindPopup(content));
      }
    }
  }
}

overlay={};

for (c in categories)
{
  overlay[c]=L.layerGroup(categories[c]);
}

L.control.layers(null, overlay, {collapsed: false}).addTo(map);

displayedCategories=[];

function addLocations(e)
{
  displayedCategories.push(e.name);
  refreshLocations(e);
}

function removeLocations(e)
{
  displayedCategories.splice(displayedCategories.indexOf(e.name), 1);
  refreshLocations();
}

function refreshLocations(e)
{
  ldiv=document.getElementById("list");
  var lcontent="";
  if (displayedCategories=='')
  {
    lcontent="<div class='resourceBox'><small>Select categories on the map to see a list of relevant resources.</small></div>";
  }
  else
  {
    for (i=0;i<NPZResources.length;i++)
    {
      if (displayedCategories.some(r=>NPZResources[i]['categories'].includes(r)))
      {
        lcontent+="<div class='resourceContent'>";
        if (NPZResources[i]['link'] != '')
        {
          lcontent+="<a target='_blank' href='"+NPZResources[i]['link']+"'>"+NPZResources[i]["name"]+"</a>";
        }
        else
        {
          lcontent+="<div class='resourceBox'><b>"+NPZResources[i]["name"]+"</b>";
        }

        if (NPZResources[i]['phone'].length>0)
        {
          lcontent+="</br><a style='font-weight:normal;' href='tel:"+NPZResources[i]['phone'].match(/\d/g).join('')+"'>"+NPZResources[i]['phone']+"</a>";
        }

        if (NPZResources[i]['email'].length>0)
        {
          lcontent+="</br><a style='font-weight:normal;' href='mailto:"+NPZResources[i]['email']+"'>"+NPZResources[i]['email']+"</a>";
        }

        if (NPZResources[i]['address'].length>0)
        {
          lcontent+="</br>"+NPZResources[i]['address'];
        }

        if (NPZResources[i]['description'].length>0)
        {
          lcontent+="</br><small>"+NPZResources[i]['description']+"</small>";
        }
        lcontent+="</div><hr>";
      }
    }
    lcontent=lcontent.slice(0, lcontent.length-4); // Remove last <hr> tag
  }
  ldiv.innerHTML=lcontent;
}

// Add and remove resources from sidebar when layers are selected on map

map.on('overlayadd', addLocations);
map.on('overlayremove', removeLocations);

// Prepopulate the resource list
document.getElementById("resources").onLoad=refreshLocations();
