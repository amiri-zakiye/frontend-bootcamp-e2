function debounce(callback, delay) {
    let timerId;
    return (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => callback(...args), delay);
    };
}

const DOMUtils = {
    createElement(tag, className = "") {
        const element = document.createElement(tag);
        if (className) element.classList.add(className);
        return element;
    },
    appendIfNotPresent(container, element) {
        if (!container.contains(element)) {
            container.appendChild(element);
        }
    },
};

class InputHandler {
    constructor(input, hintManager) {
        this.input = input;
        this.hintManager = hintManager;
        this.init();
    }

    handleInput = debounce((event) => {
        const value = event.target.value.trim();
        this.hintManager.updateHint(value);
    }, 500);

    init() {
        this.input.addEventListener("input", this.handleInput);
    }
}

class HintManager {
    constructor(container, maxCharacters = 5) {
        this.container = container;
        this.maxCharacters = maxCharacters;
        this.hintElement = null;
    }

    getHintText(value) {
        return `${value.length} characters long!`;
    }

    getHintClass(value) {
        return value.length > this.maxCharacters ? "error" : "";
    }

    updateHint(value) {
        if (!this.hintElement) {
            this.hintElement = DOMUtils.createElement("p", "hint");
            DOMUtils.appendIfNotPresent(this.container, this.hintElement);
        }

        const hintText = this.getHintText(value);
        const hintClass = this.getHintClass(value);

        this.hintElement.innerText = hintText;
        this.hintElement.className = "hint";
        if (hintClass) this.hintElement.classList.add(hintClass);
    }
}

const MainController = {
    state: {
        container: null,
        input: null,
        hintManager: null,
    },

    init: function () {
        this.state.container = document.querySelector(".container");
        this.state.input = document.querySelector(".input");
        this.state.hintManager = new HintManager(this.state.container);
        new InputHandler(this.state.input, this.state.hintManager);
    },
};

const DOMEventListener = () => {
    MainController.init();
};
document.addEventListener("DOMContentLoaded", DOMEventListener);