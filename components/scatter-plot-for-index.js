let scatterPlotContent = new Vue({
  el: "#scatter-plot",
  data: function () {
    if (window.innerWidth < 500) {
      return {
        scatterPlotContent: `
          <div class="topic p_600_max">
            <a href="scatter-plot.html">Click here to view a programming languages scatter plot built using D3.js with data pulled from the GitHub API</a>
          </div>
        ` 
      }
    } else {
      return {
        scatterPlotContent: `       
          <span class="anchor" id="skills_graph"></span>
          <div class="topic p_600_max">
            <p class="skills_graph_title">Programming Languages for GitHub Repos Plotted by Most Recent Commit Date</p>
            <div class="div_svg_caption">
              <p class="bold_header">Hover over each data point for language and project repository names.</p>
            </div>
            <div id="for_svg"></div>
            <p class="caption c_above">The scatter plot above uses data pulled from GitHub's REST API and was constructed using the D3.js library (D3 = Data-Driven Documents).<a href="https://github.com/gingin77/gh_rest_api_fetch"> The code is available on GitHub. <i class="fa fa-github" aria-hidden="true"></i></a>
            </p>
            <p>
              I've written a blog post series discussing how I went about designing and building the scatter plot above. The series starts off with the following intro post: <a href="https://ginnielearnstocode.wordpress.com/2017/12/03/building-a-scatter-plot-with-d3-js-using-programming-language-data-from-githubs-rest-api/">Building a scatter plot with d3.js using data from GitHub’s REST API</a>
            </p>
          </div>
        `
      }
    }
  }
})