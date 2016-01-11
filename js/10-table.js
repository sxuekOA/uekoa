$(function(){
	/*
		处理窗口高度
	*/

	//设置 table 高度
	var clientH=$(window).height();
	var headerH=$('.header').height();
	var content=$('.content');
	content.height(clientH-headerH);

	var hth=$('.content .header-title').height();
	var chc=clientH-headerH-hth-20;
	var tableCnt=$('.content .table-content');
	$('.content .header-content').height(chc);
	tableCnt.height(chc-50);
	var tableContent=$('.table-content .table');
	//保持 th  td 宽度一致
	var ths=$('.table-header th');
	var tds=$('tr:first td',tableCnt);
	tds.width(function(index,width){
		ths.eq(index).width(width);
	});
	var tableHeader=$('.table .table-header th');
	tableCnt.scroll(function(){
		var tableTop=tableCnt.scrollTop();
		tableHeader.css('top',tableTop);
	})



/*
&表格按钮 部分逻辑& 

	添加按钮 ajax
	查看按钮 
	编辑按钮 ajax
	删除按钮 ajax

	showData() 函数 显示数据逻辑
	editData() 函数 编辑数据逻辑
*/
	//元素获取
	var alertBox=$('.alert-box');
	var headerTitle=$('.header-title',alertBox);
	var aths=$('.table-header th').not(":first").not(":last");
	var atds;
	var contentTable=$('.tables',alertBox);
	var nobtn=$('.input-button-no');
	var yesbtn=$('.input-button-yes');
	

	//显示数据
	var oldVal;
	var flag;
			//type 值 ： show  edit
	function showData(td,type){
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
	function editData(){
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


		//确认按钮
		yesbtn.click(function(){
			$(this).off()
			if(flag){
				var datas={};
				var titles=[];
				aths.attr('data-role',function(i,cont){
					titles.push(cont);
				})
				for(var i=0;i<contents.length;i++){
					$(atds[i]).html(contents[i]);
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


		//取消按钮
		nobtn.click(function(){
			$(this).off();
			for(var i=0;i<oldVal.length;i++){
				$(atds[i]).html(oldVal[i]);	
			}
			flag=false;
			alertBox.css('display','none');
		})
	}


	var nowInput;
	var contents;
	var urls;
	//查看按钮
	tableContent.on("click",'.view',function(){
		contents=[];//存放内容 json
		var that=this;
		headerTitle.html('查看');
		yesbtn.css('display','none');
		atds=$(this).parent().parent().find('td').not(":first").not(":last");
		//显示数据
		showData(atds,'show');
		nobtn.click(function(){
			alertBox.css('display','none');
		})
	})


	//编辑按钮
	tableContent.on("click",'.edit',function(){
		contents=[];//存放内容 json
		urls=$(this).attr('urls');
		headerTitle.html('编辑');
		atds=$(this).parent().parent().find('td').not(":first").not(":last");
		//显示数据
		showData(atds,'edit');
		//编辑数据
		yesbtn.css('display','inline-block');
		editData(atds);
	});


	//删除按钮
	tableContent.on("click",".delete",function(){
		headerTitle.html('编辑');
		urls=$(this).attr('urls');
		var tr=$(this).parent().parent();
		//ajax  传递后台删除数据
		var bh=$('td:eq(1)',tr).html();
		$.ajax({
			url:urls,
			data:{"bh":bh}
		})
		tr.remove();
	})

	
	//添加按钮
	$('.add-table').click(function(){
		var that=this;
		flag=false;
		yesbtn.css('display','inline-block');
		contents=[];//存放内容 
		urls=$(this).attr('urls');
		headerTitle.html('添加');
		var o=0;
		var str="";
		alertBox.css('display','block');
		aths.each(function(i){
			var title=$(this).html();
			if(o==0){str+="<tr>";}
			str+="<td><span style='float:left;'>"+title+"</span><input type='text' value='' style='float:right;'></td>";
			o++;
			if(o==2){str+="</tr>";o=0;}	
		})
		contentTable.html(str);
		var inputs=$('input',contentTable);
		inputs.each(function(i,obj){
			$(this).data('a',i)
		})
		inputs.blur(function(){
			var vals=$(this).val();
			if(nowInput!=''){
				flag=true;
				contents[$(this).data('a')]=vals;
			};	
		});
		//确认按钮  ajax提交
		yesbtn.click(function(){
			if(flag){
				var datas={};
				var titles=[];
				aths.attr('data-role',function(i,cont){
					titles.push(cont);
				});
				var nums=1;
				if($('.table-number:last').html()!="&nbsp;"){
					nums=$('.table-number:last').html()*1+1;
				}else{
					nums=1;
				}
				var conts='<td class="table-number">'+nums+"</td>";
				for(var i=0;i<aths.length;i++){
					if(!contents[i]){
						contents[i]='';
					}
					conts+="<td>"+contents[i]+"</td>";
					datas[titles[i]]=contents[i];
				}
				conts+='<td></td>';
					$('<tr>'+conts+'</tr>').appendTo('.table-content .table');

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
			$(this).off()
		})
		//取消按钮
		nobtn.click(function(){
			alertBox.css('display','none');
			$(this).off()
		})	
	})
});