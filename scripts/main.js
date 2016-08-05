require.config({
	baseUrl:"",
    paths:{
        "jquery":"lib/jquery-1.7.2",
		"iscroll":"lib/iscroll",
		"fastclick":"lib/fastclick",
		"public":"scripts/public",
		"valididcard":"lib/valid_idcard",
		"dialog":"plugin/dialog"
    }
});
require(['scripts/index','scripts/bind_id','scripts/choose_number','scripts/write_info','scripts/order_detail','scripts/state_net','scripts/mine'],function(){
   
});
