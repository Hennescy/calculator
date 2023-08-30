const output = document.querySelector('#output');
const digits = document.querySelectorAll('button');
let operator = '';
let firstArg = '';
let secondArg = '';

function add(a, b){
    return parseFloat(a) + parseFloat(b);
}

function subtract(a, b){
    return parseFloat(a) - parseFloat(b);
}

function multiply(a, b){
    return parseFloat(a) * parseFloat(b);
}

function divide(a, b){
    if (parseFloat(b) == 0){
        return "invalid";
    }
    else{
        return parseFloat(a) / parseFloat(b);
    }
}

function operate(operator, num1, num2){
    switch(operator){
        case '+':
            return add(num1, num2);
            break;
        case '-':
            return subtract(num1, num2);
            break;
        case '*':
            return multiply(num1, num2);
            break;
        case '/':
            return divide(num1, num2);
            break;
        case '^':
            return Math.pow(parseFloat(num1), parseFloat(num2));
            break;
    }
}



function firstArgOps(input){
    if (input == '.' && firstArg.includes('.')){
        return;
    }
    if (input == 'DEL'){
      firstArg = firstArg.split('');
        firstArg.pop();
        firstArg = firstArg.join('');
        output.textContent = firstArg;
        return;
    }
    if (input == '%' && output.textContent == ''){
        return;
    }
    if(input == "%"){
        firstArg = (parseFloat(firstArg)/100);
        firstArg = firstArg.toString();
        output.textContent = firstArg;
        return;
    }
    firstArg += input;
    output.textContent += input;
}

function secondArgOps(input){
    if (secondArg == '' && output.textContent != ''){
        output.textContent = '';
    }
    if (input == '.' && secondArg.includes('.')){
        return;
    }
    if (input == '+/-' && output.textContent == ''){
        return;
    }
    if (input == '+/-'){
        secondArg = -(parseFloat(secondArg));
        secondArg = secondArg.toString();
        output.textContent = secondArg;
        return;
    }
    if (input == '%' && output.textContent == ''){
        return;
    }
    if(input == "%"){
        secondArg = (parseFloat(secondArg)/100);
        secondArg = secondArg.toString();
        output.textContent = secondArg;
        return;
    }
    secondArg += input;
    output.textContent += input;
}

function clearAll(){
    output.textContent = '';
    firstArg= '';
    operator='';
    secondArg='';
}

digits.forEach(digit => {
    digit.addEventListener('click', function(){
        if (Number.isInteger(parseFloat(digit.textContent)) || digit.textContent == '.' || digit.textContent == '+/-' || digit.textContent == 'DEL' || digit.textContent == '%'){
            if(operator == '')
            {
                firstArgOps(digit.textContent);
            }
            else if (firstArg != '' && operator != ''){
                secondArgOps(digit.textContent)
            }
        }
        else if(!Number.isInteger(parseFloat(digit.textContent)) && digit.textContent != 'enter' && operator == ''){
            operator = digit.textContent;
            output.textContent = '';
        }
    });
});

const enter = document.querySelector('#enter');
enter.addEventListener('click', function(){
    if(secondArg == ''){
        output.textContent = firstArg;
    }
    else{
        output.textContent = (`${operate(operator, parseFloat(firstArg), parseFloat(secondArg))}`);
        firstArg = operate(operator, parseFloat(firstArg), parseFloat(secondArg));
        secondArg = '';
        operator='';
    }
});

const operations = document.querySelectorAll('.operation');
operations.forEach(operation =>{
        operation.addEventListener('click', function(){
        if (firstArg != '' && secondArg != ''){
            output.textContent = '';
            output.textContent = (`${operate(operator, parseFloat(firstArg), parseFloat(secondArg))}`);
            firstArg = operate(operator, parseFloat(firstArg), parseFloat(secondArg));
            secondArg = '';
            operator = operation.textContent;

        }
    });
});

const clear = document.querySelector('#clear');
clear.addEventListener('click', function(){
    clearAll();
});


