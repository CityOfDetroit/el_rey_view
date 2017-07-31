(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _viewClass = require('./view.class.js');

var _viewClass2 = _interopRequireDefault(_viewClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function (window) {
  var view = new _viewClass2.default({ 'view': 'fist view' });
})(window);

},{"./view.class.js":2}],2:[function(require,module,exports){
"use strict";

module.exports = {
  View: View
};
var View = function () {
  var properties = null;
  function View(properties) {
    this.properties = properties;
  }
  View.prototype.getView = function () {
    return this.properties.view;
  };
}();

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXGpzXFxtYWluLmpzIiwiYXBwXFxqc1xcdmlldy5jbGFzcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQUNBOzs7Ozs7QUFDQSxDQUFDLFVBQVMsTUFBVCxFQUFnQjtBQUNmLE1BQUksT0FBTyx3QkFBUyxFQUFDLFFBQU8sV0FBUixFQUFULENBQVg7QUFDRCxDQUZELEVBRUcsTUFGSDs7Ozs7QUNGQSxPQUFPLE9BQVAsR0FBaUI7QUFDYjtBQURhLENBQWpCO0FBR0EsSUFBSSxPQUFRLFlBQVU7QUFDcEIsTUFBSSxhQUFhLElBQWpCO0FBQ0EsV0FBUyxJQUFULENBQWMsVUFBZCxFQUF5QjtBQUN2QixTQUFLLFVBQUwsR0FBa0IsVUFBbEI7QUFDRDtBQUNELE9BQUssU0FBTCxDQUFlLE9BQWYsR0FBeUIsWUFBVTtBQUNqQyxXQUFPLEtBQUssVUFBTCxDQUFnQixJQUF2QjtBQUNELEdBRkQ7QUFHRCxDQVJVLEVBQVgiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xyXG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3LmNsYXNzLmpzXCI7XHJcbihmdW5jdGlvbih3aW5kb3cpe1xyXG4gIHZhciB2aWV3ID0gbmV3IFZpZXcoeyd2aWV3JzonZmlzdCB2aWV3J30pO1xyXG59KSh3aW5kb3cpO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIFZpZXdcclxufTtcclxudmFyIFZpZXcgPSAoZnVuY3Rpb24oKXtcclxuICB2YXIgcHJvcGVydGllcyA9IG51bGw7XHJcbiAgZnVuY3Rpb24gVmlldyhwcm9wZXJ0aWVzKXtcclxuICAgIHRoaXMucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XHJcbiAgfVxyXG4gIFZpZXcucHJvdG90eXBlLmdldFZpZXcgPSBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIHRoaXMucHJvcGVydGllcy52aWV3O1xyXG4gIH07XHJcbn0pKCk7XHJcbiJdfQ==
