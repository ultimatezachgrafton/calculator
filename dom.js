const resultScreen = document.getElementById('result-screen');

const btn1 = document.getElementById('btn1').addEventListener('click', calculate);
const btn2 = document.getElementById('btn2').addEventListener('click', calculate);
const btn3 = document.getElementById('btn3').addEventListener('click', calculate);
const btn4 = document.getElementById('btn4').addEventListener('click', calculate);
const btn5 = document.getElementById('btn5').addEventListener('click', calculate);
const btn6 = document.getElementById('btn6').addEventListener('click', calculate);
const btn7 = document.getElementById('btn7').addEventListener('click', calculate);
const btn8 = document.getElementById('btn8').addEventListener('click', calculate);
const btn9 = document.getElementById('btn9').addEventListener('click', calculate);
const btn0 = document.getElementById('btn0').addEventListener('click', calculate);

// when decimal is used, only shows to the thousandth

let arrayList = []; // initialize to be 10 digits long  

function calculate() {
    console.log(event.target.value);
    // iterate and place in first empty array element

    arrayList[i];

    // check to make sure no more than 10 digits are displayed at a time

    resultScreen.innerHTML = event.target.value;
    // make new digits show up after the current value instead of replacing it
    // use arraylist

    // user Number.toFixed() to round to nearest number

    // some examples:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed

}