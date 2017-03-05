app.modules.featuresAndServices = (function(self) {
  let
    _filteredFeatures,
    _filteredServices,
    _normalizedArray;

  function _init() {
    _filterFeatures(app.config.mainMenu.data[0].id);
    _filterServices(app.config.mainMenu.data[0].id);
    _normalizeData();
    _renderTemplates();
  }

  function _getOptionsFor(optionsKey, menuId) {
    let filteredData;

    filteredData = $.extend(true, {id: menuId}, app.config[optionsKey]);
    filteredData.data = filteredData.data.filter(function(item) {
      item.price = item.price.hasOwnProperty(menuId) && item.price[menuId];
      return !!item.price;
    });
    filteredData.price = filteredData.data[0] && filteredData.data[0].price;

    return !!filteredData.data.length && filteredData;
  }

  function _filterFeatures(id) {
    _filteredFeatures = [];
    _filteredFeatures.push(_getOptionsFor('windowLedge', id));
    _filteredFeatures.push(_getOptionsFor('windowSill', id));
    _filteredFeatures.push(_getOptionsFor('windowReveal', id));
  }

  function _filterServices(id) {
    _filteredServices = _getOptionsFor('services', id);
  }

  function _normalizeData() {
    _normalizedArray = [];
    _normalizedArray = _normalizedArray.concat(_filteredFeatures);
    _normalizedArray = _normalizedArray.concat(_filteredServices.data);
  }

  function _toggleFeature($checkbox) {
    let
      slug = $checkbox.data('slug'),
      isChecked = $checkbox.prop('checked'),
      featureObject;

    featureObject = _normalizedArray.find(function(item) {
      return item.slug === slug;
    });

    $(document).trigger('toggleFeature:calculator', [$.extend(true, {}, featureObject), isChecked]); // экстенд, потому что нужна копия, а не ссылка
  }

  function _setPrice($this) {
    let
      slug = $this.data('slug'),
      price = parseInt($this.val());

    _normalizedArray.forEach(function(item) {
      if (item.slug === slug) {
        item.price = price;
      }
    });

    $(document).trigger('updateFeaturePrice:calculator', [slug, price]);
  }

  function _renderTemplates() {
    const
      templateFeatures = require('../templates/features.hbs'),
      templateServices = require('../templates/services.hbs');

    $('.js-features').html(templateFeatures({data: _filteredFeatures}));
    $('.js-services').html(templateServices({data: _filteredServices}));
  }

  function _listener() {
    $(document)
      .on('changeWindowType:calculator', function(event, id) {
        _filterFeatures(id);
        _filterServices(id);
        _normalizeData();
        _renderTemplates();
      })
      .on('change', '.js-toggle-features, .js-toggle-services', function() {
        _toggleFeature($(this));
      })
      .on('change', '.js-feature-select', function() {
        let $this = $(this);

        $this.closest('.js-feature-item').find('.js-feature-price').html(parseInt($this.val()));
        _setPrice($this);
      });
  }

  self.load = function() {
    _init();
    _listener();
  };

  return self;
})(app.modules.featuresAndServices || {});