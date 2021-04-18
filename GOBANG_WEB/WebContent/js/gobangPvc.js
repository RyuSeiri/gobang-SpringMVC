var over, me, playFlg, backAble;
var _nowi, _nowj; // 记录自己下棋的坐标
var _compi, _compj; // 记录计算机当前下棋的坐标
var _myWin = [], _compWin = []; // 记录我，计算机赢的情况
var chess, context, backbtn, returnbtn;
// 棋盘
var chessBord = [];
// 赢法的统计数组
var myWin = [], computerWin = [];
// 赢法数组
var wins = [];
// 赢法总数
var count = 0;
$(document).ready(
		function() {
			$('#title').html('Chess')
			chess = $('#chess')[0];
			context = chess.getContext('2d');
			context.strokeStyle = '#000000'; // 边框颜色
			backbtn = $('#retract')[0];

			let
			music = $('#music')[0];
			$('#playMusic').click(function() {
				if (music.paused) {
					music.play();
					$('#playMusic').text('Stop')
				} else {
					music.pause();
					$('#playMusic').text('PlayMusic');
					music.load();
				}

			});

			$('#mute').click(function() {
				if (music.volume == 0) {
					music.volume = 1;
					$('#mute').text('Mute');
				} else {
					music.volume = 0;
					$('#mute').text('Unmute');
				}

			});

			$('#play').click(function() {
				// window.location.reload();
				init();
				drawChessBoard();
				playFlg = true;
				$('#play').text('Replay');
			});
			// 我，下棋
			chess.onclick = function(e) {
				if (!playFlg | over | !me)
					return;

				// 悔棋功能可用
				if (backbtn.className.indexOf('unable') !== -1)
					backbtn.className = backbtn.className.replace(new RegExp(
							'(\\s|^)unable(\\s|$)'), 'able');

				var x = e.offsetX;
				var y = e.offsetY;
				var i = Math.floor(x / 30);
				var j = Math.floor(y / 30);
				_nowi = i;
				_nowj = j;
				if (chessBord[i][j] == 0) {
					oneStep(i, j, me);
					chessBord[i][j] = 1; // 我，已占位置
					for (var k = 0; k < count; k++) { // 将可能赢的情况都加1
						if (wins[i][j][k]) {
							// debugger;
							myWin[k]++;
							_compWin[k] = computerWin[k];
							computerWin[k] = 6;// 这个位置对方不可能赢了
						}
					}

					if (judgeWin(i, j, 1)) {
						$('#messageBox').text('You are win!');
						over = true;
					}

					if (!over) {
						me = !me;
						setTimeout(computerAI, 800);
					}
				}
			}

			// 悔棋
			backbtn.onclick = function(e) {
				if (!backAble)
					return;
				over = false;
				me = true;
				// 我，悔棋
				chessBord[_nowi][_nowj] = 0; // 我，已占位置 还原
				minusStep(_nowi, _nowj); // 销毁棋子
				for (var k = 0; k < count; k++) { // 将可能赢的情况都减1
					if (wins[_nowi][_nowj][k]) {
						myWin[k]--;
						computerWin[k] = _compWin[k];// 这个位置对方可能赢
					}
				}
				// 计算机相应的悔棋
				chessBord[_compi][_compj] = 0; // 计算机，已占位置 还原
				minusStep(_compi, _compj); // 销毁棋子
				for (var k = 0; k < count; k++) { // 将可能赢的情况都减1
					if (wins[_compi][_compj][k]) {
						computerWin[k]--;
						myWin[k] = _myWin[count];// 这个位置对方可能赢
					}
				}
				backAble = false;
				$('#messageBox').text('');
			}

		});

function clearCanvas() {
	var cxt = document.getElementById("chess");
	cxt.height = cxt.height;
}
// 绘画棋盘
function drawChessBoard() {
	clearCanvas();
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
function oneStep(i, j, me) {
	context.beginPath();
	context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);// 画圆
	context.closePath();
	// 渐变
	var gradient = context.createRadialGradient(15 + i * 30 + 2,
			15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);
	if (me) {
		gradient.addColorStop(0, '#0a0a0a');
		gradient.addColorStop(1, '#636766');
	} else {
		gradient.addColorStop(0, '#d1d1d1');
		gradient.addColorStop(1, '#f9f9f9');
	}
	context.fillStyle = gradient;
	context.fill();
}

// 计算机下棋
function computerAI() {
	var myScore = [];
	var computerScore = [];
	var max = 0;
	var u = 0, v = 0;
	for (var i = 0; i < 15; i++) {
		myScore[i] = [];
		computerScore[i] = [];
		for (var j = 0; j < 15; j++) {
			myScore[i][j] = 0;
			computerScore[i][j] = 0;
		}
	}
	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 15; j++) {
			if (chessBord[i][j] == 0) {
				for (var k = 0; k < count; k++) {
					if (wins[i][j][k]) {
						if (myWin[k] == 1) {
							myScore[i][j] += 200;
						} else if (myWin[k] == 2) {
							myScore[i][j] += 400;
						} else if (myWin[k] == 3) {
							myScore[i][j] += 2000;
						} else if (myWin[k] == 4) {
							myScore[i][j] += 10000;
						}

						if (computerWin[k] == 1) {
							computerScore[i][j] += 220;
						} else if (computerWin[k] == 2) {
							computerScore[i][j] += 420;
						} else if (computerWin[k] == 3) {
							computerScore[i][j] += 2100;
						} else if (computerWin[k] == 4) {
							computerScore[i][j] += 20000;
						}
					}
				}

				if (myScore[i][j] > max) {
					max = myScore[i][j];
					u = i;
					v = j;
				} else if (myScore[i][j] == max) {
					if (computerScore[i][j] > computerScore[u][v]) {
						u = i;
						v = j;
					}
				}

				if (computerScore[i][j] > max) {
					max = computerScore[i][j];
					u = i;
					v = j;
				} else if (computerScore[i][j] == max) {
					if (myScore[i][j] > myScore[u][v]) {
						u = i;
						v = j;
					}
				}

			}
		}
	}
	_compi = u;
	_compj = v;
	oneStep(u, v, false);
	chessBord[u][v] = 2; // 计算机占据位置
	for (var k = 0; k < count; k++) {
		if (wins[u][v][k]) {
			computerWin[k]++;
			_myWin[k] = myWin[k];
			myWin[k] = 6;// 这个位置对方不可能赢了
		}

	}

	if (judgeWin(u, v, 2)) {
		$('#messageBox').text('o(╯□╰)o , Computer is win!');
		over = true;
	}

	if (!over) {
		me = !me;
	}
	backAble = true;
}

// 销毁棋子
function minusStep(i, j) {
	// 擦除该圆
	context.clearRect((i) * 30, (j) * 30, 30, 30);
	// 重画该圆周围的格子
	context.beginPath();
	context.moveTo(15 + i * 30, j * 30);
	context.lineTo(15 + i * 30, j * 30 + 30);
	context.closePath();
	context.stroke();
	context.beginPath();
	context.moveTo(i * 30, j * 30 + 15);
	context.lineTo(i * 30 + 30, j * 30 + 15);
	context.closePath();
	context.stroke();
}

function init() {
	backAble = false;
	playFlg = false;
	over = false;
	me = true; // 我
	_nowi = 0, _nowj = 0; // 记录自己下棋的坐标
	_compi = 0, _compj = 0; // 记录计算机当前下棋的坐标

	for (var i = 0; i < 15; i++) {
		chessBord[i] = [];
		for (var j = 0; j < 15; j++) {
			chessBord[i][j] = 0;
		}
	}

	for (var i = 0; i < 15; i++) {
		wins[i] = [];
		for (var j = 0; j < 15; j++) {
			wins[i][j] = [];
		}
	}

	// 横线赢法
	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 11; j++) {
			for (var k = 0; k < 5; k++) {
				wins[i][j + k][count] = true;
			}
			count++;
		}
	}
	// 竖线赢法
	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 11; j++) {
			for (var k = 0; k < 5; k++) {
				wins[j + k][i][count] = true;
			}
			count++;
		}
	}
	// 正斜线赢法
	for (var i = 0; i < 11; i++) {
		for (var j = 0; j < 11; j++) {
			for (var k = 0; k < 5; k++) {
				wins[i + k][j + k][count] = true;
			}
			count++;
		}
	}
	// 反斜线赢法
	for (var i = 0; i < 11; i++) {
		for (var j = 14; j > 3; j--) {
			for (var k = 0; k < 5; k++) {
				wins[i + k][j - k][count] = true;
			}
			count++;
		}
	}
	// 判断输赢的境况debugger;
	for (var i = 0; i < count; i++) {
		myWin[i] = 0;
		_myWin[i] = 0;
		computerWin[i] = 0;
		_compWin[i] = 0;
	}

	$('#closePopup').click(function() {
		$('#dialog-overlay, #dialog-box').hide();
		// return false;
	});

	$(window).resize(function() {
		if (!$('#dialog-box').is(':hidden'))
			popup();
	});

}

// 判断输赢
function judgeWin(x, y, people) {
	// y的范围在0-14之间，x的范围在0-14之间

	var count = 0;
	for (var i = x - 1; i > -1; i--) {
		if (chessBord[i][y] != people) {
			break;
		}
		count++;
	}
	for (var i = x + 1; i < 15; i++) {
		if (chessBord[i][y] != people) {
			break;
		}
		count++;
	}
	if (count > 3)
		return people;

	count = 0;
	for (var i = y + 1; i < 15; i++) {
		if (chessBord[x][i] != people) {
			break;
		}
		count++;
	}
	for (var i = y - 1; i > -1; i--) {
		if (chessBord[x][i] != people) {
			break;
		}
		count++;
	}
	if (count > 3)
		return people;

	count = 0;
	for (var i = x + 1, j = y + 1; i < 25; i++, j++) {
		if (j < 15) {
			if (chessBord[i][j] != people) {
				break;
			}
			count++;
		} else
			break;
	}
	for (var i = x - 1, j = y - 1; i > -1; i--, j--) {
		if (j > -1) {
			if (chessBord[i][j] != people) {
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
			if (chessBord[i][j] != people) {
				break;
			}
			count++;
		} else
			break;
	}
	for (var i = x - 1, j = y + 1; i > -1; i--, j++) {
		if (j < 15) {
			if (chessBord[i][j] != people) {
				break;
			}
			count++;
		} else
			break;
	}
	if (count > 3)
		return people;

}

function popup(message) {
	var maskHeight = $(document).height();
	var maskWidth = $(window).width();

	// calculate the values for center alignment
	var dialogHeight = $('#dialog-box').outerHeight();
	var dialogWidth = $('#dialog-box').outerWidth();

	// assign values to the overlay and dialog box
	$('#dialog-overlay').css({
		height : maskHeight,
		width : maskWidth
	}).show();
	$('#dialog-box').css({
		top : "50%",
		left : "50%",
		"margin-left" : -(dialogWidth / 2),
		"margin-top" : -(dialogHeight / 2)
	}).show();

	// display the message
	$('#dialog-message').html(message);
}
