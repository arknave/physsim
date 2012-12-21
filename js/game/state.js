function speed(sspd){
  this.spdlbl = [".25x", ".5x", "1x", "2x", "4x", "8x"];
  this.speeds = [480, 240, 120, 60, 30, 15];
  if(sspd&&(sspd>=0&&sspd<=5)){
    this.spd = sspd;
  }
  else{
    this.spd = 2;
  }
};

speed.prototype.up = function(){
  if(this.spd < 5) this.spd++;
}

speed.prototype.down = function(){
  if(this.spd > 0) this.spd--;
}

speed.prototype.getSpeed = function(){
  return this.speeds[this.spd];
}

speed.prototype.getLabel = function(){
  return this.spdlbl[this.spd];
}

function state(){
	 this.canvas = $("#canvas")[0];
	 this.ctx = canvas.getContext('2d');
	 this.canvw = 620;
	 this.canvh = 200;
  this.speed = new speed(2);
  this.block1 = new Block(0, 35, 35, 5, 7, "CC0000");
  this.block2 = new Block(100, 35, 35, 5, 5, "3465a4");
  this.flrheight = 2;
}

state.prototype.drawfloor = function(){
  this.ctx.clearRect(0,0, this.canvw, this.canvh);
  this.ctx.fillStyle = "#000000";
  this.ctx.fillRect(0, this.canvh-this.flrheight, this.canvw, this.flrheight);
}

state.prototype.drawblocks = function(){
	 this.block1.draw(this.ctx, this.canvh - this.block1.h - this.flrheight, this.canvw);
	 this.block2.draw(this.ctx, this.canvh - this.block2.h - this.flrheight, this.canvw);
}

state.prototype.draw = function(){
  this.drawfloor();
  this.drawblocks();	
}

state.prototype.run = function(){
  this.block1.x += this.block1.sp;
  this.block2.x += this.block2.sp;
  this.draw();
  updatetable();
  if(this.block1.x+this.block1.w>=this.block2.x&&this.block1.x<this.block2.x){
    var temp = (this.block1.sp*(this.block1.m-this.block2.m) + 2*this.block2.m*this.block2.sp)/(this.block1.m+this.block2.m);    
    this.block2.sp = (this.block2.sp*(this.block2.m-this.block1.m) + 2*this.block1.m*this.block1.sp)/(this.block1.m+this.block2.m);
    this.block1.sp = temp;     
    this.block1.update();
    this.block2.update();
    updatetable();
  	}
  	if(this.block2.x+this.block2.w>=this.block1.x&&this.block2.x<this.block1.x){
  	  var temp = (this.block1.sp*(this.block1.m-this.block2.m) + 2*this.block2.m*this.block2.sp)/(this.block1.m+this.block2.m);    
    this.block2.sp = (this.block2.sp*(this.block2.m-this.block1.m) + 2*this.block1.m*this.block1.sp)/(this.block1.m+this.block2.m);
    this.block1.sp = temp;     
    this.block1.update();
    this.block2.update();
    updatetable();	
  	}
  	if(this.block1.x>this.canvw){
				this.block1.x %= this.canvw;  	
  	}  	
  	if(this.block2.x>this.canvw){
				this.block2.x %= this.canvw;  	
  	}
}

state.prototype.runback = function(){
  this.block1.x -= this.block1.sp;
  this.block2.x -= this.block2.sp;
  this.draw();
  updatetable();
}

s = new state();
s.draw();
