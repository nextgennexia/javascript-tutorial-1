app.modules.init = ((self) => {

  function _getMenuItemsData() {
    _api({url: 'api/menu-items'}).then((response) => app.config.mainMenu = response);
  }

  function _getWindowStillData() {
    _api({url: 'api/window-sills'}).then((response) => app.config.windowSill = response);
  }

  function _getWindowLedgeData() {
    _api({url: 'api/window-ledges'}).then((response) => app.config.windowLedge = response);
  }

  function _getWindowRevealData() {
    _api({url: 'api/window-reveals'}).then((response) => app.config.windowReveal = response);
  }

  function _getWindowsData() {
    _api({url: 'api/windows'}).then((response) => app.config.windows = response);
  }

  function _getServicesData() {
    _api({url: 'api/services'}).then((response) => app.config.services = response);
  }

  function _api(data) {
    return $.ajax({
      url: data.url,
      data: data.data,
      dataType: 'json',
      type: data.type || 'GET',
      beforeSend: data.beforeSend
    });
  }

  function _handlebarsExampleOfUsage() {
    const titleTemplate = require('../templates/title_example.hbs');
    $('.js-title-example').html(titleTemplate({title: 'Javascript tutorial part 1'}));
  }

  function _init() {
    _getMenuItemsData();
    _getWindowStillData();
    _getWindowLedgeData();
    _getWindowRevealData();
    _getWindowsData();
    _getServicesData();

    _handlebarsExampleOfUsage(); // Метод, показываеющий как работать с handlebars-loader
  }

  self.load = () => {
    _init();
  };

  return self;
})(app.modules.init || {});
