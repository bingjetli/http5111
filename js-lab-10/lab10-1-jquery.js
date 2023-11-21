//@ts-nocheck
//LAB 10 - 1 FAQ PAGE

window.onload = () => {
  //Hide content boxes and setup event listeners for #4.
  $('.contentBox')
    .hide()
    .mouseenter(function(){
      //Inline-styling method
      //const la_couleur = $(this).css('color');
      //const la_couleur_dans_le_fond = $(this).css('background-color');

      $(this)
        //.css('color', la_couleur_dans_le_fond)
        //.css('background-color', la_couleur)

        //Class-styling method
        .addClass('textHovered');
    })
    .mouseleave(function(){
      //Inline-styling method
      //const la_couleur = $(this).css('color');
      //const la_couleur_dans_le_fond = $(this).css('background-color');

      $(this)
        //.css('color', la_couleur_dans_le_fond)
        //.css('background-color', la_couleur)

        //Class-styling method
        .removeClass('textHovered');
    });
  ;
  
  //Setup event listener for #2.
  let ouvrir = null;
  $('.panelContainer > h2').click(function(){
    //Extra: close other tabs when user clicks a new tab.
    ouvrir?.slideUp();

    ouvrir = $(this).next().slideToggle();
  });

}