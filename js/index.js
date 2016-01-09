$(".left>ul>li").click(function(){
    $(this).children("ul").finish()
	$(this).children("ul").slideToggle()
	$(this).siblings().children("ul").slideUp()
})
$(".left>ul>li>ul a").click(function(e){
	e.stopPropagation()	
	 $(".left>ul a").removeClass("active")
	 $(this).addClass("active")
	 $(this).parent().find("ul").stop();
	 $(this).parent().find("ul").slideToggle()
})
