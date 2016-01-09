$(".left>ul>li").click(function(){
	$(this).children("ul").slideToggle()
	$(this).siblings().children("ul").slideUp()
})
$(".left>ul>li>ul a").click(function(e){
	e.stopPropagation()	
	 $(".left>ul a").removeClass("active")
	 $(this).addClass("active")
})