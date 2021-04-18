<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
<head>
    <title>Register</title>
    <link rel='stylesheet' href='${pageContext.request.contextPath}/css/Register.css' />
    <script src='${pageContext.request.contextPath}/js/jquery-2.1.1.min.js'></script>
    <script type='text/javascript'>
        $(document).ready(function () {
            $('#title').html('Register');
        });
    </script>
</head>

<body>
    <div class='Container'>
        <div id='headerContainer'><jsp:include page="Header.jsp" flush="true"/></div>
        <div id='inputboxContainer'>
            <div>
                <div class='lable'><label id='userIdLabel'>UserID:</label></div>
                <div class='input'><input id='userId' type='text' /></div>
            </div>
            <div>
                <div class='lable'><label id='passWordLabel'>PassWord:</label></div>
                <div class='input'><input id='passWord' type='text' /></div>
            </div>
            <div>
                <div class='lable'><label id='confirmPasswordLabel'>Confirm Password:</label></div>
                <div class='input'><input id='confirmPassWord' type='text' /></div>
            </div>
        </div>
        <div id='bottonContainer'>
            <button id='registerBotton'>Register</button>
            <button id='backButton'>Back</button>
        </div>
    </div>
</body>
</html>