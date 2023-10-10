//#### LAB 6 - DOM MANIPULATION ####
//PART 2: MYSTERY BOX

//LISTEN FOR load EVENT
window.onload = pageReady;

//'WRAPPER' FUNCTION FOR DOM LOGIC
function pageReady(){
	//GET DOM ELEMENTS WE'LL NEED
	const la_boite_mysterieux = document.getElementById('mysteryBox');
	const le_bouton = document.getElementById('buttonBox');

	//====CREATE THE FUNCTIONS WE'LL NEED====
	//FUNCTION TO ASK USER
	const askUser = () => {
		const la_reponse = confirm('Do you want to see something?');

		if(la_reponse === true){
			la_boite_mysterieux.style.display = 'none';
			le_bouton.style.display = 'block';
		}
	};

	//FUNCTION TO CHANGE buttonBox
	const changeButtonBox = () => {
		le_bouton.getElementsByTagName('h2')[0].innerText = 'SURPRISE!!';
		le_bouton.style.background = 'orange';
		le_bouton.style.width = '600px';
	};


	//SETUP LISTENERS
	la_boite_mysterieux.onmouseover = askUser;
	le_bouton.onclick = changeButtonBox;


	//END onload FUNCTION
};
