//@ts-nocheck
window.onload = () => {
  const la_helice = document.getElementById('spinner');
  const le_bouton = document.getElementById('button');
  //CONTEXT: I got distracted in class making this rotate indefinitely.
  //let remettre = false;
  //la_helice.style.transform = 'rotateZ(360deg)';
  //remettre = true;

  la_helice.ontransitionend = () => {
    //if(remettre === true){
    //  la_helice.style.transform = 'rotateZ(0deg)';
    //  la_helice.style.transitionDuration = Number.MIN_VALUE + 's';
    //  remettre = false;
    //}
    //else {
    //  la_helice.style.transform = 'rotateZ(360deg)';
    //  la_helice.style.transitionDuration = '2.5s';
    //  remettre = true;
    //}

        la_helice.classList.remove('effect-ed');
  };

  le_bouton.onclick = () => {
    la_helice.classList.add('effect-ed');
  };
}