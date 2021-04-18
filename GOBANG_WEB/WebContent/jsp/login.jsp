<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
<head>
    <title>Login</title>
    <link rel='stylesheet' href='${pageContext.request.contextPath}/css/Login.css' />
    <script src='${pageContext.request.contextPath}/js/jquery-2.1.1.min.js'></script>
    <script type='text/javascript'>
        $(document).ready(function () {
            $('#title').html('Login');
        });
    </script>
</head>

<body>
    <div class='Container'>
        <div id='headerContainer'><jsp:include page="Header.jsp" flush="true"/></div>
        <div id='inputboxContainer'>
            <div class="line">
                <div class='lable'><label id='userIdLabel'>UserID:</label></div>
                <div class='inputContainer'><input id='userId' class="input" type='text' /></div>
            </div>
            <div class="line">
                <div class='lable'><label id='passWordLabel'>PassWord:</label></div>
                <div class='inputContainer'><input id='passWord' class="input" type='text' /></div>
            </div>
            <div class="lastLine">
                <div class='validateCodeContainer'>
                 <input id='validateCode' class="input" type='text' />
                 <img id='validateCodeImg' src='IMG/code.jpg' />
                </div>
            </div>
        </div>
        <div id='bottonContainer'>
            <button id='loginButton'>Register</button>
            <button id='backButton'>Back</button>
        </div>
    </div>
</body>
</html>