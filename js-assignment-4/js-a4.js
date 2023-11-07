//@ts-nocheck
'use strict';

//Start Time : 7:40PM, Estimated End Time: 8:40PM
//Actual End Time: 9:30PM (1hr 50min)
//Challenges?
//Planning/Problem Solving?
// - Figuring out an elegant way to get the currently checked radio button
//   of a radio button set. Used document query selector and css attribute
//   selectors with optional chaining wrapped in a function that takes
//   the radiobutton set's name attribute.
//External Resources?
//Document Query Selector : https://developer.mozilla.org/en-US/docs/web/api/document/querySelector
//CSS Attribute Selectors : https://www.w3schools.com/CSS/css_attribute_selectors.asp
//Optional Chaining Operator : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
//Regex Tester : https://regex101.com/

window.onload = () => {
  document.forms['ixdForm'].onsubmit = processForm;
};


//Takes a `radioset_name` string argument and returns the current
//selected radio button for this name group or `undefined` if nothing
//is selected.
const getRadioSetValue = radioset_name => document.querySelector(`input[name="${radioset_name}"]:checked`)?.value;


const processForm = () => {
  //---Handle Retreival Stage
  //Retrieve input handles
  const la_zone_du_prenom = document.getElementById('in_fName');
  const la_zone_du_patronyme = document.getElementById('in_lName');
  const la_zone_du_id = document.getElementById('in_id');
  const la_zone_du_programme = document.getElementById('in_program');
  
  //Retrieve radiobutton set caption handles
  const le_legende_du_projet = document.getElementById('caption_project');
  const le_legende_de_la_distribution = document.getElementById('caption_deliver');

  //Retrieve section handles
  const la_partie_du_resultat = document.getElementById('result');
  const la_partie_du_formulaire = document.getElementById('form');
  const la_partie_de_la_salutation = document.getElementById('welcome');

  //Retrieve result span handles
  const la_reponse_du_prenom = document.getElementById('result__Fname');
  const la_reponse_du_patronyme = document.getElementById('result__Lname');
  const la_reponse_du_id = document.getElementById('result__id');
  const la_reponse_du_programme = document.getElementById('result__program');
  const la_reponse_de_la_distribution = document.getElementById('result__delivery');
  const la_reponse_du_projet = document.getElementById('result__project');


  //---Validation Stage
  //Checks and highlights all empty / invalid fields. Evaluated in reverse
  //order to focus the top-most invalid field first. Sets an 'is_valid'
  //flag (valable) to determine whether or not to continue.
  let valable = true;

  if(getRadioSetValue('f__deliver') === undefined){
    valable = false;
    le_legende_de_la_distribution.style.backgroundColor = 'red';
  }
  else le_legende_de_la_distribution.style.backgroundColor = 'initial';

  if(getRadioSetValue('f__project') === undefined){
    valable = false;
    le_legende_du_projet.style.backgroundColor = 'red';
  }
  else le_legende_du_projet.style.backgroundColor = 'initial';

  if(la_zone_du_programme.selectedIndex === 0){
    valable = false;
    la_zone_du_programme.style.backgroundColor = 'red';
    la_zone_du_programme.focus();
  }
  else la_zone_du_programme.style.backgroundColor = 'initial';

  if(
    la_zone_du_id.value === '' || 
    // Regex matches either `n` or `N` as well as 8 digits.
    la_zone_du_id.value.match(/[nN]\d{8}/) === null
  ){
    valable = false;
    la_zone_du_id.style.backgroundColor = 'red';
    la_zone_du_id.focus();
  }
  else la_zone_du_id.style.backgroundColor = 'initial';

  if(la_zone_du_patronyme.value === ''){
    valable = false;
    la_zone_du_patronyme.style.backgroundColor = 'red';
    la_zone_du_patronyme.focus();
  }
  else la_zone_du_patronyme.style.backgroundColor = 'initial';

  if(la_zone_du_prenom.value === ''){
    valable = false;
    la_zone_du_prenom.style.backgroundColor = 'red';
    la_zone_du_prenom.focus();
  }
  else la_zone_du_prenom.style.backgroundColor = 'initial';


  //---Output Stage
  if(valable === true){
    //Set output values.
    la_reponse_du_prenom.innerText = la_zone_du_prenom.value;
    la_reponse_du_patronyme.innerText = la_zone_du_patronyme.value;
    la_reponse_du_id.innerText = la_zone_du_id.value;
    la_reponse_du_programme.innerText = la_zone_du_programme.options[
      la_zone_du_programme.selectedIndex
    ].text;
    la_reponse_de_la_distribution.innerText = getRadioSetValue('f__deliver');
    la_reponse_du_projet.innerText = getRadioSetValue('f__project');

    //Replace form with output.
    la_partie_de_la_salutation.style.display = 'none';
    la_partie_du_formulaire.style.display = 'none';
    la_partie_du_resultat.style.display = 'block';
  }


  //Prevent page from refreshing.
  return false;
};