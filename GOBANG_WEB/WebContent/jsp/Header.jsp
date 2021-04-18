<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
<head>
    <title>Header</title>
    <link rel='stylesheet' href='${pageContext.request.contextPath}/css/Header.css' />
    <script src='${pageContext.request.contextPath}/js/jquery-2.1.1.min.js'></script>
</head>

<body>
    <div class='header'>
        <div class='themeContainer'><div class='theme'></div></div>
        <div class='titleContainer'><div class='title' id='title'>Header</div></div>
        <div class='languageContainer'><div class='language'>Language</div></div>
    </div>
</body>
</html>