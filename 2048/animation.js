function showNumberWidthAnimation(i, j, num) {
	var numberCell = $(`#number-cell-${i}-${j}`);

	numberCell.css({
		backgroundColor: getNumberBackgroundColor(num),
		color: getNumberColor(num)
	});

	numberCell.text(num);

	numberCell.animate({
		width: cellSideLength,
		height: cellSideLength,
		top: getPositionXY(i),
		left: getPositionXY(j)
	}, 50);
}

function showMoveAnimation(formx, formy, tox, toy) {
	var numberCell = $(`#number-cell-${formx}-${formy}`);
	numberCell.animate({
		top: getPositionXY(tox),
		left: getPositionXY(toy)
	}, 200);
}
