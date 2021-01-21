// Reference //
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D

const canvas = document.getElementById("jsCanvas"); //html에서 설정한 id 가져오기
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor"); //jsColor라는 클래스를 가진 여러 애들을 모아서 colors로 만든다.
//const colors = document.getElementById("jsColor"); //이걸로하면 클릭했을 때 로그가 안남는다..?
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "2c2c2c";
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 400;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

//기본배경 white로 설정
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
ctx.lineCap = "squre";

let painting = false;
let filling = false;

function stopPainting(event) {
    painting = false;
}

function startPainting(event) {
    painting = true;
}

//canvas 영역 위에서 움직임이 감지된 객체(event)의
//log를 console창에 보여라
//offsetX, Y를 저장해라
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    //드래그안할때에도 좌표를 따라다니면서 시작하기를 대기해야함
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        //console.log("Create path in", x, y);
    }

    //기존에 있던 path의 마지막 점과 현재 x,y점을 직선으로 그어준다.
    else {
        ctx.lineTo(x, y);
        ctx.stroke();
        //console.log("Create line in", x, y);
    }
}
function handleColorClick(event) {
    //console.log(event.target.style);
    const color = event.target.style.backgroundColor;
    //console.log(color);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
function handleRangeChange(event) {
    //console.log(event.target.value);
    const lineWidth = event.target.value;
    ctx.lineWidth = lineWidth;
}
function changeMode(event) {
    //console.log(event);
    if (filling) {
        mode.innerText = "FILL"
        filling = false;
    }
    else {
        mode.innerText = "PAINT"
        filling = true;
    }
}
function handleCanvasClick() {
    if (filling)
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
function handleCM(event) {
    painting = false;
    event.preventDefault();
}
function handleSaveImage() {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a"); //존재하지 않는 링크를 만든다..?
    link.href = image;
    link.download = "Painting_JS[EXPORT]"
    link.click();
}

if (canvas) {
    //canvas위에서 "~"라는게 감지되면, 
    //그 객체(event)를 두번째 function으로 보내라
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting); //click과 다름
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("contextmenu", handleCM);
    canvas.addEventListener("click", handleCanvasClick);
}

//console.log(Array.from(colors));
//colors에는 9개의 jsColor class를 가진 object이 들어있는데
//이 뭉치?를 array로 만들고
// 각각을 color라는 이름으로 enumerate 돌린다.
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", changeMode);
}
if (save) {
    save.addEventListener("click", handleSaveImage);
}