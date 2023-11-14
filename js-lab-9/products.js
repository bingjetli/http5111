//LAB 9-DATA STORAGE: PRODUCTS PAGE

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
};