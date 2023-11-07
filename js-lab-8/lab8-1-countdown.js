/* LAB 8-1 - FINAL COUNTDOWN!! */

window.onload = () => {
  //Retrieve handles to the DOM.
  const les_donnees_aujourd_hui = document.getElementById('todayData');
  const les_donnees_final = document.getElementById('finalData');
  const les_donnees_restant = document.getElementById('dueData');
  const le_message = document.getElementById('countMsg');

  //Create Date objects.
  const les_temps_final = new Date(2023, 11, 15, 18);
  //const les_temps_aujourd_hui = new Date();

  //Test Case: 1 second passed the deadline
  const les_temps_aujourd_hui = new Date(2023, 11, 15, 18, 1); 

  //Calculate remaining time.
  const les_temps_restant = les_temps_final.getTime() - les_temps_aujourd_hui.getTime();

  //Update DOM.
  les_donnees_aujourd_hui.innerText = les_temps_aujourd_hui.toDateString();
  les_donnees_final.innerText = les_temps_final.toDateString();

  if(les_temps_restant > 0){
    //Display remaining time if there is still time left.
    les_donnees_restant.innerText = Math.floor(les_temps_restant / 1000 / 60 / 60 / 24);
  }
  else{
    //Otherwise the deadline has passed.
    le_message.innerHTML = 'The deadline for the final assignment has passed!';
  }
};

//create page load listener

//create page load function

	//create variables for required HTML elements
	
	//create variables for now date and due date
	
	//CONVERT TO UTC AND SUBTRACT TO GET TIME DIFFERENCE
	
	//CONVERT TIME DIFFERENCE TO WHOLE NUMBER OF DAYS
	
	//OUTPUT NOW DATE & DUE DATE TO HTML PAGE
	
	//LOGIC TO CHECK IF DUE DATE HAS PASSED, AND OUPUT APPROPRIATE MESSAGE TO HTML PAGE