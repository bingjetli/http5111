//#### LAB 4 - FUNCTIONS ####
//PART 3:  WALKING THE DOG 


//################## CREATE YOUR checkTemp FUNCTION
//Checks the temperature to see if it's safe to walk the dog.
//Expects `currentTemp` : Number
//Returns a boolean : True if temperature is within [-10, 30], false otherwise
const checkTemp = currentTemp => currentTemp <= 30 && currentTemp >= -10;



//################## LOGIC THAT OUTPUTS MESSAGES BASED ON FUNCTION RESULTS
let la_temperature = null;
while(la_temperature === null){
    la_temperature = prompt(
        'Please enter the current temperature in the textbox below',
        'e.g 24'
    );

    //Check if `cancel` was selected.
    if(la_temperature === null){
        alert('Please enter a value!');
        continue;
    }

    //Check if a valid number was entered.
    if(isNaN(Number(la_temperature))){
        alert('Please enter a valid number!');
        la_temperature = null;
        continue;
    }

    //Break the loop.
    la_temperature = Number(la_temperature);
}

if(checkTemp(la_temperature)){
    alert('You\'re good, have a nice walk!');
}
else{
    alert('Yikes! This is no weather for dog walking!');
}