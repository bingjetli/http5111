//Time expected to Finish: 1 hr, 
//  Start Time: 7:46PM, 
//  Estimated End Time: 8:46PM 
//  End Time: 8:18PM
//Challenges? : None
//Planning? : None
//Other Resources? 
//  MDN for the array.forEach() method documentation.

//Creating a function to automate this comparison.
const isInvalid = item => (isNaN(item) || item < 1 || item > 7);

const le_film1 = 'The Matrix';
const le_film2 = 'Shutter Island';
const le_film3 = 'Inception';
const le_film4 = 'Virtigo';
const le_film5 = 'Silence of the Lambs';
const le_film6 = 'Constantine';
const le_film7 = 'Se7en';

const la_liste_des_films = [
    le_film1,
    le_film2,
    le_film3,
    le_film4,
    le_film5,
    le_film6,
    le_film7,
];

let reponse = 0;
do {
    //Number() converts the string value to it's corresponding numerical value
    //if possible. Returns NaN if the string value has no numerical equivalent.
    reponse = Number(prompt('Which top 7 movie would you like?', 'Pick a number: 1-7'));

    if(isInvalid(reponse)){
        alert('Please enter a number between 1 and 7!');
    }

} while(isInvalid(reponse));

alert(`Number ${reponse} on the list is ${la_liste_des_films[reponse - 1]}.`);

//Create a variable and append instead of spamming console.log() statements.
let la_phrase = '';
la_liste_des_films.forEach((movie, index) => {
    la_phrase += `Movie ${index + 1}: ${movie}\n`;
});

//Alternate Method with for loop:
//for(let i = 0; i < la_liste_des_films.length; i++){
//    la_phrase += `Movie ${i + 1}: ${la_liste_des_films[i]}\n`;
//}

console.log(la_phrase);