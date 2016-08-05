define(["jquery","public","dialog"],function($,public,dialog){
	if(window.location.href.indexOf('bind_id.html')==-1) return;
	var Init=function(){
		this.url='https://ticwear-account.mobvoi.com/captcha/img?origin=ticwatch-service';
		this.mainView=document.querySelector(".main_view");
		this.ticwearText=document.querySelector(".ticwear_text");
		this.imageCode=document.querySelector(".image_code");
		this.imageCodeText=document.querySelector(".image_code_text");
		this.getImageCode=document.querySelector(".get_image_code");
		this.codeText=document.querySelector(".code_text");
		this.getCode=document.querySelector(".get_code");
		this.sendNote=document.querySelector(".send_note");
		this.bindBtn=document.querySelector(".bind_btn");
		this.bindEvent();
	}

	Init.prototype={
		bindEvent:function(){
			var that=this;

			//监听input状态
			this.mainView.addEventListener("input",function(ev){
				var ev=ev || window.event;
				var target=ev.target || ev.srcElement;
				if(target.tagName.toLowerCase()=="input"){
					if(that.codeText.value=="" || that.imageCodeText.value=="" || that.ticwearText.value==""){
						that.bindBtn.style.background="#ccc";
						that.bindBtn.disabled=true;
					}else{
						that.bindBtn.disabled=false;
						that.bindBtn.style.background="#5E83E1";
					}
				}
			})

			//获取图片验证码
			this.getImageCode.addEventListener("click",function(){
				var arr=[];
				function randNum(max,min){
					return Math.random()*(max-min)+min;
				}
				var tmp=randNum(9999,1000);
				arr.push(tmp);
				tmp=randNum(9999,1000);
		        arr.push(tmp);
		        
		        arr=public.aloneArray(arr);
		        _url=that.url+'&random_code='+tmp;
		        $(".image_code").attr('src',_url).attr('data-random-code',tmp);
			})

			//获取验证码
			this.getCode.addEventListener("click",function(){
				if(that.ticwearText.value==""){
					EasyDialog.open({
						container:{
							header:'提示信息',
							content:'手机号码不能为空',
							yesFn:function(){
								that.ticwearText.focus();
							},
							noFn:true
						}
					})
				}else if(!(/^1[3|4|5|7|8]\d{9}$/.test(that.ticwearText.value))){ 
			        //alert("手机号码有误，请重填");
			        EasyDialog.open({
						container:{
							header:'提示信息',
							content:'手机号码有误，请重填',
							yesFn:function(){
								that.ticwearText.focus();
							},
							noFn:true
						}
					})
			        return false;
			    }else{
			    	var imgCodeText=that.imageCodeText.value;
					reg=new RegExp(/^[0-9]*$/);
					var val=imgCodeText.match(reg);
					if(imgCodeText.length!==4){
						//alert("验证码错误");
						EasyDialog.open({
							container:{
								header:'提示信息',
								content:'验证码错误',
								yesFn:function(){
									that.imageCodeText.focus();
								},
								noFn:true
							}
						})
						return false;
					}else if(!reg.test(val)){
						//alert("验证码错误");
						EasyDialog.open({
							container:{
								header:'提示信息',
								content:'验证码错误',
								yesFn:function(){
									that.imageCodeText.focus();
								},
								noFn:true
							}
						})
						return false;
					}else{
						public.waitTime(that.getCode);
						var phone=that.ticwearText.value;
						that.sendNote.innerHTML="验证码已发送至"+phone;
					}
			    }
			})

			//点击下一步按钮，验证表单，页面跳转
			this.bindBtn.addEventListener("click",function(){
				function validTicwearText(){
					//表示以1开头，第二位可能是3/4/5/7/8等的任意一个，在加上后面的\d表示数字[0-9]的9位，总共加起来11位结束。
				    if(!(/^1[3|4|5|7|8]\d{9}$/.test(that.ticwearText.value))){ 
				        //alert("手机号码有误，请重填");
				        EasyDialog.open({
							container:{
								header:'提示信息',
								content:'手机号码有误，请重填',
								yesFn:function(){
									that.ticwearText.focus();
								},
								noFn:true
							}
						})
				        return false;
				    }else{
				    	return true;
				    }
				}

				if(validTicwearText()==true){
					function validImageCodeText(){
						var imgCodeText=that.imageCodeText.value;
						reg=new RegExp(/^[0-9]*$/);
						var val=imgCodeText.match(reg);
						if(imgCodeText.length!==4){
							//alert("验证码错误");
							EasyDialog.open({
								container:{
									header:'提示信息',
									content:'验证码错误',
									yesFn:function(){
										that.imageCodeText.focus();
									},
									noFn:true
								}
							})
							return false;
						}else if(!reg.test(val)){
							//alert("验证码错误");
							EasyDialog.open({
								container:{
									header:'提示信息',
									content:'验证码错误',
									yesFn:function(){
										that.imageCodeText.focus();
									},
									noFn:true
								}
							})
							return false;
						}else{
							return true;
						}
					}

				    if(validImageCodeText()==true){
				    	validCodeText();
				    	function validCodeText(){
				    		var codeText=that.codeText.value;
							reg=new RegExp(/^[0-9]*$/);
							var val=codeText.match(reg);
							if(codeText.length!==4){
								//alert("验证码错误");
								EasyDialog.open({
									container:{
										header:'提示信息',
										content:'验证码错误',
										yesFn:function(){
											that.codeText.focus();
										},
										noFn:true
									}
								})
								return false;
							}else if(!reg.test(val)){
								//alert("验证码错误");
								EasyDialog.open({
									container:{
										header:'提示信息',
										content:'验证码错误',
										yesFn:function(){
											that.codeText.focus();
										},
										noFn:true
									}
								})
								return false;
							}else{
								window.location.href="choose_number.html";
							}
				    	}
				    }
				}
			})
		}
	}

	var Init=new Init();
})