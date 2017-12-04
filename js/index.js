window.onload = function () {
  
  const STRICT   = 'strict';
  const START    = 'start';
  const STRICT_T = 'strictText';
  const START_T  = 'startText';
  const YELLOW   = 'yellow';
  const RED      = 'red';
  const BLUE     = 'blue';
  const GREEN    = 'green';
  const SIMON_T  = 'simon';
  const GAME_T   = 'game';
  
  const MAXINDEX = 4;
  
  let s = false;
  let a = [];
  let c = 0;
  let i = -1;
  let j = 0;
  let al = g("cntText");
  
  let tones = [
    {color: YELLOW, sound: g("s1")},
    {color: RED,    sound: g("s2")},
    {color: BLUE,   sound: g("s3")},
    {color: GREEN,  sound: g("s4")},
  ];
  
  let fs = {
    [START]:    function () { start(); },
    [START_T]:  function () { start(); },
    [STRICT]:   function () { strict(); },
    [STRICT_T]: function () { strict(); },
    [YELLOW]:   function () { next(tones[0]); },
    [RED]:      function () { next(tones[1]); },
    [BLUE]:     function () { next(tones[2]); },
    [GREEN]:    function () { next(tones[3]); }
  };
  
  let els = {
    [START]:    ge(START),
    [START_T]:  ge(START_T),
    [STRICT]:   ge(STRICT),
    [STRICT_T]: ge(STRICT_T),
    [YELLOW]:   ge(YELLOW),
    [RED]:      ge(RED),
    [BLUE]:     ge(BLUE),
    [GREEN]:    ge(GREEN),
    [SIMON_T]:  g(SIMON_T),
    [GAME_T]:   g(GAME_T)
  };
  
  let container = g("container");
  
  function g (id) {
    return document.getElementById(id);
  };
  
 function ge (id) {
    let res = g(id);
    res.onclick = fs[id];
    return res;
  };
  
  function sens () {
    els[START].style.fill = "brown";
    els[YELLOW].style.cursor = 'pointer';
    els[RED].style.cursor = 'pointer';
    els[BLUE].style.cursor = 'pointer';
    els[GREEN].style.cursor = 'pointer';
    els[SIMON_T].style.visibility = 'hidden';
    els[GAME_T].style.visibility = 'hidden';
  }
  
  function dump () {
    els[START].style.fill = "gray";
    els[YELLOW].style.cursor = '';
    els[RED].style.cursor = '';
    els[BLUE].style.cursor = '';
    els[GREEN].style.cursor = '';
    els[SIMON_T].style.visibility = '';
    els[GAME_T].style.visibility = '';
  }
  
  function start () {
    if (i === -1) {
      i++;
      j = 0;
      animate(a[i] = tones[Math.floor(Math.random() * 3)]);
      console.log("Started:", a[i].color);
      doAlert(c);
      sens();
    }
    else {
      stop();
      start();
    }
  }
  
  function stop (a) {
    console.log(a);
    doAlert(c);
    i = -1;
    j = 0;
    c = 0;
    dump();
  }
  
  function strict () {
    if (i === -1) {
      els[STRICT].style.fill = (s = !s) ? "brown" : "gray";
    }
  }
  
  function delay (a) {
    window.setTimeout(function () { animate(a); }, 600);
  }

  function animate (a) {
    let b = els[a.color];
		a.sound.play();
    b.style.opacity = "1.0";
    window.setTimeout(function () { b.style.opacity = "0.6"; }, 600);
	}
  
  function doAlert(a) {
    al.textContent = "-" + ("0" + a).slice(-2) + "-";
  }
  
  function doHitIt () {
    al.textContent = "Hit !";
  }
  
  function doMiss () {
    al.textContent = "Miss !";
  }

  function next (ft) {
    if (i != -1) {
      if (ft.color === a[j].color) {
        animate(ft);
        console.log("Tone hit:", a[j].color);
        if (i === j) {
          if (i === MAXINDEX) {
            stop("Ended !");
            doHitIt();
          }
          else {
            delay(a[++i] = tones[Math.floor(Math.random() * 3)]);
            doAlert(++c);
            console.log("Tone added;", a[i].color);
          }
          j = 0;
        }
        else {
          j++;
        }
      }
      else {
        if (s) {
          stop("Stopped !");
          doMiss();
        }
      }
    }
  };
  
  doAlert(c);
}