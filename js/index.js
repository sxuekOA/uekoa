$(".left>ul>li").click(function(){
	$(this).find("ul").slideToggle()
	$(this).siblings().find("ul").slideUp()
})
$(".left>ul>li>ul a").click(function(e){
	e.stopPropagation()	
	 $(".left>ul a").removeClass("active")
	 $(this).addClass("active")
})