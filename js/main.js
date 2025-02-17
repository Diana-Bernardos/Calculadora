class Calculadora {
    constructor() {
        this.valorAnterior = document.querySelector('.valor-anterior');
        this.valorActual = document.querySelector('.valor-actual');
        this.operadores = ['+', '−', '×', '÷'];
        this.inicializarEventos();
    }

    inicializarEventos() {
        document.querySelectorAll('button').forEach((boton, index) => {
            boton.style.animationDelay = `${index * 0.05}s`;
            
            boton.addEventListener('click', (e) => {
                // Efectos visuales
                this.crearParticulas(e);
                this.crearEfectoOndulacion(e);
                
                // Procesar clic y actualizar pantalla
                const valor = boton.textContent;
                if (!isNaN(valor) || valor === '.' || this.operadores.includes(valor)) {
                    if (this.valorActual.textContent === '0' && valor !== '.') {
                        this.valorActual.textContent = valor;
                    } else {
                        this.valorActual.textContent += valor;
                    }
                } else {
                    this.procesarOperacion(valor);
                }
            });
        });
    }

    procesarOperacion(operacion) {
        switch (operacion) {
            case 'C':
                this.limpiar();
                break;
            case '=':
                this.calcular();
                break;
            case 'sin':
            case 'cos':
            case 'tan':
                this.calcularTrigonometria(operacion);
                break;
            case '√':
                this.calcularRaiz();
                break;
            case 'x²':
                this.calcularCuadrado();
                break;
            case 'π':
                this.insertarPi();
                break;
        }
    }

    limpiar() {
        this.valorActual.textContent = '0';
        this.valorAnterior.textContent = '';
    }

    calcular() {
        try {
            const expresion = this.valorActual.textContent
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/−/g, '-');
            
            const resultado = eval(expresion);
            
            this.valorAnterior.textContent = this.valorActual.textContent;
            this.valorActual.textContent = resultado;
        } catch (error) {
            this.valorActual.textContent = 'Error';
        }
    }

    calcularTrigonometria(funcion) {
        try {
            const numero = parseFloat(this.valorActual.textContent);
            const radianes = numero * Math.PI / 180;
            let resultado;

            switch (funcion) {
                case 'sin':
                    resultado = Math.sin(radianes);
                    break;
                case 'cos':
                    resultado = Math.cos(radianes);
                    break;
                case 'tan':
                    resultado = Math.tan(radianes);
                    break;
            }

            this.valorAnterior.textContent = `${funcion}(${numero})`;
            this.valorActual.textContent = resultado.toFixed(8);
        } catch (error) {
            this.valorActual.textContent = 'Error';
        }
    }

    calcularRaiz() {
        try {
            const numero = parseFloat(this.valorActual.textContent);
            this.valorAnterior.textContent = `√(${numero})`;
            this.valorActual.textContent = Math.sqrt(numero);
        } catch (error) {
            this.valorActual.textContent = 'Error';
        }
    }

    calcularCuadrado() {
        try {
            const numero = parseFloat(this.valorActual.textContent);
            this.valorAnterior.textContent = `${numero}²`;
            this.valorActual.textContent = numero * numero;
        } catch (error) {
            this.valorActual.textContent = 'Error';
        }
    }

    insertarPi() {
        this.valorActual.textContent = Math.PI.toFixed(8);
    }

    crearParticulas(e) {
        const boton = e.target;
        const rect = boton.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        for (let i = 0; i < 8; i++) {
            const particula = document.createElement('div');
            particula.className = 'particula';
            particula.style.left = x + 'px';
            particula.style.top = y + 'px';
            
            const size = Math.random() * 3 + 1;
            const angle = Math.random() * 360;
            const speed = Math.random() * 0.5 + 0.5;
            
            particula.style.width = `${size}px`;
            particula.style.height = `${size}px`;
            particula.style.transform = `rotate(${angle}deg)`;
            
            boton.appendChild(particula);
            setTimeout(() => particula.remove(), 1000);
        }
    }

    crearEfectoOndulacion(e) {
        const boton = e.target;
        const circle = document.createElement('div');
        const diameter = Math.max(boton.clientWidth, boton.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - boton.offsetLeft - radius}px`;
        circle.style.top = `${e.clientY - boton.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = boton.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        boton.appendChild(circle);
    }
}

// Inicializar la calculadora cuando se cargue el documento
document.addEventListener('DOMContentLoaded', () => {
    const calculadora = new Calculadora();
});