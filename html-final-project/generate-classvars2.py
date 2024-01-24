with open('fruitvars.css', 'w') as fruitvars :
  #  //fruit-rotation-normalization-factor : -1, 0, 1
  #  //fruit-initial-y-pc : 100
  #  //fruit initial-x-pc : 10...90
  #  //fruit-initial-y-velocity : -66...-100
  #  //fruit-initial-x-velocity : -100...100

  min_x_position_initial = 10
  max_x_position_initial = 90 + 1

  min_x_velocity_initial = -100
  max_x_velocity_initial = 100 + 1

  min_y_velocity_initial = 66
  max_y_velocity_initial = 100 + 1

  for x_pos_i in range(min_x_position_initial, max_x_position_initial):
    fruitvars.write(
      f'.fruitvar-initial-x-pc_{x_pos_i} {{\n'
      f'\t--fruit-initial-x-pc: {x_pos_i};\n'
      f'}}\n'
    )

  fruitvars.write(
    f'.fruitvar-initial-y-pc_100 {{\n'
    f'\t--fruit-initial-y-pc: 100;\n'
    f'}}\n'
  )

  for x_vel_i in range(min_x_velocity_initial, max_x_velocity_initial):
    fruitvars.write(
      f'.fruitvar-initial-x-velocity-pc_{x_vel_i} {{\n'
      f'\t--fruit-initial-x-velocity-pc: {x_vel_i};\n'
      f'}}\n'
    )

  #Velocity is automatically inverted when generating for the y axis.
  for y_vel_i in range(min_y_velocity_initial, max_y_velocity_initial):
    fruitvars.write(
      f'.fruitvar-initial-y-velocity-pc_-{y_vel_i} {{\n'
      f'\t--fruit-initial-y-velocity-pc: -{y_vel_i};\n'
      f'}}\n'
    )

  fruitvars.write(
    f'.fruitvar-lifespan-s_5 {{\n'
    f'\t--fruit-lifespan-s: 5;\n'
    f'}}\n'
  )

  fruitvars.write(
    f'.fruitvar-rotation-normalization-factor_-1 {{\n'
    f'\t--fruit-rotation-normalization-factor: -1;\n'
    f'}}\n'
  )

  fruitvars.write(
    f'.fruitvar-rotation-normalization-factor_0 {{\n'
    f'\t--fruit-rotation-normalization-factor: 0;\n'
    f'}}\n'
  )

  fruitvars.write(
    f'.fruitvar-rotation-normalization-factor_1 {{\n'
    f'\t--fruit-rotation-normalization-factor: 1;\n'
    f'}}\n'
  )