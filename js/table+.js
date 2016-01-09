$(function(){
	//设置 table 高度
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
	});

	//按钮处理
	var alertBox=$('.alert-box');
	var headerTitle=$('.header-title',alertBox);
	var aths=$('.table-header th').not(":first").not(":last");
	var atds;
	var contentTable=$('.tables',alertBox);
	//编辑按钮
	var oldVal;
	var flag;
	//type 值 ： show  edit
	function showData(td,contents,type){
		var tables=[];
		var o=0;
		var str="";
		alertBox.css('display','block');
		oldVal=[];
		td.each(function(i){
			var cont=$(this).html();
			var title=aths.eq(i).html();
			contents.push(cont);
			oldVal.push(cont);
			if(o==0){str+="<tr>";}
			if(type=='edit'){
				str+="<td><span style='float:left;'>"+title+"</span><input type='text' value='"+cont+"' style='float:right;'></td>";
			}else{
				str+="<td><span style='float:left;'>"+title+"</span><span style='float:right;width:160px;text-align:left;border-left:1px solid #f6f6f6;padding-left:5px;margin-left:5px;'>"+cont+"</span></td>";
			}
			o++;
			if(o==2){str+="</tr>";o=0;}	
		})
		contentTable.html(str);
	}
	//编辑提交数据 
	function editData(td){
		var inputs=$('input',contentTable);
		inputs.each(function(i,obj){
			$(this).data('a',i)
		})
		inputs.focus(function(){
			nowInput=$(this).val();
			$(this).val('');	
		})
		flag=false;
		inputs.blur(function(){
			var vals=$(this).val();
			if(vals==''){
				vals=nowInput;
				$(this).val(nowInput);
			}
			if(nowInput!=vals){
				contents[$(this).data('a')]=vals;
				flag=true;
			};
			
		});
		$('.input-button-yes').click(function(){
			if(flag){
				var urls=$(this).attr('urls');
				var datas={};
				var titles=[];
				aths.attr('data-role',function(i,cont){
					titles.push(cont);
				})
				for(var i in contents){
					console.log(contents);
					$(td[i]).html(contents[i]);
					datas[titles[i]]=contents[i];
				}
				/*
					ajax提交数据 后台页面  
					1. 提交地址url 从 按钮 属性 urls获取
					2. 提交 键名 从表格头部  
				*/
				$.ajax({
					url:urls,
					type:'get',
					data:datas,
					success:function(){
						console.log('success');
					}
				})
				alertBox.css('display','none');
			}else{
				alertBox.css('display','none');
			}
			flag=false;
		})
		$('.input-button-no').click(function(){
			for(var i in oldVal){
				$(td[i]).html(oldVal[i]);	
			}
			flag=false;
			alertBox.css('display','none');
		})
	}
	var nowInput;
	var contents;
	//查看
	$('.view').click(function(){
		contents=[];//存放内容 json
		var that=this;
		headerTitle.html('查看');
		$('.input-button-yes').css('display','none');
		atds=$(this).parent().parent().find('td').not(":first").not(":last");
		//显示数据
		showData(atds,contents,'show');
		$('.input-button-no').click(function(){
			alertBox.css('display','none');
		})
	})
	//编辑
	$('.edit').click(function(){
		contents=[];//存放内容 json
		var that=this;
		headerTitle.html('编辑');
		atds=$(this).parent().parent().find('td').not(":first").not(":last");
		//显示数据
		showData(atds,contents,'edit');
		//编辑数据
		$('.input-button-yes').css('display','inline-block');
		editData(atds);
	});
	//删除
	$('.delete').click(function(){
		headerTitle.html('编辑');
		var tr=$(this).parent().parent();
		//ajax  传递后台删除数据
		var bh=$('td:eq(1)',tr).html();
		$.ajax({
			url:'127.0.0.1/remove.jsp',
			data:{"bh":bh}
		})
		tr.remove();
	})
});