/**
 * 用户登录用
 */

var LOGIN_URL=(window.location.protocol+"//"+window.location.host+'/'+window.location.pathname.split('/')[1])+'/Login.do?method=login';
$(document).ready(function(){
	$('#loginBtn').click(function() {
		var userId = $('#userId').val();
		var passWord = $('#passWord').val();
		$.ajax({
			type : 'post',
			url : LOGIN_URL,
			data : {
				userId : userId,
				passWord : passWord
			},
			async:false,
			datatype:'json',
			success:function(data){
					window.location.href='${pageContext.request.contextPath}/jsp/'	
			},
			error:function(data){
				alert('登录失败！');
			}
		})
	});
});



