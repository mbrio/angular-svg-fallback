describe 'svg-fallback', ->
  beforeEach module 'svg-fallback'

  svg = Modernizr.svg

  afterEach ->
    Modernizr.svg = svg

  describe 'svg supported', ->
    beforeEach ->
      Modernizr.svg = true

    it 'should not translate SVGs if browsers support them', inject ($compile, $rootScope)->
      elm = angular.element '<div><img src="test.svg" data-fallback-src="test@2x.png" svg></div>'
      ele = $compile(elm) $rootScope
      $rootScope.$apply()
      expect($(ele).find('img[src="test.svg"]').size()).toBe 1

  describe 'png fallback', ->
    beforeEach ->
      Modernizr.svg = false

    it 'should not fail if no sources are specified', inject ($compile, $rootScope)->
      elm = angular.element '<div><img svg></div>'
      ele = $compile(elm) $rootScope
      $rootScope.$apply()
      expect($(ele).find('img').size()).toBe 1

    it 'should support the SVGZ file extensions', inject ($compile, $rootScope)->
      elm = angular.element '<div><img src="test.svgz" svg></div>'
      ele = $compile(elm) $rootScope
      $rootScope.$apply()
      expect($(ele).find('img[src="test.png"]').size()).toBe 1

    it 'should translate SVGs if browsers support them', inject ($compile, $rootScope)->
      elm = angular.element '<div><img src="test.svg" svg></div>'
      ele = $compile(elm) $rootScope
      $rootScope.$apply()
      expect($(ele).find('img[src="test.png"]').size()).toBe 1

    it 'should translate SVGs using  if browsers support them', inject ($compile, $rootScope)->
      elm = angular.element '<div><img src="test.svg" data-fallback-src="test@2x.png" svg></div>'
      ele = $compile(elm) $rootScope
      $rootScope.$apply()
      expect($(ele).find('img[src="test@2x.png"]').size()).toBe 1

