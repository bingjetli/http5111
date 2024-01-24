#  //fruit-rotation-normalization-factor : -1, 0, 1
#  //fruit-initial-y-pc : 100
#  //fruit initial-x-pc : 0...100
#  //fruit-initial-y-velocity : -50...-125
#  //fruit-initial-x-velocity : -100...100
#
#  const la_position_initial_et_minimum_pour_x = 0;
#  const la_position_initial_et_maximum_pour_x = 100;
#
#  const la_vitesse_initial_et_minimum_pour_x = -100;
#  const la_vitesse_initial_et_maximum_pour_x = 100;
#
#  //The y velocity will be multiplied by -1.
#  const la_vitesse_initial_et_minimum_pour_y = 50;
#  const la_vitesse_initial_et_maximum_pour_y = 125;
#
#  /**
#   * FRUITVARS CLASS STRUCTURE
#   * 
#   * fruitvars-{x_pos_init}-{y_pos_init}-{x_vel_init}-{y_vel_init}-{rot-norm-fact}
#   */
#  let la_liste_du_texte = [];
#  for (let x_pos_i = la_position_initial_et_minimum_pour_x; x_pos_i <= la_position_initial_et_maximum_pour_x; x_pos_i++) {
#    console.log(x_pos_i);
#    for (let x_vel_i = la_vitesse_initial_et_minimum_pour_x; x_vel_i <= la_vitesse_initial_et_maximum_pour_x; x_vel_i++) {
#      console.log(`--${x_vel_i}`);
#      for (let y_vel_i = la_vitesse_initial_et_minimum_pour_y; x_vel_i <= la_vitesse_initial_et_maximum_pour_y; y_vel_i++) {
#        la_liste_du_texte.push(`.fruitvars-${x_pos_i}-100-${x_vel_i}-${y_vel_i}-m1 {
#          --fruit-initial-x-pc: ${x_pos_i};
#          --fruit-initial-y-pc: 100;
#          --fruit-initial-x-velocity-pc: ${x_vel_i};
#          --fruit-initial-y-velocity-pc: ${y_vel_i};
#          --fruit-lifespan-s: 5;
#          --fruit-rotation-normalization-factor: -1;
#        }`);
#        la_liste_du_texte.push(`.fruitvars-${x_pos_i}-100-${x_vel_i}-${y_vel_i}-p1 {
#          --fruit-initial-x-pc: ${x_pos_i};
#          --fruit-initial-y-pc: 100;
#          --fruit-initial-x-velocity-pc: ${x_vel_i};
#          --fruit-initial-y-velocity-pc: ${y_vel_i};
#          --fruit-lifespan-s: 5;
#          --fruit-rotation-normalization-factor: 1;
#        }`);
#        la_liste_du_texte.push(`.fruitvars-${x_pos_i}-100-${x_vel_i}-${y_vel_i}-0 {
#          --fruit-initial-x-pc: ${x_pos_i};
#          --fruit-initial-y-pc: 100;
#          --fruit-initial-x-velocity-pc: ${x_vel_i};
#          --fruit-initial-y-velocity-pc: ${y_vel_i};
#          --fruit-lifespan-s: 5;
#          --fruit-rotation-normalization-factor: 0;
#        }`);
#      }
#    }
#  }
#
#  document.body.innerText = la_liste_du_texte.join('\n');
#
#};

with open('fruitvars.css', 'w') as fruitvars :
  #  //fruit-rotation-normalization-factor : -1, 0, 1
  #  //fruit-initial-y-pc : 100
  #  //fruit initial-x-pc : 0...100
  #  //fruit-initial-y-velocity : -50...-125
  #  //fruit-initial-x-velocity : -100...100

  min_x_position_initial = 0
  max_x_position_initial = 100 + 1

  min_x_velocity_initial = -100
  max_x_velocity_initial = 100 + 1

  min_y_velocity_initial = 50
  max_y_velocity_initial = 125 + 1

  for x_pos_i in range(min_x_position_initial, max_x_position_initial):
    print(x_pos_i)
    for x_vel_i in range(min_x_velocity_initial, max_x_velocity_initial):
      for y_vel_i in range(min_y_velocity_initial, max_y_velocity_initial):
        #
        # FRUITVARS CLASS STRUCTURE
        # 
        # fruitvars_{x_pos_init}_{y_pos_init}_{x_vel_init}_{y_vel_init}_{rot-norm-fact}
        #
        fruitvars.write(
          f'.fruitvars_{x_pos_i}_100_{x_vel_i}_{y_vel_i}_-1 {{'
          f'--fruit-initial-x-pc: {x_pos_i};'
          f'--fruit-initial-y-pc: 100;'
          f'--fruit-initial-x-velocity-pc: {x_vel_i};'
          f'--fruit-initial-y-velocity-pc: -{y_vel_i};'
          f'--fruit-lifespan-s: 5;'
          f'--fruit-rotation-normalization-factor: -1;'
          f'}}\n'
        )

        fruitvars.write(
          f'.fruitvars_{x_pos_i}_100_{x_vel_i}_{y_vel_i}_0 {{'
          f'--fruit-initial-x-pc: {x_pos_i};'
          f'--fruit-initial-y-pc: 100;'
          f'--fruit-initial-x-velocity-pc: {x_vel_i};'
          f'--fruit-initial-y-velocity-pc: -{y_vel_i};'
          f'--fruit-lifespan-s: 5;'
          f'--fruit-rotation-normalization-factor: 0;'
          f'}}\n'
        )

        fruitvars.write(
          f'.fruitvars_{x_pos_i}_100_{x_vel_i}_{y_vel_i}_1 {{'
          f'--fruit-initial-x-pc: {x_pos_i};'
          f'--fruit-initial-y-pc: 100;'
          f'--fruit-initial-x-velocity-pc: {x_vel_i};'
          f'--fruit-initial-y-velocity-pc: -{y_vel_i};'
          f'--fruit-lifespan-s: 5;'
          f'--fruit-rotation-normalization-factor: 1;'
          f'}}\n'
        )