function PMC(r, xc, yc) {
    let x = 0;
    let y = r;
    let p = 1 - r;
    point(xc, yc + r);
    point(xc, yc - r);
    point(xc + r, yc);
    point(xc - r, yc);

    while (x <= y) {
        x++;
        if (p < 0) {
            p = p + (2 * x) + 1;
        } else {
            y--;
            p = p + (2 * x + 2) - (2 * y - 2);
        }
        point(xc + x, yc + y);
        point(xc - x, yc + y);
        point(xc + x, yc - y);
        point(xc - x, yc - y);
        point(xc + y, yc + x);
        point(xc - y, yc + x);
        point(xc + y, yc - x);
        point(xc - y, yc - x);
    }
}

function EPP(x0, y0, x1, y1) {
    // Calcula la pendiente (m) y el término independiente (b)
    let m = (y1 - y0) / (x1 - x0);
    let b = y0 - m * x0;

    // Dibuja los puntos en la línea
    for (let x = min(x0, x1); x <= max(x0, x1); x++) {
        let y = m * x + b;
        point(x, y);
    }
}

function DDA(x0, y0, x1, y1) {
    // Calcula diferencias en x y y
    let dx = x1 - x0;
    let dy = y1 - y0;
    // Determina el número de pasos necesarios
    let steps = abs(dx) > abs(dy) ? abs(dx) : abs(dy);
    // Calcula los incrementos para x y y
    let xIncrement = dx / steps;
    let yIncrement = dy / steps;
    // Valores iniciales
    let x = x0;
    let y = y0;

    // Dibuja los puntos en la línea
    for (let i = 0; i <= steps; i++) {
        point(x, y);
        x += xIncrement;
        y += yIncrement;
    }
}

function BRESENHAM(x0, y0, x1, y1) {
    // Calcula diferencias y pasos
    let dx = abs(x1 - x0);
    let dy = abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

    // Bucle principal
    while (true) {
        // Dibuja el punto actual
        point(x0, y0);
        // Si llegamos al punto final, salimos del bucle
        if (x0 === x1 && y0 === y1) break;
        // Calcula siguiente paso
        let e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}