app.modules.calculator = (function(self) {
  let _result;

  function _init() {
    let object;

    object = app.config.windows.data.find(function(window) {
      return window.id === app.config.mainMenu.data[0].items[0];
    });
    _updateResult(object);
    _renderTemplate();
  }

  function _updateResult(object) {
    object.options = [];
    _result = {
      currentSelection: object,
      totalPrice: object.price
    };
  }

  function _toggleFeature(feature, isChecked) {
    if (isChecked) {
      _result.currentSelection.options.push(feature);
      _result.totalPrice = _result.totalPrice + feature.price;
    } else {
      _result.totalPrice = _result.totalPrice - feature.price;
      _result.currentSelection.options.forEach(function(item, index) {
        if (item.slug === feature.slug) {
          _result.currentSelection.options.splice(index, 1);
        }
      });
    }
    _renderTemplate();
  }

  function _updatePrice(slug, price) {
    _result.currentSelection.options.forEach(function(option) {
      let delta;

      if (option.slug === slug) {
        delta = price - option.price;
        option.price = price;
        _result.totalPrice = _result.totalPrice + delta;
        _renderTemplate();
      }
    });
  }

  function _renderTemplate() {
    const template = require('../templates/total_price.hbs');

    $('.js-total-price').html(template({totalPrice: _result.totalPrice}));
  }

  function _listener() {
    $(document)
      .on('changeWindowType:calculator', function(event, id) {
        let object;

        object = app.config.windows.data.find(function(window) {
          return window.id === app.config.mainMenu.data[id].items[0];
        });
        _updateResult(object);
        _renderTemplate();
      })
      .on('toggleFeature:calculator', function(event, feature, isChecked) {
        _toggleFeature(feature, isChecked);
      })
      .on('updateFeaturePrice:calculator', function(event, slug, price) {
        _updatePrice(slug, price);
      })
      .on('changeSpecs:calculator', function(event, window) {
        _updateResult(window);
      });
  }

  self.load = function() {
    _init();
    _listener();
  };

  return self;
})(app.modules.calculator || {});