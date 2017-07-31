module.exports = {
    View
};
var View = (function(){
  var properties = null;
  function View(properties){
    this.properties = properties;
  }
  View.prototype.getView = function(){
    return this.properties.view;
  };
})();
