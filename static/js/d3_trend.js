// Chart Params
var svgWidth = 700;
var svgHeight = 500;

var margin = { top: 20, right: 60, bottom: 60, left: 100 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import data from an external CSV file
// d3.csv("../db/usa_rates.csv", function(dataCancer, error) {
//   if (error) throw error;

var url = '/trend';

d3.json(url, { crossOrigin: "anonymous" }).then(function(dataCancer) {
  console.log(dataCancer);

  // Create a function to parse date and time
  var parseTime = d3.timeParse("%Y");

  // Format the data
  dataCancer.forEach(function(data) {
    data.year = parseTime(data.year);
    data.incidents = +data.incidents;
    data.deaths = +data.deaths;
  });

  // Create scaling functions, scaleTime for lines
  var xTimeScale = d3
    .scaleTime()
    .domain(d3.extent(dataCancer, d => d.year))
    .range([0, width]);

    // domain.(changes y linear start for the numbers)
  var yLinearScale1 = d3
    .scaleLinear()
    .domain([1600000, d3.max(dataCancer, d => d.incidents)]) 
    .range([height, 0]);

  var yLinearScale2 = d3
    .scaleLinear()
    .domain([26000, d3.max(dataCancer, d => d.deaths)])
    .range([height, 0]);

  // Create axis functions
  var bottomAxis = d3.axisBottom(xTimeScale)
    .tickFormat(d3.timeFormat("%Y"));
  var leftAxis = d3.axisLeft(yLinearScale1);
  var rightAxis = d3.axisRight(yLinearScale2);

  // Add x-axis
  chartGroup
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // Add y1-axis to the left side of the display
  chartGroup
    .append("g")
    // Define the color of the axis text
    .classed("green", true)
    .call(leftAxis);

  // Add y2-axis to the right side of the display
  chartGroup
    .append("g")
    // Define the color of the axis text
    .classed("blue", true)
    .attr("transform", `translate(${width}, 0)`)
    .call(rightAxis);

  // Line generators for each line
  var line1 = d3
    .line()
    .x(d => xTimeScale(d.year))
    .y(d => yLinearScale1(d.incidents))
    .curve(d3.curveCatmullRom);

  var line2 = d3
    .line()
    .x(d => xTimeScale(d.year))
    .y(d => yLinearScale2(d.deaths))
    .curve(d3.curveCatmullRom);

  // Append a path for line1
  chartGroup
    .append("path")
    .data([dataCancer])
    .attr("d", line1)
    .classed("line green", true);

  // Append a path for line2
  chartGroup
    .append("path")
    .data([dataCancer])
    .attr("d", line2)
    .classed("line blue", true);

  // Append axes titles
  chartGroup
    .append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
    .classed("incidents-text text", true)
    .text("Incidents of Breast Cancer in USA");

  chartGroup
    .append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 40})`)
    .classed("deaths-text text", true)
    .text("Deaths Rate due to Breast Cancer in USA");
});
