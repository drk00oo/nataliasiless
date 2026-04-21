// onload = () =>{
// document.body.classList.remove("container");
// };

function openLetter(){
    document.getElementById("loveContainer").style.display = "flex";
}

function closeLove(){
    document.getElementById("loveContainer").style.display = "none";
}

function openBox(id){
    document.getElementById(id).style.display = "flex";
}

function closeBox(){
    document.querySelectorAll(".love-container").forEach(box=>{
        box.style.display="none";
    });
}

/* ============================= */
/* GALERIA DE FOTOS */
/* ============================= */
const fotos = [
    {
    img:"img/picnic.jpg",
    texto:"Este día te abriste conmigo, pudiste llorar y expresarte como necesitabas, y yo pude estar ahí para ti. Me pareció algo muy bonito y especial, me hizo sentir cerca de ti."
    },
    {
    img:"img/ducha.jpg",
    texto:"Me encanto aquella ducha junto a ti, la cual estuvimos abrazados escuchando música sin importar que corriera el tiempo fue el momento más íntimo y bonito que he vivido con una persona, te amo muchísimo."
    },
    {
    img:"img/concierto.jpg",
    texto:"Este fue uno de los mejores momentos de mi vida, soy muy afortunado al haber vivido este momento contigo y quiero vivir muchísimos más a tu lado."
    }

];

let indice = 0;

function cambiarFoto(direccion) {
    const foto = document.getElementById("foto");
    const texto = document.getElementById("texto");
    const contenedor = document.querySelector(".contenido");

    /* guardar altura actual para animarla */
    const alturaInicial = contenedor.offsetHeight;
    contenedor.style.height = alturaInicial + "px";

    /* animación zoom */
    foto.classList.add("foto-zoom-out");
    setTimeout(()=>{
        foto.classList.remove("foto-zoom-out");
        foto.classList.add("foto-slide-left");
    },250);
    setTimeout(()=>{

    /* cambiar índice */
    indice += direccion;

    if(indice < 0) indice = fotos.length - 1;
    if(indice >= fotos.length) indice = 0;

    /* cambiar foto y texto */
    foto.src = fotos[indice].img;
    texto.innerText = fotos[indice].texto;

    /* animar nueva altura */
    setTimeout(()=>{

    const nuevaAltura = contenedor.scrollHeight;
    contenedor.style.height = nuevaAltura + "px";
    },50);

    /* entrada desde la derecha */
    foto.classList.remove("foto-slide-left");
    foto.classList.add("foto-enter-right");

    setTimeout(()=>{
        foto.classList.add("foto-enter-active");
    },20);

    setTimeout(()=>{
        foto.classList.remove("foto-enter-right");
        foto.classList.remove("foto-enter-active");
    },450);

    },550);

}

/* ============================= */
/* SISTEMA PIN */
/* ============================= */
let pin="";
const correctPin="171025";

function addNum(num){
    if(pin.length>=6)return;
    pin+=num;
    updateDisplay();
    if(pin.length===6){
        setTimeout(checkPin,200);
    }
}

function clearPin(){
    pin=pin.slice(0,-1);
    updateDisplay();
}

function clearAll(){
    pin="";
    updateDisplay();
}

function updateDisplay(){
    const circles=document.querySelectorAll("#pin-display span");
    circles.forEach((c,i)=>{
    c.classList.remove("active");
    if(i<pin.length){
        c.classList.add("active");
    }
    });
}

function checkPin(){

    if(pin===correctPin){
        const screen=document.getElementById("pin-screen");

        /* ocultar pantalla */
        screen.style.display="none";

        /* activar animaciones */
        document.body.classList.remove("locked");
        document.body.classList.remove("container");
        document.body.classList.add("unlocked");

    }else{
        const box = document.querySelector(".pin-box");
        const display = document.getElementById("pin-display");
        const error = document.getElementById("pin-error");

        box.classList.add("error");
        display.classList.add("error");
        error.classList.add("show");

    setTimeout(()=>{
        box.classList.remove("error");
        display.classList.remove("error");
        error.classList.remove("show");
        pin="";
        updateDisplay();
    },1200);

    }
}

/* ============================= */
/* CONTADOR DE TIEMPO */
/* ============================= */
function actualizarContador(){
    const inicio = new Date("2025-10-17T00:00:00");
    const ahora = new Date();

    let years = ahora.getFullYear() - inicio.getFullYear();
    let months = ahora.getMonth() - inicio.getMonth();
    let days = ahora.getDate() - inicio.getDate();

    if(days < 0){
        months--;
        const prevMonth = new Date(ahora.getFullYear(), ahora.getMonth(), 0);
        days += prevMonth.getDate();
    }

    if(months < 0){
        years--;
        months += 12;
    }

    const diff = ahora - inicio;

    let segundos = Math.floor(diff/1000);
    let minutos = Math.floor(segundos/60);
    let horas = Math.floor(minutos/60);

    document.getElementById("years").textContent = years;
    document.getElementById("months").textContent = months;
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = horas % 24;
    document.getElementById("minutes").textContent = minutos % 60;
    document.getElementById("seconds").textContent = segundos % 60;

}

setInterval(actualizarContador,1000);
actualizarContador();