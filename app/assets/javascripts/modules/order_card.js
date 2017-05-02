app.modules.orderCard = (function(self) {
  var _listOrders = [];

  function _renderTemplateOrderCard() {
    const template = require('../templates/order_card.hbs');

    $('.js-order-card-menu').html(template({data: _listOrders}));
  }

  function _setActiveMenu(currentId) {
    $('.js-order-card-menu-item[data-id = "' + currentId + '"]').addClass('active').siblings().removeClass('active');
  }

  function _listener() {
    $(document)
      .on('click', '.js-add-window', function() {
        $(document).trigger('addWindow:calculator');
      })
      .on('click', '.js-order-card-menu-item', function() {
        var menuId = $(this).data('id');

        _renderTemplateOrderCard();
        _setActiveMenu(menuId);

        $(document).trigger('changeOrderWindow:calculator', [menuId]);
      })
      .on('click', '.js-remove-order', function() {
        $(document).trigger('removeOrderWindow:calculator', [$(this).closest('.js-order-card-menu-item').data('id')]);
        return false;
      })
      .on('updateOrder:orderCard', function(event, listOrders, currentId) {
        _listOrders = $.extend(true, [], listOrders);
        _renderTemplateOrderCard();
        _setActiveMenu(currentId);
      });
  }

  self.load = function() {
    _listener();
  };

  return self;
})(app.modules.orderCard || {});