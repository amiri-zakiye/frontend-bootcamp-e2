const body = document.querySelector("body");
const input = document.querySelector("input");

function debounce(callback, delay) {
    let timerId;
    return function (...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => callback(...args), delay);
    };
}

function createHint(){
    const para = document.createElement("p");
    body.appendChild(para);
    return para
}

function setHint(value) {
     const para = document.querySelector("p") || createHint();
    para.innerText = `${value.length} characters long!`;
    return para;
}

function setHintStyles(para, input, isError) {
    const color = isError ? "red" : "black";
    para.style.color = color;
    input.style.border = `1px solid ${color}`;
}

input.addEventListener("input", debounce((event) => {
    const value = event.target.value.trim();
    const para = setHint(value);
    setHintStyles(para, input, value.length > 5);
}, 500));
