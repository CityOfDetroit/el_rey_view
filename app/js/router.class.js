'use strict';
export default class Router {
  constructor() {
    this.params = {
      'zoom'        : 0,
      'lng'         : 0,
      'lat'         : 0,
      'dataSets'    : '',
      'parcel'      : '',
      'boundary'    : '',
      'view'        : ''
    }
  }
  getRoutingResults(){
    let currentRouting = [];
    let results = {
      zoom : (zoom)=>{ return zoom && zoom !== 0},
      lng : (lng)=>{ return lng && lng !== 0},
      lat : (lat)=>{ return lat && lat !== 0},
      parcel : (parcel)=>{ return parcel && parcel !== ''},
      dataSets : (dataSets)=>{ return dataSets && dataSets !== ''},
      boundary : (boundary)=>{ return boundary && boundary !== ''},
      view : (view)=>{ return view && view !== ''}
    };
    for(var key in results){
      currentRouting.push(results[key](this.getQueryVariable(key)));
    }
    return currentRouting;
  }

  loadURLRouting() {
    var currentRouting = this.getRoutingResults();
    console.log(currentRouting);
    if(currentRouting[currentRouting.length - 1]){
      return currentRouting[currentRouting.length - 1];
    }else{
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
    getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){
          if(pair[1] !== ''){
           return pair[1];
          }
        }
      }
      return(false);
    }

    updateURLParams(newParams) {
      for (var item in newParams){
        if (this.params.hasOwnProperty(item)){
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
          window.history.pushState({path:newurl},'',newurl);
      }
    }
}
