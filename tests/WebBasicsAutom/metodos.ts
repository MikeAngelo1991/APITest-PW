
const persona = new Persona("Alice", 30);
persona.mostrarDetalles();

// Una simple función
function sumar(a: number, b: number): number {
    return a + b;
}

const resultadoSuma = sumar(5, 3);
console.log("Resultado de la suma:", resultadoSuma);

// Función Flecha Básica
const suma = (a: number, b: number): number => { 
    // la constante suma es del tipo número y la flecha es => para logica sencilla, captura el velor this del contexto que lo define
    return a + b;
};

const resultadoSumaFlecha = suma(5, 3);
console.log("Resultado de la suma:", resultadoSuma);

// Función Flecha sin paréntesis alrededor de un solo parámetro
const esPar = num => num % 2 === 0;

console.log("¿El número 6 es par?", esPar(6));

// Función Flecha con Cuerpo Implícito
const saludar = nombre => `¡Hola, ${nombre}!`;

console.log(saludar("Alice"));

// Función Flecha en Mapeo de Arreglo
const numeros = [1, 2, 3, 4, 5];
const alCuadrado = numeros.map(num => num * num);
// la función flecha se utiliza para elevar al cuadrado cada número en el arreglo numeros utilizando el método map, 
// que aplica la función a cada elemento del arreglo y devuelve un nuevo arreglo con los resultados.

console.log("Arreglo original:", numeros);
console.log("Arreglo al cuadrado:", alCuadrado);
