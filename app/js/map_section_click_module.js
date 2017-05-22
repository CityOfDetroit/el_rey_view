"use strict";
var mapSectionClickModule = (function(){
  map.on('click', function (e) {
    console.log(e);
    var councilFeatures = null;
    var neighborhoodsFeatures = null;
    var parcelFeatures = null;
    try {
      councilFeatures = map.queryRenderedFeatures(e.point, { layers: ['council-fill'] });
      neighborhoodsFeatures = map.queryRenderedFeatures(e.point, { layers: ['neighborhoods-fill'] });
      parcelFeatures = map.queryRenderedFeatures(e.point, { layers: ['parcel-fill'] });
    } catch (e) {
      //console.log("ERROR: " +e);
    } finally {
      //console.log(councilFeatures.length);
      //console.log(neighborhoodsFeatures.length);
      //console.log(parcelFeatures.length);
    }
    switch (true) {
      case councilFeatures.length !== 0:
        var features = map.queryRenderedFeatures(e.point, { layers: ['council-fill'] });
        mapPanel.featureData = features[0];
        updateURLParams([13,e.lngLat.lng, e.lngLat.lat, '',features[0].properties.name]);
        mapPanel.createPanel('district');
        break;
      case neighborhoodsFeatures.length !== 0:
        var features = map.queryRenderedFeatures(e.point, { layers: ['neighborhoods-fill'] });
        mapPanel.featureData = features[0];
        updateURLParams([16,e.lngLat.lng, e.lngLat.lat, '','',features[0].properties.name]);
        mapPanel.createPanel('neighborhood');
        break;
      case parcelFeatures.length !== 0:
        // clearing panel data
        document.querySelector('.overall-number').innerHTML = '';
        document.querySelector('.parcel-info').innerHTML = '';
        document.querySelector('.info-container > .street-name').innerHTML = '';
        document.querySelector('.info-container > .total-rentals').innerHTML = '';
        document.querySelector('.parcel-data.owner').innerHTML = '';
        document.querySelector('.parcel-data.building').innerHTML = '';
        document.querySelector('.parcel-info.display-section').innerHTML = '';
        //console.log(parcelFeatures[0].properties);
        map.setFilter("parcel-fill-hover", ["==", "parcelno", parcelFeatures[0].properties.parcelno]);
        updateURLParams([undefined,e.lngLat.lng, e.lngLat.lat,parcelFeatures[0].properties.parcelno]);
        $.getJSON("https://services2.arcgis.com/qvkbeam7Wirps6zC/ArcGIS/rest/services/Rental_Inspections/FeatureServer/0/query?where="+ encodeURI("ParcelNo='"+parcelFeatures[0].properties.parcelno+"'")+"&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=ACTION_DESCRIPTION%2C+ParcelNo%2C+CSM_RECD_DATE&returnGeometry=true&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&sqlFormat=none&f=json&token=", function( Rental_Inspections ) {
          console.log(Rental_Inspections);
          var tempParcelDataHTML = '';
          if(Rental_Inspections.features.length){
            if(Rental_Inspections.features[0].properties){
              tempParcelDataHTML += '<article class="info-items"><span>RENTAL STATUS</span> ';
              switch (Rental_Inspections.features[0].properties.ACTION_DESCRIPTION) {
                case 'Issue Initial Registration':
                  tempParcelDataHTML += '<initial><strong>Certificate of Registration Issued on</strong></initial><br>'+ moment(Rental_Inspections.features[0].properties.CSM_RECD_DATE).format('MMM Do,YYYY') +'</article>';
                  break;
                case 'Issue Renewal Registration':
                  tempParcelDataHTML += '<initial><strong>Certificate of Registration Issued on</strong></initial><br>'+ moment(Rental_Inspections.features[0].properties.CSM_RECD_DATE).format('MMM Do,YYYY') +'</article>';
                  break;
                default:
                  tempParcelDataHTML += '<cofc><strong>Certificate of Compliance Issued on</strong></cofc><br>'+ moment(Rental_Inspections.features[0].properties.CSM_RECD_DATE).format('MMM Do,YYYY') +'</article>';
              }
            }else{
              tempParcelDataHTML += '<article class="info-items"><span>RENTAL STATUS</span> ';
              switch (Rental_Inspections.features[0].attributes.ACTION_DESCRIPTION) {
                case 'Issue Initial Registration ':
                  tempParcelDataHTML += '<initial><strong>Certificate of Registration Issued on</strong></initial><br>'+ moment(Rental_Inspections.features[0].attributes.CSM_RECD_DATE).format('MMM Do,YYYY') +'</article>';
                  break;
                case 'Issue Renewal Registration':
                  tempParcelDataHTML += '<initial><strong>Certificate of Registration Issued on</strong></initial><br>'+ moment(Rental_Inspections.features[0].attributes.CSM_RECD_DATE).format('MMM Do,YYYY') +'</article>';
                  break;
                default:
                  tempParcelDataHTML += '<cofc><strong>Certificate of Compliance Issued on</strong></cofc><br>'+ moment(Rental_Inspections.features[0].attributes.CSM_RECD_DATE).format('MMM Do,YYYY') +'</article>';
              }
            }
            document.querySelector('.parcel-info.rental-info').innerHTML = tempParcelDataHTML;
            document.querySelector('.info-container > .rental').innerHTML = '<a href="https://app.smartsheet.com/b/form?EQBCT=efa41296fdc646dcadc3cbca2d6fd6ac" target="_blank"><article class="form-btn">SUBMIT RENTAL COMPLAINT</article></a>';
            document.querySelector('.info-container > .not-rental').innerHTML = '';
          }else{
            tempParcelDataHTML += '<article class="info-items"><span>RENTAL STATUS</span> Not a Rental</article>';
            document.querySelector('.parcel-info.rental-info').innerHTML = tempParcelDataHTML;
            document.querySelector('.info-container > .not-rental').innerHTML = '<a href="https://app.smartsheet.com/b/form?EQBCT=7b3746bd20a048a5919ae07bd9ed89de" target="_blank"><article class="form-btn">REGISTER MY RENTAL</article></a>';
            document.querySelector('.info-container > .rental').innerHTML = '<a href="https://app.smartsheet.com/b/form?EQBCT=efa41296fdc646dcadc3cbca2d6fd6ac" target="_blank"><article class="form-btn">SUBMIT RENTAL COMPLAINT</article></a>';
          }
        });
        $.getJSON("http://apis.detroitmi.gov/assessments/parcel/"+parcelFeatures[0].properties.parcelno.replace(/\./g,'_')+"/", function( parcel ) {
          //console.log(parcel);
          document.querySelector('.info-container > .street-name').innerHTML = parcel.propstreetcombined;
          // tempParcelDataHTML += '<article class="info-items"><span>OWNER</span> ' + parcel.ownername1 + '</article>';
          // tempParcelDataHTML += '<article class="info-items"><span>BUILDING TYPE</span> ' + parcel.resb_style + '</article>';
          // tempParcelDataHTML += '<article class="info-items"><span>PARCEL NUMBER</span> ' + parcel.pnum + '</article>';
          // tempParcelDataHTML += '<article class="info-items"><span>YEAR BUILT</span> ' + parcel.resb_yearbuilt + '</article>';
          // document.querySelector('.parcel-info').innerHTML = tempParcelDataHTML;
          document.querySelector('.parcel-data.owner').innerHTML = '<div class="data-view-btn" data-view="owner" onclick="switchParcelDataViews(this)">OWNER INFORMATION <span>&#10095;</span></div>';
          document.querySelector('.parcel-data.building').innerHTML = '<div class="data-view-btn" data-view="building" onclick="switchParcelDataViews(this)">PROPERTY INFORMATION <span>&#10095;</span></div>';
          parcelData['parcel-data'] = parcel;
        });
        (document.querySelector('#info').className === 'active') ? 0 : document.querySelector('#info').className = 'active';
        break;
      default:

      }
  });
})(window);
