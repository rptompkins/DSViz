var dataDSV = ['DS2014.csv', 'DS2015.csv'];

// function draw(data){
d3.csv('DS2015.csv', function(data){
var width = 1000, barHeight = 40;

var max = d3.max(data, (d) => +d.PFPG);

var xScale = d3.scale.linear()
					.domain([0, max])
					.range([0, 400]);

var canvas = d3.select('body')
				.append('svg')
				.attr('width', width)
				.attr('height', barHeight * data.length);

var g = canvas.selectAll('g')
				.data(data)
				.enter()
				.append('g')
				.attr('transform', (d, i) => 'translate(0,' + i * barHeight + ')');

	g.append('rect')
		.attr('width', (d,i) => xScale(d.PFPG))
		.attr('height', barHeight - 3)
		.attr('fill', function(d,i) { if (i % 2 === 0) { var color = '#000000';}
										else {color = '#282828';}
										return color;});

	g.append('text')
		.attr('x', (d) => xScale(d.PFPG) - 30)
		.attr('y', barHeight/2)
		.text( (d) => d.PFPG);

	g.append('text')
		.attr('x', 5)
		.attr('y', barHeight/2)
		.text( (d) => d.Manager);



var dropdown = d3.select("#options")
  .on("change", change)

function change() {

  	var val = dropdown.node().value;

  	var max = d3.max(data, (d) => +d[val]);
  	var min = d3.min(data, (d) => +d[val]);
  	var diff = max/min;
  	console.log(max);
  	console.log(min);
  	console.log(diff);
	var xScale = d3.scale.linear()
						.domain([0, max])
						.range([0, 400]);

  	g.selectAll('rect').transition()
	  	.attr('width', (d) => xScale(d[val]))
	  	.attr('height', barHeight - 3);

	g.selectAll('text')
		.attr('x', (d) => xScale(d[val]) - 30)
		.attr('y', barHeight/2)
		.text( (d) => d[val])
	g.append('text')
		.attr('x', 5)
		.attr('y', barHeight/2)
		.text( (d) => d.Manager);


	}

});

// d3.csv('DS2015.csv', draw);