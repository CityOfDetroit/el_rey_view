'use strict';
import Router from './router.class.js';
(function(){
  var router = new Router();
  router.updateURLParams({'zoom':13,'lng':-83.15,'lat': 42.36});
  var currenetRouting = router.loadURLRouting();
  console.log(router);
  console.log(currenetRouting);
})(window);
