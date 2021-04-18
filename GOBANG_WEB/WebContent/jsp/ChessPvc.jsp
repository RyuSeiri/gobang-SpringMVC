<%@ page language='java' contentType='text/html; charset=utf-8'%> <%
String path = request.getContextPath(); String basePath =
request.getScheme() + "://" + request.getServerName() + ":" +
request.getServerPort() + path + "/"; %>
<html>

<head>
<title>Chess</title>
<link rel='stylesheet' href='${pageContext.request.contextPath}/css/Chess.css' />
<script type='text/javascript' src='${pageContext.request.contextPath}/js/jquery-2.1.1.min.js'></script>
<script type='text/javascript' src='${pageContext.request.contextPath}/js/gobangPvc.js'></script>
</head>

<body>
	<div class='Container'>
		<div id='headerContainer'><jsp:include page='Header.jsp' flush='true'/></div>
		<div class='middleContainer'>
			<div class='chessContainer'>
				<div id='messageBox'></div>
				<canvas id='chess' width='450px' height='450px'></canvas>
			</div>
			<div class='operationContainer'>
				<button id='play' class='operationButton'>play</button>
				<button id='retract' class='unable'>Retract</button>
				<!-- <button id='histroy' class='operationButton'>Histroy</button> -->
				<!-- <button id='forbidden' class='operationButton'>Forbidden</button> -->
			</div>
		</div>
		<div class='bottonContainer'>
			<button id='playMusic' class='footButton'>PlayMusic</button>
			<button class='footButton hidden'>
				<audio src='${pageContext.request.contextPath}/music/1.mp3' id='music' loop='true' controls='controls'></audio>
			</button>
			<button id='mute' class='footButton'>Mute</button>
			<button class='footButton hidden'></button>
			<button class='footButton hidden'></button>
			<button id='backButton' class='footButton'>Back</button>
		</div>
	</div>

	<div id='dialog-overlay'></div>
	<div id='dialog-box'>
		<div class='dialog-content'>
			<div id='dialog-message'></div>
			<button id='closePopup'>Colse</button>
		</div>
	</div>
</body>

</html>