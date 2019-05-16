var CANVAS_WIDTH, CANVAS_HEIGHT;

var RADIUS;

var MARGIN_TOP, MARGIN_LEFT;

var curShowTimeSeconds = 0;

var balls = [];
const colors = ['#33b5e5', '#09c', '#a6c', '#93c', '#9c0', '#690', 'fb3', '#f80', '#f44', '#c00'];

window.onload = function () {
	CANVAS_WIDTH = document.body.clientWidth;
	CANVAS_HEIGHT = document.body.clientHeight;

	// 占整个屏幕宽度的4/5，距离上顶部1/5
	MARGIN_LEFT = Math.round(CANVAS_WIDTH / 10);
	MARGIN_TOP = Math.round(CANVAS_HEIGHT / 5);
	RADIUS = Math.round(CANVAS_WIDTH * 4 / 5 / 108) - 1;

	var canvas = document.getElementById('canvas');
	var cxt = canvas.getContext('2d');

	canvas.width = CANVAS_WIDTH;
	canvas.height = CANVAS_HEIGHT;

	curShowTimeSeconds = getCurShowTimeSeconds();

	var timer = setInterval(function () {
		render(cxt);
		update();
	}, 50);

	//获得焦点
	window.onfocus = function () {
	 timer = setInterval(function () {
			render(cxt);
			update();
		}, 50);
	};
	//失去焦点
	window.onblur = function () {
		clearInterval(timer);
	}
}

function getCurShowTimeSeconds() {
	var curTime = new Date();
	return curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
}

function update() {
	var nextShowTimeSeconds = getCurShowTimeSeconds();

	var nextHours = parseInt(nextShowTimeSeconds / 3600),
			nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60),
			nextSeconds = nextShowTimeSeconds % 60;

	var curHours = parseInt(curShowTimeSeconds / 3600),
			curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60),
			curSeconds = curShowTimeSeconds % 60;

	if (nextSeconds !== curSeconds) {
		if (parseInt(curHours / 10) !== parseInt(nextHours / 10)) { // 小时的十位发生变化
			addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(nextHours / 10));
		}
		if (parseInt(curHours % 10) !== parseInt(nextHours % 10)) { // 小时的个位发生变化
			addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(nextHours % 10));
		}
		if (parseInt(curMinutes / 10) !== parseInt(nextMinutes / 10)) { // 分钟的十位发生变化
			addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(nextMinutes / 10));
		}
		if (parseInt(curMinutes % 10) !== parseInt(nextMinutes % 10)) { // 分钟的个位发生变化
			addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(nextMinutes % 10));
		}
		if (parseInt(curSeconds / 10) !== parseInt(nextSeconds / 10)) { // 秒的十位发生变化
			addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSeconds / 10));
		}
		if (parseInt(curSeconds % 10) !== parseInt(nextSeconds % 10)) { // 秒的个位发生变化
			addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSeconds % 10));
		}

		// 更新时间
		curShowTimeSeconds = nextShowTimeSeconds;
	}

	updateBalls();
}

function updateBalls() {
	for (var i = 0; i < balls.length; i++) {
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;

		// 碰撞底部检测
		if (balls[i].y >= CANVAS_HEIGHT - RADIUS) {
			balls[i].y = CANVAS_HEIGHT - RADIUS;
			balls[i].vy = -balls[i].vy * 0.75; // 速度损失
		}
	}

	// 性能优化，删除已经看不见的小球
	var cnt = 0,
			newBalls = [];
	for (var i = 0; i < balls.length; i++) {
		if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < CANVAS_WIDTH) {
			balls[cnt++] = balls[i];
		}
	}

	while(balls.length > cnt) {
		balls.pop();
	}
}

function addBalls(x, y, num) {
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if (digit[num][i][j]) {
				balls.push({
					x: x + j * 2 * (RADIUS + 1) + RADIUS + 1,
					y: y + i * 2 * (RADIUS + 1) + RADIUS + 1,
					g: 1.5 + Math.random(), // 重力加速度
					vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * (Math.random() * 4 + 2), // x方向的速度，取值2~6的正负值
					vy: -5, // y方向的速度
					color: colors[Math.floor(Math.random() * colors.length)]
				});
			}
		}
	}
}

function render(cxt) {
	cxt.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	var hours = parseInt(curShowTimeSeconds / 3600),
			minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60),
			seconds = curShowTimeSeconds % 60;

	// 渲染时间
	renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt); // 绘制小时的十位
	renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt); // 绘制小时的个位
	renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt); // 绘制冒号
	renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), cxt); // 绘制分钟的十位
	renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), cxt); // 绘制分钟的个位
	renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt); // 绘制冒号
	renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt); // 绘制秒的十位
	renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt); // 绘制秒的个位

	// 渲染动态小球
	for (var i = 0; i < balls.length; i++) {
		cxt.fillStyle = balls[i].color;

		cxt.beginPath();
		cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true);
		cxt.closePath();

		cxt.fill();
	}
}

function renderDigit(x, y, num, cxt) {
	cxt.fillStyle = 'rgb(0, 102, 153)';

	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if (digit[num][i][j]) {
				cxt.beginPath();
				cxt.arc(
					x + j * 2 * (RADIUS + 1) + RADIUS + 1,
					y + i * 2 * (RADIUS + 1) + RADIUS + 1,
					RADIUS,
					0,
					2 * Math.PI
				);
				cxt.closePath();
				cxt.fill();
			}
		}
	}
}
