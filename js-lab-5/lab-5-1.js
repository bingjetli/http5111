//#### LAB 5 - FUNCTIONS & OBJECTS ####
//PART 1:  I OBJECT!

const meObject = {
    firstName: 'Bailey',
    lastName: 'Liang',
    program: 'Web Development',
    age: 25,
    introduce: () => {
        alert(`My name is ${meObject.firstName} ${meObject.lastName} and I am in ${meObject.program}.`);
    },
};

console.log(`The .program property of meObject = ${meObject.program}.`);

//alert(`My name is ${meObject.firstName} ${meObject.lastName} and I am in ${meObject.program}.`);

meObject.introduce();