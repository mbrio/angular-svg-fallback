/* jshint -W024 */
/* jshint expr:true */

var expect = chai.expect;

describe('svg-fallback', function () {
  beforeEach(module('svg-fallback'));

  var svg = Modernizr.svg;

  afterEach(function () { Modernizr.svg = svg; });

  describe('version', function() {
    it('should return current version', inject(function(version) {
      expect(version).to.equal('1.0.4');
    }));
  });

  describe('svg supported', function () {
    beforeEach(function() { Modernizr.svg = true; });

    it('should not translate SVGs to PNGs if browsers support them', inject(function ($compile, $rootScope) {
      var elm = angular.element('<div><img src="test.svg" data-fallback-src="test@2x.png" svg></div>'),
        ele = $compile(elm)($rootScope);
      $rootScope.$apply();
      expect(angular.element(ele).find('img').attr('src')).to.equal('test.svg');
    }));

    it('should not translate SVGZs to PNGs if browsers support them', inject(function ($compile, $rootScope) {
      var elm = angular.element('<div><img src="test.svgz" data-fallback-src="test@2x.png" svg></div>'),
        ele = $compile(elm)($rootScope);
      $rootScope.$apply();
      expect(angular.element(ele).find('img').attr('src')).to.equal('test.svgz');
    }));
  });

  describe('png fallback', function () {
    beforeEach(function () { Modernizr.svg = false; });

    it('should not fail if no sources are specified', inject(function ($compile, $rootScope) {
      var elm = angular.element('<div><img svg></div>'),
        ele = $compile(elm)($rootScope);
      $rootScope.$apply();
      expect(angular.element(ele).find('img').length).to.equal(1);
    }));

    it('should translate SVGZs to PNGs if browsers don\'t support them', inject(function ($compile, $rootScope) {
      var elm = angular.element('<div><img src="test.svgz" svg></div>'),
        ele = $compile(elm)($rootScope);
      $rootScope.$apply();
      expect(angular.element(ele).find('img').attr('src')).to.equal('test.png');
    }));

    it('should translate SVGs to PNGs if browsers don\'t support them', inject(function ($compile, $rootScope) {
      var elm = angular.element('<div><img src="test.svg" svg></div>'),
        ele = $compile(elm)($rootScope);
      $rootScope.$apply();
      expect(angular.element(ele).find('img').attr('src')).to.equal('test.png');
    }));

    it('should translate SVGs using data-fallback-src if browsers don\'t support them', inject(function ($compile, $rootScope) {
      var elm = angular.element('<div><img src="test.svg" data-fallback-src="test@2x.png" svg></div>'),
        ele = $compile(elm)($rootScope);
      $rootScope.$apply();
      expect(angular.element(ele).find('img').attr('src')).to.equal('test@2x.png');
    }));
  });
});