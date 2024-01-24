//@ts-nocheck
//LAB 12 - SVG WINTER SCENE
window.onload = _ => {
  const svg = document.querySelector('svg');

  svg.append(createSVGCircle(
    150, 233, 66, '#fff', '#aaa'
  ));

  svg.append(createSVGCircle(
    150, 150, 50, '#fff', '#aaa'
  ));

  svg.append(createSVGCircle(
    150, 225, 7, '#333', '#aaa'
  ));

  svg.append(createSVGCircle(
    150, 250, 7, '#333', '#aaa'
  ));

  svg.append(createSVGCircle(
    150, 275, 7, '#333', '#aaa'
  ));

  svg.append(createSVGCircle(
    133, 150, 7, '#333', '#aaa'
  ));

  svg.append(createSVGCircle(
    166, 150, 7, '#333', '#aaa'
  ));

  svg.append(createSVGCircle(
    166, 150, 7, '#333', '#aaa'
  ));

  svg.append(createSVGCircle(
    150, 166, 7, '#f60', '#aaa'
  ));

  svg.append(createSVGCircle(
    166, 180, 3, '#333', '#aaa'
  ));

  svg.append(createSVGCircle(
    133, 180, 3, '#333', '#aaa'
  ));

  svg.append(createSVGCircle(
    140, 183, 3, '#333', '#aaa'
  ));

  svg.append(createSVGCircle(
    159, 183, 3, '#333', '#aaa'
  ));

  svg.append(createSVGCircle(
    150, 185, 3, '#333', '#aaa'
  ));
};


const createSVGCircle = (x, y, r, fill, stroke_color) => {
  const svg_namespace = 'http://www.w3.org/2000/svg';
  const circle = document.createElementNS(svg_namespace, 'circle');


  circle.setAttribute('cx', x);
  circle.setAttribute('cy', y);
  circle.setAttribute('r', r);
  circle.setAttribute('fill', fill);
  circle.setAttribute('stroke', stroke_color);


  return circle;
};