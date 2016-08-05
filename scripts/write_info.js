define(["jquery","iscroll","fastclick","valididcard","dialog"],function($,IScroll,fastclick,v,dialog){
	if(window.location.href.indexOf('write_info.html')==-1) return;
	fastclick.attach(document.body);

	var Init=function(){
		this.formBox=document.querySelector(".form_box");
		this.numInfo=document.querySelector(".num_info");
		this.name=document.querySelector(".name");
		this.numId=document.querySelector(".num_id");
		this.idAdress=document.querySelector(".id_address");
		this.phoneNum=document.querySelector(".phone_num");
		this.uploadBtn=document.querySelector(".upload_btn");
		this.serviceContract=document.querySelector(".service_contract");
		this.submit=document.querySelector(".submit");
		this.getUrlInfo();
		this.bindEvent();
		this.validForm();
	}

	Init.prototype={
		//获取地址栏信息
		getUrlInfo:function(){
			function settleData(url){
			    url=decodeURI(url).slice(1);
			    var obj={};
			    url.split("&").forEach(function(t){
			        t=t.split("=");
			        obj[t[0]]=t[1];
			    })
			    return obj;
			}
			var numinfo=settleData(location.search);
			console.log(numinfo.combo);
			this.numInfo.innerHTML='预存30元 / '+numinfo.combo+' / '+numinfo.phoneNumber;
		},

		bindEvent:function(){
			var that=this;

			//阅读协议
			this.serviceContract.addEventListener("click",function(evt){
				var evt=evt || window.event;
				var target=evt.target || evt.srcElement;
				console.log(target.tagName);
				if(target.tagName.toLowerCase()=="a"){
					window.location.href="";
				}else{
					if($(".service_contract").hasClass("check")){
						$(".service_contract").removeClass("check").addClass("checked");
						if(that.name.value!="" && that.numId.value!="" && that.idAdress.value!="" && that.phoneNum.value!=""){
							if($(".upload_btn").hasClass("btn_actived")){
								document.querySelector(".submit").style.background="#5E83E1";
								document.querySelector(".submit").disabled=false;
							}
						}
					}else{
						$(".service_contract").removeClass("checked").addClass("check");
						document.querySelector(".submit").style.background="#CCCCCC";
						document.querySelector(".submit").disabled=true;
					}
				}
			})

			//提交信息,验证表单,页面跳转
			var _href=window.location.href;
			this.submit.addEventListener("click",function(){
				//验证姓名
				function validName(){
					if(!(/^[\u4e00-\u9fa5]{2,4}$/).test(that.name.value)){
						//alert("姓名输入有误，请重新输入");
						EasyDialog.open({
							container:{
								header:'提示信息',
								content:'姓名输入有误，请重新输入',
								yesFn:function(){
									that.name.focus();
								},
								noFn:true
							}
						})
						return false;
					}
					return true;
				}

				if(validName()==true){
					//验证身份证号
					function validIdCard(){
						if(!v.idCard($(".num_id").val())){
							//alert("身份证号输入有误，请重新输入")
							EasyDialog.open({
								container:{
									header:'提示信息',
									content:'身份证号输入有误，请重新输入',
									yesFn:function(){
										that.numId.focus();
									},
									noFn:true
								}
							})
							return false;
						}
						return true;
					}

					if(validIdCard()==true){
						//验证身份证地址
						function getIdCity(){
							var idCityVal=document.querySelector(".id_address").value;
							var idCardCityNum=$(".num_id").val().substring(0,2);
							console.log(idCardCityNum);
							console.log(v.vcity);
							console.log(v.vcity[idCardCityNum]);
							if(idCityVal!=v.vcity[idCardCityNum]){
								//alert("身份证地址输入错误，请重新输入");
								EasyDialog.open({
									container:{
										header:'提示信息',
										content:'身份证地址输入错误，请重新输入',
										yesFn:function(){
											that.idAdress.focus();
										},
										noFn:true
									}
								})
								return false;
							}else{
								return true;
							}
						}
						if(getIdCity()==true){
							//验证手机号码
							validPhoneNum();
							function validPhoneNum(){
								//表示以1开头，第二位可能是3/4/5/7/8等的任意一个，在加上后面的\d表示数字[0-9]的9位，总共加起来11位结束。
							    if(!(/^1[3|4|5|7|8]\d{9}$/.test(that.phoneNum.value))){ 
							        //alert("手机号码有误，请重填");
							        EasyDialog.open({
										container:{
											header:'提示信息',
											content:'手机号码有误，请重填',
											yesFn:function(){
												that.phoneNum.focus();
											},
											noFn:true
										}
									})
							        return false;
							    }else{
							    	var numInfo=location.search;
									window.location.href="order_detail.html"+numInfo;
							    }
							}
						}
					}
				}
			})

			//实现上传页的显示与隐藏
			this.uploadBtn.addEventListener("click",function(){
				$(".upload_view").removeClass("hide");
				if($(".upload_view").children().length==0){
					$(".upload_view").html($("#upload_hold").html()).trigger("page-show");
				}

				var myScroll;
				myScroll=new IScroll('.upload_view',{mouseWheel:true});

				$(".photo_front").on("change",function(){
					upload($(this));
				})
				$(".photo_iccid").on("change",function(){
					upload($(this));
				})
				$(".photo_back").on("change",function(){
					upload($(this));
				})

				history.pushState({},"upload",location.href+"&_upload_photo");

				document.querySelector(".complete").addEventListener("click",function(){
					$(".upload_view").addClass("hide");
					history.replaceState({},'choose phone number',_href)
				})
			})

			//上传照片
			function upload(obj){
				var objType = obj[0].files[0].type;
				if(/image/.test(objType)){
					if(obj[0].files[0].size/307200>1){
						EasyDialog.open({
							container:{
								header:'提示信息',
								content:'请上传小于300KB的照片',
								yesFn:function(){},
								noFn:true
							}
						})
						return false;
					}
					var pre=new FileReader;
					console.log(pre)
					pre.readAsDataURL(obj[0].files[0]);
					pre.onload=function(){
						var result=this.result;
						$(obj).parent().find("img").attr('src',result);
						$(obj).parent().attr("done",1);
						//上传图片
           				//$.when($.ajax('',this.result).done(function(){}));
           				if(deteUploadState()){
           					$(".complete").attr("disabled",false).css("background","#5E83E1");
           				}
					}
				}else{
					EasyDialog.open({
						container:{
							header:'提示信息',
							content:'上传照片文件格式错误',
							yesFn:function(){},
							noFn:true
						}
					})
				}
			}

			//检测上传状态
			function deteUploadState(){
				var i=0;
				$(".photo_box").each(function(){
					if($(this).attr("done")){
						i++;
					}
				})
				return i>=3 ? !0 : !1;
			}

			//实现浏览器后退功能
			$(window).on("popstate",function(){
				if(location.href.indexOf("_upload_photo")==-1){
					$(".upload_view").addClass("hide");
				}else{
					$(".upload_view").removeClass("hide");
				}
			})

			//根据照片上传状态,判断是否激活提交按钮
			$(".upload_view").on("page-show",function(){
				$(".complete").off().on("click",function(){
					if($(".upload_view").hasClass("hide")){
						return false;
					}else{
						$(".upload_view").addClass("hide");
					}
					$(".upload_btn").addClass("btn_actived").removeClass("btn_active").val("照片上传已完成");
					if(that.name.value!="" && that.numId.value!="" && that.idAdress.value!="" && that.phoneNum.value!=""){
						if($(".service_contract").hasClass("checked")){
							document.querySelector(".submit").style.background="#5E83E1";
							document.querySelector(".submit").disabled=false;
						}
					}else{
						document.querySelector(".submit").style.background="#CCCCCC";
						document.querySelector(".submit").disabled=true;
					}
				})
			})
		},

		validForm:function(){
			var that=this;
			this.formBox.addEventListener("input",function(ev){
				var ev=ev || window.event;
				var target=ev.target || ev.srcElement;
				if(target.tagName.toLowerCase()=="input"){
					if(that.name.value=="" || that.numId.value=="" || that.idAdress.value=="" || that.phoneNum.value=="" || $(".service_contract").hasClass("check") || $(".upload_btn").hasClass("btn_active")){
						document.querySelector(".submit").style.background="#CCCCCC";
						document.querySelector(".submit").disabled=true;
					}else{
							document.querySelector(".submit").style.background="#5E83E1";
							document.querySelector(".submit").disabled=false;
					}
				}
			})
		}
	}

	var Init=new Init();
})