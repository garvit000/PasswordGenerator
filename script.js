const btnn = document.getElementById("btn");
const para = document.getElementById("para");
const copy = document.getElementById("copyBtn");
const lengths = document.getElementById("length");
const capss = document.getElementById("caps");
const numbers = document.getElementById("number");
const signss = document.getElementById("signs");
const results = document.getElementById("result");
const lowers = document.getElementById("lower");
const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}

btnn.onclick = function() {
  const length = +lengths.value;
	const hasUpper = capss.checked;
	const hasNumber = numbers.checked;
	const hasSymbol = signss.checked;
  const hasLower = lowers.checked;
  
	if(length>=500) {
  alert("You can not generate a password with more than 500 digits!");
    return;
}
  results.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
  para.innerHTML="Here is your generated password!"
  copy.style.display="block"
}

copy.onclick = function() {
  const textarea = document.createElement('textarea');
	const password = results.innerText;
	
	if(!password) { 
    return; 
  }
	
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password has been copied to clipboard');
}

function generatePassword(lower, upper, number, symbol, length) {
	let generatedPassword = '';
	const typesCount = lower + number + upper + symbol;
	const typesArr = [{lower}, , {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
  
	if(typesCount === 0) {
    alert("Please select atleast one of the parameters below!!");
		return "Please select atleast one of parameters above!";
	}
	
	for(let i=0; i<length; i+=typesCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}
	
	const lastPassword = generatedPassword.slice(0, length);
	
	return lastPassword;
}

function getRandomUpper() {
  const upperCase = "ZXCVBNMASDFGHJKLPOIUYTREWQ"
	return upperCase[Math.floor(Math.random() * upperCase.length)];
}

function getRandomLower() {
  const lowerCase = "qwertyuiopasdfghjklzxcvbnm"
	return lowerCase[Math.floor(Math.random() * lowerCase.length)];
}

function getRandomNumber() {
  const nombers = "1234567890"
	return nombers[Math.floor(Math.random() * nombers.length)];
}

function getRandomSymbol() {
	const symbols = '~!@#$%^&*()_+=-`"/'
	return symbols[Math.floor(Math.random() * symbols.length)];
}