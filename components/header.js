var headerContent = new Vue({
  el: "#header",
  data: function () {
    return {
      headerContent: `
        <div id="hamburger" onclick="menuOpen()">
          <span class='hamburger removeOnMobile'></span>
          <span class='hamburger removeOnMobile'></span>
          <span class='hamburger removeOnMobile'></span>
        </div>
        <div class="title_div_right">
          <h1>Ginnie Hench</h1>
          <h2>Web Developer</h2>
          <a href="mailto:ginniehench@gmail.com">ginniehench@gmail.com</a>
        </div>
      `
    }
  }
});