var Router = (function() {

  function Router(params) {
    console.log(params);
    this.params = params;
    console.log(this.params);
  }

  Router.prototype.getRoutingResults = function(){
    var conditions = [
      ()=>{ this.getQueryVariable('zoom') && this.getQueryVariable('zoom') !== 0},
      ()=>{ this.getQueryVariable('lng') && this.getQueryVariable('lng') !== 0},
      ()=>{ this.getQueryVariable('lat') && this.getQueryVariable('lat') !== 0},
      ()=>{ this.getQueryVariable('dataSets') && this.getQueryVariable('dataSets') !== ""},
      ()=>{ this.getQueryVariable('parcel') && this.getQueryVariable('parcel') !== ""},
      ()=>{ this.getQueryVariable('boundary') && this.getQueryVariable('boundary') !== ""},
      ()=>{ this.getQueryVariable('view') && this.getQueryVariable('view') !== ""}
    ];
    var currentRouting = [];
    conditions.forEach(function(status) {
      currentRouting.push(status);
    });
    return currentRouting;
  };

  Router.prototype.loadURLRouting = function () {
    var currentRouting = this.getRoutingResults();
    console.log(currentRouting);
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
  };
  Router.prototype.getQueryVariable = function (variable) {
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
  };
  Router.prototype.updateURLParams = function (newParams) {
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
                newTempURL += property + '=' + currentURLParams[property] + '&';
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
  };
  return Router;
}());
