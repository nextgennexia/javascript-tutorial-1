app.modules.init = ((self) => {

  function _getWindowStillData() {
    $.get('/db/window-still').then((response) => {
      app.config.windowSill = response;
    });
  }

  function _init() {
    _getWindowStillData();
  }

  self.load = () => {
    _init();
  };

  return self;
})(app.modules.init || {});
