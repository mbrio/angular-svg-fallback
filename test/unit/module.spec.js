describe('svg-fallback', function () {
  beforeEach(module('svg-fallback'));

  var svg = Modernizr.svg;

  afterEach(function () { Modernizr.svg = svg; });

  describe('svg supported', function () {
    beforeEach(function() { Modernizr.svg = true; });

    it('should not translate SVGs if browsers support them', inject(function ($compile, $rootScope) {
      var elm = angular.element('<div><img src="test.svg" data-fallback-src="test@2x.png" svg></div>'),
        ele = $compile(elm)($rootScope);
      $rootScope.$apply();
      expect($(ele).find('img[src="test.svg"]').size()).toBe(1);
    }));
  });

  describe('png fallback', function () {
    beforeEach(function () { Modernizr.svg = false; });

    it('should not fail if no sources are specified', inject(function ($compile, $rootScope) {
      var elm = angular.element('<div><img svg></div>'),
        ele = $compile(elm)($rootScope);
      $rootScope.$apply();
      expect($(ele).find('img').size()).toBe(1);
    }));

    it('should support the SVGZ file extensions', inject(function ($compile, $rootScope) {
      var elm = angular.element('<div><img src="test.svgz" svg></div>'),
        ele = $compile(elm)($rootScope);
      $rootScope.$apply();
      expect($(ele).find('img[src="test.png"]').size()).toBe(1);
    }));

    it('should translate SVGs if browsers support them', inject(function ($compile, $rootScope) {
      var elm = angular.element('<div><img src="test.svg" svg></div>'),
        ele = $compile(elm)($rootScope);
      $rootScope.$apply();
      expect($(ele).find('img[src="test.png"]').size()).toBe(1);
    }));

    it('should translate SVGs using  if browsers support them', inject(function ($compile, $rootScope) {
      var elm = angular.element('<div><img src="test.svg" data-fallback-src="test@2x.png" svg></div>'),
        ele = $compile(elm)($rootScope);
      $rootScope.$apply();
      expect($(ele).find('img[src="test@2x.png"]').size()).toBe(1);
    }));
  });
});