// Provides a mechanism for SVG(Z) fallback to bitmap images.  
// Copyright (C) 2013 Qloo Inc., Michael Diolosa <michael.diolosa@gmail.com>  
// License: MIT

/*global angular:true, browser: true */

(function (window) {
  'use strict';

  // private method for detecting SVG support
  var isSvgSupported = function () {
    return window.Modernizr && window.Modernizr.svg;
  };

  // svg-fallback
  // ------------
  // Images marked with the `svg` directive will fallback to PNG if the browser
  // does not support SVG. If a specific file needs to be applied the default
  // behavior can be altered by the `data-fallback-src`.
  angular.module('svg-fallback', []).directive('svg', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        // Should we remove our dependency on Modernizr?
        if (!isSvgSupported()) {
          // Check to see if we have a fallback source
          var src = element.attr('data-fallback-src');

          // If we do not have a fallback source then convert the SVG extension to
          // `png`
          if (!src && element.attr('src')) {
            src = element.attr('src').replace(/\.svg[z]{0,1}$/, '.png');
          }

          // If a `src` was determined apply to the image
          if (src) { element.attr('src', src); }
        }
      }
    };
  });
}(window));