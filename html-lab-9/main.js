//@ts-nocheck
window.onload = () => {
  let running = true;

  document.getElementById('play-state-toggle').onclick = _ => {
    if (running === true) {
      const animations = document.getElementsByClassName('animation');
      for (let i = 0; i < animations.length; i++) {
        animations[i].classList.add('paused');
      }

      running = false;
    }
    else {
      const animations = document.getElementsByClassName('animation');
      for (let i = 0; i < animations.length; i++) {
        animations[i].classList.remove('paused');
      }

      running = true;
    }
  };
};