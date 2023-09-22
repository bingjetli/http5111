//######## LAB 2-3 EMAIL SIGNUP ########
//alert("hey 2.3");//COMMENT OUT ONCE CONNECTED TO YOUR HTML PAGE
//==== VARIABLES =========


//==== LOGIC =============
if(confirm('Would you like to signup for our mailing list?')){
    let email = prompt(
        'Please enter the email you\'d like to use',
        'me@example.com'
    );
    
    switch(email){
        case null:
        case 'me@example.com':
        case '':
            alert('Thank you, but the email was not valid.');
            break;
        default:
            alert('Thank you, our next newsetter will be sent to ' + email);
    }

}
else{
    alert('Thank you, we will not bother you again.');
}

