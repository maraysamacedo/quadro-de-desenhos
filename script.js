//Initial Data
let currentColor = 'black';   //cor atual
let canDraw = false;      //variavel "pode desenhar?"
let mouseX = 0;
let mouseY = 0;

let screen = document.querySelector('#tela');   //utiliza-se # para localizar o id do html
let ctx = screen.getContext('2d');    //utilizando somente 2 dimensões (largura e altura)




//Events
document.querySelectorAll('.colorArea .color').forEach(item => {   //seleciona todas as classes 'color' da classe principal 'colorArea'
    item.addEventListener('click', colorClickEvent);     //adiciona o evento de clique nas cores
});

//funcionamento do Canvas
screen.addEventListener('mousedown', mouseDownEvent);    //quando o mouse for clicado, ative o modo desenho
screen.addEventListener('mousemove', mouseMoveEvent);          //quando o mouse estiver clicado e se mover, permaneça o modo desenho
screen.addEventListener('mouseup', mouseUpEvent);         //quando o mouse não estiver mais clicado, pare o modo desenho


document.querySelector('.clear').addEventListener('click', clearScreen);

//Functions
function colorClickEvent(e) {
    let color = e.target.getAttribute('data-color');    //seleciona o atributo da classe 'data-color'
    currentColor = color;

    document.querySelector('.color.active').classList.remove('active');   //selecionado duas div's = 'color' e 'active'. Após remove a class 'active'
    e.target.classList.add('active');          //adicionando a classe 'active na clor clicada

}

function mouseDownEvent(e) {
    canDraw = true;            //começar a desenhar
    mouseX = e.pageX - screen.offsetLeft;    //screen = canvas; pointX = posição horizontal do mouse; offset = qual elemento até o fim da pagina
    mouseY = e.pageY - screen.offsetTop;     //screen = canvas; pointY = posição vertical do mouse; offset = qual elemento até o fim da pagina 
}

function mouseMoveEvent(e) {
    if (canDraw) {
        draw(e.pageX, e.pageY);
    }
}


function mouseUpEvent() {
    canDraw = false;            //parar de desenhar

}

function draw(x, y) {   //função de desenhar
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    ctx.beginPath();   //linha 1px
    ctx.lineWidth = 5;  //largura da linha
    ctx.lenJoin = "round";  //formato da linha "redonda"; bordas arredondadas
    ctx.moveTo(mouseX, mouseY)   //mova para a posição inicial
    ctx.lineTo(pointX, pointY);   //posições pointX e pointY irá desenhar
    ctx.closePath();        //finalizar o processo de desenho
    ctx.strokeStyle = currentColor;    //cor da linha
    ctx.stroke();          //finalização


    mouseX = pointX;
    mouseY = pointY;
}

function clearScreen() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);  //matriz 2d
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);   //largura completa do canvas

}