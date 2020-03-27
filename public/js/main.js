const socket = io();

const inputTab = document.querySelector(".result-btn.input");
const inputArea = document.querySelector(".input-area");
const outputTab = document.querySelector(".result-btn.output");
const outputArea = document.querySelector(".output-area");
const codeBlock = document.querySelector(".code-block");
const textEditor = document.getElementById("editor");
const switchToInputArea = () => {
    inputTab.setAttribute("style", "background:white;");
    inputArea.setAttribute("style", "display:block;");
    outputTab.setAttribute("style", "background:#f3dcdc;");
    outputArea.setAttribute("style", "display:none;");
};

const switchToOututArea = () => {
    inputTab.style.background = "#f3dcdc";
    inputArea.style.display = "none";
    outputArea.style.display = "block";
    outputTab.style.background = "white";
};

textEditor.addEventListener("keypress", e => {
    code = textEditor.textContent;
});

inputTab.addEventListener("click", e => {
    e.preventDefault();
    switchToInputArea();
});

outputTab.addEventListener("click", e => {
    e.preventDefault();
    switchToOututArea();
});

codeBlock.addEventListener("submit", e => {
    e.preventDefault();
    console.log("run");
    let code = e.target.elements.editor.value;
    console.log(code);
    const input = e.target.elements.input.value;
    const compile = { code, input };
    console.table(compile);
    socket.emit("codeSumbission", compile);
});

// socket.on("startup", templates => {
//     const tmpl = document.createTextNode(templates.cpp);
//     console.log(tmpl);
//     textEditor.appendChild(tmpl);
// });

socket.on("verdict", result => {
    switchToOututArea();
    const output = result.stdout || result.stderr;
    outputArea.getElementsByClassName("output-span")[0].textContent = output;
    console.table(output);
});
