mapboxgl.accessToken =
  'pk.eyJ1Ijoid2lsbHgxIiwiYSI6ImNsZXJvaXZvODB5YW4zcW83dGU3bTRjaWsifQ.AgjzR_b-B6_OdNbDl8purw'
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/willx1/clerq4bdf00bm01pcbv72d0l9',
  center: [-1.46, 53],
  // SET ZOOM TO ADJUST TO SCREEN RESOLUTION
  zoom: 6,
  minZoom: 4,
  maxZoom: 10,
  attributionControl: false
})

map.addControl(new mapboxgl.FullscreenControl())
map.addControl(new mapboxgl.NavigationControl())
map.dragRotate.disable()
map.touchZoomRotate.disableRotation()
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    }
  })
)
map.addControl(
  new mapboxgl.AttributionControl({
    compact: true
  })
)

map.on('load', function () {
  map.addLayer({
    id: 'postDistricts',
    type: 'fill',
    source: {
      type: 'geojson',
      data: '/data/housePrices.geojson',
      promoteId: 'name'
    },
    layout: {},
    paint: {
      'fill-opacity': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        1,
        0.8
      ],
      'fill-outline-color': '#606C38',
      'fill-color': [
        'interpolate',
        ['linear'],
        ['get', 'price'],
        0,
        '#005F73',
        200000,
        '#0A9396',
        300000,
        '#94D2BD',
        400000,
        '#E9D8A6',
        500000,
        '#EE9B00',
        600000,
        '#CA6702',
        700000,
        '#BB3E03',
        800000,
        '#AE2012',
        900000,
        '#9B2226'
      ]
    }
  })
})
