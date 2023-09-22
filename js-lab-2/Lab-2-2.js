//######## LAB 2-2 LOGIN ########
//1. LINK THIS JS FILE TO THE HTML FILE
//alert("hey 2.2");//COMMENT OUT ONCE CONNECTED TO YOUR HTML PAGE

//====VARIABLES===============
//2. CREATE NECESSARY VARIABLES
		// Correct user name
let le_nom_du_utilisateur = 'user1';
		// Correct password
let le_mot_de_passe = 'password1';
		// user name input
let la_donnee_du_utilisateur;
		// password input
let la_donnee_du_mot_de_pass;



//====LOGIC===================
//3. CREATE POPUP BOX FOR USERNAME
la_donnee_du_utilisateur = prompt('Please enter your username', 'username');

//4. OUTPUT PROVIDED USERNAME TO JS CONSOLE
console.log(la_donnee_du_utilisateur);

//5. CREATE POPUP BOX FOR PASSWORD
la_donnee_du_mot_de_pass = prompt('Please enter your password', 'password');

//6. OUTPUT PROVIDED PASSWORD TO JS CONSOLE
console.log(la_donnee_du_mot_de_pass);

//7. CHECK IF PROVIDED USERNAME AND PROVIDED PASSWORD MATCH THE STORED USERNAME/PASSWORD
if(
	le_nom_du_utilisateur === la_donnee_du_utilisateur
	&& le_mot_de_passe === la_donnee_du_mot_de_pass
){

//8. IF THEY MATCH, POPUP SUCCESS MESSAGE AND OUTPUT TO CONSOLE
	alert('Login successfully!');
	console.log('Login successfully!');
} 

//9. IF THEY DON'T MATCH, POPUP INVALID MESSAGE & OUTPUT TO CONSOLE
else{
	alert('Login was invalid!');
	console.log('Login was invalid!');
}