// array of numbers on board, make sure there are no repeates
var arr = [];
var current_num_arr = [];
innerArr = [];
//keeps track of the state of the board and updates loaction to true when clicked
var current_board_array = [];
// counts amout of true vals int he current board array
true_counter = 0;
// flag tracks wins
flag = false;

// generating all the number on the board, no repeat
for (var i = 0; i < 25; i++) {
	var columnB = document.getElementsByTagName('p')[i];
	if (i % 5 == 0) {
		num = getRandom(1, 15);
		while (arr.includes(num)) {
			num = getRandom(1, 15);
		}
		arr.push(num);
		columnB.innerHTML = num;
	}
	if (i % 5 == 1) {
		num = getRandom(16, 30);
		while (arr.includes(num)) {
			num = getRandom(16, 30);
		}
		arr.push(num);
		columnB.innerHTML = num;
	}
	if (i % 5 == 2) {
		num = getRandom(31, 45);
		while (arr.includes(num)) {
			num = getRandom(31, 45);
		}
		arr.push(num);
		columnB.innerHTML = num;
	}
	if (i % 5 == 3) {
		num = getRandom(46, 60);
		while (arr.includes(num)) {
			num = getRandom(46, 60);
		}
		arr.push(num);
		columnB.innerHTML = num;
	}
	if (i % 5 == 4) {
		num = getRandom(61, 75);
		while (arr.includes(num)) {
			num = getRandom(61, 75);
		}
		arr.push(num);
		columnB.innerHTML = num;
	}
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// generates the current numbers. makes an array to make sure they dont repeat
function GenerateCurrentNumber() {
	var current_num_spot = document.getElementsByTagName('h1')[5];
	var current_num = getRandom(1, 75);
	while (current_board_array.includes(current_num)) {
		var current_num = getRandom(1, 75);
	}
	current_num_arr.push(current_num);
	current_num_spot.innerHTML = current_num;
}

// doing different things when a button is clicked
function marker(x) {
	// data is the number val of the box
	var data = parseInt(x.textContent);
	// if the user has checked a legal box
	if (current_num_arr.includes(data)) {
		x.style.backgroundColor = "#04C4C7";
		// updating the state of the current board, if clicked the val is changed to true
		for (var i = 0; i < 5; i++) {
			// getting the index number of the checked box in the array
			index_val = current_board_array[i].indexOf(data);
			if (index_val != -1) {
				current_board_array[i][index_val] = true;
			}
		}
	}
}

// Making a copy of the game board which will be constantly updated and compated to winnings states
// 2d array
function generateBoard() {
	for (var i = 0; i <= 26; i++) {
		if (i == 5 || i == 10 || i == 16 || i == 21 || i == 26) {
			current_board_array.push(innerArr);
			innerArr = [];
		}
		var nums = document.getElementsByTagName('p')[i];
		if (Number.isInteger(parseInt(nums.textContent))) {
			innerArr.push(parseInt(nums.textContent));
		} else {
			innerArr.push(true);
			i++;
		}
	}
}

// loops through the current game board to check if there is a winning state according to the dropdown
function checkWinner() {
	// the place where we will output results
	var winner = document.getElementById("winner");
	// grabbing the state of the dropdown
	var e = document.getElementById("selection");
	var selected = e.options[e.selectedIndex].text;

	if (selected == "Horizontal") {
		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 5; j++) {
				if (current_board_array[i][j] == true) {
					true_counter ++;
				}
				else {
					true_counter = 0;
				}
			}
			if (true_counter == 5) {
					winner.innerHTML = "HORIZONTAL WIN!";
					flag = true;
			}
			true_counter = 0;
		}
		if (flag == false) {
			winner.innerHTML = "Fake news, no Bingo.";
		}
	}
	if (selected == "Vertical") {
		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 5; j++) {
				if (current_board_array[j][i] == true) {
					true_counter ++;
				}
				else {
					true_counter = 0;
				}
			}
			if (true_counter == 5) {
					winner.innerHTML = "VERTICAL WIN!";
					flag = true;
			}
			true_counter = 0;
		}
		if (flag == false) {
			winner.innerHTML = "Fake news, no Bingo.";
		}
	}
	if (selected == "Diagonal") {
		if (((current_board_array[0][0]) == true && (current_board_array[1][1]) == true && (current_board_array[3][3]) == true && (current_board_array[4][4]) == true) || (((current_board_array[0][4]) == true && (current_board_array[1][3]) == true && (current_board_array[3][1]) == true && (current_board_array[4][0]) == true))) {
			winner.innerHTML = "DIAGONAL WIN!";
		}
		else {
		winner.innerHTML = "Fake news, no Bingo.";
		}
	}
	if (selected == "4 Corners") {
		if ((current_board_array[0][0]) == true && (current_board_array[0][4]) == true && (current_board_array[4][0]) == true && (current_board_array[4][4]) == true) {
			winner.innerHTML = "4 CORNERS WIN!";
		}
		else {
		winner.innerHTML = "Fake news, no Bingo.";
		}
	}
	if (selected == "Full Card") {
		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 5; j++) {
				if (current_board_array[j][i] == true) {
					true_counter ++;
				}
				else {
					true_counter = 0;
				}
			}
		}
		if (true_counter == 25) {
			winner.innerHTML = "FULL CARD WIN!";
		}
		else {
		winner.innerHTML = "Fake news, no Bingo.";
		}
	}
}

var free = document.getElementById('free').getElementsByTagName('p')[0];
free.innerHTML = "<p>FREE</p>";

GenerateCurrentNumber()
generateBoard()
