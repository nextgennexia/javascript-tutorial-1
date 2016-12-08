app.modules.menu = (function(self) {
  function _init() {
    console.log(app.config.mainMenu);
  }

  self.load = function() {
    _init();
  };

  return self;
})(app.modules.menu || {});

