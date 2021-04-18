<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
<head>
    <title>Top</title>
    <link rel='stylesheet' href='${pageContext.request.contextPath}/css/Top.css' />
    <script src='${pageContext.request.contextPath}/js/jquery-2.1.1.min.js'></script>
    <script type='text/javascript'>
        $(document).ready(function () {
            $('#title').html('Top');
            $('#single').click(function(){
            	window.location.href=' http://localhost:8080/GOBANG_WEB/jsp/ChessPvc.jsp'
            });
            
            $('#random_match').click(function(){
            	window.location.href=' http://localhost:8080/GOBANG_WEB/jsp/ChessPvp.jsp'
            });
        });
        
    </script>
</head>

<body>
    <div class='Container'>
        <div id='headerContainer'><jsp:include page="Header.jsp" flush="true"/></div>
        <div id='inputboxContainer'>
            <div>
                <div class="button" id="single">Single</div>
            </div>
            <div>
                <div class="button">Multiplayer</div>
            </div>
            <div>
                <div class="button" id="random_match">Random  Match</div>
            </div>
        </div>
        </div>
</body>
</html>