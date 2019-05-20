var documentWidth = Math.min(window.screen.availWidth, 550);
var gridContainerWidth = 0.92 * documentWidth,
		cellSideLength = 0.18 *documentWidth,
		cellSpace = 0.04 * documentWidth;

function getPositionXY(xy) {
	return cellSpace + xy * (cellSpace + cellSideLength);
}

function getNumberBackgroundColor(num) {
	switch(num) {
		case 2:
			return '#eee4da';
		case 4:
			return '#ede0c8';
		case 8:
			return '#f2b179';
		case 16:
			return '#f59563';
		case 32:
			return '#f67c5f';
		case 64:
			return '#f65e3b';
		case 128:
			return '#edcf72';
		case 256:
			return '#edcc61';
		case 512:
			return '#9c0';
		case 1024:
			return '#33b5e5';
		case 2048:
			return '09c';
		case 4096:
			return '#a6c';
		case 8192:
			return '#93c';
		default:
			return '#000';
	}
}

function getNumberColor(num) {
	if (num <= 4) {
		return '#776e65';
	} else {
		return '#fff';
	}
}

//判断是否还有空处
function nospace(board) {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (!board[i][j]) {
				return false;
			}
		}
	}
	return true;
}

// 判断是否可以向左移动
function canMoveLeft(board) {
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if (board[i][j]) {
				if (!board[i][j-1] || board[i][j] === board[i][j-1]) { // 如果左边格为空或者左边格的值和当前格相等
					return true;
				}
			}
		}
	}
	return false;
}

// 判断是否可以向上移动
function canMoveUp(board) {
	for (var i = 1; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j]) {
				if (!board[i-1][j] || board[i][j] === board[i-1][j]) { // 如果上边格为空或者上边格的值和当前格相等
					return true;
				}
			}
		}
	}
	return false;
}

// 判断是否可以向右移动
function canMoveRight(board) {
	for (var i = 0; i < 4; i++) {
		for (var j = 2; j >= 0; j--) {
			if (board[i][j]) {
				if (!board[i][j+1] || board[i][j] === board[i][j+1]) { // 如果右边格为空或者右边格的值和当前格相等
					return true;
				}
			}
		}
	}
	return false;
}

// 判断是否可以向下移动
function canMoveDown(board) {
	for (var i = 2; i >= 0; i--) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j]) {
				if (!board[i+1][j] || board[i][j] === board[i+1][j]) { // 如果下边格为空或者下边格的值和当前格相等
					return true;
				}
			}
		}
	}
	return false;
}

// 判断两个格之间水平方向是否有其他格
function noBlockHorizontal(row, col1, col2, board) {
	for (var i = col1 + 1; i < col2; i++) {
		if (board[row][i]) {
			return false;
		}
	}
	return true;
}

// 判断两个格之间垂直方向是否有其他格
function noBlockVertical(col, row1, row2, board) {
	for (var i = row1 + 1; i < row2; i++) {
		if (board[i][col]) {
			return false;
		}
	}
	return true;
}

function nomove(board) {
	if (canMoveLeft(board) || canMoveUp(board) || canMoveRight(board) || canMoveDown(board)) {
		return false;
	} else {
		return true;
	}
}
