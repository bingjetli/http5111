window.onload = _ => {
  ////Set the spawn variables for the inactive fruit.
  //const la_vitesse_minimum_pour_y = 50;
  //const la_vitesse_maximum_pour_y = 100;
  //const la_position_initial_pour_x = Math.max(Math.round(Math.random() * 90), 10);
  //const la_vitesse_initial_pour_y = Math.max(la_vitesse_minimum_pour_y, ((Math.random() * la_vitesse_maximum_pour_y) + 125) / 2);
  //const la_vitesse_initial_pour_x = (100 - la_position_initial_pour_x) > la_position_initial_pour_x ?
  //  Math.random() * (100 - la_position_initial_pour_x) :
  //  Math.random() * la_position_initial_pour_x * -1;
  //const le_modificateur_pour_tourner = (100 - la_position_initial_pour_x) > la_position_initial_pour_x ? -1 : 1;
  //setInlineVariablesForElement(le_cache_des_objets[le_id].element, {
  //  "--fruit-initial-y-pc": '100;',
  //  "--fruit-initial-y-velocity-pc": `-${la_vitesse_initial_pour_y};`,
  //  "--fruit-initial-x-pc": `${la_position_initial_pour_x};`,
  //  "--fruit-initial-x-velocity-pc": `${la_vitesse_initial_pour_x};`,
  //  "--fruit-lifespan-s": '5;',
  //  "--fruit-rotation-normalization-factor": `${le_modificateur_pour_tourner};`,
  //});

  //fruit-rotation-normalization-factor : -1, 0, 1
  //fruit-initial-y-pc : 100
  //fruit initial-x-pc : 0...100
  //fruit-initial-y-velocity : -50...-125
  //fruit-initial-x-velocity : -100...100

  const la_position_initial_et_minimum_pour_x = 0;
  const la_position_initial_et_maximum_pour_x = 100;

  const la_vitesse_initial_et_minimum_pour_x = -100;
  const la_vitesse_initial_et_maximum_pour_x = 100;

  //The y velocity will be multiplied by -1.
  const la_vitesse_initial_et_minimum_pour_y = 50;
  const la_vitesse_initial_et_maximum_pour_y = 125;

  /**
   * FRUITVARS CLASS STRUCTURE
   * 
   * fruitvars-{x_pos_init}-{y_pos_init}-{x_vel_init}-{y_vel_init}-{rot-norm-fact}
   */
  let la_liste_du_texte = [];
  for (let x_pos_i = la_position_initial_et_minimum_pour_x; x_pos_i <= la_position_initial_et_maximum_pour_x; x_pos_i++) {
    console.log(x_pos_i);
    for (let x_vel_i = la_vitesse_initial_et_minimum_pour_x; x_vel_i <= la_vitesse_initial_et_maximum_pour_x; x_vel_i++) {
      console.log(`--${x_vel_i}`);
      for (let y_vel_i = la_vitesse_initial_et_minimum_pour_y; x_vel_i <= la_vitesse_initial_et_maximum_pour_y; y_vel_i++) {
        la_liste_du_texte.push(`.fruitvars-${x_pos_i}-100-${x_vel_i}-${y_vel_i}-m1 {
          --fruit-initial-x-pc: ${x_pos_i};
          --fruit-initial-y-pc: 100;
          --fruit-initial-x-velocity-pc: ${x_vel_i};
          --fruit-initial-y-velocity-pc: ${y_vel_i};
          --fruit-lifespan-s: 5;
          --fruit-rotation-normalization-factor: -1;
        }`);
        la_liste_du_texte.push(`.fruitvars-${x_pos_i}-100-${x_vel_i}-${y_vel_i}-p1 {
          --fruit-initial-x-pc: ${x_pos_i};
          --fruit-initial-y-pc: 100;
          --fruit-initial-x-velocity-pc: ${x_vel_i};
          --fruit-initial-y-velocity-pc: ${y_vel_i};
          --fruit-lifespan-s: 5;
          --fruit-rotation-normalization-factor: 1;
        }`);
        la_liste_du_texte.push(`.fruitvars-${x_pos_i}-100-${x_vel_i}-${y_vel_i}-0 {
          --fruit-initial-x-pc: ${x_pos_i};
          --fruit-initial-y-pc: 100;
          --fruit-initial-x-velocity-pc: ${x_vel_i};
          --fruit-initial-y-velocity-pc: ${y_vel_i};
          --fruit-lifespan-s: 5;
          --fruit-rotation-normalization-factor: 0;
        }`);
      }
    }
  }

  document.body.innerText = la_liste_du_texte.join('\n');

};