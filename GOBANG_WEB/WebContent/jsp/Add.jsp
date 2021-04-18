<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
<head>
<title>ADD</title>
<link rel='stylesheet' href='${pageContext.request.contextPath}/css/Add.css' />
<script src='${pageContext.request.contextPath}/js/jquery-2.1.1.min.js'></script>
<script type='text/javascript'>
	$(document).ready(function() {
		$('#headerContainer').load('Header.html');
		$('#title').html('Add');
	});
</script>
</head>

<body>
	<div class='Container'>
		<div id='headerContainer'></div>
		<div class='bottonContainer'>
			<button id='backButton'></button>
			<input id='messageBox' type='text' />
			<button id='SearchButton'>Search</button>
		</div>
		<div class='middleContainer'>
			<div class='resultBox'>
				<div id='resultTitle'>Searched Result</div>
				<div class='resultContainer'>
					<div class='resultLine'>
						<div class='people'>テスト</div>
						<div class='plus' id='plus'></div>
					</div>
					<div class='resultLine'>
						<div class='people'>テスト</div>
						<div class='plus' id='plus'></div>
					</div>
					<div class='resultLine'>
						<div class='people'>テスト</div>
						<div class='plus' id='plus'></div>
					</div>
					<div class='resultLine'>
						<div class='people'>テスト</div>
						<div class='plus' id='plus'></div>
					</div>
					<div class='resultLine'>
						<div class='people'>テスト</div>
						<div class='plus' id='plus'></div>
					</div>
					<div class='resultLine'>
						<div class='people'>テスト</div>
						<div class='plus' id='plus'></div>
					</div>
					<div class='resultLine'>
						<div class='people'>テスト</div>
						<div class='plus' id='plus'></div>
					</div>
					<div class='resultLine'>
						<div class='people'>テスト</div>
						<div class='plus' id='plus'></div>
					</div>
					<div class='resultLine'>
						<div class='people'>テスト</div>
						<div class='plus' id='plus'></div>
					</div>
					<div class='resultLine'>
						<div class='people'>テスト</div>
						<div class='plus' id='plus'></div>
					</div>
					<div class='resultLine'>
						<div class='people'>テスト</div>
						<div class='plus' id='plus'></div>
					</div>
				</div>
			</div>
		</div>

	</div>
</body>

</html>