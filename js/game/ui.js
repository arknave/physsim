var state = 'stop'; // values are stop, move, pause

function btnbar(){
  if(state==='stop'){
    $("#back").removeClass('disabled');
    $("#pause").addClass('disabled');
    $("#stop").addClass('disabled');
    $("#play").removeClass('disabled');
    $("#forw").removeClass('disabled');
  }
  else if(state==='move'){
    $("#back").addClass('disabled');
    $("#pause").removeClass('disabled');
    $("#stop").removeClass('disabled');
    $("#play").addClass('disabled');
    $("#forw").addClass('disabled');
  }
  else if(state==='pa	use'){
    $("#back").removeClass('disabled');
    $("#pause").removeClass('disabled');
    $("#stop").addClass('disabled');
    $("#play").addClass('disabled');
    $("#forw").removeClass('disabled');
  }
}

function updatetable(){
  $("#pos1").val(s.block1.x);
  $("#vel1").val(s.block1.sp);
  $("#mass1").val(s.block1.m);
  $("#mom1").val(s.block1.mom);
  $("#eng1").val(s.block1.ke);

  $("#pos2").val(s.block2.x);
  $("#vel2").val(s.block2.sp);
  $("#mass2").val(s.block2.m);
  $("#mom2").val(s.block2.mom);
  $("#eng2").val(s.block2.ke);
}

$("#back").click(function(){
  if($(this).hasClass('disabled')){
    return;
  }
  s.runback();
});

$("#slow").click(function(){
  s.speed.down();
  $("#speed").text(s.speed.getLabel());
  if(state==='move'){
    if(loop) clearInterval(loop);
    loop = setInterval("s.run()", s.speed.getSpeed());;
  }
});

$("#pause").click(function(){
  if($(this).hasClass('disabled')){
    return;
  };
  switch(state){
    case "stop":
      break;
    case "move":
      state = 'pause';
      btnbar();
      if(loop) clearInterval(loop);
      break;
    case "pause":
      state = 'move';
      btnbar();
      loop = setInterval("s.run()", s.speed.getSpeed());
      break;
    default:
      alert("Invalid state received: "+state);
      break;
  }
});

$("#stop").click(function(){
  if($(this).hasClass('disabled')) return;
  state = 'stop';
  btnbar();
  if(loop) clearInterval(loop);
})

$("#play").click(function(){
  if($(this).hasClass('disabled')){
    return;
  };
  if(typeof loop != 'undefined'){
    clearInterval(loop);
  }
  state = 'move';
  btnbar();
  loop = setInterval("s.run()", s.speed.getSpeed());
});

$("#fast").click(function(){
  s.speed.up();
  $("#speed").text(s.speed.getLabel());
  if(state==='move'){
    if(loop) clearInterval(loop);
    loop = setInterval("s.run()", s.speed.getSpeed());
  }
});

$("#forw").click(function(){
  if($(this).hasClass('disabled')){
    return;
  };
  s.run();
});
