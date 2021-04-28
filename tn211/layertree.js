overlaysTree = {
  label: 'Points of Interest',
  selectAllCheckbox: 'Un/select all',
  children: [
      {
          label: 'Europe',
          selectAllCheckbox: true,
          children: [
              {
                  label: 'France',
                  selectAllCheckbox: true,
                  children: [
                      { label: 'Tour Eiffel', layer: L.marker([48.8582441, 2.2944775]) },
                      { label: 'Notre Dame', layer: L.marker([48.8529540, 2.3498726]) },
                      { label: 'Louvre', layer: L.marker([48.8605847, 2.3376267]) },
                  ]
              }, {
                  label: 'Germany',
                  selectAllCheckbox: true,
                  children: [
                      { label: 'Branderburger Tor', layer: L.marker([52.5162542, 13.3776805])},
                      { label: 'Kölner Dom', layer: L.marker([50.9413240, 6.9581201])},
                  ]
              }, {label: 'Spain',
                  selectAllCheckbox: 'De/seleccionar todo',
                  children: [
                      { label: 'Palacio Real', layer: L.marker([40.4184145, -3.7137051])},
                      { label: 'La Alhambra', layer: L.marker([37.1767829, -3.5892795])},
                  ]
              }
          ]
      }, {
          label: 'Asia',
          selectAllCheckbox: true,
          children: [
              {
                  label: 'Jordan',
                  selectAllCheckbox: true,
                  children: [
                      { label: 'Petra', layer: L.marker([30.3292215, 35.4432464]) },
                      { label: 'Wadi Rum', layer: L.marker([29.6233486, 35.4390656]) }
                  ]
              }, {
              /* ... */
              }
          ]
      }
  ]
}
