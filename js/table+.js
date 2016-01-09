$(function(){
	var clientH=$(window).height();
	var headerH=$('.header').height();
	var content=$('.content');
	content.height(clientH-headerH);

	var hth=$('.content .header-title').height();
	var chc=clientH-headerH-hth-20;
	var tableCnt=$('.content .table-content');
	$('.content .header-content').height(chc);
	tableCnt.height(chc-36-36-20);

	//保持 th  td 宽度一致
	var ths=$('.table-header th');
	var tds=$('tr:first td',tableCnt);
	tds.width(function(index,width){
		ths.eq(index).width(width);
	})
});