let footerContent = new Vue({
  el: "#footer",
  data: function () {
    return {
      footerContent: `
        <div class="connect_icons_outer" id="footer_icons">
          <div class="connect_icons">
            <a href="mailto:ginniehench@gmail.com"><i class="fa fa-envelope" aria-hidden="true"></i></a>
            <a href="https://www.linkedin.com/in/ginnie-hench-280353b"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
            <a href="https://github.com/gingin77"><i class="fa fa-github" aria-hidden="true"></i></a>
            <a href="https://stackoverflow.com/users/8481019/ginnie-hench?tab=profile"><i class="fa fa-stack-overflow" aria-hidden="true"></i></a>
            <a href="https://ginnielearnstocode.wordpress.com/"><i class="fa fa-wordpress" aria-hidden="true"></i></a>
            <a href="https://twitter.com/engineniches"><i class="fa fa-twitter" aria-hidden="true"></i></a>
          </div>
        </div>
        `
    }
  }
});