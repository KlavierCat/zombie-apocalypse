$(function(){

  
    var elems = $('#carousel li'),
    $speed = 800,
    $currentSelection = 0,
    $itemCount = elems.length,
    $timeline = $('#timeline li'),
    $itemWidth = elems.css('width').split('px')[0];

function panCarousel(e){
	
	if(e.data.direction == 'forward'){
		$currentSelection = ($currentSelection+1)%$itemCount;
		$('#carousel').animate({
			
			marginLeft: '-' + ($currentSelection*$itemWidth) + 'px'
		}, $speed);
		
		$timeline.eq($currentSelection).siblings().fadeOut('slow')
		.removeClass('selected').end().fadeIn('slow').addClass('selected');
	

		}else{
		
		$currentSelection = ($currentSelection===0) ? $itemCount : ($currentSelection-1);
		$('#carousel').animate(		
		{
		marginLeft : '-' + ($currentSelection*$itemWidth) + 'px'
		}, $speed);


		$timeline.eq($currentSelection).siblings().fadeOut('slow')
		.removeClass('selected').end().fadeIn('slow').addClass('selected');

}
	

}

$('#navNext').bind('click', {direction: 'forward'}, panCarousel);
$('#navPrev').bind('click', {direction: 'backward'}, panCarousel);

});



//% modulus a useful operator to RESET value back to 0