app.modules.menu = (function(self) {
  function _init() {
    const template = require('../templates/main_menu.hbs');

    _serializeData();
    $('.js-main-menu').html(template(app.config.mainMenu));
  }

  function _serializeData() {
    app.config.mainMenu.data.forEach(function(menuItem) {
      menuItem.serializedItems = [];
      menuItem.items.forEach(function(id) {
        menuItem.serializedItems.push(app.config.windows.data.find(function(window) {
          return window.id === id;
        }));
      });
    });
  }

  function _setActiveMenu($items, currentId) {
    $items.map(function(key, value) {
      let $currentItem = $(value);

      $currentItem.toggleClass('active', $currentItem.data('id') === currentId);
    });
  }

  function _listener() {
    $(document)
      .on('click', '.js-menu-item', function() {
        let id = $(this).data('id');

        _setActiveMenu($('.js-menu-item, .js-menu-subitems'), id);
        $(document)
          .trigger('changeWindowType:calculator', [id])
          //при смене типа окна рендерим активное окно, которое могло быть выбрано пользователем ранее
          .trigger('selectWindow:selectedWindow', [$('.js-menu-subitems.active .js-menu-subitem.active').data('id')]);
      })
      .on('click', '.js-menu-subitem', function() {
        let id = $(this).data('id');

        _setActiveMenu($('.js-menu-subitems.active .js-menu-subitem'), id);
        $(document).trigger('selectWindow:selectedWindow', [id]);
      });
  }

  self.load = function() {
    _init();
    _listener();
  };

  return self;
})(app.modules.menu || {});