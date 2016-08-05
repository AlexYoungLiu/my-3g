define(["jquery","public","dialog"],function($,public,dialog){
	if(window.location.href.indexOf('choose_number.html')==-1) return;
	var Init=function(){
		this.iccidText=document.querySelector(".iccid_text");
		this.query=document.querySelector(".query");
		this.chooseNumber=document.querySelector(".choose_number");
		this.queryBox=document.querySelector(".query_box");
		this.choose=document.querySelector(".choose");
		this.choosePackage=document.querySelector(".choose_package");
		this.chooseCid=document.querySelector(".choose_cid");
		this.nextBtn=document.querySelector(".next_btn");
		this.getData();
		this.bindEvent();
	}

	Init.prototype={
		getData:function(){
			var that=this;

			//进行数据请求
			$.ajax({
				url:"data/data.json",
				type:"get",
				dataType:"json",
				success:function(data){
					console.log(data.result[0]);
					var t=data.result.length,v=data.result;
					//绑定事件，渲染数据
					var _href = location.href;
					$(".choose_number").on("click",function(){
						renderData();
						function renderData(){
							var html="";
							html+='<div class="phone_view">'+
									'<ul class="phone_box">';
							for(var i=0;i<t;i++){
								html+='<li class="active">'+v[i]+'</li>';
							}
							html+='</ul>'+'</div>';
							console.log(html);
							$(".container").append(html);
							history.pushState({},'choose phone number',_href+'?_choose_number');

							//选择号码
							document.querySelector(".phone_view").addEventListener("click",function(evt){
								var evt=evt || window.event;
								var target=evt.target || evt.srcElement;
								console.log(target.tagName);
								if(target.tagName.toLowerCase()=="li"){
									$(target).addClass("actived").removeClass("active").siblings().removeClass("actived").addClass("active");
									var phoneNumber=target.innerHTML;
									document.querySelector(".choose_number").value="已选 "+phoneNumber;
									document.querySelector(".choose_number").style.border="1px solid #5E83E1";
									document.querySelector(".choose_number").style.color="#5E83E1";
									document.querySelector(".choose_number").style.background='url("images/choose_number_ed.png") no-repeat 90% center,white';
									document.querySelector(".choose_number").style.backgroundSize="7px 12px";
									if(that.iccidText.value==""){
										that.nextBtn.style.background="#CCCCCC";
										that.nextBtn.disabled=true;
									}else{
										that.nextBtn.style.background="#5E83E1";
										that.nextBtn.disabled=false;
									}
								}
								$(".phone_view").remove();
								history.replaceState({},'choose phone number',_href)

								$(window).on('popstate',function(){
									$(".phone_view").remove();
								})
								console.log(target);
								console.log(phoneNumber);
							})
						}
					})
				},
				error:function(){
					//alert("数据请求失败，请重试");
					EasyDialog.open({
						container:{
							header:'提示信息',
							content:'数据请求失败，请重试',
							yesFn:function(){},
							noFn:true
						}
					})
				}
			})
		},

		bindEvent:function(){
			var that=this;
			
			this.iccidText.addEventListener("input",function(){
				if(that.iccidText.value=="" || that.chooseNumber.value==""){
					that.nextBtn.style.background="#CCCCCC";
					that.nextBtn.disabled=true;
				}else{
					that.nextBtn.style.background="#5E83E1";
					that.nextBtn.disabled=false;
				}
			})

			$(".query").on("click",function(){
				$(".query_box").toggleClass("animate");
			})

			public.activeState(that.choosePackage);

			public.activeState(that.chooseCid);

			this.nextBtn.addEventListener("click",function(){
				function transmitData(){
					var combo=document.querySelector(".actived").querySelector("p").innerHTML;
						var phoneNumVal=document.querySelector(".choose_number").value;
						var phoneNumber=phoneNumVal.substring(3);
						var callerId=document.querySelector(".choose_cid").querySelector(".actived").innerHTML;
						console.log(combo);
						console.log(phoneNumber);
					return "?combo="+combo+"&phoneNumber="+phoneNumber+"&callerId="+callerId;
				}
				function settleData(url){
				    url=decodeURI(url).slice(1);
				    var obj={};
				    url.split("&").forEach(function(t){
				        t=t.split("=");
				        obj[t[0]]=t[1];
				    })
				    return obj;
				}
				var str=transmitData(),
					_data=settleData(str);
				console.log(_data)
				if(str){
					str=encodeURI(str);
					window.location.href="write_info.html"+str;
				}
			})
		}
	}

	var Init=new Init();
})