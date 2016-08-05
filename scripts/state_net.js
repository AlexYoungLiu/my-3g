define([""],function(){
	if(window.location.href.indexOf('state_net.html')==-1) return;
	var Init=function(){
		this.orderNum=document.querySelector(".order_number");
		this.applyTime=document.querySelector(".apply_time");
		this.phoneNum=document.querySelector(".phone_number");
		this.combo=document.querySelector(".combo");
		this.callerId=document.querySelector(".caller_id");
		this.payNow=document.querySelector(".pay_now");
		this.getUrlInfo();
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
			var urlInfo=settleData(window.location.search);
			console.log(urlInfo);
			this.phoneNum.innerHTML=urlInfo.phoneNumber;
			this.combo.innerHTML=urlInfo.combo;
			this.callerId.innerHTML=urlInfo.callerId;
			var date=new Date();
			function m(i){
				if(i<10) return "0"+i;
				else return i;
			}
			this.applyTime.innerHTML=date.getFullYear()+'/'+m(date.getMonth()+1)+'/'+m(date.getDate())+' '+m(date.getHours())+':'+m(date.getMinutes())+':'+m(date.getSeconds());
		}
	}

	var Init=new Init();
})