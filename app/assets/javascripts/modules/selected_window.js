app.modules.selectedWindow = (function(self) {
  let _currentWindow;

  function _init() {
    _setCurrentWindow(app.config.mainMenu.data[0].items[0]);
    _renderTemplate();
  }

  function _setCurrentWindow(id) {
    _currentWindow = app.config.windows.data.find(function(window) {
      return window.id === id;
    });
  }

  function _renderTemplate() {
    const template = require('../templates/selected_window.hbs');

    $('.js-selected-window').html(template({data: _currentWindow}));
  }

  function _showError(message, $block) {
    $block.html(message).removeClass('closed');
  }

  function _listener() {
    $(document)
      .on('selectWindow:calculator', function(event, windowId) {
        _setCurrentWindow(windowId);
        _renderTemplate();
      })
      .on('change', '.js-size-window', function() {
        let
          $this = $(this),
          value = $this.val(),
          sizes = _currentWindow.sizes[$this.data('name')],
          $blockError = $this.siblings('.js-size-block-error');

        if ($.isNumeric(value)) {
          value = parseInt(value);
        } else {
          _showError('Введено неверное значение', $blockError);
          return;
        }

        if (value < sizes.min || value > sizes.max) {
          _showError('Введенный размер не соответствует допустимым', $blockError);
        } else {
          $blockError.addClass('closed');
          sizes.current = value;
          $(document).trigger('changeSpecs:calculator', [_currentWindow]);
        }
      })
      .on('changeOrder:calculator', function(event, window) {
        _currentWindow = window;
        _renderTemplate();
      });
  }

  self.load = function() {
    _init();
    _listener();
  };

  return self;
})(app.modules.selectedWindow || {});