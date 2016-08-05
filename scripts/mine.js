define(["jquery","public","dialog"],function($,public,dialog){
	if(window.location.href.indexOf('mine.html')==-1) return;
	var Init=function(){
		this.tabNav=document.querySelector(".tab_nav");
		this.credit=document.querySelector(".credit");
		this.rechargePhoneNum=document.querySelector(".recharge_phone_number");
		this.rechargeBtn=document.querySelector(".recharge_btn");
		this.logout=document.querySelector(".logout");
		this.bindEvent();
	}

	Init.prototype={
		bindEvent:function(){
			var that=this;

			//切换选项
			this.tabNav.addEventListener("click",function(ev){
				var ev=ev || window.ev;
				var target=ev.target || ev.srcElement;
				if(target.tagName.toLowerCase()=="li"){
					$(target).addClass("actived_item").removeClass("active_item").siblings().removeClass("actived_item").addClass("active_item");
					var itemHref=$(target).attr("href");
					$(itemHref).css({
						"-webkit-transform":"translate3d(0,0,0)"
					}).siblings().css({
						"-webkit-transform":"translate3d(100%,0,0)"
					})
				}
			})

			//点击选项添加激活状态
			public.activeState(that.credit);

			this.rechargePhoneNum.addEventListener("input",function(){
				if(that.rechargePhoneNum.value==""){
					that.rechargeBtn.style.background="#CCCCCC";
					that.rechargeBtn.disabled=true;
				}else{
					that.rechargeBtn.style.background="#5E83E1";
					that.rechargeBtn.disabled=false;
				}
			})

			this.rechargeBtn.addEventListener("click",function(){
				if(!(/^1[3|4|5|7|8]\d{9}$/.test(that.rechargePhoneNum.value))){ 
			        //alert("手机号码有误，请重填");
					EasyDialog.open({
						container:{
							header:'提示信息',
							content:'手机号码有误，请重填',
							yesFn:function(){
								that.rechargePhoneNum.focus();
							},
							noFn:true
						}
					})
			        return false;
			    }else{
			    	window.location.href="";
			    }
			})

			this.logout.addEventListener("click",function(){
				window.location.href="index.html";
			})
		}
	}

	var Init=new Init();
})