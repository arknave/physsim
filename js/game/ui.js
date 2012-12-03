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
  else if(state==='pause'){
    $("#back").removeClass('disabled');
    $("#pause").removeClass('disabled');
    $("#stop").addClass('disabled');
    $("#play").addClass('disabled');
    $("#forw").removeClass('disabled');
  }
}

$("#back").click(function(){
  if($(this).hasClass('disabled')){
    return;
  }
  runback();
});

$("#slow").click(function(){
  speed.down;
  $("#speed").text(speed.getLabel);
  if(state='move'){
    clearInterval(loop);
    loop = setInterval(run, speed.getSpeed);
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
      clearInterval(loop);
      break;
    case "pause":
      state = 'move';
      btnbar();
      loop = setInterval(run, window.speeds[window.spd]);
      break;
    default:
      alert("Invalid state recieved: "+state);
      break;
  }
});

$("#stop").click(function(){
  if($(this).hasClass('disabled')) return;
  state = 'stop';
  btnbar();
  clearInterval(loop);
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
  loop = setInterval(run, speed.getSpeed);
});

$("#fast").click(function(){
  /*speed.up();
  $("#speed").text(speed.getLabel());
  if(state='move'){
    clearInterval(loop);
    loop = setInterval(run, speed.getSpeed());
  }*/
  console.log(speed);
});

$("#forw").click(function(){
  if($(this).hasClass('disabled')){
    return;
  };
  run();
});
