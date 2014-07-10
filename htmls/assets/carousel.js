$(function(){
var speed = 600,
    currSel = 0,
    itemCount = $('.carousel ul li')
                    .length,
    itemWidth = $('.carousel ul li')
                  .css('width')
                    .split('px')[0] ;

$('.navNext').on('click',function(){
  currSel = (currSel+5)%itemCount;

  //while less than itemCount currSel will always increment by 1
  //when equal to itemCount it will return to the 0th index
  //modulus is a useful operator for iterating through an array that needs to reset itself


  //console.log((currSel*itemWidth));
  $('.carousel ul').animate({marginLeft: '-' + (currSel*itemWidth) +'px'},speed);
});

$('.navPrev').on('click',function(){
  currSel =((currSel==0)
                ?itemCount
                :(currSel))-5 ;
 //console.log((currSel*itemWidth));
  $('.carousel ul')
    .animate(
      {marginLeft:
       '-'
       +(currSel*itemWidth)
       +'px'}
      ,speed);
});
});

//NOTE BY KYLE
//I would like to recode all of the above behaviour as a circular linked
//list with no need for jQuery
//it would be /far/ more elegant and less prone to breaking, I think