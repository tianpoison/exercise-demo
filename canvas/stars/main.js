var HEIGHT = document.body.clientHeight,
		WIDTH = document.body.clientWidth;

window.onload = function () {
	var canvas = document.getElementById('canvas');

	canvas.width = WIDTH;
	canvas.height = HEIGHT;

	var context = canvas.getContext('2d');

	var skyStyle = context.createLinearGradient(0, 0, 0, HEIGHT);
	skyStyle.addColorStop(0.0, '#000');
	skyStyle.addColorStop(1.0, '#035');
	context.fillStyle = skyStyle;
	context.fillRect(0, 0, WIDTH, HEIGHT);

	for (var i = 0; i < 300; i++) {
		var r = Math.random() * 5 + 5,
				x = Math.random() * WIDTH,
				y = Math.random() * HEIGHT * 0.65,
				a = Math.random() * 360;

		drawStar(context, x, y, r, a);
	}

	fillMoon(context, 2, WIDTH - 300, 200, 100, 30);

	drawLand(context);
}

function drawStar(cxt, x, y, R, rot) {
	cxt.save();

	cxt.translate(x, y);
	cxt.rotate(rot / 180 * Math.PI);
	cxt.scale(R, R);

	starPath(cxt);

	cxt.fillStyle = '#fb3';
	// cxt.strokeStyle = '#fd5';
	// cxt.lineWidth = 3;
	// cxt.lineJoin = 'round';
	cxt.fill();
	// cxt.stroke();

	cxt.restore();
}

// 绘制标准五角星（位置在(0, 0)，大小为1，旋转角度为0）
function starPath (cxt) {
	cxt.beginPath();
	for (var i = 0; i < 5; i++) {
		cxt.lineTo(
			Math.cos((18 + i * 72) / 180 * Math.PI),
			-Math.sin((18 + i * 72) / 180 * Math.PI)
		);
		cxt.lineTo(
			Math.cos((54 + i * 72) / 180 * Math.PI) * 0.5,
			-Math.sin((54 + i * 72) / 180 * Math.PI) * 0.5
		);
	}
	cxt.closePath();
}

function fillMoon(cxt, d, x, y, R, rot) {
	cxt.save();
	cxt.translate(x, y);
	cxt.rotate(rot * Math.PI / 180);
	cxt.scale(R, R);
	pathMoon(cxt, d);
	cxt.fillStyle = '#fb5';
	cxt.fill();
	cxt.restore()
}

function pathMoon(cxt, d) {
	cxt.beginPath();
	cxt.arc(0, 0, 1, 0.5 * Math.PI, 1.5 * Math.PI, true);
	cxt.moveTo(0, -1);
	cxt.arcTo(d, 0, 0, 1, getDistance(0, -1, d, 0) / d);
	cxt.closePath();
}

function getDistance(x1, y1, x2, y2) {
	return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

function drawLand(cxt) {
	cxt.save();
	cxt.beginPath();
	cxt.moveTo(0, HEIGHT * 0.75);
	cxt.bezierCurveTo(WIDTH * 0.45, HEIGHT / 2, WIDTH * 0.55, HEIGHT, WIDTH, HEIGHT * 0.75);
	cxt.lineTo(WIDTH, HEIGHT);
	cxt.lineTo(0, HEIGHT);
	cxt.closePath();

	var landStyle = cxt.createLinearGradient(0, HEIGHT, 0, 0);
	landStyle.addColorStop(0.0, '#030');
	landStyle.addColorStop(1.0, '#580');
	cxt.fillStyle = landStyle;
	cxt.fill();

	cxt.restore();
}
