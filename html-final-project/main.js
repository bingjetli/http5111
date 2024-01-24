//@ts-nocheck
'use strict';

//The stage : this is a cached handle to the stage div to reduce
//the amount of DOM traversals.
let la_scene = null;

//The camera/viewport : a cached handle to the viewport div to reduce
//the amount of DOM traversals.
let la_vue = null;

//The score container : a cached handle to the score container to reduce
//the amount of DOM traversals.
let le_conteneur_du_score = null;

//The multiplier container : a cached handle to the multiplier container 
//to reduce the amount of DOM traversals.
let le_conteneur_du_multiplicateur = null;

//The base score container : a cached handle to the base score container 
//to reduce the amount of DOM traversals.
let le_conteneur_du_score_initial = null;

//The lives container : a cached handle to the base score container 
//to reduce the amount of DOM traversals.
let le_conteneur_des_vies = null;

//The 2nd score container : this should hold a handle to the score container 
//shown at the gameover screen.
let le_conteneur_du_score_2 = null;

//The starting window : this holds a handle to the welcome message
//shown at the beginning of the game.
let la_fenetre_du_debut = null;

//The ending window : this holds a handle to the gameover message
//shown at the ending of the game.
let la_fenetre_de_la_fin = null;

//The explosion for the bomb : this holds a handle to the bomb explosion
//screen vfx div.
let la_explosion_pour_la_bombe = null;

//The maximum fruits : the maximum amount of fruits to be used during
//the game.
const LES_FRUITS_MAXIMUM = 10;

//The maximum bombs : the maximum amount of bombs to be used during
//the game.
const LES_BOMBES_MAXIMUM = 3;

//Inactive fruits : these fruits can be recycled to spawn more uncut fruits.
const les_fruits_inactif = [];

//Inactive bombs : these bombs can be recycled to spawn more bombs
const les_bombes_inactif = [];

/**
 * The object cache : a dictionary of all the live HTMLElements used in 
 * the page to reduce the amount of times `document.getElementById()` is
 * called.
 * 
 * Structure : {
 *  element : HTMLElement,
 *  is_cut : boolean,
 *  is_active : boolean,
 *  type : string,
 *  vars : {
 *    initial_x : int,
 *    initial_y : int,
 *    initial_x_velocity : int,
 *    initial_y_velocity : int,
 *    lifespan : int,
 *    rotation_normalization_factor : -1, 0, 1,
 *    
 *    fruit : string, (only available on fruit-types)
 *  },
 * }
 */
const le_cache_des_objets = {};

//The fruits : a list of all the fruits that are available to be spawned.
//This is used to determine which class to set for the fruit-halves.
const les_fruits = [
  'apple',
  'banana',
  'mango',
  'orange',
  'strawberry',
  'watermelon',
];

//The categories for the fruits : this stores a list of all the fruit
//half image classes and is used to quickly remove all the possible 
//image classes before reassigning a new one.
const les_categories_pour_les_fruits = getAllFruitHalfImageClasses();
function getAllFruitHalfImageClasses() {
  const la_liste = [];

  for (let i = 0; i < les_fruits.length; i++) {
    la_liste.push(`${les_fruits[i]}-half-1`);
    la_liste.push(`${les_fruits[i]}-half-2`);
  }

  return la_liste;
}

//The respite : this is a boolean flag activated when a bomb is triggered,
//it pauses all spawning action while it's active.
let le_repit = false;

//The score : integer value of the player's current score.
let le_score = 0;

//The multiplier : integer value of the current combo multiplier. Resets to 1. 
//Resets when player hits a bomb.
let le_multiplicateur = 1;

//The last hit : the unix timestamp of the last time a fruit was cut. Resets to
//0. Resets when player hits a bomb.
let le_coup_reussi_dernier = 0;

//Is the game active : boolean value to determine whether or not to
//spawn fruits/bombs.
let est_le_jeu_actif = false;

//The lives : the amount of times the player can hit the bombs before game-over.
let les_vies = 3;




window.onload = _ => {
  //Cache a handle to the viewport element and stage.
  la_vue = document.getElementById('viewport');
  la_scene = document.getElementById('stage');

  //Disabled, causes lag probably due to DOM updates.
  //Setup event listener for the mouse.
  //la_vue.addEventListener('mousemove', event => {
  //  document.documentElement.style.setProperty('--gv-mouse-x-px', event.clientX);
  //  document.documentElement.style.setProperty('--gv-mouse-y-px', event.clientY);
  //});

  //Cache handles to the starting and ending dialogs.
  le_conteneur_du_score_2 = document.getElementById('gameover-points-display');
  la_fenetre_du_debut = document.getElementById('intro-dialog');
  la_fenetre_de_la_fin = document.getElementById('gameover-dialog');

  //Cache handle to the bomb explosion vfx and setup it's event listener.
  la_explosion_pour_la_bombe = document.getElementById('bomb-screen-vfx');
  la_explosion_pour_la_bombe.addEventListener('animationiteration', onBombExplosionAnimationIterate);

  //Create and append the hud.
  const le_fragment_de_la_vue = document.createDocumentFragment();
  le_conteneur_du_score = document.createElement('div');
  le_conteneur_du_score_initial = document.createElement('div');
  le_conteneur_du_multiplicateur = document.createElement('div');
  le_conteneur_des_vies = document.createElement('div');

  le_conteneur_du_score.setAttribute('id', 'score-container');
  le_conteneur_du_score_initial.setAttribute('id', 'initial-score-container');
  le_conteneur_du_multiplicateur.setAttribute('id', 'multiplier-container');
  le_conteneur_des_vies.setAttribute('id', 'lives-container');

  //Set the initial display score.
  le_conteneur_du_score.innerText = '0';
  le_conteneur_du_score_initial.innerText = '0';
  le_conteneur_du_multiplicateur.innerText = '1x';
  le_conteneur_des_vies.innerText = '❤❤❤';

  //Hide the game HUD.
  le_conteneur_du_multiplicateur.classList.add('hide');
  le_conteneur_du_score_initial.classList.add('hide');
  le_conteneur_du_score.classList.add('hide');
  le_conteneur_des_vies.classList.add('hide');

  //Append the score container to the hud fragment.
  le_fragment_de_la_vue.append(
    le_conteneur_du_score,
    le_conteneur_du_multiplicateur,
    le_conteneur_du_score_initial,
    le_conteneur_des_vies
  );

  //Append the hud fragment to the viewport.
  la_vue.append(le_fragment_de_la_vue);

  //Create and append all the fruit elements to the viewport.
  const le_fragment = document.createDocumentFragment();
  for (let i = 0; i < LES_FRUITS_MAXIMUM; i++) {
    //Create and store handles to the base elements.
    const le_fruit = document.createElement('div');
    const la_moitie_du_fruit_1 = document.createElement('div');
    const la_moitie_du_fruit_2 = document.createElement('div');
    const le_vfx_pour_couper = document.createElement('div');

    //Set the content for the inner divs so it renders.
    la_moitie_du_fruit_1.innerHTML = '&nbsp;';
    la_moitie_du_fruit_2.innerHTML = '&nbsp;';
    le_vfx_pour_couper.innerHTML = '&nbsp;';

    //Assign the proper classes to the inner-divs.
    la_moitie_du_fruit_1.classList.add(
      'fruit-half',
      'fruit-half-1',
      'pause-animation',
    );
    la_moitie_du_fruit_2.classList.add(
      'fruit-half',
      'fruit-half-2',
      'pause-animation',
    );
    le_vfx_pour_couper.classList.add(
      'cut-vfx',
      'pause-animation',
      'hide'
    );

    //Add the inner-div elements to the fruit container.
    le_fruit.append(la_moitie_du_fruit_1, le_vfx_pour_couper, la_moitie_du_fruit_2);

    //Assign the proper classes to the fruit container.
    le_fruit.classList.add(
      'fruit',
      'foreground',
      'pause-animation',
      'hide'
    );

    //Set the id of the fruit elements.
    le_fruit.setAttribute('id', `fruit-${i + 1}`);
    la_moitie_du_fruit_1.setAttribute('id', `fruit-${i + 1}-half-1`);
    la_moitie_du_fruit_2.setAttribute('id', `fruit-${i + 1}-half-2`);
    le_vfx_pour_couper.setAttribute('id', `fruit-${i + 1}-cut-vfx`);

    //Add the fruit elements to the object cache.
    le_cache_des_objets[le_fruit.id] = {
      element: le_fruit,
      is_active: false,
      is_cut: false,
      type: 'fruit',
      vars: {
        initial_x: 0,
        initial_y: 100,
        initial_x_velocity: 0,
        initial_y_velocity: -100,
        lifespan: 5,
        rotation_normalization_factor: 0,
      },
    };

    //Set the fruitvars.
    le_fruit.classList.add(
      'fruitvar-initial-x-pc_0',
      'fruitvar-initial-y-pc_100',
      'fruitvar-initial-x-velocity-pc_0',
      'fruitvar-initial-y-velocity-pc_-100',
      'fruitvar-lifespan-s_5',
      'fruitvar-rotation-normalization-factor_0',
    );

    //TODO: Remove these, I'm not sure if I actually use them.
    le_cache_des_objets[la_moitie_du_fruit_1.id] = {
      element: la_moitie_du_fruit_1,
    };
    le_cache_des_objets[la_moitie_du_fruit_2.id] = {
      element: la_moitie_du_fruit_2,
    };
    le_cache_des_objets[le_vfx_pour_couper.id] = {
      element: le_vfx_pour_couper,
    };

    //Add this id of the fruit to the list of inactive fruits to be 
    //used for spawning.
    les_fruits_inactif.push(le_fruit.id);

    //Add the fruit to the document fragment.
    le_fragment.append(le_fruit);

    //Register hover event listener for the fruit.
    le_fruit.addEventListener('mouseover', onFruitHovered);

    //Register animation iteration event listener for the fruit.
    le_fruit.addEventListener('animationiteration', onFruitAnimationIterate);

  }

  //Create and append all the bomb elements to the viewport.
  for (let i = 0; i < LES_BOMBES_MAXIMUM; i++) {
    //Create and store handles to the base elements.
    const la_bombe = document.createElement('div');

    //Set the content for the inner divs so it renders.
    la_bombe.innerHTML = '&nbsp;';

    //Assign the proper classes to the bomb container.
    la_bombe.classList.add(
      'bomb',
      'foreground',
      'pause-animation',
      'hide'
    );

    //Set the id of the bomb elements.
    la_bombe.setAttribute('id', `bomb-${i + 1}`);

    //Add the bomb to the object cache.
    le_cache_des_objets[la_bombe.id] = {
      element: la_bombe,
      is_active: false,
      is_cut: false,
      type: 'bomb',
      vars: {
        initial_x: 0,
        initial_y: 100,
        initial_x_velocity: 0,
        initial_y_velocity: -100,
        lifespan: 5,
        rotation_normalization_factor: 0,
      },
    };

    //Set the fruitvars.
    la_bombe.classList.add(
      'fruitvar-initial-x-pc_0',
      'fruitvar-initial-y-pc_100',
      'fruitvar-initial-x-velocity-pc_0',
      'fruitvar-initial-y-velocity-pc_-100',
      'fruitvar-lifespan-s_5',
      'fruitvar-rotation-normalization-factor_0',
    );

    //Add this id of the bomb to the list of inactive bombs to be 
    //used for spawning.
    les_bombes_inactif.push(la_bombe.id);

    //Add the bomb to the document fragment.
    le_fragment.append(la_bombe);

    //Register hover event listener for the bomb.
    la_bombe.addEventListener('mouseover', onBombHovered);

    //Register animation iteration event listener for the bomb.
    la_bombe.addEventListener('animationiteration', onBombAnimationIterate);
  }

  //Create the start-game 'button'.
  const le_fruit = document.createElement('div');
  const la_moitie_du_fruit_1 = document.createElement('div');
  const la_moitie_du_fruit_2 = document.createElement('div');
  const le_vfx_pour_couper = document.createElement('div');
  la_moitie_du_fruit_1.innerHTML = '&nbsp;';
  la_moitie_du_fruit_2.innerHTML = '&nbsp;';
  le_vfx_pour_couper.innerHTML = '&nbsp;';
  la_moitie_du_fruit_1.classList.add(
    'fruit-half',
    'fruit-half-1',
    'watermelon-half-1',
    'pause-animation',
  );
  la_moitie_du_fruit_2.classList.add(
    'fruit-half',
    'fruit-half-2',
    'watermelon-half-2',
    'pause-animation',
  );
  le_vfx_pour_couper.classList.add(
    'cut-vfx',
    'pause-animation',
    'hide'
  );
  le_fruit.append(la_moitie_du_fruit_1, le_vfx_pour_couper, la_moitie_du_fruit_2);
  le_fruit.classList.add(
    'fruit-button',
    'foreground',
    'fruitvar-initial-x-pc_50',
    'fruitvar-initial-y-pc_50',
    'fruitvar-initial-x-velocity-pc_10',
    'fruitvar-initial-y-velocity-pc_-66',
    'fruitvar-lifespan-s_5',
    'fruitvar-rotation-normalization-factor_1',
  );
  le_fruit.setAttribute('id', 'reset-button');
  le_cache_des_objets[le_fruit.id] = {
    element: le_fruit,
    is_active: false,
    is_cut: false,
    type: 'fruit',
    vars: {
      initial_x: 50,
      initial_y: 50,
      initial_x_velocity: 10,
      initial_y_velocity: 10,
      lifespan: 5,
      rotation_normalization_factor: 1,
    },
  };
  le_fragment.append(le_fruit);
  le_fruit.addEventListener('mouseover', onResetButtonHovered);
  le_fruit.addEventListener('animationiteration', onFruitAnimationIterate);

  //Add the fragment containing all the fruits to the stage.
  la_scene.append(le_fragment);

  //Start the timer to spawn fruits every 2000ms.
  setInterval(spawnFruits, 2000);

  //Start the timer to spawn bombs every 2500ms.
  setInterval(spawnBombs, 2500);
};




function spawnFruits() {
  //Skip this spawn cycle of there aren't any inactive fruits to spawn.
  if (les_fruits_inactif.length <= 0) {
    return;
  }

  //Skip this spawn cycle if the respite is active.
  if (le_repit === true) {
    return;
  }

  //Skip this spawn cycle if the game is inactive (paused/gameover/menu)
  if (est_le_jeu_actif === false) {
    return;
  }

  //Randomly calculate the amount of fruits to spawn.
  const la_quantite_pour_creer = Math.floor(Math.random() * les_fruits_inactif.length) / 2;

  for (let i = 0; i < la_quantite_pour_creer; i++) {
    //Pop an inactive fruit id off the stack of inactive fruits.
    const le_id = les_fruits_inactif.pop();

    //Calculate the spawn variables for the inactive fruit.
    const la_vitesse_minimum_pour_y = 66;
    const la_vitesse_maximum_pour_y = 100;
    //const la_position_initial_pour_x = Math.max(Math.round(Math.random() * 90), 10);
    //const la_position_initial_pour_x = Math.max(Math.random() * 90, 10);
    const la_position_initial_pour_x = (Math.random() * (90 - 10) + 10);
    //const la_vitesse_initial_pour_y = Math.max(la_vitesse_minimum_pour_y, ((Math.random() * la_vitesse_maximum_pour_y) + 125) / 2);
    //const la_vitesse_initial_pour_y = Math.max(Math.floor(Math.random() * la_vitesse_maximum_pour_y), la_vitesse_minimum_pour_y);
    //const la_vitesse_initial_pour_y = Math.max(Math.random() * la_vitesse_maximum_pour_y, la_vitesse_minimum_pour_y) * -1;
    const la_vitesse_initial_pour_y = (Math.random() * (la_vitesse_maximum_pour_y - la_vitesse_minimum_pour_y) + la_vitesse_minimum_pour_y) * -1;
    const la_vitesse_initial_pour_x = (100 - la_position_initial_pour_x) > la_position_initial_pour_x ?
      Math.random() * (100 - la_position_initial_pour_x) :
      Math.random() * la_position_initial_pour_x * -1;
    const le_modificateur_pour_tourner = (100 - la_position_initial_pour_x) > la_position_initial_pour_x ? -1 : 1;

    //Remove the old fruitvar classes on the element.
    le_cache_des_objets[le_id].element.classList.remove(
      `fruitvar-initial-x-pc_${le_cache_des_objets[le_id].vars.initial_x}`,
      `fruitvar-initial-x-velocity-pc_${le_cache_des_objets[le_id].vars.initial_x_velocity}`,
      `fruitvar-initial-y-velocity-pc_${le_cache_des_objets[le_id].vars.initial_y_velocity}`,
      `fruitvar-rotation-normalization-factor_${le_cache_des_objets[le_id].vars.rotation_normalization_factor}`,
    );

    //Update the object cache variables with the new values. Floor the values
    //to enforce integer values only since the fruitvar classes were only
    //generated for integer values.
    le_cache_des_objets[le_id].vars.initial_x = Math.floor(la_position_initial_pour_x);
    le_cache_des_objets[le_id].vars.initial_x_velocity = Math.floor(la_vitesse_initial_pour_x);
    le_cache_des_objets[le_id].vars.initial_y_velocity = Math.floor(la_vitesse_initial_pour_y);
    le_cache_des_objets[le_id].vars.rotation_normalization_factor = Math.floor(le_modificateur_pour_tourner);

    //Set the new fruitvar classes on the element using the new values.
    le_cache_des_objets[le_id].element.classList.add(
      `fruitvar-initial-x-pc_${le_cache_des_objets[le_id].vars.initial_x}`,
      `fruitvar-initial-x-velocity-pc_${le_cache_des_objets[le_id].vars.initial_x_velocity}`,
      `fruitvar-initial-y-velocity-pc_${le_cache_des_objets[le_id].vars.initial_y_velocity}`,
      `fruitvar-rotation-normalization-factor_${le_cache_des_objets[le_id].vars.rotation_normalization_factor}`,
    );

    //Randomly determine which fruit to spawn.
    const rng = Math.round(Math.random() * (les_fruits.length - 1));
    for (let i = 0; i < le_cache_des_objets[le_id].element.childElementCount; i++) {
      //Make sure the child element animations are paused.
      le_cache_des_objets[le_id].element.children[i].classList.add('pause-animation');

      //Set the fruit graphic for the fruit halves.
      if (le_cache_des_objets[le_id].element.children[i].classList.contains('fruit-half') === true) {
        if (le_cache_des_objets[le_id].element.children[i].classList.contains('fruit-half-1') === true) {
          //Remove any existing fruit images on the fruit half first.
          le_cache_des_objets[le_id].element.children[i].classList.remove(...les_categories_pour_les_fruits);

          //Then assign the new fruit image on the fruit half.
          le_cache_des_objets[le_id].element.children[i].classList.add(`${les_fruits[rng]}-half-1`);
        }
        else if (le_cache_des_objets[le_id].element.children[i].classList.contains('fruit-half-2') === true) {
          le_cache_des_objets[le_id].element.children[i].classList.remove(...les_categories_pour_les_fruits);
          le_cache_des_objets[le_id].element.children[i].classList.add(`${les_fruits[rng]}-half-2`);
        }
      }
    }

    //Start the projectile animation for this object.
    le_cache_des_objets[le_id].element.classList.remove(
      'pause-animation',
      'fruit-rotated-90deg',
      'fruit-rotated-270deg',
      'hide',
    );

    //Set the active flag on the cached object.
    le_cache_des_objets[le_id].is_active = true;

    //Reset the `is_cut` flag on the cached object.
    le_cache_des_objets[le_id].is_cut = false;
  }

};




function spawnBombs() {
  //Skip this spawn cycle of there aren't any inactive bombs to spawn.
  if (les_bombes_inactif.length <= 0) {
    return;
  }

  //Skip this spawn cycle if the respite is active.
  if (le_repit === true) {
    return;
  }

  //Skip this spawn cycle if the game is inactive (paused/gameover/menu)
  if (est_le_jeu_actif === false) {
    return;
  }

  //Randomly calculate the amount of bombs to spawn.
  const la_quantite_pour_creer = Math.floor(Math.random() * les_bombes_inactif.length);

  for (let i = 0; i < la_quantite_pour_creer; i++) {
    //Pop an inactive bomb id off the stack of inactive bombs.
    const le_id = les_bombes_inactif.pop();

    //Calculate the spawn variables for the inactive bomb.
    const la_vitesse_minimum_pour_y = 66;
    const la_vitesse_maximum_pour_y = 100;
    const la_position_initial_pour_x = (Math.random() * (90 - 10) + 10);
    const la_vitesse_initial_pour_y = (Math.random() * (la_vitesse_maximum_pour_y - la_vitesse_minimum_pour_y) + la_vitesse_minimum_pour_y) * -1;
    const la_vitesse_initial_pour_x = (100 - la_position_initial_pour_x) > la_position_initial_pour_x ?
      Math.random() * (100 - la_position_initial_pour_x) :
      Math.random() * la_position_initial_pour_x * -1;
    const le_modificateur_pour_tourner = (100 - la_position_initial_pour_x) > la_position_initial_pour_x ? -1 : 1;

    //Remove the old fruitvar classes on the element.
    le_cache_des_objets[le_id].element.classList.remove(
      `fruitvar-initial-x-pc_${le_cache_des_objets[le_id].vars.initial_x}`,
      `fruitvar-initial-x-velocity-pc_${le_cache_des_objets[le_id].vars.initial_x_velocity}`,
      `fruitvar-initial-y-velocity-pc_${le_cache_des_objets[le_id].vars.initial_y_velocity}`,
      `fruitvar-rotation-normalization-factor_${le_cache_des_objets[le_id].vars.rotation_normalization_factor}`,
    );

    //Update the object cache variables with the new values. Floor the values
    //to enforce integer values only since the fruitvar classes were only
    //generated for integer values.
    le_cache_des_objets[le_id].vars.initial_x = Math.floor(la_position_initial_pour_x);
    le_cache_des_objets[le_id].vars.initial_x_velocity = Math.floor(la_vitesse_initial_pour_x);
    le_cache_des_objets[le_id].vars.initial_y_velocity = Math.floor(la_vitesse_initial_pour_y);
    le_cache_des_objets[le_id].vars.rotation_normalization_factor = Math.floor(le_modificateur_pour_tourner);

    console.log(le_cache_des_objets[le_id].vars);

    //Set the new fruitvar classes on the element using the new values.
    le_cache_des_objets[le_id].element.classList.add(
      `fruitvar-initial-x-pc_${le_cache_des_objets[le_id].vars.initial_x}`,
      `fruitvar-initial-x-velocity-pc_${le_cache_des_objets[le_id].vars.initial_x_velocity}`,
      `fruitvar-initial-y-velocity-pc_${le_cache_des_objets[le_id].vars.initial_y_velocity}`,
      `fruitvar-rotation-normalization-factor_${le_cache_des_objets[le_id].vars.rotation_normalization_factor}`,
    );

    //Start the projectile animation for this object.
    le_cache_des_objets[le_id].element.classList.remove(
      'pause-animation',
      'hide',
      'fruit-rotated-0deg',
    );

    //Set the active flag on the cached object.
    le_cache_des_objets[le_id].is_active = true;

    //Reset the `is_cut` flag on the cached object.
    le_cache_des_objets[le_id].is_cut = false;
  }

};




function onFruitHovered(event) {
  //Only check on the fruit-halves since it reliably triggers the 
  //hover event than the fruit container.
  if (
    event.target.classList.contains('fruit-half-1') ||
    event.target.classList.contains('fruit-half-2')
  ) {

    if (le_cache_des_objets[event.target.parentElement.id].is_cut === false) {
      //Only cut fruit that is marked active.
      cutFruit(event.target.parentElement);

      //Calculate score.
      //The base score is calculated from the initial x and y velocity. Slower
      //fruits are easier to hit and give less score. Faster fruits are harder 
      //to hit and give more score.
      const la_base = Math.abs(le_cache_des_objets[event.target.parentElement.id].vars.initial_x_velocity) +
        Math.abs(le_cache_des_objets[event.target.parentElement.id].vars.initial_y_velocity);

      //Obtain the time it took for the last fruit to be hit and update that value.
      const la_difference = Date.now() - le_coup_reussi_dernier;
      le_coup_reussi_dernier = Date.now();

      //Reset the multiplier once a fruit hasn't been hit after 2 seconds.
      //Otherwise, increment the combo multiplier by 1 if a fruit was
      //hit less than 500ms ago.
      if (la_difference >= 2000) le_multiplicateur = 1;
      else if (la_difference <= 500) le_multiplicateur++;

      //Update the score and display it.
      le_score += la_base * le_multiplicateur;
      le_conteneur_du_score.innerText = `${le_score}`;
      le_conteneur_du_score_initial.innerText = `+${la_base}`;
      le_conteneur_du_multiplicateur.innerText = `${le_multiplicateur}x`;
    }

  }
}




function onBombHovered(event) {
  if (event.target.classList.contains('bomb')) {
    //Activate the respite.
    le_repit = true;

    triggerBomb(event.target);

    //Reset the multiplier.
    le_multiplicateur = 1;

    //Update the score and display it.
    le_conteneur_du_score.innerText = `${le_score}`;
    le_conteneur_du_score_initial.innerText = `0`;
    le_conteneur_du_multiplicateur.innerText = `1x`;

    //Decrement the amount of lives the player has.
    les_vies--;

    //Update the lives HUD element.
    le_conteneur_des_vies.innerText = getLivesString(les_vies);
  }
}




function onResetButtonHovered(event) {
  //Only check on the fruit-halves since it reliably triggers the 
  //hover event than the fruit container.
  if (
    event.target.classList.contains('fruit-half-1') ||
    event.target.classList.contains('fruit-half-2')
  ) {

    if (le_cache_des_objets[event.target.parentElement.id].is_cut === false) {
      //Only cut fruit that is marked active.
      cutFruit(event.target.parentElement);

      //Reset the game variables
      le_multiplicateur = 1;
      le_score = 0;
      le_coup_reussi_dernier = 0;
      les_vies = 3;
      est_le_jeu_actif = true;

      //Reset the game HUD elements
      le_conteneur_du_score.innerText = '0';
      le_conteneur_du_score_initial.innerText = '0';
      le_conteneur_du_multiplicateur.innerText = '1x';
      le_conteneur_des_vies.innerText = getLivesString(les_vies);

      //Hide the starting and ending windows.
      la_fenetre_du_debut.classList.add('hide');
      la_fenetre_de_la_fin.classList.add('hide');

      //Show the game HUD
      le_conteneur_du_multiplicateur.classList.remove('hide');
      le_conteneur_du_score_initial.classList.remove('hide');
      le_conteneur_du_score.classList.remove('hide');
      le_conteneur_des_vies.classList.remove('hide');

    }
  }
}




function triggerBomb(bomb_container) {
  //Trigger the bomb explosion vfx.
  la_explosion_pour_la_bombe.classList.remove('pause-animation', 'hide');

  triggerCameraShake();

  //Remove all entities on screen.
  for (const key in le_cache_des_objets) {
    //Skip entities that are inactive.
    if (le_cache_des_objets[key].is_active === false) continue;

    //Skip entities that are already cut.
    if (le_cache_des_objets[key].is_cut === true) continue;

    //Skip entities that are not whole fruits.
    if (le_cache_des_objets[key].element.classList.contains('fruit-half') === true) continue;

    //The only entities remaining now should be the current bomb, active 
    //bombs that haven't been cut and active fruit that haven't been cut. 
    //So we'll just hide these elements so the player can't trigger them, 
    //and trigger the animation-iterate cleanup.
    le_cache_des_objets[key].element.classList.add('hide');

    //Mark the entity as inactive, and push it on to the stack of inactive
    //fruits or bombs depending on it's type.
    le_cache_des_objets[key].is_active = false;

    if (le_cache_des_objets[key].element.classList.contains('fruit')) {
      if (les_fruits_inactif.includes(key) === false) {
        les_fruits_inactif.push(key);
      }
    }
    else if (le_cache_des_objets[key].element.classList.contains('bomb')) {
      if (les_bombes_inactif.includes(key) === false) {
        les_bombes_inactif.push(key);
      }
    }
  }
}




function cutFruit(fruit_container) {
  fruit_container.classList.add(
    //Hide the element to reduce repaint/reflow.
    'hide',
    //Pause the animation to halt the lifespan timer.
    'pause-animation',
    //Stabilize the fruit's rotation.
    le_cache_des_objets[fruit_container.id].vars.rotation_normalization_factor === 1 ? 'fruit-rotated-90deg' : 'fruit-rotated-270deg',
  );

  //Send send this element to the background so other fruit containers
  //can be triggered.
  fruit_container.classList.remove('foreground');

  for (let i = 0; i < fruit_container.childElementCount; i++) {
    //Then unpause all of it's child elements animations.
    fruit_container.children[i].classList.remove('pause-animation', 'hide');
  }

  //Show the element
  fruit_container.classList.remove('hide');

  //Set the `is_cut` flag on the cached object.
  le_cache_des_objets[fruit_container.id].is_cut = true;
}




function onFruitAnimationIterate(event) {
  if (event.target.classList.contains('fruit') === true) {
    //This is a fruit, and their animation just ended.

    if (le_cache_des_objets[event.target.id].is_cut === true) {
      //This is a fruit, their animation just ended, and the fruit has
      //been cut. This means that we need to wait for the fruit-half
      //animation to end. We reinforce the pause animation to prevent 
      //the fruit container from moving.

      event.target.classList.add('pause-animation');
    }
    else {
      //This is a fruit, their animation just ended and the fruit has
      //not been cut. This means that we can set this fruit as inactive
      //and hide the fruit.

      //Skip this if it is the reset button.
      if (event.target.id === 'reset-button') return;

      //Pause the lifespan timer on the fruit container, and hide the 
      //fruit container until it gets chosen to spawn again.
      event.target.classList.add('pause-animation', 'hide');

      //Mark the fruit as inactive, and push it on to the stack of inactive
      //fruits.
      le_cache_des_objets[event.target.id].is_active = false;
      if (les_fruits_inactif.includes(event.target.id) === false) {
        les_fruits_inactif.push(event.target.id);
      }
    }
  }
  else if (event.target.classList.contains('fruit-half') === true) {
    //This is a fruit half and their animation just ended, this also
    //means the fruit has been cut. This means we can pause the animation
    //for the fruit half and the parent fruit container, hide it, and
    //add it to the list of inactive fruits to be recycled.

    //Pause the lifespan timer on the fruit half.
    event.target.classList.add('pause-animation');

    //Pause the lifespan timer on the fruit container, and hide the 
    //fruit container until it gets chosen to spawn again.
    event.target.parentElement.classList.add('pause-animation', 'hide');

    //Mark the fruit as inactive, and push it on to the stack of inactive
    //fruits if it's not there already.
    le_cache_des_objets[event.target.parentElement.id].is_active = false;
    if (
      event.target.parentElement.id !== 'reset-button' &&
      les_fruits_inactif.includes(event.target.parentElement.id) === false
    ) {
      les_fruits_inactif.push(event.target.parentElement.id);
    }
  }
  else if (event.target.classList.contains('cut-vfx') === true) {
    //This is the cut-vfx and their animation just ended, this also means
    //that the fruit has been cut, but since the cut vfx is shorter than
    //the fruit halves animations, we just pause and hide the vfx again
    //when the animation ends.
    event.target.classList.add('pause-animation', 'hide');
  }
}




function onBombAnimationIterate(event) {
  if (event.target.classList.contains('bomb') === true) {
    //This is a bomb, and their animation just ended.

    //Pause the lifespan timer on the bomb container, and hide the 
    //bomb container until it gets chosen to spawn again.
    event.target.classList.add('pause-animation', 'hide');

    //Mark the bomb as inactive, and push it on to the stack of inactive
    //bombs.
    le_cache_des_objets[event.target.id].is_active = false;
    if (les_bombes_inactif.includes(event.target.id) === false) {
      les_bombes_inactif.push(event.target.id);
    }
  }
}




function onBombExplosionAnimationIterate(event) {
  //This is the bomb-explosion and their animation just ended, this also
  //means the bomb has been cut. This means we can pause the animation
  //for the bomb-explosion, hide it, and check the player's life.

  //Pause the lifespan timer on the bomb-explosion and hide it.
  la_explosion_pour_la_bombe.classList.add('pause-animation', 'hide');

  //Deactivate the respite.
  le_repit = false;

  //Check player life.
  if (les_vies <= 0) {
    //Trigger game-over state.

    //Hide the HUD
    le_conteneur_du_multiplicateur.classList.add('hide');
    le_conteneur_du_score_initial.classList.add('hide');
    le_conteneur_du_score.classList.add('hide');
    le_conteneur_des_vies.classList.add('hide');

    //Pause fruit/bomb spawning
    est_le_jeu_actif = false;

    //Show the gameover screen.
    le_conteneur_du_score_2.innerText = `Scored ${le_score} points!`;
    la_fenetre_de_la_fin.classList.remove('hide');

    //Show the reset button
    le_cache_des_objets['reset-button'].is_active = false;
    le_cache_des_objets['reset-button'].is_cut = false;
    le_cache_des_objets['reset-button'].element.classList.remove('hide', 'pause-animation', 'fruit-rotated-90deg', 'fruit-rotated-270deg');
  }
}




function triggerCameraShake() {
  //First unpause the camera shake effect on the stage.
  la_scene.classList.remove('pause-animation', 'enforce-stage-position');

  //Then when the animation iteration event fires,
  la_scene.addEventListener('animationiteration', event => {
    //Since having the event listener on the stage listens for all
    //animation iteration events for elements in the stage, filter 
    //by event target id.
    //TODO: put everything on this stage event listener instead of 
    //having separate animation iteration listeners for each element.
    if (event.target.id === 'stage') {
      //Pause the stage animation again.
      la_scene.classList.add('pause-animation', 'enforce-stage-position');
    }
  });
}




/** 
 * Returns the set of inline variables assigned to the element as a 
 * Javascript object.
 * 
 * Parameters : `element` : the live HTMLElement.
 * 
 * Returns : {
 *  "--variable-1" : "value;",
 *  "--variable-2" : "value;",
 *  "--variable-3" : "value;",
 *  "--variable-4" : "value;"
 * }
*/
function getInlineVariablesFromElement(element) {
  const le_objet = {};

  const les_facons = element.style.cssText.split(' ');
  for (let i = 0; i < les_facons.length; i += 2) {
    le_objet[les_facons[i]] = les_facons[i + 1];
  }

  return le_objet;
}




/**
 * Sets the inline style attribute for an `element` given a JSON object
 * containing the inline style variables for the element.
 * 
 * Parameters : 
 *  `element` : the live HTMLElement
 *  `inline_variables` : a JSON object containing the inline_styles, e.g
 *    {
 *      "--variable-1" : "value;",
 *      "--variable-2" : "value;",
 *      "--variable-3" : "value;",
 *      "--variable-4" : "value;",
 *    }
 * 
 * Returns : Nothing.
 */
function setInlineVariablesForElement(element, inline_variables) {
  //Serialize the `inline_variable` object to a string.
  let les_textes_de_la_facon = '';
  for (const key in inline_variables) {
    les_textes_de_la_facon += `${key}: ${inline_variables[key]} `;
  }

  //Trim the excess whitespace at the end.
  les_textes_de_la_facon = les_textes_de_la_facon.trimEnd();

  //Set the inline style attribute for the element.
  element.setAttribute('style', les_textes_de_la_facon);
}




/** 
 * Returns a string containing the specified amount of heart symbols.
 * 
 * Parameters : `lives` : integer value representing the amount of lives
 * 
 * Returns : '❤❤❤...'
 */
function getLivesString(lives) {
  let le_texte = '';

  for (let i = 0; i < lives; i++) {
    le_texte += '❤';
  }

  return le_texte;
}



/**
 * HTML DEBUG ELEMENTS
 * 
      <!--
      <div 
        id="debug-fruit"
        style="
                --fruit-initial-y-pc: 50;
                --fruit-initial-y-velocity-pc: 0;
                --fruit-initial-x-pc: 50;
                --fruit-initial-x-velocity-pc: 0;
                --fruit-lifespan-s: 5;
              "
        class="fruit pause-animation">
        <div 
          id="fruit-half-1"
          style="
                  outline: 1px solid #0000;
                "
          class="fruit-half fruit-half-1 pause-animation orange-half-1">
          &nbsp;
        </div>
        <div class="cut-vfx">
          &nbsp;
        </div>
        <div 
          id="fruit-half-2"
          style="
                  outline: 1px solid #0000;
                "
          class="fruit-half fruit-half-2 pause-animation orange-half-2">
          &nbsp;
        </div>
        <div class="floating-points-text" style="
          --fruit-points : 10;
        ">
          10005pts;
        </div>
      </div>

      <div 
        id="debug-bomb"
        style="
                --bomb-initial-y-pc: 50;
                --bomb-initial-y-velocity-pc: -70;
                --bomb-initial-x-pc: 50;
                --bomb-initial-x-velocity-pc: -30;
                --bomb-lifespan-s: 5;
              "
        class="bomb pause-animation">
        <div class="bomb-explosion pause-animation hide">
          &nbsp;
        </div>
      </div>
      -->
 */