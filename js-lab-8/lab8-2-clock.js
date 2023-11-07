/* LAB 8.2 - STOP TIME */

window.onload = () => {
  //Retreive DOM elements.
  const le_bouton_pour_arreter = document.getElementById('btnStop');
  const le_bouton_pour_commencer = document.getElementById('btnStart');
  const la_identite_du_sablier = {value: null};

  //Assign event-handlers.
  le_bouton_pour_commencer.onclick = () => commence(la_identite_du_sablier);
  le_bouton_pour_arreter.onclick = () => arrest(la_identite_du_sablier);
};

//This function receives a shallow copy (reference) of the timer_id
//object and modifies the field inside to hold the timer_id.
const commence = timer_id => {
  timer_id.value = setInterval(displayTime, 1000);
};

//This function receives the same timer_id object for consistency.
const arrest = timer_id => {
  clearInterval(timer_id.value);
};

const displayTime = () => {
  //Retreive DOM element handles.
  const les_heures = document.getElementById('hoursOut');
  const les_minutes = document.getElementById('minsOut');
  const les_secondes = document.getElementById('secsOut');

  //Get the current time.
  const les_temps_maintenant = new Date();

  //Update the DOM.
  les_heures.innerText = les_temps_maintenant.getHours().toString().padStart(2, '0') + ':';
  les_minutes.innerText = les_temps_maintenant.getMinutes().toString().padStart(2, '0') + ':';
  les_secondes.innerText = les_temps_maintenant.getSeconds().toString().padStart(2, '0');
};



//create page load listener

//create page load function

	//create variables for required HTML elements
	
	//create time variable so all functions have access to it
	
	
	//CREATE FUNCTION THAT DISPLAYS THE TIME
	
	
	//CREATE FUNCTION TO START THE CLOCK.
	
	
	//CREATE FUNCTION TO STOP THE CLOCK
	
	
	// SET EVENT LISTENERS
