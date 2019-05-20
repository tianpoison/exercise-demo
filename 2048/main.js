var board = new Array(),
		score = 0,
		hasConflicted = new Array();

$(document).ready(function() {
	newGame();
});

function newGame() {
	init();

	generateOneNumber();
	generateOneNumber();
}

// 初始化棋盘格
function init() {
	for (var i = 0; i < 4; i++) {
		board[i] = new Array();
		hasConflicted[i] = new Array();
		for (var j = 0; j < 4; j++) {
			var gridCell = $(`#grid-cell-${i}-${j}`);
			gridCell.css({
				top: 20 + i * 120,
				left: 20 + j * 120
			});

			board[i][j] = 0;
			hasConflicted[i][j] = false;
		}
	}

	updateBoardView();
}

function updateBoardView() {
	$('.number-cell').remove();

	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			$('#grid-container').append(`<div class="number-cell" id="number-cell-${i}-${j}"></div>`);
			var numberCell = $(`#number-cell-${i}-${j}`);

			if (board[i][j]) { // 当前格的数字不为0时
				numberCell.css({
					width: '100px',
					height: '100px',
					top: 20 + i * 120,
					left: 20 + j * 120,
					backgroundColor: getNumberBackgroundColor(board[i][j]),
					color: getNumberColor(board[i][j])
				});
				numberCell.text(board[i][j]);
			} else {
				numberCell.css({
					width: 0,
					height: 0,
					top: 20 + i * 120 + 50,
					left: 20 + j * 120 + 50
				});
			}

			hasConflicted[i][j] = false;
		}
	}
}

// 随机在空处生成一个数字格
function generateOneNumber() {
	if (nospace(board)) {
		return false;
	}

	// 随机取一个空的位置
	var randx = parseInt(Math.floor(Math.random() * 4)),
			randy = parseInt(Math.floor(Math.random() * 4));

	// 给计算机50次寻找随机位置的机会
	var times = 0;
	while(times < 50) {
		if (!board[randx][randy]) {
			break;
		}

		randx = parseInt(Math.floor(Math.random() * 4)),
		randy = parseInt(Math.floor(Math.random() * 4));

		times ++;
	}

	/*
	 * 如果50次还没有找到随机位置，就人工生成一个位置。
	 * 这样做的好处是在数字变多的情况下能减少计算机的计算量，不会导致卡顿
	 */
	if (times === 50) {
		xLoop:
		for (var i = 0; i < 4; i++) {
			yLoop:
			for (var j = 0; j < 4; j++) {
				if (!board[i][j]) {
					randx = i,
					randy = j;
					break xLoop;
				}
			}
		}
	}

	// 随机取一个数字
	var randNumber = Math.random() < 0.5 ? 2 : 4;

	// 在随机位置显示随机数字
	board[randx][randy] = randNumber;
	showNumberWidthAnimation(randx, randy, randNumber);
}

$(document).keydown(function(event) {
	switch(event.keyCode) {
		case 37:
			if (moveLeft()) {
        setTimeout('generateOneNumber()', 210);
        setTimeout('isGameover()', 300);
			}
			break;
		case 38:
			if (moveUp()) {
        setTimeout('generateOneNumber()', 210);
        setTimeout('isGameover()', 300);
			}
			break;
		case 39:
			if (moveRight()) {
        setTimeout('generateOneNumber()', 210);
        setTimeout('isGameover()', 300);
			}
			break;
		case 40:
			if (moveDown()) {
        setTimeout('generateOneNumber()', 210);
        setTimeout('isGameover()', 300);
			}
			break;
		default:
			break;
	}
});

function isGameover() {
	if (nospace(board) && nomove(board)) {
		alert('Game Over!');
	}
}

function moveLeft() {
	if (!canMoveLeft(board)) {
		return false;
	}
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if (board[i][j]) {
				for (var k = 0; k < j; k++) { // 遍历当前格左侧的所有格
					if (!board[i][k] && noBlockHorizontal(i, k, j, board)) { // 如果格是空的且与当前格之间没有障碍物
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if (board[i][k] === board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
						showMoveAnimation(i, j, i, k);
						board[i][k] *= 2;
						board[i][j] = 0;

						score += board[i][k];
						$('#score').text(score);

						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}
	}

	// 避免移动动画还未执行就updateBoardView了
	setTimeout('updateBoardView()', 200);

	return true;
}

function moveUp() {
	if (!canMoveUp(board)) {
		return false;
	}
	for (var j = 0; j < 4; j++) {
		for (var i = 1; i < 4; i++) {
			if (board[i][j]) {
				for (var k = 0; k < i; k++) { // 遍历当前格上侧的所有格
					if (!board[k][j] && noBlockVertical(j, k, i, board)) {
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if (board[k][j] === board[i][j] && noBlockVertical(j, k, i, board) && !hasConflicted[k][j]) {
						showMoveAnimation(i, j, k, j);
						board[k][j] *= 2;
						board[i][j] = 0;

						score += board[k][j];
						$('#score').text(score);

						hasConflicted[k][j] = true;
						continue;
					}
				}
			}
		}
	}

	setTimeout('updateBoardView()', 200);

	return true;
}

function moveRight() {
	if (!canMoveRight(board)) {
		return false;
	}
	for (var i = 0; i < 4; i++) {
		for (var j = 2; j >= 0; j--) {
			if (board[i][j]) {
				for (var k = 3; k > j; k--) { // 遍历当前格右侧的所有格
					if (!board[i][k] && noBlockHorizontal(i, j, k, board)) {
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if (board[i][k] === board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
						showMoveAnimation(i, j, i, k);
						board[i][k] *= 2;
						board[i][j] = 0;

						score += board[i][k];
						$('#score').text(score);

						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}
	}

	setTimeout('updateBoardView()', 200);

	return true;
}

function moveDown() {
	if (!canMoveDown(board)) {
		return false;
	}
	for (var j = 0; j < 4; j++) {
		for (var i = 2; i >= 0; i--) {
			if (board[i][j]) {
				for (var k = 3; k > i; k--) { // 遍历当前格下侧的所有格
					if (!board[k][j] && noBlockVertical(j, i, k, board)) {
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if (board[k][j] === board[i][j] && noBlockVertical(j, i, k, board) && !hasConflicted[k][j]) {
						showMoveAnimation(i, j, k, j);
						board[k][j] *= 2;
						board[i][j] = 0;

						score += board[k][j];
						$('#score').text(score);

						hasConflicted[k][j] = true;
						continue;
					}
				}
			}
		}
	}

	setTimeout('updateBoardView()', 200);

	return true;
}
