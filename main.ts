const canvasContainer:HTMLElement = document.querySelector(".canvas-container");
const colorPickerContainer:HTMLElement = document.querySelector(".CP-Container");
const helptext:HTMLElement = document.querySelector(".help-text");
const resetButton:HTMLButtonElement = document.querySelector(".reset-button");
const goButton:HTMLButtonElement = document.querySelector(".go-button")
const inputField = <HTMLFormElement>document.querySelector(".grid-size-field");

// Variables.
var gridSize:number = 50;
var pencilColor:string = "aquamarine";
var isDrawing:boolean = false;
var colorPickerConstructed:boolean = false;
// To check if any key is currently pressed to make keyevents trigger only once
// between keypress and keydown.
var keyIsDown:boolean = false;
var transparency:boolean = false;

// Used for setting cursor color
let style = document.createElement('style');
document.getElementsByTagName('head')[0].appendChild(style);


function styleCanvas() {
    // Calculates wiewport dimentions
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    // Calculates the size of each cell.
    let cellWidth = windowWidth / gridSize;
    let cellHeight = windowHeight / gridSize;

    // set for canvas
    canvasContainer.style.width = windowWidth + "px";;
    canvasContainer.style.height = windowHeight + "px";;
    canvasContainer.style.gridTemplateColumns = `repeat(${gridSize}, ${cellWidth}px)`
    canvasContainer.style.gridTemplateRows = `repeat(${gridSize}, ${cellHeight}px)`

    // set for colorpicker
    colorPickerContainer.style.width = windowWidth + "px";;
    colorPickerContainer.style.height = windowHeight + "px";;
    colorPickerContainer.style.gridTemplateColumns = `repeat(${gridSize}, ${cellWidth}px)`
    colorPickerContainer.style.gridTemplateRows = `repeat(${gridSize}, ${cellHeight}px)`
}

function redrawGrid() {
    canvasContainer.innerHTML = '';
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            let gridSquare:HTMLElement = document.createElement('div')
            gridSquare.setAttribute("class", "item")
            gridSquare.addEventListener("mouseover", (e) => {
                changeElementColor
            (<HTMLElement>e.target);
            })
            canvasContainer.appendChild(gridSquare);
        }
    }
}

function hsl(i:number , j:number, gridSize:number):string {
    let hue = i / gridSize * 360;
    let saturation = '';
    let brightness = '';
    if (!transparency) {
        saturation = "100%"
        brightness =  30 + (j / gridSize * 60) + "%";
    } else {
        saturation = '100%';
        brightness = '50%';
    }
    return `hsl(${hue}, ${saturation}, ${brightness})`;
}

function launchColorpicker() {
    canvasContainer.style.display = "none";
    colorPickerContainer.style.display = "grid";
    if (!colorPickerConstructed) { // i.e. if allready created, just display it.
        colorPickerContainer.innerHTML = '';
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                const colorSquare:HTMLElement = document.createElement('div');
                colorSquare.setAttribute("class", "color-item")
                colorSquare.style.backgroundColor = hsl(i, j, gridSize);
                colorSquare.addEventListener('mouseover', (e) => {
                    setPencilColor(getElementColor(<HTMLElement>e.target));
                    })
                colorPickerContainer.appendChild(colorSquare);
            }
        }
    colorPickerConstructed = true;
}
}
function closeColorPicker() {
    colorPickerContainer.style.display = "none";
    canvasContainer.style.display = "grid";
}


function changeElementColor(e:HTMLElement) {
    if (isDrawing) {e.style.backgroundColor = pencilColor;}
}
function getElementColor(e:HTMLElement): string {
    return e.style.backgroundColor;
}

function turnDrawingOn() {
    isDrawing = true;
}
function turnDrawingOff() {
    isDrawing = false;
}

function togglehHelpText() {
    if (helptext.style.display == 'none') {
    helptext.style.display = "inherit";
    } else {helptext.style.display = 'none';}
}

function toggeleTransparency() {
    if (transparency) {transparency = false}
    else {transparency = true};
    colorPickerConstructed = false; // To be able to construct different CP
    setPencilColor(pencilColor); // so that the cursor changes
    console.log(pencilColor);

}

function setPencilColor (color:string) {
    // https://stackoverflow.com/a/11371599/11227739
    pencilColor = color;
    let css = `.item:hover {border: 3px ${(transparency)? 'dotted' : 'dashed'} ${color};}`;
    style.innerHTML = '';
    style.appendChild(document.createTextNode(css));
} 

// EVENTLISTENERS:
window.addEventListener('keydown', (e) => {
    if (!keyIsDown) {
        const key = e.key.toUpperCase();
        switch (key) {
            case "X":
                turnDrawingOn();
                break;
            case "C":
                launchColorpicker();
                break;
            case "H":
                togglehHelpText();
                break;
            case "T":
                toggeleTransparency();
            default:
                break;
        }
    } keyIsDown = true;
})

window.addEventListener('keyup', (e) => {
    keyIsDown = false;
    const key = e.key.toUpperCase();
    switch (key) {
        case "X":
            turnDrawingOff();
            break;
        case "C":
            closeColorPicker();
            break;
        default:
            break;
    }
})
window.onresize = styleCanvas;
goButton.onclick = () => {helptext.style.display = "none";}

resetButton.addEventListener('click', (e) => {
    var input = parseInt(inputField.value);
    if (input != NaN && input <= 100 && input >= 2) {
        helptext.style.display = "none";
        gridSize = input;
        main(); //resets the application
    }
})


// main:
function main() {
    colorPickerConstructed = false;
    styleCanvas();
    redrawGrid();
    inputField.value = gridSize;
}

main();