function showNumberWidthAnimation(i, j, num) {
	var numberCell = $(`#number-cell-${i}-${j}`);

	numberCell.css({
		backgroundColor: getNumberBackgroundColor(num),
		color: getNumberColor(num)
	});

	numberCell.text(num);

	numberCell.animate({
		width: '100px',
		height: '100px',
		top: 20 + i * 120,
		left: 20 + j * 120
	}, 50);
}

function showMoveAnimation(formx, formy, tox, toy) {
	var numberCell = $(`#number-cell-${formx}-${formy}`);
	numberCell.animate({
		top: 20 + tox * 120,
		left: 20 + toy * 120
	}, 200);
}
