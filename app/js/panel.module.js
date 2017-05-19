"use strict";
var panelModule = (function(){
  var setTempData = function(obj){
    panel.tempData.registrationNumbers = obj.registrationNumbers;
    panel.tempData.totalNumbers = obj.totalNumbers;
  };
  var getTempData = function(){
    return panel.tempData;
  };
  var setTempHTML = function(obj){
    panel.tempHTML = obj;
  };
  var getTempHTML = function(){
    return panel.tempHTML;
  };
  var loadPanel = function(){
    switch (true) {
      case panel.displayType === 'parcel':
        console.log('loading parcel data');
        break;
      case panel.displayType === 'neighborhood':
        document.querySelector('.info-container > .street-name').innerHTML = 'CITY OF DETROIT';
        document.querySelector('.info-container > .rental').innerHTML = '<a href="https://app.smartsheet.com/b/form?EQBCT=efa41296fdc646dcadc3cbca2d6fd6ac" target="_blank"><article class="form-btn">SUBMIT RENTAL COMPLAINT</article></a>';
        document.querySelector('.info-container > .total-rentals').innerHTML = "<h4>TOTAL RENTALS</h4><p>0</p>";
        document.querySelector('.overall-number').innerHTML = panel.tempHTML;
        document.querySelector('.info-container > .total-rentals > p').innerHTML = panel.tempData.totalNumbers;
        break;
      case panel.displayType === 'district':
        document.querySelector('.info-container > .street-name').innerHTML = 'CITY OF DETROIT';
        document.querySelector('.info-container > .rental').innerHTML = '<a href="https://app.smartsheet.com/b/form?EQBCT=efa41296fdc646dcadc3cbca2d6fd6ac" target="_blank"><article class="form-btn">SUBMIT RENTAL COMPLAINT</article></a>';
        document.querySelector('.info-container > .total-rentals').innerHTML = "<h4>TOTAL RENTALS</h4><p>0</p>";
        document.querySelector('.overall-number').innerHTML = panel.tempHTML;
        document.querySelector('.info-container > .total-rentals > p').innerHTML = panel.tempData.totalNumbers;
        break;
      default:
        document.querySelector('.info-container > .street-name').innerHTML = 'CITY OF DETROIT';
        document.querySelector('.info-container > .rental').innerHTML = '<a href="https://app.smartsheet.com/b/form?EQBCT=efa41296fdc646dcadc3cbca2d6fd6ac" target="_blank"><article class="form-btn">SUBMIT RENTAL COMPLAINT</article></a>';
        document.querySelector('.info-container > .total-rentals').innerHTML = "<h4>TOTAL RENTALS</h4><p>0</p>";
        document.querySelector('.overall-number').innerHTML = panel.tempHTML;
        document.querySelector('.info-container > .total-rentals > p').innerHTML = panel.tempData.totalNumbers;
    }
    (document.querySelector('#info').className === 'active') ? 0 : document.querySelector('#info').className = 'active';
  };
  var getTempFeatureData = function getTempFeatureData(){
    return panel.featureData;
  };
  var setTempFeatureData = function setDisplayTypeTempFeatureData(feature){
    console.log(feature);
    panel.featureData = feature;
  };
  var panel = {
    'featureData'   : null,
    'displayType'   : '',
    'tempHTML'      : '',
    'tempData'      : {'registrationNumbers':0,'totalNumbers':0},
    createPanel     : function(type){
      this.setDisplayType(type);
      this.clearPanel();
      this.createPanelData();
      loadPanel();
    },
    setDisplayType  : function(type){
      this.displayType = type;
    },
    clearPanel      : function(){
      console.log('clearing panel');
      this.tempData.registrationNumbers = 0;
      this.tempData.totalNumbers = 0;
      this.tempHTML = '';
      console.log(this.tempHTML);
      document.querySelector('.overall-number').innerHTML = '';
      document.querySelector('.parcel-info').innerHTML = '';
      document.querySelector('.info-container > .not-rental').innerHTML = '';
      document.querySelector('.info-container > .rental').innerHTML = '';
      document.querySelector('.info-container > .total-rentals').innerHTML = '';
      document.querySelector('.parcel-data.owner').innerHTML = '';
      document.querySelector('.parcel-data.building').innerHTML = '';
      document.querySelector('.parcel-info.display-section').innerHTML = '';
    },
    createPanelData : function(){
      switch (true) {
        case this.displayType === 'parcel':
          console.log('loading parcel data');
          break;
        case this.displayType === 'neighborhood':
          console.log('loading neighborhood data');
          break;
        case this.displayType === 'district':
          setTempHTML('');
          console.log('creating district panel');
          var simplifiedDistrict = turf.simplify(this.featureData, 0.003, false);
          console.log(simplifiedDistrict);
          var arcDistrictPolygon = Terraformer.ArcGIS.convert(simplifiedDistrict.geometry);
          // console.log(arcPolygon);
          $.getJSON("https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Rental_Inspections/FeatureServer/0/query?where=ACTION_DESCRIPTION%3D%27Issue+Initial+Registration%27+AND+ParcelNo+IS+NOT+NULL&objectIds=&time=&geometry="+ encodeURI(JSON.stringify(arcDistrictPolygon))+"&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=&returnGeometry=true&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=true&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&sqlFormat=none&f=json&token=", function( data ) {
            console.log(getTempData());
            var localDistrictData = getTempData();
            console.log(localDistrictData);
            localDistrictData.totalNumbers += data.count;
            localDistrictData.registrationNumbers += data.count;
            console.log(localDistrictData);
            setTempData(localDistrictData);
            console.log(getTempData());
            $.getJSON("https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Rental_Inspections/FeatureServer/0/query?where=ACTION_DESCRIPTION%3D%27Issue+Renewal+Registration%27+AND+ParcelNo+IS+NOT+NULL&objectIds=&time=&geometry="+ encodeURI(JSON.stringify(arcDistrictPolygon))+"&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=&returnGeometry=true&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=true&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&sqlFormat=none&f=json&token=", function( data ) {
              console.log(getTempData());
              var localDistrictData = getTempData();
              var localDistrictHTML = getTempHTML();
              console.log(localDistrictHTML);
              console.log(localDistrictData);
              localDistrictData.totalNumbers += data.count;
              localDistrictData.registrationNumbers += data.count;
              console.log(localDistrictData);
              localDistrictHTML += '<article class="initial"><span>CERTIFICATE OF REGISTRATION</span> ' + localDistrictData.registrationNumbers + '</article>';
              console.log(localDistrictHTML);
              setTempHTML(localDistrictHTML);
              setTempData(localDistrictData);
              loadPanel();
            });
          });
          $.getJSON("https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Rental_Inspections/FeatureServer/0/query?where=ACTION_DESCRIPTION%3D%27Issue+City+C+of+C+-++Ord+18-03%27+AND+ParcelNo+IS+NOT+NULL&objectIds=&time=&geometry="+ encodeURI(JSON.stringify(arcDistrictPolygon))+"&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=&returnGeometry=true&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=true&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&sqlFormat=none&f=json&token=", function( data ) {
            console.log(getTempData());
            var localDistrictData = getTempData();
            var localDistrictHTML = getTempHTML();
            localDistrictData.totalNumbers += data.count;
            setTempData(localDistrictData);
            localDistrictHTML += '<article class="cofc"><span>CERTIFICATE OF COMPLIANCE</span> ' + data.count + '</article>';
            setTempHTML(localDistrictHTML);
            loadPanel();
          });
          map.flyTo({
              center: [currentURLParams.lng, currentURLParams.lat],
              zoom: currentURLParams.zoom,
              bearing: 0,

              // These options control the flight curve, making it move
              // slowly and zoom out almost completely before starting
              // to pan.
              speed: 2, // make the flying slow
              curve: 1, // change the speed at which it zooms out

              // This can be any easing function: it takes a number between
              // 0 and 1 and returns another number between 0 and 1.
              easing: function (t) {
                  return t;
              }
          });
          break;
        default:
          console.log(this.tempData);
          $.getJSON("https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Rental_Inspections/FeatureServer/0/query?where=ACTION_DESCRIPTION%3D%27Issue+Initial+Registration%27+AND+ParcelNo+IS+NOT+NULL&objectIds=&time=&geometry=&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=&returnGeometry=true&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=true&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&sqlFormat=none&f=json&token=", function( data ) {
            console.log(getTempData());
            var localData = getTempData();
            console.log(localData);
            localData.totalNumbers += data.count;
            localData.registrationNumbers += data.count;
            console.log(localData);
            setTempData(localData);
            console.log(getTempData());
            $.getJSON("https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Rental_Inspections/FeatureServer/0/query?where=ACTION_DESCRIPTION%3D%27Issue+Renewal+Registration%27+AND+ParcelNo+IS+NOT+NULL&objectIds=&time=&geometry=&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=&returnGeometry=true&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=true&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&sqlFormat=none&f=json&token=", function( data ) {
              console.log(getTempData());
              var localData = getTempData();
              var localHTML = getTempHTML();
              console.log(localHTML);
              console.log(localData);
              localData.totalNumbers += data.count;
              localData.registrationNumbers += data.count;
              console.log(localData);
              localHTML += '<article class="initial"><span>CERTIFICATE OF REGISTRATION</span> ' + localData.registrationNumbers + '</article>';
              console.log(localHTML);
              setTempHTML(localHTML);
              setTempData(localData);
              loadPanel();
            });
          });
          $.getJSON("https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Rental_Inspections/FeatureServer/0/query?where=ACTION_DESCRIPTION%3D%27Issue+City+C+of+C+-++Ord+18-03%27+AND+ParcelNo+IS+NOT+NULL&objectIds=&time=&geometry=&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=&returnGeometry=true&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=true&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&sqlFormat=none&f=json&token=", function( data ) {
            console.log(getTempData());
            var localData = getTempData();
            var localHTML = getTempHTML();
            localData.totalNumbers += data.count;
            setTempData(localData);
            localHTML += '<article class="cofc"><span>CERTIFICATE OF COMPLIANCE</span> ' + data.count + '</article>';
            setTempHTML(localHTML);
            loadPanel();
          });
      }
    }
  };
  return panel;
})(window);
