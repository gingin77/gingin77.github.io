import { getDataForD3 } from "./get-data-for-d3.js";

const filePath = "assets/static-data/saved_repo_data_06022018.json";

export async function drawScatterPlot() {
  evaluateIfSVG()
  // getViewPortDimensions()

  function evaluateIfSVG() {
    let existingSVG = document.getElementById('for_svg')

    if (existingSVG.hasChildNodes()) {
      existingSVG.innerHTML = ''
    }
  }

  try {
    let newRepoData = await getDataForD3();

    d3.json(filePath).then(staticData => {
      let dataToPlot = []
      evalDataSetForD3(staticData, newRepoData)

      function evalDataSetForD3(data, newRepoData) {
        if (newRepoData) {
          dataToPlot = newRepoData;
          console.log('dataToPlot = updated data from GitHub API')
        } else {
          dataToPlot = data
          console.log('dataToPlot = static data')
        }
      }

      let sortbyDate = d3.nest()
        .key(function (d) { return d.pushed_at })
        .sortKeys(d3.ascending)
        .entries(dataToPlot)

      let minDate = new Date(sortbyDate[0].key),
        maxDate = new Date(sortbyDate[sortbyDate.length - 1].key),
        xMin = new Date(minDate).addWeeks(-1),
        xMax = new Date(maxDate).addWeeks(1)

      function stringToDate(d) {
        return new Date(d)
      }

      let margin = {
        top: 10,
        right: 56,
        bottom: 40,
        left: 8
      },
        width = 600 - margin.left,
        height = 340 - margin.top - margin.bottom

      let xScale = d3.scaleTime().domain([xMin, xMax]).range([margin.right, width - margin.left]),
        xValue = function (d) { return xScale(stringToDate(d.pushed_at)) },
        xAxis = d3.axisBottom(xScale).ticks(d3.timeWeek.every(4)).tickFormat(d3.timeFormat('%b %e'))

      let yScale = d3.scaleLinear().domain([0, 150000]).range([height - 2, 0]),
        yValue = function (d) { return yScale(d.count) },
        yAxis = d3.axisLeft(yScale).tickFormat(d3.format('0.2s'))

      let svg = d3.select('#for_svg')
        .append('svg')
        .attr('width', width + margin.left)
        .attr('height', height + margin.top + margin.bottom)

      let g = svg.selectAll('g')

      svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
        .append('text')
        .attr('class', 'label')
        .attr('x', (width / 2) + 20)
        .attr('y', 40)
        .text('Date of Most Recent Commit')

      svg.append('g')
        .attr('transform', 'translate(' + margin.right + ', 0)')
        .call(yAxis)
        .append('text')
        .attr('class', 'label')
        .attr('transform', 'rotate(-90)')
        .attr('y', (-1 * margin.right + 6))
        .attr('x', 0 - (height / 2))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text('Number of Bytes Stored')

      let blue = '#457DB7',
        rubyred = '#991B67',
        purple = '#A99CCD',
        peach = '#E6AC93',
        grey = '#8F8F90',
        colorValue = function (d) { return d.language },
        colorScale = d3.scaleOrdinal()
          .domain(['JavaScript', 'Ruby', 'CSS', 'HTML', 'CoffeeScript', 'Shell', 'Null'])
          .range([blue, rubyred, purple, peach, grey, grey, grey])

      let tooltip = d3.select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0)

      svg.selectAll('dot')
        .data(dataToPlot)
        .enter()
        .append('circle')
        .attr('r', 4.5)
        .attr('cx', xValue)
        .attr('cy', yValue)
        .style('fill', function (d) { return colorScale(colorValue(d)) })
        .on('mouseover', function (d) {
          tooltip.transition()
            .duration(200)
            .style('opacity', 1)
          tooltip.html(d.language + '<br/>' + d.repo_name)
            .style('left', (d3.event.pageX + 4) + 'px')
            .style('top', (d3.event.pageY - 12) + 'px')
        })
        .on('mouseout', function (d) {
          tooltip.transition()
            .duration(200)
            .style('opacity', 0)
        })

      let lcolor = d3.scaleOrdinal()
        .domain(['JS', 'Ruby', 'CSS', 'HTML', 'Misc'])
        .range([blue, rubyred, purple, peach, grey])

      let legend = svg.selectAll('.legend')
        .data(lcolor.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function (d, i) {
          return 'translate(4,' + i * 18 + ')'
        })

      legend.append('rect')
        .attr('x', margin.right + 4)
        .attr('width', 14)
        .attr('height', 14)
        .style('fill', lcolor)

      legend.append('text')
        .attr('class', 'legend_label')
        .attr('x', margin.right + 22)
        .attr('y', 7)
        .attr('dy', '.35em')
        .style('text-anchor', 'start')
        .text(function (d) { return d })
    })
    .catch(err => console.log("Error", err.message));
  }
  catch (ex) {
    console.log(`I'm the error message for drawScatterPlot: ${ex.message}`);
  }
}