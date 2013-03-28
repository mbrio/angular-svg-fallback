// Provides a mechanism for SVG(Z) fallback to bitmap images.  
// Copyright (C) 2013 Qloo Inc., Michael Diolosa <michael.diolosa@gmail.com>  
// License: MIT

/*global browser:true, angular:true */

(function () {
  'use strict';

  angular
    // Include svg-fallback
    .module('svgtest', ['svg-fallback'])
    .controller('image-viewer', function ($scope) {
    });
}());