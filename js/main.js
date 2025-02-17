class Calculadora {
    constructor() {
        this.valorAnterior = document.querySelector('.valor-anterior');
        this.valorActual = document.querySelector('.valor-actual');
        this.operadores = ['+', '−', '×', '÷'];
        this.inicializarEventos();
    }

    inicializarEventos() {
        document.querySelectorAll('button').forEach((boton, index) => {
            // Añadir delay a la animación de aparición
            boton.style.animationDelay = `${index * 0.05}s`;
            
            boton.addEventListener('click', (e) => {
                // Efectos visuales
                this.crearParticulas(e);
                this.crearEfectoOndulacion(e);
                
                // Procesar clic
                this.procesarClick(boton.textContent);
                
                // Animación del valor actual
                this.valorActual.classList.add('animacion');
                setTimeout(() => {
                    this.valorActual.classList.remove('animacion');
                }, 300);
            });
        });
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
            particula.style.setProperty('--size', Math.random() * 3 + 1 + 'px');
            particula.style.setProperty('--angle', Math.random() * 360 + 'deg');
            particula.style.setProperty('--speed', Math.random() * 0.5 + 0.5 + 's');
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

    procesarClick(valor) {
        if (this.valorActual.textContent === '0' && !this.operadores.includes(valor)) {
            this.valorActual.textContent = '';
        }

        switch (valor) {
            case 'C':
                this.limpiar();
                break;
            case '=':
                this.calcular();
                break;
            case 'sin':
            case 'cos':
            case 'tan':
                this.calcularTrigonometria(valor);
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
            default:
                this.agregarValor(valor);
        }
    }

    limpiar() {
        this.valorActual.textContent = '0';
        this.valorAnterior.textContent = '';
    }

    calcular() {
        try {
            let expresion = this.valorActual.textContent
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/−/g, '-');
            let resultado = eval(expresion);
            this.valorAnterior.textContent = this.valorActual.textContent;
            this.valorActual.textContent = resultado;
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

    agregarValor(valor) {
        this.valorActual.textContent += valor;
    }
}

// Inicializar la calculadora cuando se cargue el documento
document.addEventListener('DOMContentLoaded', () => {
    const calculadora = new Calculadora();
});
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
        }};