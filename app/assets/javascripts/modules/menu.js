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

  function _setActiveMenu($element) {
    $element.addClass('active').siblings().removeClass('active');
  }

  function _listener() {
    $(document)
      .on('click', '.js-menu-item', function() {
        let
          $this = $(this),
          $submenu = $('.js-menu-subitems[data-id="' + $this.data('id') + '"]'),
          windowId = $submenu.find('.js-menu-subitem.active').data('id');

        _setActiveMenu($this);
        _setActiveMenu($submenu);

        $(document)
          .trigger('changeWindowType:calculator', [$this.data('id')])
          .trigger('selectWindow:calculator', [windowId]);
      })
      .on('click', '.js-menu-subitem', function() {
        let $this = $(this);

        _setActiveMenu($this);

        $(document)
          .trigger('changeWindowType:calculator', [$this.closest('.js-menu-subitems').data('id')])
          .trigger('selectWindow:calculator', [$this.data('id')]);

      })
      .on('changeOrder:calculator', function(event, window) {
        let typeWindow = app.config.mainMenu.data.find(function(topMenu) {
          return topMenu.items.includes(window.id);
        });

        _setActiveMenu($('.js-menu-item[data-id="' + typeWindow.id + '"]'));
        _setActiveMenu($('.js-menu-subitems[data-id="' + typeWindow.id + '"]'));

        $(document).trigger('changeWindowType:calculator', [typeWindow.id]);
      });
  }

  self.load = function() {
    _init();
    _listener();
  };

  return self;
})(app.modules.menu || {});