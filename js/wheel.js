class Sector {
    constructor(color, label, weight, isVision = true) {
        this.color = color;
        this.label = label;
        this.weight = weight;
        this.isVision = isVision;
    }

    draw(ctx, startAngle, arc, rad) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.moveTo(rad, rad);
        ctx.arc(rad, rad, rad, startAngle, startAngle + arc);
        ctx.lineTo(rad, rad);
        ctx.fill();

        if (this.isVision) {
            ctx.translate(rad, rad);
            ctx.rotate(startAngle + arc/2);
            ctx.textAlign = "right";
            ctx.fillStyle = "#fff";
            ctx.font = "bold 16px sans-serif";
            ctx.fillText(this.label, rad - 10, 10);

        }

        ctx.restore();
    }
}

const sectors = [];
const spinEl = document.querySelector('#spin');
const addSectorEl = document.querySelector('#addSector');
const sectorNameEl = document.querySelector('#sectorName');
const sectorWeightEl = document.querySelector('#sectorWeight');
const ctx = document.querySelector('#wheel').getContext('2d');
const dia = ctx.canvas.width;
const rad = dia / 2;
const PI = Math.PI;
const TAU = 2 * PI;

let angVel = 0;
let ang = 0;

const friction = 0.995;

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const getIndex = () => {
    let acc = 0;
    const rnd = Math.random() * sectors.reduce((acc, val) => acc + val.weight, 0);
    for (let i = 0; i < sectors.length; i++) {
        acc += sectors[i].weight;
        if (rnd <= acc) return i;
    }
    return 0;
}

function drawWheel() {
    ctx.clearRect(0, 0, dia, dia);
    const totWeight = sectors.reduce((acc, val) => acc + val.weight, 0);
    let startAngle = 0;

    sectors.forEach(sector => {
        const arc = (TAU * sector.weight) / totWeight;
        sector.draw(ctx, startAngle, arc, rad);
        startAngle += arc;
    });

    updateSectorsTable();
}

function rotate() {
    const sectorIndex = getIndex();
    const sector = sectors[sectorIndex];
    ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
}

function frame() {
    if (!angVel) return;
    angVel *= friction;
    if (angVel < 0.002) angVel = 0;
    ang += angVel;
    ang %= TAU;
    rotate();
}

function engine() {
    frame();
    requestAnimationFrame(engine);
}

function addSector() {
    const label = sectorNameEl.value.trim();
    const weight = parseFloat(sectorWeightEl.value);
    const color = getRandomColor();

    if (label && !isNaN(weight) && weight > 0) {
        sectors.push(new Sector(color, label, weight));
        drawWheel();
    }

    sectorNameEl.value = '';
    sectorWeightEl.value = '';
}

function updateSectorsTable() {
    const tbody = document.querySelector('#sectorsTable tbody');
    tbody.innerHTML = ''; // Очистить текущее содержимое tbody

    sectors.forEach((sector, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="background: ${sector.color}">${sector.label}</td>
            <td style="background: ${sector.color}"><input type="number" value="${sector.weight}" class="sector-weight" data-index="${index}"></td>
            <td class="sector-chance" style="background: ${sector.color}"></td>
            <td style="background: ${sector.color}"><button class="delete-sector" data-index="${index}">Delete</button></td>
        `;
        tbody.appendChild(row);
    });

    updateChances();
    addEventListeners();
}

function updateChances() {
    const totalWeight = sectors.reduce((acc, sector) => acc + sector.weight, 0);
    document.querySelectorAll('.sector-chance').forEach((cell, index) => {
        let chance = ((sectors[index].weight / totalWeight) * 100).toFixed(2);
        cell.textContent = `${chance}%`;
    });
}
document.addEventListener('DOMContentLoaded', init);
spinEl.addEventListener('click', () => {
    if (!angVel) angVel = Math.random() * 0.25 + 0.2;
});
addSectorEl.addEventListener('click', addSector);
function addEventListeners() {
    document.querySelectorAll('.sector-weight').forEach(input => {
        input.addEventListener('change', function() {
            let value = parseFloat(this.value);
            const index = this.getAttribute('data-index');
            if (value <= 0){
                sectors.splice(index, 1);
                drawWheel();
                return;
            }
            sectors[index].weight = value;
            drawWheel();
        });
    });

    document.querySelectorAll('.delete-sector').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            sectors.splice(index, 1);
            drawWheel();
        });
    });
}

function init() {
    drawWheel();
    engine();
}
