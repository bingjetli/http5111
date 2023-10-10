//#### LAB 5 - FUNCTIONS & OBJECTS ####
//PART 2:  MAKE THE BANK
//1. Create the object structure first.
//2. Add the required properties to your object.
//3. Add your first method and test it. Remember, the methods will change the properties of the object.
//4. Add your second method and test it.
//5. Create the required output to complete steps 6-10 of the lab.
//6. Once everything is working, tackle the Extra Challenge!


//The customer of the bank
const le_client_de_la_banque = {
    lastName:null,
    branchNumber:null,
    accountBalance:500.25,
    interestRate:1.03,
    multipleAccounts:false,
    makeDeposit: function(deposit){
        this.accountBalance += deposit;
        return `Thank you, your current balance is now $${this.accountBalance.toFixed(2)}.`;
    },
    makeWithdrawal: function(withdrawal){
        this.accountBalance -= withdrawal;
        return `Thank you, your current balance is now $${this.accountBalance.toFixed(2)}.`;
    },
    addInterest: function(){
        //Temporarily add 0.005 to the interest if multipleAccounts is true.
        //The Interest (rate)
        const le_interet = this.multipleAccounts === true ? this.interestRate + 0.005 : this.interestRate;
        this.accountBalance *= le_interet;
        return `Thank you, your current balance is now $${this.accountBalance.toFixed(2)}.`;
    }
};

console.log(`The starting balance of this bank account is $${le_client_de_la_banque.accountBalance}.`);

console.log('Depositing $200.00...');
console.log(` - ${le_client_de_la_banque.makeDeposit(200)}`);

console.log('Withdrawing $75.00...')
console.log(` - ${le_client_de_la_banque.makeWithdrawal(75)}`);

//Record the current balance to allow resetting back to this balance for the next few changes.
//The old balance
const le_vieux_solde = le_client_de_la_banque.accountBalance;

console.log('Adding interest (1.03) to the balance...');
console.log(` - ${le_client_de_la_banque.addInterest()}`);

console.log('Reverting account balance before interest was added.');
le_client_de_la_banque.accountBalance = le_vieux_solde;

console.log('Setting multipleAccounts to True...');
le_client_de_la_banque.multipleAccounts = true;

console.log('Adding interest (1.035) to the balance...');
console.log(` - ${le_client_de_la_banque.addInterest()}`);