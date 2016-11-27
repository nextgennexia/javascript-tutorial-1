import './assets/stylesheets/package.scss';
import './assets/javascripts/package.js';

$(document).ready(() => {
  if (!app.modules) {
    return false;
  }

  for (let module in app.modules) {
    app.modules[module].hasOwnProperty('load') && app.modules[module].load();
  }
});
