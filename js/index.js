$(".left>ul>li").click(function(){
    $(this).children("ul").finish()
	$(this).children("ul").slideToggle()
	$(this).siblings().children("ul").slideUp()
})
$(".left>ul>li>ul a").click(function(e){
	 e.stopPropagation()
	 e.cancleBubble=true;	
	 $(".left>ul a").removeClass("active")
	 $(this).addClass("active")
	 $(this).parent().find("ul").finish();
	 $(this).parent().find("ul").slideToggle()
})
var innerleft=0;
var range=0;
$(".left a[target=main]").click(function(){
	if($(this).attr("target")=="main"){
	var time=new Date().getTime();
	$(this).attr("target","t"+time)
	$(".righttopbut").removeClass("butactive")
	$(".righttopinner").append("<div class='righttopbut butactive'>"+$(this).text()+"<div class='rrrclosebtn'></div></div>")
    $(".rightbottom").append("<div class='item'><iframe src="+$(this).attr("href")+" name=t"+time+"></iframe></div>")
    var width=($(".righttopbut").length)*151;
    var widths=$(".right").width();
    $('.righttopinner').css("width",width)
     if(width>widths){
     	range++;
     	innerleft-=150;
     	$(".righttopdir").css("display","block")
     	$(".righttopinner").css({left:innerleft})
     }
}
})
var left=$(".dirleft")[0];
var right=$(".dirright")[0];
var width=($(".righttopbut").length)*151;
var widths=$(".right").width();
var n=0;
left.onclick=function(){
    if(n>0){
    n--;                            	
	innerleft-=150;
    $(".righttopinner").css({left:innerleft})
}}
right.onclick=function(){
   if(innerleft<0){ 
   	n++;
	innerleft+=150;
    $(".righttopinner").css({left:innerleft})
}
}
$(".left,.right").mousedown(function(e){
	e.preventDefault();
	e.returnValue=false;
})
$(".righttopbut").bind("click",function(){
	var index=$(this).index()
	$(this).addClass("butactive").siblings().removeClass("butactive")
	$(".item").css("zIndex","0").eq(index).css("zIndex","1")
})
$(".rrrclosebtn").each(function(index){
	$(this).click(function(){
	$(this).parent().remove()
	$(".item").eq(index).remove()
	$(".left a[target^=t]").eq(index).attr("target","main")
	$(".righttopbut:last").addClass("butactive").siblings().removeClass("butactive");
	$(".item:last").css("zIndex","1").siblings().css("zIndex","0")
	// var width=($(".righttopbut").length)*151;
 //    $('.righttopinner').css("width",width)
 //     if(range>0){
 //     	range--;
 //     	innerleft+=150;
 //     	$(".righttopdir").css("display","none")
 //     	$(".righttopinner").css({left:innerleft})
 //     }
 })
})

