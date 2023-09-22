//LAB 3 - ARRAYS & LOOPS - PART 3

//PART 3 - SHOPPING CART SHIPPING
//==== VARIABLES ========
//The list of items
let la_liste_des_objets = [];
let le_total = 0;

//==== LOGIC ========
//CHECK FOR ITEMS UNTIL THRESHOLD IS MET.
while(le_total < 35){
	//GET ITEM COST FROM USER
	//CONVERT USER INPUT TO A NUMBER
	//The price of the item
	let le_prix_du_objet = Number(prompt(
		'Please enter the dollar value for this new item'
	));
	
	if(!isNaN(le_prix_du_objet)){
	//ADD ITEM COST TO RUNNING TOTAL VARIABLE
		le_total += le_prix_du_objet;

	//PUSH ITEM COST TO CART ARRAY
		la_liste_des_objets.push(le_prix_du_objet);
	}
}

//SEND POPUP MESSAGE TO USER
alert('Your shipping for this order will be free! \nTotal: $' + le_total);

//SEND OUTPUT TO CONSOLE
let la_phrase = 'Item prices : ';
la_liste_des_objets.forEach(item => {
	la_phrase += '$' + item + ' | ';
});

console.log(la_phrase);