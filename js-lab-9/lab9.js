//LAB 9-DATA STORAGE: INDEX PAGE

//window.onload
window.onload = () => {
  //check for stored values
  const les_cookies = document.cookie;
  //retrieve stored values
  les_cookies.split(';').map(e => {
    const le_cookie = e.trim().split('=');

    //change welcome text to stored name
    if(le_cookie[0] === 'name'){
      document.getElementById('newMsgBox').innerText = 'Welcome ' + le_cookie[1] + '!';
    }

    //change BG colour to stored colour
    if(le_cookie[0] === 'color'){
      //  document.body.style.background = 
      document.body.style.backgroundColor = le_cookie[1];
    }
  });

//#####============== DO THIS PART FIRST! ===============		
  //get the form and set submit listener
  document.forms['infoForm'].onsubmit = processForm;

  document.getElementById('btnDel').onclick = () => {
    document.cookie = `name=;max-age=0;`;
    document.cookie = `color=;max-age=0;`;

    window.location.reload();
  };
};

//onsubmit Function
function processForm(){
  //get values from form
  const le_nom = document.getElementById('inName');
  const la_couleur = document.getElementById('inColor');

	//console.log the form values
  console.log(le_nom.value);
  console.log(la_couleur.value);

  //validate values

  //store values
  makeCookie('name', le_nom.value, 24 * 60 * 60);
  makeCookie('color', la_couleur.value, 24 * 60 * 60);
}

function makeCookie(cookieName, cookieValue, lifespan){
  document.cookie = `${cookieName}=${cookieValue}; max-age=${lifespan};`;
}