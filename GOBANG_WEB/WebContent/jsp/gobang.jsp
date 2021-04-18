<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
<head>
<link href="${pageContext.request.contextPath}/css/gobangstyle.css"
	rel="stylesheet" type="text/css">
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/jquery-2.1.1.min.js"></script>
<script type="text/javascript">
	$(function() {
		var websocket = new WebSocket('ws://' + window.location.host
					+"/"+ window.location.pathname.split('/')[1] + '/gobangWebsocket');
		
		websocket.onopen = function(event) {
			console.log(event);
			$('#tou').html('连接服务器成功！');
		};
		websocket.onmessage = function(event) {
			$('#msg').html($('#msg').html() + '<br/>' + event.data);
		};
		websocket.onerror = function(event) {
			console.log(event);
			$('#tou').html('服务器出现error');
		};
		websocket.onclose = function(event) {
			console.log('与服务器断开了连接！');
			$('#tou').html('与服务器断开了连接！');
		}
		$('#close').click(function() {
			websocket.close();
		});
		$('#send').click(function() {
			if (websocket) {
				var message = $('#message').val();
				console.log(message);
				websocket.send(message);
			} else {
				alert('位于服务器连接！');
			}
		});
	})
</script>
<title>五子棋</title>
</head>
<body>
	<div class="page-header" id='tou'>webSocket多终端聊天测试</div>
	<div class="well" id='msg'></div>
	<div class='input-group'>
		<input id='message' placeholder="发送信息..." /> <span
			class="input-group-btn"><button id='send'>发送</button></span>
	</div>
	<span style="white-space: pre;"> </span>
	<button class='btn btn-default' type='button' id='close'>关闭连接</button>
</body>
</html>