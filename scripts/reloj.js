class Reloj {
    constructor(x, y, tiempo, metodo) {
        this.x = x;
        this.y = y;
        this.metodo = metodo;

        let horas = tiempo.getHours();
        let minutos = tiempo.getMinutes();
        let segundos = tiempo.getSeconds();
        // Convertir horas a un ángulo
        horas %= 12;
        this.horasAngulo = map(horas + minutos / 60, 0, 12, 0, TWO_PI) - HALF_PI;
        this.minutosAngulo = map(minutos + segundos / 60, 0, 60, 0, TWO_PI) - HALF_PI;
        this.segundosAngulo = map(segundos, 0, 60, 0, TWO_PI) - HALF_PI;

        setInterval(() => {
            this.horasAngulo = map(horas + minutos / 60, 0, 12, 0, TWO_PI) - HALF_PI;
            this.minutosAngulo = map(minutos + segundos / 60, 0, 60, 0, TWO_PI) - HALF_PI;
            this.segundosAngulo = map(segundos, 0, 60, 0, TWO_PI) - HALF_PI;

            if (segundos == 60) {
                if (minutos == 60) {
                    if (horas == 12) {
                        horas = 0;
                    } else {
                        horas++;
                    }
                    minutos = 0;
                } else {
                    minutos++;
                }
                segundos = 0;
            }
            segundos++;
        }, 1000);
    }


    dibujarReloj() {
        translate(this.x, this.y); // Centrar el reloj

        // Dibujar manecillas
        strokeWeight(8);
        // Redondear los valores de seno y coseno para evitar errores de dibujo
        let hx = Math.round(cos(this.horasAngulo) * 50);
        let hy = Math.round(sin(this.horasAngulo) * 50);
        let mx = Math.round(cos(this.minutosAngulo) * 75);
        let my = Math.round(sin(this.minutosAngulo) * 75);
        let sx = Math.round(cos(this.segundosAngulo) * 100);
        let sy = Math.round(sin(this.segundosAngulo) * 100);

        stroke(0, 0, 0);
        // Manecillas negras de referencia
        line(0, 0, cos(this.horasAngulo) * 50, sin(this.horasAngulo) * 50);
        line(0, 0, cos(this.minutosAngulo) * 75, sin(this.minutosAngulo) * 75);
        line(0, 0, cos(this.segundosAngulo) * 100, sin(this.segundosAngulo) * 100);

        if (this.metodo == 'EPP') {
            stroke(255, 0, 0); // Manecilla de las horas (roja)
            EPP(0, 0, hx, hy);
            stroke(0, 255, 0); // Manecilla de los minutos (verde)
            EPP(0, 0, mx, my);
            stroke(0, 0, 255); // Manecilla de los segundos (azul)
            EPP(0, 0, sx, sy);
        } else if (this.metodo == 'DDA') {
            stroke(255, 0, 0);
            DDA(0, 0, hx, hy);
            stroke(0, 255, 0);
            DDA(0, 0, mx, my);
            stroke(0, 0, 255);
            DDA(0, 0, sx, sy);
        } else if (this.metodo == 'BRESENHAM') {
            stroke(255, 0, 0);
            BRESENHAM(0, 0, hx, hy);
            stroke(0, 255, 0);
            BRESENHAM(0, 0, mx, my);
            stroke(0, 0, 255);
            BRESENHAM(0, 0, sx, sy);
        }

        reloj(); // Dibujar el reloj
    }
}

function reloj() {
    // Dibujar el centro del reloj
    fill(0);
    noStroke();
    ellipse(0, 0, 10, 10);

    // Dibujar los números
    stroke(0);
    strokeWeight(1);
    textAlign(CENTER, CENTER);
    for (let i = 1; i <= 12; i++) {
        let angulo = map(i, 0, 12, 0, TWO_PI) - HALF_PI;
        let x = cos(angulo) * 120;
        let y = sin(angulo) * 120;
        text(i, x, y);
    }

    // Dibujar los puntos de los minutos
    strokeWeight(4);
    for (let i = 0; i < 60; i++) {
        if (i % 5 != 0) {
            let angulo = map(i, 0, 60, 0, TWO_PI) - HALF_PI;
            let x = cos(angulo) * 120;
            let y = sin(angulo) * 120;
            point(x, y);
        }
    }

    // Dibujar el marco del reloj
    noFill();
    strokeWeight(4);
    stroke(0);
    PMC(135, 0, 0);
}