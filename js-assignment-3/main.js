//Start Time: 12:42 PM, Expected End Time: 1:42 PM (1Hr)
//Actual End Time: 1:42PM
//Challenges Encountered?
//Planning/Problem Solving?
//Other Resources:
//  - Nullish Coalescing Operator - MDN : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing

//the_smartphone
const le_smartphone = {
    model:'Google Pixel 2',
    androidVersion:'12.0',
    isRooted:false,
    //off, sleep, on, 
    state:'on',
    togglePowerButton: function(long_press=false){
        switch(this.state){
            case 'sleep':
                //When the device is asleep, toggling the power button
                //can only wake the device and turn the screen on.
                this.state = 'on';
                alert('Waking device from sleep...');
                break;
            case 'on':
                //When the device is on, toggling the power button can
                //either put the device to sleep, or turn off the 
                //device if long-pressed.
                if(long_press === true){
                    this.state = 'off';
                    alert('Turning device off...');
                }
                else {
                    this.state = 'sleep';
                    alert('Putting device to sleep...');
                }
                break;
            default:
                //When the device is off, toggling the power button can
                //only turn the device on when long-pressed.
                if(long_press === true){
                    this.state = 'on';
                    alert('Turning device on...');
                }
        }
    },
    stringify:function(){
        return `{\n\tmodel:${this.model},\n\tandroidVersion:${this.androidVersion},\n\tisRooted:${this.isRooted},\n\tstate:${this.state}\n}`;
    },
};

//Output object to the console.
console.log(le_smartphone.stringify());

//Update one object property.
//the_model_of_the_smartphone
const le_modele_du_smartphone = prompt('What model is your Android smartphone?', le_smartphone.model) ?? le_smartphone.model;
le_smartphone.model = le_modele_du_smartphone;
alert(`Updated smartphone model to '${le_smartphone.model}'.`);

//Update a different object property.
//the_version_of_Android
const la_version_de_android = prompt('What version is your Android smartphone running?', le_smartphone.androidVersion) ?? le_smartphone.androidVersion;
le_smartphone.androidVersion = la_version_de_android;
alert(`Updated smartphone Android version to '${le_smartphone.androidVersion}'.`);

//Update another object property using method calls.
//one_toggles_the_button
const on_bascule_le_bouton = confirm('Did you want to toggle the power button?');
if(on_bascule_le_bouton === true){
    //long_press
    const appuyer_long = confirm('Did you want to long-press the power button?');
    le_smartphone.togglePowerButton(appuyer_long);
}

//Output the changed object to the console.
console.log(le_smartphone.stringify());