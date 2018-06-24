var navContent = new Vue({
  el: "#nav",
  data: function() {
    return { navContent: `
      <div id='side_bar'>
        <div class="close_button removeOnMobile" onclick="menuClose()">
          <i class="fa fa-times" aria-hidden="true"></i>
        </div>
        <ul>
          <li class="removeOnMobile">
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#portfolio">Portfolio</a>
          </li>
          <li>
            <a href="#connect">Connect </a><a class="removeOnMobile" href="mailto:ginniehench@gmail.com"><i class="fa fa-envelope removeOnMobile" aria-hidden="true"></i></a>
          </li>
          <dl>
            <dt>Resume</dt>
              <dd class="removeOnMobile">
                <a href='resume.html'>View <i class="fa fa-external-link" aria-hidden="true"></i></a>
              </dd>
              <dd class="removeOnMobile">
                <a href="public/G.Hench_Resume.pdf" download>Download <i class="fa fa-file-pdf-o" aria-hidden="true"></i></a>
              </dd>
            </dt>
          </dl>
        </ul>
        <div class="logo removeOnMobile">
          <img id="logo" src="assets/favicons/android-chrome-192x192.png" />
        </div>
      </div>
      ` };
  }
});
