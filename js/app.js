let buttons = [
    document.getElementById("bc"),
    document.getElementById("bop"),
    document.getElementById("bcp"),
    document.getElementById("bfd"),
    document.getElementById("b7"),
    document.getElementById("b8"),
    document.getElementById("b9"),
    document.getElementById("bfmultiple"),
    document.getElementById("b4"),
    document.getElementById("b5"),
    document.getElementById("b6"),
    document.getElementById("bfsubtract"),
    document.getElementById("b1"),
    document.getElementById("b2"),
    document.getElementById("b3"),
    document.getElementById("bfsum"),
    document.getElementById("b0"),
    document.getElementById("bperiod"),
    document.getElementById("bequal")
];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '(', ')'];
const operations = ['+', '-', '/', '*']
const functions = ['Escape', 'Enter', 'Backspace']
const phone = document.getElementsByClassName('phone')[0]
const zeroButton = document.getElementById("b0")
const contact = document.getElementById("contact")

let notificationIcons = document.getElementById('notification-icons').getElementsByTagName('img')[0]
let history = document.getElementsByClassName('display-history-container')[0]
let display = document.getElementsByClassName('display-input-container')[0]
let operation = [0];
let historyContent = [];
let lasKeyPressed = null;

window.addEventListener('resize', function (event) {
    resizeElements()
});

document.addEventListener('DOMContentLoaded', function (event) {
    resizeElements()
});

function resizeElements() {
    // Design sizes
    // .phone { width: 430px; height: 930px; }
    // .button { border-radius: 25px; }
    let newHeight = Math.round(window.innerHeight * 1)
    let newWidth = Math.round(newHeight / 2.16)
    let zeroBorderRadius = Math.round(window.innerHeight / 31)
    let buttonBorderRadius = Math.round(window.innerHeight / 37.2)
    let notificationIconsSize = (window.innerHeight > 930) ? 930 : (innerHeight < 500) ? 500 : innerHeight
    phone.style.height = `${newHeight}px`
    phone.style.width = `${newWidth}px`
    phone.style.borderRadius = `${zeroBorderRadius}px`
    for (const button of buttons) {
        button.style.borderRadius = `${buttonBorderRadius}px`
    }
    zeroButton.style.borderRadius = `${zeroBorderRadius}px`
    notificationIcons.style.height = `${Math.round(notificationIconsSize / 71.5)}px`
    contact.style.left = (newWidth < 230) ? '230px' : (newWidth > 430) ? '430px' : `${newWidth}px`
}

function readInput(key) {
    console.log(key, lasKeyPressed);
    if (key == '0' && operation.length == 1 && operation[0] == '0') return;
    if (lasKeyPressed == 'Enter') operation = [0];
    lasKeyPressed = key
    if (key == 'Escape' || key == 'Delete') {
        operation = [0]
        return
    }
    if (key == 'Enter') {
        historyContent = operation
        try {
            operation = [eval(operation.join(''))]
        } catch (error) {
            operation = ['invalid operation']
        }
        return;
    }
    if (key == 'Backspace') {
        operation.pop()
        return;
    }
    if (key !== '0' && operation.length == 1 && operation[0] == '0') {
        operation = [key]
    } else {
        operation.push(key)
    }
}

function updateDisplays() {
    history.innerHTML = formatHistory(historyContent)
    display.innerText = formatDisplay(operation)
}

function formatHistory(historyContent) {
    let html = historyContent.join('');
    html = html.replace(/[\+,\-,\/,\*]/gi, function (x) {
        return (x == '*') ? `<span class='yellow'> x </span>` : `<span class='yellow'> ${x} </span>`
    });
    return html
}

function formatDisplay(operation) {
    let html = operation.join('');
    html = html.replace(/[\+,\-,\/,\*]/gi, function (x) {
        return (x == '*') ? ` x ` : ` ${x} `
    });
    return html
}


for (let button of buttons) {
    button.addEventListener('click', function (event) {
        window.navigator.vibrate(10)
        readInput(event.target.dataset.value)
        updateDisplays()
    })
}

document.addEventListener('keyup', function (event) {
    const keys = [...numbers, ...functions, ...operations]
    if (keys.indexOf(event.key) > -1) readInput(event.key)
    updateDisplays()
})

updateDisplays();