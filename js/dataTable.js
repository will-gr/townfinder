$(document).ready(function () {
  var colors = [
    '#9B2226',
    '#AE2012',
    '#BB3E03',
    '#CA6702',
    '#EE9B00',
    '#E9D8A6',
    '#94D2BD',
    '#0A9396',
    '#005F73'
  ]

  $('#dataTable').DataTable({
    ajax: {
      url: '/data/housePrices.geojson',
      dataSrc: 'features'
    },
    columns: [
      {
        data: 'properties.name',
        title: 'Postal District',
        width: '5%'
      },
      {
        data: 'properties.areaName',
        title: 'Area',
        width: '5%'
      },
      {
        data: 'properties.price',
        render: function (data) {
          var minValue = 1000000
          var maxValue = 100000
          var colorIndex = Math.round(
            ((data - minValue) / (maxValue - minValue)) * (colors.length - 1)
          )
          colorIndex = Math.min(colors.length - 1, Math.max(0, colorIndex)) // clamp index to valid range
          var color = colors[colorIndex]
          var formattedPrice =
            '£' +
            parseFloat(data)
              .toFixed(0)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

          return (
            '<div class="heatMapCell" style="background-color: ' +
            color +
            '">' +
            formattedPrice +
            '</div>'
          )
        },
        title: 'Avg. Price',
        width: '5%'
      },
      {
        data: 'properties.IMD',
        render: function (data) {
          var minValue = 1
          var maxValue = 10
          var colorIndex = Math.round(
            ((data - minValue) / (maxValue - minValue)) * (colors.length - 1)
          )
          colorIndex = Math.min(colors.length - 1, Math.max(0, colorIndex)) // clamp index to valid range
          var color = colors[colorIndex]

          return (
            '<div class="heatMapCell" style="background-color: ' +
            color +
            '">' +
            data.toFixed(1) +
            '</div>'
          )
        },
        title: '<div class="rotateHeader">IMD</div>',
        width: '5%'
      },
      {
        data: 'properties.IMDCrime',
        render: function (data) {
          var minValue = 1
          var maxValue = 10
          var colorIndex = Math.round(
            ((data - minValue) / (maxValue - minValue)) * (colors.length - 1)
          )
          colorIndex = Math.min(colors.length - 1, Math.max(0, colorIndex)) // clamp index to valid range
          var color = colors[colorIndex]

          return (
            '<div class="heatMapCell" style="background-color: ' +
            color +
            '">' +
            data.toFixed(1) +
            '</div>'
          )
        },
        title: '<div class="rotateHeader">IMD Crime</div>',
        width: '5%'
      },
      {
        data: 'properties.RUScore',
        render: function (data) {
          var minValue = 1
          var maxValue = 8
          var colorIndex = Math.round(
            ((data - minValue) / (maxValue - minValue)) * (colors.length - 1)
          )
          colorIndex = Math.min(colors.length - 1, Math.max(0, colorIndex)) // clamp index to valid range
          var color = colors[colorIndex]

          return (
            '<div class="heatMapCell" style="background-color: ' +
            color +
            '">' +
            data.toFixed(1) +
            '</div>'
          )
        },
        title: '<div class="rotateHeader">Rural / Urban</div>',
        width: '5%'
      },
      {
        data: 'properties.percentAdult',
        render: function (data) {
          var minValue = 0
          var maxValue = 1
          var colorIndex = Math.round(
            ((data - minValue) / (maxValue - minValue)) * (colors.length - 1)
          )
          colorIndex = Math.min(colors.length - 1, Math.max(0, colorIndex)) // clamp index to valid range
          var color = colors[colorIndex]

          return (
            '<div class="heatMapCell" style="background-color: ' +
            color +
            '">' +
            Math.round(data * 100) +
            '</div>'
          )
        },
        title: '<div class="rotateHeader">% Adult</div>',
        width: '5%'
      },
      {
        data: 'properties.percentChild',
        render: function (data) {
          var minValue = 0
          var maxValue = 1
          var colorIndex = Math.round(
            ((data - minValue) / (maxValue - minValue)) * (colors.length - 1)
          )
          colorIndex = Math.min(colors.length - 1, Math.max(0, colorIndex)) // clamp index to valid range
          var color = colors[colorIndex]

          return (
            '<div class="heatMapCell" style="background-color: ' +
            color +
            '">' +
            Math.round(data * 100) +
            '</div>'
          )
        },
        title: '<div class="rotateHeader">% Children</div>',
        width: '5%'
      },
      {
        data: 'properties.percentOAP',
        render: function (data) {
          var minValue = 0
          var maxValue = 1
          var colorIndex = Math.round(
            ((data - minValue) / (maxValue - minValue)) * (colors.length - 1)
          )
          colorIndex = Math.min(colors.length - 1, Math.max(0, colorIndex)) // clamp index to valid range
          var color = colors[colorIndex]

          return (
            '<div class="heatMapCell" style="background-color: ' +
            color +
            '">' +
            Math.round(data * 100) +
            '</div>'
          )
        },
        title: '<div class="rotateHeader">% OAP</div>',
        width: '5%'
      },
      {
        data: null,
        title: 'Score',
        render: function (data) {
          var imd = data.properties.IMD
          var ruscore = data.properties.RUScore
          var score = imd * ruscore
          return score.toFixed(1) // format to 2 decimal places
        }
      }
    ],
    lengthChange: false,
    //RE-ENABLE THE SEARCH LATER
    searching: false,
    info: false,
    pageLength: 20,
    autoWidth: false
  })

  $('#dataTable')
    .DataTable()
    .on('init', function () {
      for (var i = 2; i <= 8; i++) {
        let cells = $('#dataTable').DataTable().column(i).nodes()
        $(cells).not(':first-child').addClass('hide-text')
      }
    })

  $('#dataTable tbody').on('mouseover', 'tr', function () {
    var data = $('#dataTable').DataTable().row(this).data()
    var dataID = data.properties.name

    if (map.getFeatureState({ source: 'postDistricts', id: dataID }).hover) {
      map.setFeatureState(
        { source: 'postDistricts', id: dataID },
        { hover: false }
      )
    } else {
      map.setFeatureState(
        { source: 'postDistricts', id: dataID },
        { hover: true }
      )
    }
    //add a popup or tooltip
  })
})
