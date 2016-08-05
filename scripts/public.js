define([],function(){
	return {
		waitTime:function(e){
			var time=60;
			var timer=setInterval(timing,1000);
			function timing(){
				time--;
				e.disabled=true;
				e.style.borderRadius="5px";
				e.style.background="#EEEEEE";
				e.value=time+"s后重发";
				if(time<0){
					clearInterval(timer);
					e.value="获取验证码";
					e.disabled=false;
				}
			}
		},

		aloneArray:function(arr){
            var obj = {},_arr=[];
            arr.forEach(function(v,i){
                if(!obj[v]){
                    obj[v] = 1;
                    _arr.push(v);
                }
            });
            return _arr;
        },

        getAgentType:function(){
        	var browser={
        		versions:function(){
        			var user=navigator.userAgent,app=navigator.appVersion;
        			return {
        				trident:user.indexOf('Trident')>-1, //IE内核
                        presto:user.indexOf('Presto')>-1, //opera内核
                        webKit:user.indexOf('AppleWebKit')>-1, //苹果、谷歌内核
                        gecko:user.indexOf('Gecko')>-1 && user.indexOf('KHTML')==-1, //火狐内核
                        mobile:!!user.match(/AppleWebKit.*Mobile.*/) || !!user.match(/AppleWebKit/), //是否为移动终端
                        ios:!!user.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                        android:user.indexOf('Android')>-1 || user.indexOf('Linux')>-1, //android终端或者uc浏览器
                        iPhone:user.indexOf('iPhone')>-1 || user.indexOf('Mac')>-1, //是否为iPhone或者QQHD浏览器
                        iPad:user.indexOf('iPad')>-1, //是否iPad
                        webApp:user.indexOf('Safari')==-1 //是否web应该程序，没有头部与底部
        			}
        		}(),
        		language:(navigator.browserLanguage || navigator.language).toLowerCase()
        	};

        	return {
                lan:browser.language,
                isMobile:browser.versions.mobile,
                isAndroid:browser.versions.android,
                isIos:browser.versions.ios,
                isIphone:browser.versions.iPhone,
                isiPad:browser.versions.iPad
            }
        },

        activeState:function(ev){
            ev.addEventListener("click",function(evt){
                var evt=evt || window.event;
                var target=evt.target || evt.srcElement;
                if(target.tagName.toLowerCase()=="div"){
                    $(target).addClass("actived").removeClass("active").siblings().removeClass("actived").addClass("active");
                }
                if(target.tagName.toLowerCase()=="p"){
                    $(target).parent().addClass("actived").removeClass("active").siblings().removeClass("actived").addClass("active");
                }
            })
        }
	}
})