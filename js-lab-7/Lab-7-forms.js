// @ts-nocheck
'use strict';
/* LAB 7 - SHIPPING FORM */
//Order Shipping object (for extra EXTRA challenge, otherwise, ignore it)
var shipInfo = {
	cid: 0,
	name: "",
	pc: "",
	speed: "",
	cost: 0
};



//Using `window.onload()` since `document.onload()` is never triggered.
window.onload = () => {
  //Attach onSubmit event handler to the form.
  document.forms['form_ship'].onsubmit = processForm;
};



function processForm(){
  //Retreive the user data.
  const le_nom = document.getElementById('in_Name');
  const le_id = document.getElementById('in_Id');
  const le_code_postal = document.getElementById('in_pc');
  const la_vitesse = document.getElementById('in_Speed');

  shipInfo.name = le_nom.value;
  shipInfo.cid = le_id.value;
  shipInfo.pc = le_code_postal.value;
  shipInfo.speed = la_vitesse.options[la_vitesse.selectedIndex].text;
  shipInfo.cost = Number(la_vitesse.value);


  //Set the thank-you message
  document.getElementById('thanksCustomer').innerText = (
    shipInfo.name +
    ' (Customer # ' +
    shipInfo.cid +
    ')'
  );
  document.getElementById('thanksPC').innerText = shipInfo.pc;
  document.getElementById('thanksSpeed').innerText = shipInfo.speed;
  document.getElementById('thanksCost').innerText = shipInfo.cost.toFixed(2);


  //Basic validation
  if(la_vitesse.selectedIndex === 0){
    la_vitesse.style.backgroundColor = 'red';
    la_vitesse.focus();
  }
  else if(le_nom.value === ''){
    le_nom.style.backgroundColor = 'red';
    le_nom.focus();
  }
  else if(le_id.value === ''){
    le_id.style.backgroundColor = 'red';
    le_id.focus();
  }
  else if(le_code_postal.value === ''){
    le_code_postal.style.backgroundColor = 'red';
    le_code_postal.focus();
  }
  else {
    //Hide the form, show the message.
    const le_formulaire = document.getElementById('shippingForm');
    const le_message_elogieux = document.getElementById('thanks_msg');

    le_formulaire.style.display = 'none';
    le_message_elogieux.style.display = 'block';
  }


  //Prevent the form from refreshing the page.
  return false;
}