let horaInicial;
let horaLaPaz;
let horaCDMX;
let horaBarcelona;
let relojLaPaz;
let relojCDMX;
let relojBarcelona;

function setup() {
    createCanvas(1200, 700);
    horaInicial = new Date(); // Obtener la hora actual
    horaCDMX = new Date(horaInicial.getTime() + 1 * 60 * 60 * 1000); // Obtener la hora de CDMX
    horaBarcelona = new Date(horaInicial.getTime() + 8 * 60 * 60 * 1000); // Obtener la hora de Barcelona
    relojLaPaz = new Reloj(200, 300, horaInicial, 'EPP');
    relojCDMX = new Reloj(400, 0, horaCDMX, 'DDA');
    relojBarcelona = new Reloj(400, 0, horaBarcelona, 'BRESENHAM');
    crearInputHora();
}

function draw() {
    background(220);
    // Dibujar el reloj
    relojLaPaz.dibujarReloj();
    relojCDMX.dibujarReloj();
    relojBarcelona.dibujarReloj();
}

function crearInputHora() {
    // Crear un input para configurar la hora de La Paz, BCS
    let inputHora = createInput("HH:MM:SS");
    inputHora.position(525, 100);
    inputHora.changed(() => {
        let horaIngresada = inputHora.value();
        let partesHora = horaIngresada.split(":");
        horaInicial = new Date();
        horaInicial.setHours(partesHora[0]);
        horaInicial.setMinutes(partesHora[1]);
        horaInicial.setSeconds(partesHora[2]);
        horaCDMX = new Date(horaInicial.getTime() + 1 * 60 * 60 * 1000);
        horaBarcelona = new Date(horaInicial.getTime() + 8 * 60 * 60 * 1000);
        relojLaPaz = new Reloj(200, 300, horaInicial, 'EPP');
        relojCDMX = new Reloj(400, 0, horaCDMX, 'DDA');
        relojBarcelona = new Reloj(400, 0, horaBarcelona, 'BRESENHAM');
    });
}