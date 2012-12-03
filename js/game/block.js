function Block(x, w, h, m, sp, color){
  this.x = x;
  this.w = w;
  this.h = h;
  this.m = m;
  this.sp = sp;
  this.color = color || "000000";
  this.update();
};

Block.prototype.update = function(){
  this.mom = this.m*this.sp;
  this.ke = .5 * this.m * this.sp * this.sp;
}

Block.prototype.draw = function(ctx, y){
  ctx.fillStyle = "#" + this.color;
  ctx.fillRect(this.x, y, this.w, this.h);
}