$(function(){

  
    var elems = $('#carousel li'),
    $speed = 800,
    $currentSelection = 0,
    $itemCount = elems.length,
    $timeline = $('#timeline li'),
    $itemWidth = elems.css('width').split('px')[0];


function panCarousel(e){
	
	//e.data is the object which holds and processes passed in arguments
	//e.data.direction holds the direction : forward key-value pair

	if(e.data.direction == 'forward'){
		$currentSelection = ($currentSelection+1)%$itemCount;
		//modulos operator makes it so that currentSelection resets to 0 if it reaches end of array
		$('#carousel').animate({
			
			marginLeft: '-' + ($currentSelection*$itemWidth) + 'px'
		}, $speed);
		
		$timeline.eq($currentSelection).siblings().css({'display':'none'}).removeClass('selected')
		.end().addClass('selected').fadeIn(800);
	

		}else{
		
		//fixed an issue, when array resets to itemCount it should take 1 off of it, because
		//compooters count from 0, not 1
		$currentSelection = ($currentSelection===0) ? ($itemCount-1) : ($currentSelection-1);
		$('#carousel').animate(		
		{
		marginLeft : '-' + ($currentSelection*$itemWidth) + 'px'
		}, $speed);

		$timeline.eq($currentSelection).siblings().css({'display' : 'none'}).removeClass('selected')
		.end().addClass('selected').fadeIn(800);
	
}
	

}

$('#navNext').bind('click', {direction: 'forward'}, panCarousel);
$('#navPrev').bind('click', {direction: 'backward'}, panCarousel);

});


