app.modules.calculator = (function(self) {
  let
    _result = {},
    _listOrders = [],
    _totalPrice,
    _currentOrderId = 0;

  function _init() {
    let object;

    object = app.config.windows.data.find(function(window) {
      return window.id === app.config.mainMenu.data[0].items[0];
    });
    _updateResult(object);
    _renderTemplate();
  }

  function _findWindow(id) {
    return app.config.windows.data.find(function(window) {
      return window.id === id;
    })
  }

  function _updateResult(object) {
    object.options = [];

    _result = {
      currentSelection: object,
      totalPrice: object.price
    };
    _listOrders[_currentOrderId] = _result;
  }

  function _toggleFeature(feature, isChecked) {
    if (isChecked) {
      _result.currentSelection.options.push(feature);
      _result.totalPrice += feature.price;
    } else {
      _result.totalPrice -= feature.price;
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
        _result.totalPrice += delta;
        _renderTemplate();
      }
    });
  }

  function _updateTotalPrice() {
    _totalPrice = _listOrders.reduce(function(sum, currentItem) {
      return sum + currentItem.totalPrice;
    }, 0);
  }

  function _renderTemplate() {
    const template = require('../templates/total_price.hbs');

    _updateTotalPrice();

    $('.js-total-price').html(template({
      totalPrice: _totalPrice,
      price: _result.totalPrice
    }));
  }

  function _listener() {
    $(document)
      .on('selectWindow:calculator', function(event, windowTypeId) {
        _updateResult(_findWindow(windowTypeId));
        _renderTemplate();

        $(document).trigger('updateOrder:orderCard', [_listOrders, _currentOrderId]);
      })
      .on('toggleFeature:calculator', function(event, feature, isChecked) {
        _toggleFeature(feature, isChecked);
      })
      .on('updateFeaturePrice:calculator', function(event, slug, price) {
        _updatePrice(slug, price);
      })
      .on('changeSpecs:calculator', function(event, window) {
        _updateResult(window);
      })
      .on('addWindow:calculator', function() {
        _listOrders.push(_result);
        _currentOrderId = _listOrders.length - 1;
        $(document).trigger('updateOrder:orderCard', [_listOrders, _currentOrderId]);
      })
      .on('changeOrderWindow:calculator', function(event, id) {
        _currentOrderId = id;
        _result = _listOrders[_currentOrderId];
        _renderTemplate();
        $(document).trigger('changeOrder:calculator', [_result.currentSelection]);
      })
      .on('removeOrderWindow:calculator', function(event, id) {
        _listOrders.splice(id, 1);
        _currentOrderId = 0;
        _result = _listOrders[_currentOrderId];
        _renderTemplate();
        $(document)
          .trigger('changeOrder:calculator', [_result.currentSelection])
          .trigger('updateOrder:orderCard', [_listOrders, _currentOrderId]);
      });
  }

  self.load = function() {
    _init();
    _listener();
  };

  return self;
})(app.modules.calculator || {});