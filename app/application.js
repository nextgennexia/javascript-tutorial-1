import './assets/stylesheets/package.scss';
import './assets/javascripts/package.js';

$(document).ready(() => {
  app.modules.init.resolve();

  for (let module in app.modules) {
    app.modules[module].hasOwnProperty('load') && app.modules[module].load();
  }
});
