'use strict';
(function(){
  var router = new Router({
    'zoom'        : 0,
    'lng'         : 0,
    'lat'         : 0,
    'dataSets'    : '',
    'parcel'      : '',
    'boundary'    : '',
    'view'        : ''
  });
  var mapPanel = Object.create(panelModule);
  var survey = Object.create(surveyModule);
  var activeView = 'data-results-view-btn';
  var activeBoundary = 'district';
})(window);
