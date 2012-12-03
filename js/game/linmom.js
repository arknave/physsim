canvw = 620;
canvh = 200;

function init(){
  this.canvas = $("#canvas")[0];
  this.ctx = canvas.getContext("2d");
  this.block1 = new Block(0, 35, 35, 5, 7, "CC0000");
  this.block2 = new Block(100, 35, 35, 5, 5, "3465a4");
  totmom = block1.mom + block2.mom;
  toteng = block1.ke + block2.ke;
  draw();
};


function draw() {
  ctx.clearRect(0,0, canvw, canvh);
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, canvh-2, canvw, 2);
  block1.draw(ctx, canvh-block1.h-2);
  block2.draw(ctx, canvh-block2.h-2);
};

function updatetable(){
  $("#pos1").val(block1.x);
  $("#vel1").val(block1.sp);
  $("#mass1").val(block1.m);
  $("#mom1").val(block1.mom);
  $("#eng1").val(block1.ke);

  $("#pos2").val(block2.x);
  $("#vel2").val(block2.sp);
  $("#mass2").val(block2.m);
  $("#mom2").val(block2.mom);
  $("#eng2").val(block2.ke);
}

function run(){
  block1.x += block1.sp;
  block2.x += block2.sp;
  draw();
  updatetable();
  if(block1.x>=canvw&&block2.x>=canvw){
    block1.x = 0;
    block2.x = 100;
  }
};

function runback(){
  block1.x -= block1.sp;
  block2.x -= block2.sp;
  draw();
  updatetable(block1, block2);
  if(block1.x<block1.w&&block2.x<-block2.w){
    block1.x = 0;
    block2.x = 100;
  }
}

init();