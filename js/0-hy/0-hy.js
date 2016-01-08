$(function(){
	$(".toggle").click(function(){

		var index=$(this).index(".toggle");
		$(this).toggleClass("hide");
		$(".content").eq(index).slideToggle();
	})
})