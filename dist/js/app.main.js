(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _routerClass = require('./router.class.js');

var _routerClass2 = _interopRequireDefault(_routerClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var router = new _routerClass2.default();
  router.updateURLParams({ 'zoom': 13, 'lng': -83.15, 'lat': 42.36 });
  var currenetRouting = router.loadURLRouting();
  console.log(router);
  console.log(currenetRouting);
})(window);

},{"./router.class.js":2}],2:[function(require,module,exports){
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
      // if(this.getQueryVariable('zoom')){
      //   if (getQueryVariable('lat') && (getQueryVariable('lat') !== '0')) {
      //     switch (true) {
      //       case getQueryVariable('boundaries') !== false:
      //         console.log('load district panel');
      //         this.updateURLParams({'zoom':getQueryVariable('zoom'),'lng':getQueryVariable('lng'),'lat':getQueryVariable('lat'),'boundaries':getQueryVariable('boundaries')]);
      //         console.log(currentURLParams);
      //         mapPanel.createFeatureData();
      //         break;
      //       case getQueryVariable('neighborhood') !== false:
      //         console.log('load neighborhood panel');
      //         updateURLParams([getQueryVariable('zoom'),getQueryVariable('lng'),getQueryVariable('lat'),'','',getQueryVariable('neighborhood')]);
      //         mapPanel.createFeatureData();
      //         break;
      //       case getQueryVariable('parcel') !== false:
      //         updateURLParams([getQueryVariable('zoom'),getQueryVariable('lng'),getQueryVariable('lat'),getQueryVariable('parcel'),'','']);
      //         mapPanel.createFeatureData();
      //         break;
      //       default:
      //         mapPanel.createPanel('city');
      //         map.flyTo({
      //             center: [getQueryVariable('lng'),getQueryVariable('lat')],
      //             zoom: getQueryVariable('zoom'),
      //             bearing: 0,
      //             // These options control the flight curve, making it move
      //             // slowly and zoom out almost completely before starting
      //             // to pan.
      //             speed: 2, // make the flying slow
      //             curve: 1, // change the speed at which it zooms out
      //             // This can be any easing function: it takes a number between
      //             // 0 and 1 and returns another number between 0 and 1.
      //             easing: function (t) {
      //                 return t;
      //             }
      //         });
      //     }
      //   }else{
      //     map.flyTo({
      //         center: [-83.15, 42.36],
      //         zoom: getQueryVariable('zoom'),
      //         bearing: 0,
      //         // These options control the flight curve, making it move
      //         // slowly and zoom out almost completely before starting
      //         // to pan.
      //         speed: 2, // make the flying slow
      //         curve: 1, // change the speed at which it zooms out
      //         // This can be any easing function: it takes a number between
      //         // 0 and 1 and returns another number between 0 and 1.
      //         easing: function (t) {
      //             return t;
      //         }
      //     });
      //     updateURLParams([getQueryVariable('zoom'),-83.15, 42.36]);
      //     if(getQueryVariable('parcel')){
      //       console.log('there is parcel');
      //     }else{
      //       console.log('no parcel');
      //     }
      //   }
      // }else{
      //   if (getQueryVariable('lat')) {
      //     map.flyTo({
      //         center: [getQueryVariable('lng'),getQueryVariable('lat')],
      //         zoom: 11.5,
      //         bearing: 0,
      //         // These options control the flight curve, making it move
      //         // slowly and zoom out almost completely before starting
      //         // to pan.
      //         speed: 2, // make the flying slow
      //         curve: 1, // change the speed at which it zooms out
      //         // This can be any easing function: it takes a number between
      //         // 0 and 1 and returns another number between 0 and 1.
      //         easing: function (t) {
      //             return t;
      //         }
      //     });
      //     updateURLParams([11.5,getQueryVariable('lat'),getQueryVariable('lng')]);
      //     if(getQueryVariable('parcel')){
      //       console.log('there is parcel');
      //     }else{
      //       console.log('no parcel');
      //       if(getQueryVariable('district')){
      //         console.log('there is district');
      //       }else{
      //         console.log('no district');
      //         if(getQueryVariable('neighborhood')){
      //           console.log('there is neighborhood');
      //         }else{
      //           console.log('no neighborhood - loading city');
      //           mapPanel.createPanel('city');
      //         }
      //       }
      //     }
      //   }else{
      //     mapPanel.createPanel('city');
      //   }
      // }
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
        window.history.pushState({ path: newurl }, '', newurl);
      }
    }
  }]);

  return Router;
}();

exports.default = Router;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXGpzXFxtYWluLmpzIiwiYXBwXFxqc1xccm91dGVyLmNsYXNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBQ0E7Ozs7OztBQUNBLENBQUMsWUFBVTtBQUNULE1BQUksU0FBUywyQkFBYjtBQUNBLFNBQU8sZUFBUCxDQUF1QixFQUFDLFFBQU8sRUFBUixFQUFXLE9BQU0sQ0FBQyxLQUFsQixFQUF3QixPQUFPLEtBQS9CLEVBQXZCO0FBQ0EsTUFBSSxrQkFBa0IsT0FBTyxjQUFQLEVBQXRCO0FBQ0EsVUFBUSxHQUFSLENBQVksTUFBWjtBQUNBLFVBQVEsR0FBUixDQUFZLGVBQVo7QUFDRCxDQU5ELEVBTUcsTUFOSDs7O0FDRkE7Ozs7Ozs7Ozs7SUFDcUIsTTtBQUNuQixvQkFBYztBQUFBOztBQUNaLFNBQUssTUFBTCxHQUFjO0FBQ1osY0FBZ0IsQ0FESjtBQUVaLGFBQWdCLENBRko7QUFHWixhQUFnQixDQUhKO0FBSVosa0JBQWdCLEVBSko7QUFLWixnQkFBZ0IsRUFMSjtBQU1aLGtCQUFnQixFQU5KO0FBT1osY0FBZ0I7QUFQSixLQUFkO0FBU0Q7Ozs7d0NBQ2tCO0FBQ2pCLFVBQUksaUJBQWlCLEVBQXJCO0FBQ0EsVUFBSSxVQUFVO0FBQ1osY0FBTyxjQUFDLEtBQUQsRUFBUTtBQUFFLGlCQUFPLFNBQVEsVUFBUyxDQUF4QjtBQUEwQixTQUQvQjtBQUVaLGFBQU0sYUFBQyxJQUFELEVBQU87QUFBRSxpQkFBTyxRQUFPLFNBQVEsQ0FBdEI7QUFBd0IsU0FGM0I7QUFHWixhQUFNLGFBQUMsSUFBRCxFQUFPO0FBQUUsaUJBQU8sUUFBTyxTQUFRLENBQXRCO0FBQXdCLFNBSDNCO0FBSVosZ0JBQVMsZ0JBQUMsT0FBRCxFQUFVO0FBQUUsaUJBQU8sV0FBVSxZQUFXLEVBQTVCO0FBQStCLFNBSnhDO0FBS1osa0JBQVcsa0JBQUMsU0FBRCxFQUFZO0FBQUUs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QVEsU0FBWixFQUF1QjtBQUNuQixZQUFJLFNBQVMsT0FBTyxRQUFQLENBQWdCLFFBQWhCLEdBQTJCLElBQTNCLEdBQWtDLE9BQU8sUUFBUCxDQUFnQixJQUFsRCxHQUF5RCxPQUFPLFFBQVAsQ0FBZ0IsUUFBekUsR0FBb0YsR0FBcEYsR0FBMEYsVUFBdkc7QUFDQSxlQUFPLE9BQVAsQ0FBZSxTQUFmLENBQXlCLEVBQUMsTUFBSyxNQUFOLEVBQXpCLEVBQXVDLEVBQXZDLEVBQTBDLE1BQTFDO0FBQ0g7QUFDRjs7Ozs7O2tCQTlLZ0IsTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XHJcbmltcG9ydCBSb3V0ZXIgZnJvbSAnLi9yb3V0ZXIuY2xhc3MuanMnO1xyXG4oZnVuY3Rpb24oKXtcclxuICB2YXIgcm91dGVyID0gbmV3IFJvdXRlcigpO1xyXG4gIHJvdXRlci51cGRhdGVVUkxQYXJhbXMoeyd6b29tJzoxMywnbG5nJzotODMuMTUsJ2xhdCc6IDQyLjM2fSk7XHJcbiAgdmFyIGN1cnJlbmV0Um91dGluZyA9IHJvdXRlci5sb2FkVVJMUm91dGluZygpO1xyXG4gIGNvbnNvbGUubG9nKHJvdXRlcik7XHJcbiAgY29uc29sZS5sb2coY3VycmVuZXRSb3V0aW5nKTtcclxufSkod2luZG93KTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5wYXJhbXMgPSB7XHJcbiAgICAgICd6b29tJyAgICAgICAgOiAwLFxyXG4gICAgICAnbG5nJyAgICAgICAgIDogMCxcclxuICAgICAgJ2xhdCcgICAgICAgICA6IDAsXHJcbiAgICAgICdkYXRhU2V0cycgICAgOiAnJyxcclxuICAgICAgJ3BhcmNlbCcgICAgICA6ICcnLFxyXG4gICAgICAnYm91bmRhcnknICAgIDogJycsXHJcbiAgICAgICd2aWV3JyAgICAgICAgOiAnJ1xyXG4gICAgfVxyXG4gIH1cclxuICBnZXRSb3V0aW5nUmVzdWx0cygpe1xyXG4gICAgbGV0IGN1cnJlbnRSb3V0aW5nID0gW107XHJcbiAgICBsZXQgcmVzdWx0cyA9IHtcclxuICAgICAgem9vbSA6ICh6b29tKT0+eyByZXR1cm4gem9vbSAmJiB6b29tICE9PSAwfSxcclxuICAgICAgbG5nIDogKGxuZyk9PnsgcmV0dXJuIGxuZyAmJiBsbmcgIT09IDB9LFxyXG4gICAgICBsYXQgOiAobGF0KT0+eyByZXR1cm4gbGF0ICYmIGxhdCAhPT0gMH0sXHJcbiAgICAgIHBhcmNlbCA6IChwYXJjZWwpPT57IHJldHVybiBwYXJjZWwgJiYgcGFyY2VsICE9PSAnJ30sXHJcbiAgICAgIGRhdGFTZXRzIDogKGRhdGFTZXRzKT0+eyByZXR1cm4gZGF0YVNldHMgJiYgZGF0YVNldHMgIT09ICcnfSxcclxuICAgICAgYm91bmRhcnkgOiAoYm91bmRhcnkpPT57IHJldHVybiBib3VuZGFyeSAmJiBib3VuZGFyeSAhPT0gJyd9LFxyXG4gICAgICB2aWV3IDogKHZpZXcpPT57IHJldHVybiB2aWV3ICYmIHZpZXcgIT09ICcnfVxyXG4gICAgfTtcclxuICAgIGZvcih2YXIga2V5IGluIHJlc3VsdHMpe1xyXG4gICAgICBjdXJyZW50Um91dGluZy5wdXNoKHJlc3VsdHNba2V5XSh0aGlzLmdldFF1ZXJ5VmFyaWFibGUoa2V5KSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGN1cnJlbnRSb3V0aW5nO1xyXG4gIH1cclxuXHJcbiAgbG9hZFVSTFJvdXRpbmcoKSB7XHJcbiAgICB2YXIgY3VycmVudFJvdXRpbmcgPSB0aGlzLmdldFJvdXRpbmdSZXN1bHRzKCk7XHJcbiAgICBjb25zb2xlLmxvZyhjdXJyZW50Um91dGluZyk7XHJcbiAgICBpZihjdXJyZW50Um91dGluZ1tjdXJyZW50Um91dGluZy5sZW5ndGggLSAxXSl7XHJcbiAgICAgIHJldHVybiBjdXJyZW50Um91dGluZ1tjdXJyZW50Um91dGluZy5sZW5ndGggLSAxXTtcclxuICAgIH1lbHNle1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIC8vIGlmKHRoaXMuZ2V0UXVlcnlWYXJpYWJsZSgnem9vbScpKXtcclxuICAgIC8vICAgaWYgKGdldFF1ZXJ5VmFyaWFibGUoJ2xhdCcpICYmIChnZXRRdWVyeVZhcmlhYmxlKCdsYXQnKSAhPT0gJzAnKSkge1xyXG4gICAgLy8gICAgIHN3aXRjaCAodHJ1ZSkge1xyXG4gICAgLy8gICAgICAgY2FzZSBnZXRRdWVyeVZhcmlhYmxlKCdib3VuZGFyaWVzJykgIT09IGZhbHNlOlxyXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZygnbG9hZCBkaXN0cmljdCBwYW5lbCcpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLnVwZGF0ZVVSTFBhcmFtcyh7J3pvb20nOmdldFF1ZXJ5VmFyaWFibGUoJ3pvb20nKSwnbG5nJzpnZXRRdWVyeVZhcmlhYmxlKCdsbmcnKSwnbGF0JzpnZXRRdWVyeVZhcmlhYmxlKCdsYXQnKSwnYm91bmRhcmllcyc6Z2V0UXVlcnlWYXJpYWJsZSgnYm91bmRhcmllcycpXSk7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRVUkxQYXJhbXMpO1xyXG4gICAgLy8gICAgICAgICBtYXBQYW5lbC5jcmVhdGVGZWF0dXJlRGF0YSgpO1xyXG4gICAgLy8gICAgICAgICBicmVhaztcclxuICAgIC8vICAgICAgIGNhc2UgZ2V0UXVlcnlWYXJpYWJsZSgnbmVpZ2hib3Job29kJykgIT09IGZhbHNlOlxyXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZygnbG9hZCBuZWlnaGJvcmhvb2QgcGFuZWwnKTtcclxuICAgIC8vICAgICAgICAgdXBkYXRlVVJMUGFyYW1zKFtnZXRRdWVyeVZhcmlhYmxlKCd6b29tJyksZ2V0UXVlcnlWYXJpYWJsZSgnbG5nJyksZ2V0UXVlcnlWYXJpYWJsZSgnbGF0JyksJycsJycsZ2V0UXVlcnlWYXJpYWJsZSgnbmVpZ2hib3Job29kJyldKTtcclxuICAgIC8vICAgICAgICAgbWFwUGFuZWwuY3JlYXRlRmVhdHVyZURhdGEoKTtcclxuICAgIC8vICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICBjYXNlIGdldFF1ZXJ5VmFyaWFibGUoJ3BhcmNlbCcpICE9PSBmYWxzZTpcclxuICAgIC8vICAgICAgICAgdXBkYXRlVVJMUGFyYW1zKFtnZXRRdWVyeVZhcmlhYmxlKCd6b29tJyksZ2V0UXVlcnlWYXJpYWJsZSgnbG5nJyksZ2V0UXVlcnlWYXJpYWJsZSgnbGF0JyksZ2V0UXVlcnlWYXJpYWJsZSgncGFyY2VsJyksJycsJyddKTtcclxuICAgIC8vICAgICAgICAgbWFwUGFuZWwuY3JlYXRlRmVhdHVyZURhdGEoKTtcclxuICAgIC8vICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICBkZWZhdWx0OlxyXG4gICAgLy8gICAgICAgICBtYXBQYW5lbC5jcmVhdGVQYW5lbCgnY2l0eScpO1xyXG4gICAgLy8gICAgICAgICBtYXAuZmx5VG8oe1xyXG4gICAgLy8gICAgICAgICAgICAgY2VudGVyOiBbZ2V0UXVlcnlWYXJpYWJsZSgnbG5nJyksZ2V0UXVlcnlWYXJpYWJsZSgnbGF0JyldLFxyXG4gICAgLy8gICAgICAgICAgICAgem9vbTogZ2V0UXVlcnlWYXJpYWJsZSgnem9vbScpLFxyXG4gICAgLy8gICAgICAgICAgICAgYmVhcmluZzogMCxcclxuICAgIC8vICAgICAgICAgICAgIC8vIFRoZXNlIG9wdGlvbnMgY29udHJvbCB0aGUgZmxpZ2h0IGN1cnZlLCBtYWtpbmcgaXQgbW92ZVxyXG4gICAgLy8gICAgICAgICAgICAgLy8gc2xvd2x5IGFuZCB6b29tIG91dCBhbG1vc3QgY29tcGxldGVseSBiZWZvcmUgc3RhcnRpbmdcclxuICAgIC8vICAgICAgICAgICAgIC8vIHRvIHBhbi5cclxuICAgIC8vICAgICAgICAgICAgIHNwZWVkOiAyLCAvLyBtYWtlIHRoZSBmbHlpbmcgc2xvd1xyXG4gICAgLy8gICAgICAgICAgICAgY3VydmU6IDEsIC8vIGNoYW5nZSB0aGUgc3BlZWQgYXQgd2hpY2ggaXQgem9vbXMgb3V0XHJcbiAgICAvLyAgICAgICAgICAgICAvLyBUaGlzIGNhbiBiZSBhbnkgZWFzaW5nIGZ1bmN0aW9uOiBpdCB0YWtlcyBhIG51bWJlciBiZXR3ZWVuXHJcbiAgICAvLyAgICAgICAgICAgICAvLyAwIGFuZCAxIGFuZCByZXR1cm5zIGFub3RoZXIgbnVtYmVyIGJldHdlZW4gMCBhbmQgMS5cclxuICAgIC8vICAgICAgICAgICAgIGVhc2luZzogZnVuY3Rpb24gKHQpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICByZXR1cm4gdDtcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICB9ZWxzZXtcclxuICAgIC8vICAgICBtYXAuZmx5VG8oe1xyXG4gICAgLy8gICAgICAgICBjZW50ZXI6IFstODMuMTUsIDQyLjM2XSxcclxuICAgIC8vICAgICAgICAgem9vbTogZ2V0UXVlcnlWYXJpYWJsZSgnem9vbScpLFxyXG4gICAgLy8gICAgICAgICBiZWFyaW5nOiAwLFxyXG4gICAgLy8gICAgICAgICAvLyBUaGVzZSBvcHRpb25zIGNvbnRyb2wgdGhlIGZsaWdodCBjdXJ2ZSwgbWFraW5nIGl0IG1vdmVcclxuICAgIC8vICAgICAgICAgLy8gc2xvd2x5IGFuZCB6b29tIG91dCBhbG1vc3QgY29tcGxldGVseSBiZWZvcmUgc3RhcnRpbmdcclxuICAgIC8vICAgICAgICAgLy8gdG8gcGFuLlxyXG4gICAgLy8gICAgICAgICBzcGVlZDogMiwgLy8gbWFrZSB0aGUgZmx5aW5nIHNsb3dcclxuICAgIC8vICAgICAgICAgY3VydmU6IDEsIC8vIGNoYW5nZSB0aGUgc3BlZWQgYXQgd2hpY2ggaXQgem9vbXMgb3V0XHJcbiAgICAvLyAgICAgICAgIC8vIFRoaXMgY2FuIGJlIGFueSBlYXNpbmcgZnVuY3Rpb246IGl0IHRha2VzIGEgbnVtYmVyIGJldHdlZW5cclxuICAgIC8vICAgICAgICAgLy8gMCBhbmQgMSBhbmQgcmV0dXJucyBhbm90aGVyIG51bWJlciBiZXR3ZWVuIDAgYW5kIDEuXHJcbiAgICAvLyAgICAgICAgIGVhc2luZzogZnVuY3Rpb24gKHQpIHtcclxuICAgIC8vICAgICAgICAgICAgIHJldHVybiB0O1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyAgICAgdXBkYXRlVVJMUGFyYW1zKFtnZXRRdWVyeVZhcmlhYmxlKCd6b29tJyksLTgzLjE1LCA0Mi4zNl0pO1xyXG4gICAgLy8gICAgIGlmKGdldFF1ZXJ5VmFyaWFibGUoJ3BhcmNlbCcpKXtcclxuICAgIC8vICAgICAgIGNvbnNvbGUubG9nKCd0aGVyZSBpcyBwYXJjZWwnKTtcclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgIGNvbnNvbGUubG9nKCdubyBwYXJjZWwnKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH1lbHNle1xyXG4gICAgLy8gICBpZiAoZ2V0UXVlcnlWYXJpYWJsZSgnbGF0JykpIHtcclxuICAgIC8vICAgICBtYXAuZmx5VG8oe1xyXG4gICAgLy8gICAgICAgICBjZW50ZXI6IFtnZXRRdWVyeVZhcmlhYmxlKCdsbmcnKSxnZXRRdWVyeVZhcmlhYmxlKCdsYXQnKV0sXHJcbiAgICAvLyAgICAgICAgIHpvb206IDExLjUsXHJcbiAgICAvLyAgICAgICAgIGJlYXJpbmc6IDAsXHJcbiAgICAvLyAgICAgICAgIC8vIFRoZXNlIG9wdGlvbnMgY29udHJvbCB0aGUgZmxpZ2h0IGN1cnZlLCBtYWtpbmcgaXQgbW92ZVxyXG4gICAgLy8gICAgICAgICAvLyBzbG93bHkgYW5kIHpvb20gb3V0IGFsbW9zdCBjb21wbGV0ZWx5IGJlZm9yZSBzdGFydGluZ1xyXG4gICAgLy8gICAgICAgICAvLyB0byBwYW4uXHJcbiAgICAvLyAgICAgICAgIHNwZWVkOiAyLCAvLyBtYWtlIHRoZSBmbHlpbmcgc2xvd1xyXG4gICAgLy8gICAgICAgICBjdXJ2ZTogMSwgLy8gY2hhbmdlIHRoZSBzcGVlZCBhdCB3aGljaCBpdCB6b29tcyBvdXRcclxuICAgIC8vICAgICAgICAgLy8gVGhpcyBjYW4gYmUgYW55IGVhc2luZyBmdW5jdGlvbjogaXQgdGFrZXMgYSBudW1iZXIgYmV0d2VlblxyXG4gICAgLy8gICAgICAgICAvLyAwIGFuZCAxIGFuZCByZXR1cm5zIGFub3RoZXIgbnVtYmVyIGJldHdlZW4gMCBhbmQgMS5cclxuICAgIC8vICAgICAgICAgZWFzaW5nOiBmdW5jdGlvbiAodCkge1xyXG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgICB1cGRhdGVVUkxQYXJhbXMoWzExLjUsZ2V0UXVlcnlWYXJpYWJsZSgnbGF0JyksZ2V0UXVlcnlWYXJpYWJsZSgnbG5nJyldKTtcclxuICAgIC8vICAgICBpZihnZXRRdWVyeVZhcmlhYmxlKCdwYXJjZWwnKSl7XHJcbiAgICAvLyAgICAgICBjb25zb2xlLmxvZygndGhlcmUgaXMgcGFyY2VsJyk7XHJcbiAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICBjb25zb2xlLmxvZygnbm8gcGFyY2VsJyk7XHJcbiAgICAvLyAgICAgICBpZihnZXRRdWVyeVZhcmlhYmxlKCdkaXN0cmljdCcpKXtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coJ3RoZXJlIGlzIGRpc3RyaWN0Jyk7XHJcbiAgICAvLyAgICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coJ25vIGRpc3RyaWN0Jyk7XHJcbiAgICAvLyAgICAgICAgIGlmKGdldFF1ZXJ5VmFyaWFibGUoJ25laWdoYm9yaG9vZCcpKXtcclxuICAgIC8vICAgICAgICAgICBjb25zb2xlLmxvZygndGhlcmUgaXMgbmVpZ2hib3Job29kJyk7XHJcbiAgICAvLyAgICAgICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICAgIGNvbnNvbGUubG9nKCdubyBuZWlnaGJvcmhvb2QgLSBsb2FkaW5nIGNpdHknKTtcclxuICAgIC8vICAgICAgICAgICBtYXBQYW5lbC5jcmVhdGVQYW5lbCgnY2l0eScpO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgICB9XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICB9ZWxzZXtcclxuICAgIC8vICAgICBtYXBQYW5lbC5jcmVhdGVQYW5lbCgnY2l0eScpO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9XHJcbiAgICB9XHJcbiAgICBnZXRRdWVyeVZhcmlhYmxlKHZhcmlhYmxlKSB7XHJcbiAgICAgIHZhciBxdWVyeSA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpO1xyXG4gICAgICB2YXIgdmFycyA9IHF1ZXJ5LnNwbGl0KFwiJlwiKTtcclxuICAgICAgZm9yICh2YXIgaT0wO2k8dmFycy5sZW5ndGg7aSsrKSB7XHJcbiAgICAgICAgdmFyIHBhaXIgPSB2YXJzW2ldLnNwbGl0KFwiPVwiKTtcclxuICAgICAgICBpZihwYWlyWzBdID09IHZhcmlhYmxlKXtcclxuICAgICAgICAgIGlmKHBhaXJbMV0gIT09ICcnKXtcclxuICAgICAgICAgICByZXR1cm4gcGFpclsxXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuKGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVVUkxQYXJhbXMobmV3UGFyYW1zKSB7XHJcbiAgICAgIGZvciAodmFyIGl0ZW0gaW4gbmV3UGFyYW1zKXtcclxuICAgICAgICBpZiAodGhpcy5wYXJhbXMuaGFzT3duUHJvcGVydHkoaXRlbSkpe1xyXG4gICAgICAgICAgdGhpcy5wYXJhbXNbaXRlbV0gPSBuZXdQYXJhbXNbaXRlbV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHZhciBuZXdUZW1wVVJMID0gJyc7XHJcbiAgICAgIGZvciAodmFyIHByb3BlcnR5IGluIHRoaXMucGFyYW1zKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5wYXJhbXMuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XHJcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocHJvcGVydHkpO1xyXG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGN1cnJlbnRVUkxQYXJhbXNbcHJvcGVydHldKTtcclxuICAgICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgcHJvcGVydHkgIT09IDA6XHJcbiAgICAgICAgICAgICAgICAgIG5ld1RlbXBVUkwgKz0gcHJvcGVydHkgKyAnPScgKyB0aGlzLnBhcmFtc1twcm9wZXJ0eV0gKyAnJic7XHJcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKG5ld1RlbXBVUkwpO1xyXG4gICAgICBpZiAoaGlzdG9yeS5wdXNoU3RhdGUpIHtcclxuICAgICAgICAgIHZhciBuZXd1cmwgPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyB3aW5kb3cubG9jYXRpb24uaG9zdCArIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArICc/JyArIG5ld1RlbXBVUkw7XHJcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe3BhdGg6bmV3dXJsfSwnJyxuZXd1cmwpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19
