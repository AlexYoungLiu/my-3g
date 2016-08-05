define(["jquery","public","dialog"],function($,public,dialog){
	if(window.location.href.indexOf('index.html')==-1) return;
	var Init=function(){
		this.container=document.querySelector(".container");
		this.mainView=document.querySelector(".main_view");
		this.netNumber=document.querySelector(".net_number");
		this.codeText=document.querySelector(".code_text");
		this.getCode=document.querySelector(".get_code");
		this.loginBtn=document.querySelector(".login_btn");
		this.openCardBtn=document.querySelector(".opencard_btn");
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
					var codeTextLen=that.codeText.value.length,
						netNumLen=that.netNumber.value.length;
					if(codeTextLen==0 || netNumLen==0){
						document.querySelector(".login_btn").style.background="#ccc";
						document.querySelector(".login_btn").disabled=true;
					}else{
						document.querySelector(".login_btn").style.background="#5E83E1";
						document.querySelector(".login_btn").disabled=false;
					}
				}
				return true;
			},false);

			//获取验证码
			this.getCode.addEventListener("click",function(){
				public.waitTime(that.getCode);
			})

			//点击登录按钮,验证表单,页面跳转
			this.loginBtn.addEventListener("click",function(){
				var netNumberVal=that.netNumber.value;
				console.log(netNumberVal)
				
				function isIdCardNo(){
					//if(isNaN(netNumberVal)){alert("输入的不是数字！"); return false;}
					var len=netNumberVal.length,reg;
					if(len==15){
						reg=new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(\w)$/)
					}else if(len==18){
						reg=new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/)
					}else{
						//alert("输入的证件号位数不对.");
						EasyDialog.open({
							container:{
								header:'提示信息',
								content:'输入的证件号位数不对',
								yesFn:function(){
									that.netNumber.focus();
								},
								noFn:true
							}
						})
						return false;
					}
					var val=netNumberVal.match(reg);
					if(val!=null){
						if(len==15){
							var D=new Date("19"+val[3]+"/"+val[4]+"/"+val[5]);
							var B=D.getYear()==val[3]&&(D.getMonth()+1)==val[4]&&D.getDate()==val[5];
						}else{
							var D=new Date(val[3]+"/"+val[4]+"/"+val[5]);
							var B=D.getFullYear()==val[3]&&(D.getMonth()+1)==val[4]&&D.getDate()==val[5];
						}
						if(!B){
							//alert("输入的身份证号"+val[0]+"里出生日期不对.");
							EasyDialog.open({
								container:{
									header:'提示信息',
									content:'输入的身份证号"+val[0]+"里出生日期不对.',
									yesFn:function(){
										that.netNumber.focus();
									},
									noFn:true
								}
							})
							return false;
						}
					}
					if(!reg.test(netNumberVal)){
						//alert("身份证最后一位只能是数字和字母.");
						EasyDialog.open({
							container:{
								header:'提示信息',
								content:'身份证最后一位只能是数字和字母',
								yesFn:function(){
									that.netNumber.focus();
								},
								noFn:true
							}
						})
						return false;
					}
					return true;
				}

				if(isIdCardNo()==true){
					var codeTextLen=that.codeText.value.length,codeTextVal=that.codeText.value,reg;
					console.log(codeTextLen);
					reg=new RegExp(/^[0-9]*$/);
					var val=codeTextVal.match(reg);
					if(codeTextLen!==4){
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
						window.location.href="mine.html";
					}
				}
			})

			this.openCardBtn.addEventListener("click",function(){
				window.location.href="bind_id.html";
			})
		}
	}

	var Init=new Init();
})