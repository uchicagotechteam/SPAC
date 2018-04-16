// keep a reference of the canvas
var svg = d3.select('svg')

// the canvas size
var width = 150
var height = 150

// this is the parameter part useful for exploration
// you can play with these numbers
var numCol = 40
var numRow = 40
var pad = 2


// here some pre-backed calculations useful for the next part
var tot = numCol*numRow
var _w = width/numCol
var _h = height/numRow

// this portion creates the columns
var cols = svg.selectAll('g')
.data(d3.range(numCol))
.enter()
.append('g')
.attr('transform', function(d, i){
  return 'translate(' + i*_w + ','+(pad/2)*1+')'
})

// and here the rows, for each column
var all = cols.selectAll('g')
.data(d3.range(numRow))
.enter()
.append('g')
.attr('transform', function(d, i){
  return 'translate('+(pad/2)*1+',' + i*_h + ')'
})

// then, for each cell we appends a rect
all.append('circle')
  //.attr('cx', _w/2)
  //.attr('cy', _w/2)
  .attr('r', function(d, i){
  return 1
})
