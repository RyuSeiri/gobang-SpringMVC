var bout, color, winFlg, backAble;
var _nowX, _nowY; // 记录自己下棋的坐标
var _oppX, _oppY; // 记录對手当前下棋的坐标
var chess, context, backbtn;// 悔棋按鈕
var chessBord = [];// 整体棋盘状态
var websocket;// 网络连接

$(document).ready(function () {
	$('#title').html('Chess')
    chess = $('#chess')[0];
    context = chess.getContext('2d');
    context.strokeStyle = '#000000'; //边框颜色
    context.fillStyle = '#FFFFE0'; 
    /*context.fillRect(0,0,450,450);*/
    backbtn = $('#retract')[0];

    let music = $('#music')[0];
    $('#playMusic').click(function () {
        if (music.paused) {
            music.play();
            $('#playMusic').text('Stop')
        } else {
            music.pause();
            $('#playMusic').text('PlayMusic');
            music.load();
        }

    });

    $('#mute').click(function () {
        if (music.volume == 0) {
            music.volume = 1;
            $('#mute').text('Mute');
        } else {
            music.volume = 0;
            $('#mute').text('Unmute');
        }

    });
    
    init();
    drawChessBoard();
    
    // 我，下棋
    chess.onclick = function (e) {   
		if (bout && color) {
	    	// 悔棋功能可用
			backAble = true;
			if (backbtn.className.indexOf('unable') !== -1)
				backbtn.className = backbtn.className.replace(new RegExp('(\\s|^)unable(\\s|$)'), 'able');
			
            let mouseX = e.offsetX;
	        let mouseY = e.offsetY;
	        _nowX = Math.floor(mouseX / 30);
	        _nowY = Math.floor(mouseY / 30);
	        let result = {};
	        if (!chessBord[_nowY][_nowX]) {
	            chessBord[_nowY][_nowX] = color; 
				result.xy = _nowX +',' + _nowY;
				result.color = color;
				result.chessBord = chessBord;
				result.bout = false;
				result.backFlg = false;
				if (judgeWin(_nowX, _nowY, color)) {
					result.winFlg = true;
					result.message = "系统：游戲結束，你贏了！";
				} else{
					result.winFlg = false;
					result.message = '系统：您已落子，请等待对手落子！';
				}

			    if(websocket)
					websocket.send(JSON.stringify(result));
				else
					$('#messageBox').text('系统：已断开连接');
			}
	   }
	}
    

    // 悔棋
    backbtn.onclick = function (e) {
        if (!backAble)return;
         // 我，悔棋
        let result = {};
        result.backFlg = true;
        chessBord[_nowY][_nowX] = null; // 我，已占位置 还原
        result.xy = _nowX + ',' + _nowY;
        result.bout = false;
        result.color = color;
        if(_oppX && _oppY)
        	chessBord[_oppY][_oppX] = null; // 对手，已占位置 还原
        result.chessBord = chessBord;
        result.winFlg = false;
        if(websocket)
			websocket.send(JSON.stringify(result));
		else
			$('#messageBox').text('系统：已断开连接');
        
        backAble = false;
        if (backbtn.className.indexOf('able') !== -1)
        	backbtn.className = backbtn.className.replace(new RegExp('(\\s|^)able(\\s|$)'), 'unable');
    }

});


//-----------------------------------------

// 绘画棋盘
function drawChessBoard() {
	for (var i = 0; i < 15; i++) {
        context.moveTo(15 + i * 30, 15);
        context.lineTo(15 + i * 30, 435);
        context.stroke();
        context.moveTo(15, 15 + i * 30);
        context.lineTo(435, 15 + i * 30);
        context.stroke();
    }
}

// 画棋子
function oneStep(x, y, color) {
    context.beginPath();
    context.arc(15 + x * 30, 15 + y * 30, 13, 0, 2 * Math.PI);// 画圆
    context.closePath();
    // 渐变
    var gradient = context.createRadialGradient(15 + x * 30 + 2, 15 + y * 30 - 2, 13, 15 + x * 30 + 2, 15 + y * 30 - 2, 0);
    if (color == 'black') {
        gradient.addColorStop(0, '#0a0a0a');
        gradient.addColorStop(1, '#636766');
    } else {
        gradient.addColorStop(0, '#d1d1d1');
        gradient.addColorStop(1, '#f9f9f9');
    }
    context.fillStyle = gradient;
    context.fill();
}


//销毁棋子
function minusStep(x, y) {
    //擦除该圆
    context.clearRect((x) * 30, (y) * 30, 30, 30);
    // 重画该圆周围的格子
    context.beginPath();
    context.moveTo(15 + x * 30, y * 30);
    context.lineTo(15 + x * 30, y * 30 + 30);
    context.closePath();
    context.stroke();
    context.beginPath();
    context.moveTo(x * 30, y * 30 + 15);
    context.lineTo(30 * x + 30, y * 30 + 15);
    context.closePath();
    context.stroke();
}



//判斷棋盤的棋子數是否已滿
function chessBordIsFull(){
	for(var row in chessBord){
		for(var col in chessBord[row]){
			if(chessBord[row][col])
				continue;
			else
				return false;
		}
	}
	return true;
}

//判断输赢
function judgeWin(x, y, people) {
	// y的范围在0-14之间，x的范围在0-14之间
	
	var count = 0;
	for (var i = x - 1; i > -1; i--) {
		if (chessBord[y][i] != people) {
			break;
		}
		count++;
	}
	for (var i = x + 1; i < 15; i++) {
		if (chessBord[y][i] != people) {
			break;
		}
		count++;
	}
	if (count > 3)
		return people;
	
	count = 0;
	for (var i = y + 1; i < 15; i++) {
		if (chessBord[i][x] != people) {
			break;
		}
		count++;
	}
	for (var i = y - 1; i > -1; i--) {
		if (chessBord[i][x] != people) {
			break;
		}
		count++;
	}
	if (count > 3)
		return people;

	count = 0;
	for (var i = x + 1, j = y + 1; i < 25; i++, j++) {
		if (j < 15) {
			if (chessBord[j][i] != people) {
				break;
			}
			count++;
		} else
			break;
	}
	for (var i = x - 1, j = y - 1; i > -1; i--, j--) {
		if (j > -1) {
			if (chessBord[j][i] != people) {
				break;
			}
			count++;
		} else
			break;
	}
	if (count > 3)
		return people;
	
	count = 0;
	for (var i = x + 1, j = y - 1; i < 25; i++, j--) {
		if (j > -1) {
			if (chessBord[j][i] != people) {
				break;
			}
			count++;
		} else
			break;
	}
	for (var i = x - 1, j = y + 1; i > -1; i--, j++) {
		if (j < 15) {
			if (chessBord[j][i] != people) {
				break;
			}
			count++;
		} else
			break;
	}
	if (count > 3)
		return people;
	
}




// 棋盤加載
function init() {
    backAble = false;
    for (var i = 0; i < 15; i++) {
        chessBord[i] = [];
        for (var j = 0; j < 15; j++) {
            chessBord[i][j] = null;
        }
    }
}

// 加載webSocket
$(function(){
    // 判断当前浏览器是否支持WebSocket
    if('WebSocket' in window)
  	  websocket = new WebSocket('ws://' + window.location.host
					+'/'+ window.location.pathname.split('/')[1] + '/gobangWebsocket');
    else
        alert('Not support websocket');
    
    //连接发生错误的回调方法
    websocket.onerror = function(){
    };
     
    //连接成功建立的回调方法
    websocket.onopen = function(event){
    };
     
    //接收到消息的回调方法(包含了聊天，落子，开始游戏)
    websocket.onmessage = function(){
		var result = JSON.parse(event.data);
		if (result.xy && result.color) {
			if (!result.backFlg) {
				// 取出xy坐标
				let arrXY = result.xy.split(',');
				x = arrXY[0];
				y = arrXY[1];
				if (result.color == color) {
					_nowX = x;
					_nowY = y;
				} else {
					_oppX = x;
					_oppY = y;
				}
				// 画棋子
				oneStep(x, y, result.color)
				bout = result.bout;// 落子后才改状态
				// 当前的棋盘状态
				chessBord = result.chessBord;
			} else {
				minusStep(_nowX, _nowY); // 销毁自己棋子
				if (_oppX && _oppY)
					minusStep(_oppX, _oppY); // 销毁对手棋子
				// 当前的棋盘状态
				chessBord = result.chessBord;
				bout = result.bout;
			}
		}
		if (!result.xy && result.bout)// 没有坐标且bout为true，则为对局首次开始落子
			bout = result.bout;

		if (!result.xy  && result.color)// 没有坐标，但有颜色，则为首次赋予棋子颜色
			color = result.color;
		
		if(chessBordIsFull())
				$('#messageBox').text('系统：游戲結束，和棋！');
			else
				$('#messageBox').text(result.message);
		
    };
     
    //连接关闭的回调方法
    websocket.onclose = function(){

    };
     
    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function(){
        websocket.close();
    };
     
     
    //关闭连接
    function closeWebSocket(){
        websocket.close();
    }
});


//初始化popup
$(function(){
	$('#closePopup').click(function () {
        $('#dialog-overlay, #dialog-box').hide();
        // return false;
    });

    $(window).resize(function () {
        if (!$('#dialog-box').is(':hidden')) popup();
    });
})

//popup
function popup(message) {
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    // calculate the values for center alignment
    var dialogHeight = $('#dialog-box').outerHeight();
    var dialogWidth = $('#dialog-box').outerWidth();

    // assign values to the overlay and dialog box
    $('#dialog-overlay').css({ height: maskHeight, width: maskWidth }).show();
    $('#dialog-box').css({
        top: '50%',
        left: '50%',
        'margin-left': -(dialogWidth / 2),
        'margin-top': -(dialogHeight / 2)
    }).show();

    // display the message
    $('#dialog-message').html(message);
}


