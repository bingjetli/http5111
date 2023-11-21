//@ts-nocheck
//LAB 10 - 2 INVENTORY PAGE

$(window).on('load', ()=>{
  $('.desc').hide();

  let ouvrir = null;
  $('tr')
    .mouseenter(function(){
      $(this)
        //Inline-styling method
        //.css('background-color', 'red')
        //.css('color', 'white')

        //Class-styling method
        .addClass('highlighted');
    })

    .mouseleave(function(){
      $(this)
        //Inline-styling method
        //.css('background-color', 'initial')
        //.css('color', 'initial')

        //Class-styling method
        .removeClass('highlighted');
    })

    .click(function(){
      //#4 Only one description is visible at a time.
      ouvrir?.fadeOut();
      ouvrir = $(this).children('.desc').fadeToggle();
    });
});