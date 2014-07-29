$(function(){
var speed = 1000,
    currSel = 0,
    itemCount = $('#carousel ul li')
                    .length,
    itemWidth = $('#carousel ul li')
                  .css('width')
                    .split('px')[0] ;

$('#navNext').on('click',function(){
  currSel = (currSel+5)%itemCount;

  //while less than itemCount currSel will always increment by 1
  //when equal to itemCount it will return to the 0th index
  //modulus is a useful operator for iterating through an array that needs to reset itself


  //console.log((currSel*itemWidth));
  $('#carousel ul').animate({marginLeft: '-' + (currSel*itemWidth) +'px'},speed);
});

$('#navPrev').on('click',function(){
  currSel =((currSel==0)
                ?itemCount
                :(currSel))-5 ;
 //console.log((currSel*itemWidth));
  $('#carousel ul')
    .animate(
      {marginLeft:
       '-'
       +(currSel*itemWidth)
       +'px'}
      ,speed);
});
