(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _routerClass = require('./router.class.js');

var _routerClass2 = _interopRequireDefault(_routerClass);

var _templateClass = require('./template.class.js');

var _templateClass2 = _interopRequireDefault(_templateClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var router = new _routerClass2.default();
  router.updateURLParams({ 'zoom': 13, 'lng': -83.15, 'lat': 42.36 });
  var currenetRouting = router.loadURLRouting();
  console.log(router);
  console.log(currenetRouting);
  var template = new _templateClass2.default();
  console.log(template.generateTemplate({
    title: "TITLE",
    mainTitle: "Main title",
    mainData: 225,
    subTitle: "Sub title",
    subData: null
  }));
})(window);

},{"./router.class.js":2,"./template.class.js":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Router = function () {
  function Router() {
    _classCallCheck(this, Router);

    this.params = {
      'zoom': 0,
      'lng': 0,
      'lat': 0,
      'dataSets': '',
      'parcel': '',
      'boundary': '',
      'view': ''
    };
  }

  _createClass(Router, [{
    key: 'getRoutingResults',
    value: function getRoutingResults() {
      var currentRouting = [];
      var results = {
        zoom: function zoom(_zoom) {
          return _zoom && _zoom !== 0;
        },
        lng: function lng(_lng) {
          return _lng && _lng !== 0;
        },
        lat: function lat(_lat) {
          return _lat && _lat !== 0;
        },
        parcel: function parcel(_parcel) {
          return _parcel && _parcel !== '';
        },
        dataSets: function dataSets(_dataSets) {
          return _dataSets && _dataSets !== '';
        },
        boundary: function boundary(_boundary) {
          return _boundary && _boundary !== '';
        },
        view: function view(_view) {
          return _view && _view !== '';
        }
      };
      for (var key in results) {
        currentRouting.push(results[key](this.getQueryVariable(key)));
      }
      return currentRouting;
    }
  }, {
    key: 'loadURLRouting',
    value: function loadURLRouting() {
      var currentRouting = this.getRoutingResults();
      console.log(currentRouting);
      if (currentRouting[currentRouting.length - 1]) {
        return currentRouting[currentRouting.length - 1];
      } else {
        return null;
      }
    }
  }, {
    key: 'getQueryVariable',
    value: function getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          if (pair[1] !== '') {
            return pair[1];
          }
        }
      }
      return false;
    }
  }, {
    key: 'updateURLParams',
    value: function updateURLParams(newParams) {
      for (var item in newParams) {
        if (this.params.hasOwnProperty(item)) {
          this.params[item] = newParams[item];
        }
      }
      var newTempURL = '';
      for (var property in this.params) {
        if (this.params.hasOwnProperty(property)) {
          // console.log(property);
          // console.log(currentURLParams[property]);
          switch (true) {
            case property !== 0:
              newTempURL += property + '=' + this.params[property] + '&';
              break;
            default:

          }
        }
      }
      // console.log(newTempURL);
      if (history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + newTempURL;
        window.history.pushState({
          path: newurl
        }, '', newurl);
      }
    }
  }]);

  return Router;
}();

exports.default = Router;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Template = function () {
  function Template() {
    _classCallCheck(this, Template);

    this.results = {
      main: function main(mainTitle, mainData) {
        return '<article class="main-result"><h4>' + mainTitle + '</h4><p>' + mainData + '</p></article>';
      },
      sub: function sub(subTitle, subData) {
        return '<article class="main-result"><h4>' + subTitle + '</h4><p>' + subData + '</p></article>';
      }
    };
    this.elements = {
      title: '',
      results: {
        main: '',
        sub: ''
      },
      buttons: {
        'survey': '<article class="survey-btn"><article class="form-btn" onclick="survey.startSurvey()">START SURVEY</article></article>',

        'parcelOwner': '<article class="parcel-data btn-type owner"><div class="data-view-btn" data-view="owner" onclick="mapPanel.switchParcelDataViews(this)">OWNER INFORMATION <span>&#10095;</span></div></article>',

        'parcelInfo': '<article class="parcel-data btn-type building"><div class="data-view-btn" data-view="building" onclick="mapPanel.switchParcelDataViews(this)">PROPERTY INFORMATION <span>&#10095;</span></div></article>'
      },
      information: '<article><p>Hodor, hodor. Hodor. Hodor, hodor, hodor. Hodor HODOR hodor, hodor hodor... Hodor hodor hodor, hodor, hodor hodor. Hodor hodor hodor hodor, hodor. Hodor hodor - hodor? Hodor, hodor hodor HODOR hodor, hodor hodor, hodor. Hodor hodor. Hodor, hodor. Hodor. Hodor, hodor... Hodor hodor hodor... Hodor hodor hodor... Hodor hodor hodor? Hodor hodor - hodor; hodor hodor hodor, hodor, hodor hodor. Hodor, hodor, hodor. Hodor hodor, hodor, hodor hodor.</p><p>Hodor! Hodor hodor, hodor... Hodor hodor hodor; hodor hodor. Hodor hodor... Hodor hodor hodor. Hodor. Hodor. Hodor hodor - HODOR hodor, hodor hodor? Hodor hodor - hodor hodor hodor, hodor. Hodor hodor.</p></article>',
      controls: {
        'boundaries': '<article class="layer-controllers"><h5>BOUNDARIES</h5><ul><li><input type="radio" id="b-district" name="boundaries" class="layer-controller-toggle"><label for="b-district">Council Districts</label><div class="check"><div class="inside"></div></div></li><li><input type="radio" id="b-neighborhoods" name="boundaries" class="layer-controller-toggle"><label for="b-neighborhoods">Neighborhoods</label><div class="check"><div class="inside"></div></div></li></ul></article><article class="layer-controllers"><h5>DATA SET</h5><ul><li><input type="radio" id="c-w-vernor" name="selector" class="layer-controller-toggle"><label for="c-w-vernor">W Vernor</label><div class="check"><div class="inside"></div></div></li><li><input type="radio" id="c-e-vernor" name="selector" class="layer-controller-toggle"><label for="c-e-vernor">E Vernor</label><div class="check"><div class="inside"></div></div></li><li><input type="radio" id="c-michigan" name="selector" class="layer-controller-toggle"><label for="c-michigan">Michigan Ave.</label><div class="check"></div></li><li><input type="radio" id="c-woodward" name="selector" class="layer-controller-toggle"><label for="c-woodward">Woodward</label><div class="check"><div class="inside"></div></div></li> <li><input type="radio" id="c-livernois" name="selector" class="layer-controller-toggle"><label for="c-livernois">Livernois</label><div class="check"><div class="inside"></div></div></li><li><input type="radio" id="c-grand-river" name="selector" class="layer-controller-toggle"><label for="c-grand-river">Grand River</label><div class="check"><div class="inside"></div></div></li><li><input type="radio" id="c-seven-mile" name="selector" class="layer-controller-toggle"><label for="c-seven-mile">Seven Mile</label><div class="check"><div class="inside"></div></div></li><li><input type="radio" id="c-mcnichols" name="selector" class="layer-controller-toggle"><label for="c-mcnichols">McNichols</label><div class="check"><div class="inside"></div></div></li><li><input type="radio" id="c-gratiot" name="selector" class="layer-controller-toggle"><label for="c-gratiot">Gratiot</label><div class="check"><div class="inside"></div></div></li><li><input type="radio" id="c-jefferson" name="selector" class="layer-controller-toggle"><label for="c-jefferson">Jefferson</label><div class="check"><div class="inside"></div></div></li><li><input type="radio" id="c-warren" name="selector" class="layer-controller-toggle"><label for="c-warren">Warren</label><div class="check"><div class="inside"></div></div></li></ul></article>'
      }
    };
  }

  _createClass(Template, [{
    key: 'generateTemplate',
    value: function generateTemplate() {
      var templateSettings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this.elements.title = templateSettings.title;
      this.elements.results.main = this.results.main(templateSettings.mainTitle, templateSettings.mainData);
      this.elements.results.sub = this.results.sub(templateSettings.subTitle, templateSettings.subData);
      return this.elements;
    }
  }]);

  return Template;
}();

exports.default = Template;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXGpzXFxtYWluLmpzIiwiYXBwXFxqc1xccm91dGVyLmNsYXNzLmpzIiwiYXBwXFxqc1xcdGVtcGxhdGUuY2xhc3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFDQSxDQUFDLFlBQVU7QUFDVCxNQUFJLFNBQVMsMkJBQWI7QUFDQSxTQUFPLGVBQVAsQ0FBdUIsRUFBQyxRQUFPLEVBQVIsRUFBVyxPQUFNLENBQUMsS0FBbEIsRUFBd0IsT0FBTyxLQUEvQixFQUF2QjtBQUNBLE1BQUksa0JBQWtCLE9BQU8sY0FBUCxFQUF0QjtBQUNBLFVBQVEsR0FBUixDQUFZLE1BQVo7QUFDQSxVQUFRLEdBQVIsQ0FBWSxlQUFaO0FBQ0EsTUFBSSxXQUFXLDZCQUFmO0FBQ0EsVUFBUSxHQUFSLENBQVksU0FBUyxnQkFBVCxDQUEwQjtBQUNwQyxXQUFPLE9BRDZCO0FBRXBDLGVBQVksWUFGd0I7QUFHcEMsY0FBWSxHQUh3QjtBQUlwQyxjQUFXLFdBSnlCO0FBS3BDLGFBQVc7QUFMeUIsR0FBMUIsQ0FBWjtBQVFELENBZkQsRUFlRyxNQWZIOzs7QUNIQTs7Ozs7Ozs7OztJQUNxQixNO0FBQ25CLG9CQUFjO0FBQUE7O0FBQ1osU0FBSyxNQUFMLEdBQWM7QUFDWixjQUFRLENBREk7QUFFWixhQUFPLENBRks7QUFHWixhQUFPLENBSEs7QUFJWixrQkFBWSxFQUpBO0FBS1osZ0JBQVUsRUFMRTtBQU1aLGtCQUFZLEVBTkE7QUFPWixjQUFRO0FBUEksS0FBZDtBQVNEOzs7O3dDQUNtQjtBQUNsQixVQUFJLGlCQUFpQixFQUFyQjtBQUNBLFVBQUksVUFBVTtBQUNaLGNBQU0sY0FBQyxLQUFELEVBQVU7QUFDZCxpQkFBTyxTQUFRLFVBQVMsQ0FBeEI7QUFDRCxTQUhXO0FBSVosYUFBSyxhQUFDLElBQUQsRUFBUztBQUNaLGlCQUFPLFFBQU8sU0FB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QUFlO0FBQ2IsWUFBTSxjQUFDLFNBQUQsRUFBWSxRQUFaLEVBQXlCO0FBQzdCLHFEQUE0QyxTQUE1QyxnQkFBa0UsUUFBbEU7QUFDRCxPQUhZO0FBSWIsV0FBSyxhQUFDLFFBQUQsRUFBVyxPQUFYLEVBQXVCO0FBQzFCLHFEQUEyQyxRQUEzQyxnQkFBOEQsT0FBOUQ7QUFDRDtBQU5ZLEtBQWY7QUFRQSxTQUFLLFFBQUwsR0FBZ0I7QUFDZCxhQUFPLEVBRE87QUFFZCxlQUFTO0FBQ1AsY0FBTSxFQURDO0FBRVAsYUFBSztBQUZFLE9BRks7QUFNZCxlQUFTO0FBQ1Asa0JBQVUsdUhBREg7O0FBR1AsdUJBQWUsaU1BSFI7O0FBS1Asc0JBQWM7QUFMUCxPQU5LO0FBYWQsbUJBQWEsd3FCQWJDO0FBY2QsZ0JBQVU7QUFDUixzQkFBYztBQUROO0FBZEksS0FBaEI7QUFrQkQ7Ozs7dUNBRXlDO0FBQUEsVUFBekIsZ0JBQXlCLHVFQUFOLElBQU07O0FBQ3hDLFdBQUssUUFBTCxDQUFjLEtBQWQsR0FBc0IsaUJBQWlCLEtBQXZDO0FBQ0EsV0FBSyxRQUFMLENBQWMsT0FBZCxDQUFzQixJQUF0QixHQUE2QixLQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLGlCQUFpQixTQUFuQyxFQUE4QyxpQkFBaUIsUUFBL0QsQ0FBN0I7QUFDQSxXQUFLLFFBQUwsQ0FBYyxPQUFkLENBQXNCLEdBQXRCLEdBQTRCLEtBQUssT0FBTCxDQUFhLEdBQWIsQ0FBaUIsaUJBQWlCLFFBQWxDLEVBQTRDLGlCQUFpQixPQUE3RCxDQUE1QjtBQUNBLGFBQU8sS0FBSyxRQUFaO0FBQ0Q7Ozs7OztrQkFuQ2tCLFEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xyXG5pbXBvcnQgUm91dGVyIGZyb20gJy4vcm91dGVyLmNsYXNzLmpzJztcclxuaW1wb3J0IFRlbXBsYXRlIGZyb20gJy4vdGVtcGxhdGUuY2xhc3MuanMnO1xyXG4oZnVuY3Rpb24oKXtcclxuICB2YXIgcm91dGVyID0gbmV3IFJvdXRlcigpO1xyXG4gIHJvdXRlci51cGRhdGVVUkxQYXJhbXMoeyd6b29tJzoxMywnbG5nJzotODMuMTUsJ2xhdCc6IDQyLjM2fSk7XHJcbiAgdmFyIGN1cnJlbmV0Um91dGluZyA9IHJvdXRlci5sb2FkVVJMUm91dGluZygpO1xyXG4gIGNvbnNvbGUubG9nKHJvdXRlcik7XHJcbiAgY29uc29sZS5sb2coY3VycmVuZXRSb3V0aW5nKTtcclxuICB2YXIgdGVtcGxhdGUgPSBuZXcgVGVtcGxhdGUoKTtcclxuICBjb25zb2xlLmxvZyh0ZW1wbGF0ZS5nZW5lcmF0ZVRlbXBsYXRlKHtcclxuICAgIHRpdGxlOiBcIlRJVExFXCIsXHJcbiAgICBtYWluVGl0bGUgOiBcIk1haW4gdGl0bGVcIixcclxuICAgIG1haW5EYXRhICA6IDIyNSxcclxuICAgIHN1YlRpdGxlIDogXCJTdWIgdGl0bGVcIixcclxuICAgIHN1YkRhdGEgIDogbnVsbFxyXG4gIH0pKTtcclxuXHJcbn0pKHdpbmRvdyk7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91dGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMucGFyYW1zID0ge1xyXG4gICAgICAnem9vbSc6IDAsXHJcbiAgICAgICdsbmcnOiAwLFxyXG4gICAgICAnbGF0JzogMCxcclxuICAgICAgJ2RhdGFTZXRzJzogJycsXHJcbiAgICAgICdwYXJjZWwnOiAnJyxcclxuICAgICAgJ2JvdW5kYXJ5JzogJycsXHJcbiAgICAgICd2aWV3JzogJydcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0Um91dGluZ1Jlc3VsdHMoKSB7XHJcbiAgICBsZXQgY3VycmVudFJvdXRpbmcgPSBbXTtcclxuICAgIGxldCByZXN1bHRzID0ge1xyXG4gICAgICB6b29tOiAoem9vbSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB6b29tICYmIHpvb20gIT09IDBcclxuICAgICAgfSxcclxuICAgICAgbG5nOiAobG5nKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGxuZyAmJiBsbmcgIT09IDBcclxuICAgICAgfSxcclxuICAgICAgbGF0OiAobGF0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGxhdCAmJiBsYXQgIT09IDBcclxuICAgICAgfSxcclxuICAgICAgcGFyY2VsOiAocGFyY2VsKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHBhcmNlbCAmJiBwYXJjZWwgIT09ICcnXHJcbiAgICAgIH0sXHJcbiAgICAgIGRhdGFTZXRzOiAoZGF0YVNldHMpID0+IHtcclxuICAgICAgICByZXR1cm4gZGF0YVNldHMgJiYgZGF0YVNldHMgIT09ICcnXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvdW5kYXJ5OiAoYm91bmRhcnkpID0+IHtcclxuICAgICAgICByZXR1cm4gYm91bmRhcnkgJiYgYm91bmRhcnkgIT09ICcnXHJcbiAgICAgIH0sXHJcbiAgICAgIHZpZXc6ICh2aWV3KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHZpZXcgJiYgdmlldyAhPT0gJydcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIGZvciAodmFyIGtleSBpbiByZXN1bHRzKSB7XHJcbiAgICAgIGN1cnJlbnRSb3V0aW5nLnB1c2gocmVzdWx0c1trZXldKHRoaXMuZ2V0UXVlcnlWYXJpYWJsZShrZXkpKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3VycmVudFJvdXRpbmc7XHJcbiAgfVxyXG5cclxuICBsb2FkVVJMUm91dGluZygpIHtcclxuICAgIHZhciBjdXJyZW50Um91dGluZyA9IHRoaXMuZ2V0Um91dGluZ1Jlc3VsdHMoKTtcclxuICAgIGNvbnNvbGUubG9nKGN1cnJlbnRSb3V0aW5nKTtcclxuICAgIGlmIChjdXJyZW50Um91dGluZ1tjdXJyZW50Um91dGluZy5sZW5ndGggLSAxXSkge1xyXG4gICAgICByZXR1cm4gY3VycmVudFJvdXRpbmdbY3VycmVudFJvdXRpbmcubGVuZ3RoIC0gMV07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0UXVlcnlWYXJpYWJsZSh2YXJpYWJsZSkge1xyXG4gICAgdmFyIHF1ZXJ5ID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSk7XHJcbiAgICB2YXIgdmFycyA9IHF1ZXJ5LnNwbGl0KFwiJlwiKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICB2YXIgcGFpciA9IHZhcnNbaV0uc3BsaXQoXCI9XCIpO1xyXG4gICAgICBpZiAocGFpclswXSA9PSB2YXJpYWJsZSkge1xyXG4gICAgICAgIGlmIChwYWlyWzFdICE9PSAnJykge1xyXG4gICAgICAgICAgcmV0dXJuIHBhaXJbMV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKGZhbHNlKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVVSTFBhcmFtcyhuZXdQYXJhbXMpIHtcclxuICAgIGZvciAodmFyIGl0ZW0gaW4gbmV3UGFyYW1zKSB7XHJcbiAgICAgIGlmICh0aGlzLnBhcmFtcy5oYXNPd25Qcm9wZXJ0eShpdGVtKSkge1xyXG4gICAgICAgIHRoaXMucGFyYW1zW2l0ZW1dID0gbmV3UGFyYW1zW2l0ZW1dO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB2YXIgbmV3VGVtcFVSTCA9ICcnO1xyXG4gICAgZm9yICh2YXIgcHJvcGVydHkgaW4gdGhpcy5wYXJhbXMpIHtcclxuICAgICAgaWYgKHRoaXMucGFyYW1zLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHByb3BlcnR5KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhjdXJyZW50VVJMUGFyYW1zW3Byb3BlcnR5XSk7XHJcbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XHJcbiAgICAgICAgICBjYXNlIHByb3BlcnR5ICE9PSAwOlxyXG4gICAgICAgICAgICBuZXdUZW1wVVJMICs9IHByb3BlcnR5ICsgJz0nICsgdGhpcy5wYXJhbXNbcHJvcGVydHldICsgJyYnO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gY29uc29sZS5sb2cobmV3VGVtcFVSTCk7XHJcbiAgICBpZiAoaGlzdG9yeS5wdXNoU3RhdGUpIHtcclxuICAgICAgdmFyIG5ld3VybCA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgJz8nICsgbmV3VGVtcFVSTDtcclxuICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHtcclxuICAgICAgICBwYXRoOiBuZXd1cmxcclxuICAgICAgfSwgJycsIG5ld3VybCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVtcGxhdGUge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5yZXN1bHRzID0ge1xyXG4gICAgICBtYWluOiAobWFpblRpdGxlLCBtYWluRGF0YSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgPGFydGljbGUgY2xhc3M9XCJtYWluLXJlc3VsdFwiPjxoND4keyBtYWluVGl0bGUgfTwvaDQ+PHA+JHsgbWFpbkRhdGEgfTwvcD48L2FydGljbGU+YFxyXG4gICAgICB9LFxyXG4gICAgICBzdWI6IChzdWJUaXRsZSwgc3ViRGF0YSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgPGFydGljbGUgY2xhc3M9XCJtYWluLXJlc3VsdFwiPjxoND4ke3N1YlRpdGxlfTwvaDQ+PHA+JHtzdWJEYXRhfTwvcD48L2FydGljbGU+YFxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhpcy5lbGVtZW50cyA9IHtcclxuICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICByZXN1bHRzOiB7XHJcbiAgICAgICAgbWFpbjogJycsXHJcbiAgICAgICAgc3ViOiAnJ1xyXG4gICAgICB9LFxyXG4gICAgICBidXR0b25zOiB7XHJcbiAgICAgICAgJ3N1cnZleSc6ICc8YXJ0aWNsZSBjbGFzcz1cInN1cnZleS1idG5cIj48YXJ0aWNsZSBjbGFzcz1cImZvcm0tYnRuXCIgb25jbGljaz1cInN1cnZleS5zdGFydFN1cnZleSgpXCI+U1RBUlQgU1VSVkVZPC9hcnRpY2xlPjwvYXJ0aWNsZT4nLFxyXG5cclxuICAgICAgICAncGFyY2VsT3duZXInOiAnPGFydGljbGUgY2xhc3M9XCJwYXJjZWwtZGF0YSBidG4tdHlwZSBvd25lclwiPjxkaXYgY2xhc3M9XCJkYXRhLXZpZXctYnRuXCIgZGF0YS12aWV3PVwib3duZXJcIiBvbmNsaWNrPVwibWFwUGFuZWwuc3dpdGNoUGFyY2VsRGF0YVZpZXdzKHRoaXMpXCI+T1dORVIgSU5GT1JNQVRJT04gPHNwYW4+JiMxMDA5NTs8L3NwYW4+PC9kaXY+PC9hcnRpY2xlPicsXHJcblxyXG4gICAgICAgICdwYXJjZWxJbmZvJzogJzxhcnRpY2xlIGNsYXNzPVwicGFyY2VsLWRhdGEgYnRuLXR5cGUgYnVpbGRpbmdcIj48ZGl2IGNsYXNzPVwiZGF0YS12aWV3LWJ0blwiIGRhdGEtdmlldz1cImJ1aWxkaW5nXCIgb25jbGljaz1cIm1hcFBhbmVsLnN3aXRjaFBhcmNlbERhdGFWaWV3cyh0aGlzKVwiPlBST1BFUlRZIElORk9STUFUSU9OIDxzcGFuPiYjMTAwOTU7PC9zcGFuPjwvZGl2PjwvYXJ0aWNsZT4nXHJcbiAgICAgIH0sXHJcbiAgICAgIGluZm9ybWF0aW9uOiAnPGFydGljbGU+PHA+SG9kb3IsIGhvZG9yLiBIb2Rvci4gSG9kb3IsIGhvZG9yLCBob2Rvci4gSG9kb3IgSE9ET1IgaG9kb3IsIGhvZG9yIGhvZG9yLi4uIEhvZG9yIGhvZG9yIGhvZG9yLCBob2RvciwgaG9kb3IgaG9kb3IuIEhvZG9yIGhvZG9yIGhvZG9yIGhvZG9yLCBob2Rvci4gSG9kb3IgaG9kb3IgLSBob2Rvcj8gSG9kb3IsIGhvZG9yIGhvZG9yIEhPRE9SIGhvZG9yLCBob2RvciBob2RvciwgaG9kb3IuIEhvZG9yIGhvZG9yLiBIb2RvciwgaG9kb3IuIEhvZG9yLiBIb2RvciwgaG9kb3IuLi4gSG9kb3IgaG9kb3IgaG9kb3IuLi4gSG9kb3IgaG9kb3IgaG9kb3IuLi4gSG9kb3IgaG9kb3IgaG9kb3I/IEhvZG9yIGhvZG9yIC0gaG9kb3I7IGhvZG9yIGhvZG9yIGhvZG9yLCBob2RvciwgaG9kb3IgaG9kb3IuIEhvZG9yLCBob2RvciwgaG9kb3IuIEhvZG9yIGhvZG9yLCBob2RvciwgaG9kb3IgaG9kb3IuPC9wPjxwPkhvZG9yISBIb2RvciBob2RvciwgaG9kb3IuLi4gSG9kb3IgaG9kb3IgaG9kb3I7IGhvZG9yIGhvZG9yLiBIb2RvciBob2Rvci4uLiBIb2RvciBob2RvciBob2Rvci4gSG9kb3IuIEhvZG9yLiBIb2RvciBob2RvciAtIEhPRE9SIGhvZG9yLCBob2RvciBob2Rvcj8gSG9kb3IgaG9kb3IgLSBob2RvciBob2RvciBob2RvciwgaG9kb3IuIEhvZG9yIGhvZG9yLjwvcD48L2FydGljbGU+JyxcclxuICAgICAgY29udHJvbHM6IHtcclxuICAgICAgICAnYm91bmRhcmllcyc6ICc8YXJ0aWNsZSBjbGFzcz1cImxheWVyLWNvbnRyb2xsZXJzXCI+PGg1PkJPVU5EQVJJRVM8L2g1Pjx1bD48bGk+PGlucHV0IHR5cGU9XCJyYWRpb1wiIGlkPVwiYi1kaXN0cmljdFwiIG5hbWU9XCJib3VuZGFyaWVzXCIgY2xhc3M9XCJsYXllci1jb250cm9sbGVyLXRvZ2dsZVwiPjxsYWJlbCBmb3I9XCJiLWRpc3RyaWN0XCI+Q291bmNpbCBEaXN0cmljdHM8L2xhYmVsPjxkaXYgY2xhc3M9XCJjaGVja1wiPjxkaXYgY2xhc3M9XCJpbnNpZGVcIj48L2Rpdj48L2Rpdj48L2xpPjxsaT48aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCJiLW5laWdoYm9yaG9vZHNcIiBuYW1lPVwiYm91bmRhcmllc1wiIGNsYXNzPVwibGF5ZXItY29udHJvbGxlci10b2dnbGVcIj48bGFiZWwgZm9yPVwiYi1uZWlnaGJvcmhvb2RzXCI+TmVpZ2hib3Job29kczwvbGFiZWw+PGRpdiBjbGFzcz1cImNoZWNrXCI+PGRpdiBjbGFzcz1cImluc2lkZVwiPjwvZGl2PjwvZGl2PjwvbGk+PC91bD48L2FydGljbGU+PGFydGljbGUgY2xhc3M9XCJsYXllci1jb250cm9sbGVyc1wiPjxoNT5EQVRBIFNFVDwvaDU+PHVsPjxsaT48aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCJjLXctdmVybm9yXCIgbmFtZT1cInNlbGVjdG9yXCIgY2xhc3M9XCJsYXllci1jb250cm9sbGVyLXRvZ2dsZVwiPjxsYWJlbCBmb3I9XCJjLXctdmVybm9yXCI+VyBWZXJub3I8L2xhYmVsPjxkaXYgY2xhc3M9XCJjaGVja1wiPjxkaXYgY2xhc3M9XCJpbnNpZGVcIj48L2Rpdj48L2Rpdj48L2xpPjxsaT48aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCJjLWUtdmVybm9yXCIgbmFtZT1cInNlbGVjdG9yXCIgY2xhc3M9XCJsYXllci1jb250cm9sbGVyLXRvZ2dsZVwiPjxsYWJlbCBmb3I9XCJjLWUtdmVybm9yXCI+RSBWZXJub3I8L2xhYmVsPjxkaXYgY2xhc3M9XCJjaGVja1wiPjxkaXYgY2xhc3M9XCJpbnNpZGVcIj48L2Rpdj48L2Rpdj48L2xpPjxsaT48aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCJjLW1pY2hpZ2FuXCIgbmFtZT1cInNlbGVjdG9yXCIgY2xhc3M9XCJsYXllci1jb250cm9sbGVyLXRvZ2dsZVwiPjxsYWJlbCBmb3I9XCJjLW1pY2hpZ2FuXCI+TWljaGlnYW4gQXZlLjwvbGFiZWw+PGRpdiBjbGFzcz1cImNoZWNrXCI+PC9kaXY+PC9saT48bGk+PGlucHV0IHR5cGU9XCJyYWRpb1wiIGlkPVwiYy13b29kd2FyZFwiIG5hbWU9XCJzZWxlY3RvclwiIGNsYXNzPVwibGF5ZXItY29udHJvbGxlci10b2dnbGVcIj48bGFiZWwgZm9yPVwiYy13b29kd2FyZFwiPldvb2R3YXJkPC9sYWJlbD48ZGl2IGNsYXNzPVwiY2hlY2tcIj48ZGl2IGNsYXNzPVwiaW5zaWRlXCI+PC9kaXY+PC9kaXY+PC9saT4gPGxpPjxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cImMtbGl2ZXJub2lzXCIgbmFtZT1cInNlbGVjdG9yXCIgY2xhc3M9XCJsYXllci1jb250cm9sbGVyLXRvZ2dsZVwiPjxsYWJlbCBmb3I9XCJjLWxpdmVybm9pc1wiPkxpdmVybm9pczwvbGFiZWw+PGRpdiBjbGFzcz1cImNoZWNrXCI+PGRpdiBjbGFzcz1cImluc2lkZVwiPjwvZGl2PjwvZGl2PjwvbGk+PGxpPjxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cImMtZ3JhbmQtcml2ZXJcIiBuYW1lPVwic2VsZWN0b3JcIiBjbGFzcz1cImxheWVyLWNvbnRyb2xsZXItdG9nZ2xlXCI+PGxhYmVsIGZvcj1cImMtZ3JhbmQtcml2ZXJcIj5HcmFuZCBSaXZlcjwvbGFiZWw+PGRpdiBjbGFzcz1cImNoZWNrXCI+PGRpdiBjbGFzcz1cImluc2lkZVwiPjwvZGl2PjwvZGl2PjwvbGk+PGxpPjxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cImMtc2V2ZW4tbWlsZVwiIG5hbWU9XCJzZWxlY3RvclwiIGNsYXNzPVwibGF5ZXItY29udHJvbGxlci10b2dnbGVcIj48bGFiZWwgZm9yPVwiYy1zZXZlbi1taWxlXCI+U2V2ZW4gTWlsZTwvbGFiZWw+PGRpdiBjbGFzcz1cImNoZWNrXCI+PGRpdiBjbGFzcz1cImluc2lkZVwiPjwvZGl2PjwvZGl2PjwvbGk+PGxpPjxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cImMtbWNuaWNob2xzXCIgbmFtZT1cInNlbGVjdG9yXCIgY2xhc3M9XCJsYXllci1jb250cm9sbGVyLXRvZ2dsZVwiPjxsYWJlbCBmb3I9XCJjLW1jbmljaG9sc1wiPk1jTmljaG9sczwvbGFiZWw+PGRpdiBjbGFzcz1cImNoZWNrXCI+PGRpdiBjbGFzcz1cImluc2lkZVwiPjwvZGl2PjwvZGl2PjwvbGk+PGxpPjxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cImMtZ3JhdGlvdFwiIG5hbWU9XCJzZWxlY3RvclwiIGNsYXNzPVwibGF5ZXItY29udHJvbGxlci10b2dnbGVcIj48bGFiZWwgZm9yPVwiYy1ncmF0aW90XCI+R3JhdGlvdDwvbGFiZWw+PGRpdiBjbGFzcz1cImNoZWNrXCI+PGRpdiBjbGFzcz1cImluc2lkZVwiPjwvZGl2PjwvZGl2PjwvbGk+PGxpPjxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cImMtamVmZmVyc29uXCIgbmFtZT1cInNlbGVjdG9yXCIgY2xhc3M9XCJsYXllci1jb250cm9sbGVyLXRvZ2dsZVwiPjxsYWJlbCBmb3I9XCJjLWplZmZlcnNvblwiPkplZmZlcnNvbjwvbGFiZWw+PGRpdiBjbGFzcz1cImNoZWNrXCI+PGRpdiBjbGFzcz1cImluc2lkZVwiPjwvZGl2PjwvZGl2PjwvbGk+PGxpPjxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cImMtd2FycmVuXCIgbmFtZT1cInNlbGVjdG9yXCIgY2xhc3M9XCJsYXllci1jb250cm9sbGVyLXRvZ2dsZVwiPjxsYWJlbCBmb3I9XCJjLXdhcnJlblwiPldhcnJlbjwvbGFiZWw+PGRpdiBjbGFzcz1cImNoZWNrXCI+PGRpdiBjbGFzcz1cImluc2lkZVwiPjwvZGl2PjwvZGl2PjwvbGk+PC91bD48L2FydGljbGU+J1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZ2VuZXJhdGVUZW1wbGF0ZSh0ZW1wbGF0ZVNldHRpbmdzID0gbnVsbCkge1xyXG4gICAgdGhpcy5lbGVtZW50cy50aXRsZSA9IHRlbXBsYXRlU2V0dGluZ3MudGl0bGU7XHJcbiAgICB0aGlzLmVsZW1lbnRzLnJlc3VsdHMubWFpbiA9IHRoaXMucmVzdWx0cy5tYWluKHRlbXBsYXRlU2V0dGluZ3MubWFpblRpdGxlLCB0ZW1wbGF0ZVNldHRpbmdzLm1haW5EYXRhKTtcclxuICAgIHRoaXMuZWxlbWVudHMucmVzdWx0cy5zdWIgPSB0aGlzLnJlc3VsdHMuc3ViKHRlbXBsYXRlU2V0dGluZ3Muc3ViVGl0bGUsIHRlbXBsYXRlU2V0dGluZ3Muc3ViRGF0YSk7XHJcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50cztcclxuICB9XHJcbn1cclxuIl19
