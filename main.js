/* Password Length Bounds Checker */
function validateLength() {
    const passwordElement = document.getElementById("length");
    const minimum = parseInt(passwordElement.min);
    const maximum = parseInt(passwordElement.max);
    const chosenLength = parseInt(passwordElement.value);

    if (chosenLength < minimum) {
        passwordElement.value = minimum;
    } else if (chosenLength > maximum) {
        passwordElement.value = maximum;
    }
}

/* DOM Selector */
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFun = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol,
};

/* Generate Event Listen */
generateEl.addEventListener('click', () => {
	validateLength();
	const length = +lengthEl.value; // + = convert to numbers
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;

	resultEl.innerText = generatePassword(
		hasLower,
		hasUpper,
		hasNumber,
		hasSymbol,
		length
	);
});

// Copy password to clipboard
clipboardEl.addEventListener('click', () => {
	const textarea = document.createElement('textarea');
	const password = resultEl.innerText;

	if (!password) {
		return;
	}

	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password copied to clipboard');
});

function generatePassword(lower, upper, number, symbol, length) {
	// 1. Initialize Variables
	// 2. Exclude unchecked types
	// 3. Loop length call generator function for each type
	// 4. Add final result to the Variables and Return

	let generatedPassword = '';

	const typeCount = lower + upper + number + symbol;

	const typeArray = [{ lower }, { upper }, { number }, { symbol }].filter(
		(item) => Object.values(item)[0]
	);



	if (typeCount === 0) {
		return '';
	}

	for (let i = 0; i < length; i += typeCount) {
		typeArray.forEach((type) => {
			const funcName = Object.keys(type)[0];

			generatedPassword += randomFun[funcName]();
		});
	}

	const finalPassword = generatedPassword.slice(0, length);

	console.log(finalPassword);

	return finalPassword;
}

// Generator Functions

function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = '~`!#$%^&*()-_+|?.,<>"{}=/';

	return symbols[Math.floor(Math.random() * symbols.length)];
}
