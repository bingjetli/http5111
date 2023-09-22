//LAB 3 - ARRAYS & LOOPS - PART 2


//PM TEAM MEMBER ARRAY
let ourTeam = [
    'Abhishek',
    'Bailey',
    'Saloni',
    'Surbhi',
    'Seyed Abbas',
];

//OUTPUT TEAM ARRAY TO JS CONSOLE
console.log(
    'The array in it\'s initial state: \n[' +
     ourTeam.toString() + ']'
);

//REMOVE LAST MEMBER
ourTeam.pop();
console.log(
    'The array after removing the last member: \n[' +
     ourTeam.toString() + ']'
);

//ADD SEAN TO FRONT OF ARRAY
ourTeam.unshift('Sean');
console.log(
    'The array after adding \'Sean\' to the front of the list: \n[' +
     ourTeam.toString() +
      ']'
);

//REARRANGE THE ARRAY ALPHABETICALLY
ourTeam.sort();
console.log(
    'The array after sorting: \n[' +
     ourTeam.toString() +
      ']'
);

//OUTPUT REQUIRED MESSAGE TO JS CONSOLE
console.log('We have ' + ourTeam.length + ' of people in our group.');

//LOOP THROUGH ARRAY TO OUTPUT TEAM MEMBERS/NUMBERS TO JS CONSOLE
for(let i = 0; i < ourTeam.length; i++){
    console.log((i + 1) + ' ' + ourTeam[i]);
}
