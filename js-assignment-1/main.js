//How long will it take for me to complete this assignment?
//Start time : 11:34 AM, Expected end time : 12:34 PM, Actual end time: 12:43 PM
//Challenges?
//Planning problem solving before code?
//Other resources?
//  MDN for Number() documentation.
//  MDN for startsWith() documentation.
//---

//The team
let la_equipe = prompt(
    'Welcome!, please enter your team number in the textbox below to continue!',
    '1 to 6'
);

//-convert to a number for easier processing
//The number of the team
let le_nombre_de_la_equipe = Number(la_equipe);

//The firstname
let le_prenom;
switch(le_nombre_de_la_equipe){
    case 1:
        //The firstname
        le_prenom = prompt(
            'Please enter your first name in the textbox below to continue!',
            'Firstname'
        );
        break;
    case NaN:
        //Number() returns NaN if a string can't be converted to it's numerical
        //equivalent.
    default:
        //Invalid group number entered.
        alert('Access denied!');
}

//The list of names for the team
let la_liste_des_nommes_pour_la_equipe = [
    'Bailey Liang',
    'Yousuf Abbas',
    'Sarah Tadele',
    'Suyeon Jang',
    'Lap-Wang Wong'
];

//This person is a member (of our team?)
let on_est_un_membre = false;

la_liste_des_nommes_pour_la_equipe.forEach(name => {
    //For each name in the list, check if the name starts with the provided
    //firstname. `trim()` is called to remove potentally error causing whitespaces.
    //A single whitespace is added to prevent partial matches since the names all
    //contain a single whitespace between the first and last names.
    if(name.startsWith(le_prenom.trim() + ' ')){
        alert(`Welcome back to group 1, ${name}!`);
        
        //Set the flag here so we don't run the failure case.
        on_est_un_membre = true;
    }
});

if(!on_est_un_membre){
    //Member flag wasn't set after iterating through the list, therefore
    //This person is not a valid team member.
    alert('Access Denied!');
}