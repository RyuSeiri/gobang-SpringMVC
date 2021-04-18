<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<html>
<head>
<title>Chat</title>
<link rel='stylesheet' href='${pageContext.request.contextPath}/css/Chat.css' />
<script src='${pageContext.request.contextPath}/js/jquery-2.1.1.min.js'></script>
<script type='text/javascript'>
	$(document).ready(function() {
		$('#title').html('Chat');
	});
</script>
</head>

<body>
	<div class='Container'>
		<div id='headerContainer'><jsp:include page="Header.jsp" flush="true"/></div>
		<div class='chatContainer'>
			<div class='chatBox'>
				<div id='firendName'>Friend</div>
				<div class='messageContainer'>
					<div class='messageLine'>
						<div class='chatMessage'>
							<image class='peppleImage' src='./IMG/code.jpg' />
							<div class='message'>
								MessageMessageMeMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessage
							</div>
						</div>

					</div>
					<div class='messageLine'>
						<div class='chatMessage others'>
							<div class='message'>
								ssageMessageMessageMessageMessageMessageMesssageMessageMessageMessageMessageMessageMesssageMessageMessageMessageMessageMessageMes
							</div>
							<image class='peppleImage' src='./IMG/code.jpg' />
						</div>
					</div>
					<div class='messageLine'>
						<div class='chatMessage'>
							<image class='peppleImage' src='./IMG/code.jpg' />
							<div class='message'>
								MessageMessageMeMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessage
							</div>
						</div>

					</div>
					<div class='messageLine'>
						<div class='chatMessage others'>
							<div class='message'>
								ssageMessageMessageMessageMessageMessageMesssageMessageMessageMessageMessageMessageMesssageMessageMessageMessageMessageMessageMes
							</div>
							<image class='peppleImage' src='./IMG/code.jpg' />
						</div>
					</div>
					<div class='messageLine'>
						<div class='chatMessage'>
							<image class='peppleImage' src='./IMG/code.jpg' />
							<div class='message'>
								MessageMessageMeMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessage
							</div>
						</div>

					</div>
					<div class='messageLine'>
						<div class='chatMessage others'>
							<div class='message'>
								ssageMessageMessageMessageMessageMessageMesssageMessageMessageMessageMessageMessageMesssageMessageMessageMessageMessageMessageMes
							</div>
							<image class='peppleImage' src='./IMG/code.jpg' />
						</div>
					</div>
					<div class='messageLine'>
						<div class='chatMessage'>
							<image class='peppleImage' src='./IMG/code.jpg' />
							<div class='message'>
								MessageMessageMeMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessage
							</div>
						</div>

					</div>
					<div class='messageLine'>
						<div class='chatMessage others'>
							<div class='message'>
								ssageMessageMessageMessageMessageMessageMesssageMessageMessageMessageMessageMessageMesssageMessageMessageMessageMessageMessageMes
							</div>
							<image class='peppleImage' src='./IMG/code.jpg' />
						</div>
					</div>
					
					
				</div>
			</div>
		</div>
		<div class='bottonContainer'>
			<botton id='backButton'>Back</botton>
			<input id='messageBox' type='text' />
			<botton id='sendButton'>Send</botton>
		</div>
	</div>
</body>

</html>