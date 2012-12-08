Backbone.View.prototype.close = function(){
  if(this.beforeClose){
    this.beforeClose();
  }
  this.remove();
  this.unbind();
}