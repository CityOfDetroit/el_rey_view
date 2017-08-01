'use strict';
import Router from './router.class.js';
import Template from './template.class.js';
(function(){
  var router = new Router();
  router.updateURLParams({'zoom':13,'lng':-83.15,'lat': 42.36});
  var currenetRouting = router.loadURLRouting();
  console.log(router);
  console.log(currenetRouting);
  var template = new Template();
  console.log(template.generateTemplate({
    title: "TITLE",
    mainTitle : "Main title",
    mainData  : 225,
    subTitle : "Sub title",
    subData  : null
  }));

})(window);
