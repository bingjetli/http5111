import random

with open('stageshake.css', 'w') as stageshake :
  stageshake.write(
    f'@keyframes anim-stage-shake {{\n'
    f'\t0% {{\n'
    f'\t\ttop:0%;\n'
    f'\t\tleft:0%;\n'
    f'\t}}\n'
  )

  for i in range(1, 100):
    stageshake.write(
      f'\t{i}% {{\n'
      f'\t\ttop:{random.randint(-3,3)}%;\n'
      f'\t\tleft:{random.randint(-3,3)}%;\n'
      f'\t}}\n'
    )

  stageshake.write(
    f'\t100% {{\n'
    f'\t\ttop:0%;\n'
    f'\t\tleft:0%;\n'
    f'\t}}\n'
    f'}}'
  )