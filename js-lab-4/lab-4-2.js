//#### LAB 4 - FUNCTIONS ####
//PART 2:  AN AVERAGE FUNCTION


//################## CREATE YOUR AVERAGE FUNCTION
//This function takes five numbers and returns their average to one decimal place.
const averageOf = (n1, n2, n3, n4, n5) => {
    return ((n1 + n2 + n3 + n4 + n5) / 5).toFixed(1);
};


//################## LOGIC THAT OUTPUTS MESSAGES BASED ON FUNCTION RESULTS
//Used `.toFixed()` from MDN : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
console.log('The average of [5, 10, 15, 20, 25] is ' + averageOf(
    5, 10, 15, 20, 25
));

const n1 = 66;
const n2 = 78;
const n3 = 99;
const n4 = 97;
const n5 = 86;

if(averageOf(n1, n2, n3, n4, n5) >= 70) alert('Success');
else alert('Review required');
