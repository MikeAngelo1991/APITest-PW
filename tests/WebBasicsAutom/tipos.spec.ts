let edad: number = 25;
let edad1 = 25;      // Variable 'edad' de tipo number
let altura: number = 175.5; // Variable 'altura' de tipo number

// Operaciones numéricas
let suma: number = edad + 10;
let promedio: number = (edad + altura) / 2;

let primerNombre: string = "Juan"; // Variable 'primerNombre' de tipo string
let apellido: string = 'Lopez';    // Se pueden usar comillas simples

let nombreCompleto: string = primerNombre + " " + apellido; // Concatenación de cadenas

let estaActivo: boolean = true;   // Variable 'estaActivo' de tipo boolean
let estaLogueado: boolean = false; // Variable 'estaLogueado' de tipo boolean

// Condicionales
if (estaActivo) {
    console.log("El usuario está activo.");
} else {
    console.log("El usuario no está activo.");
}


let numeros: number[] = [1, 2, 3, 4, 5];  // Arreglo de números
let frutas: string[] = ["apple", "banana", "orange"]; // Arreglo de cadenas

console.log(numeros[2]);  // Acceso al tercer elemento (índice 2)
console.log(frutas.length);  // Longitud del arreglo

let persona: [string, number] = ["Alice", 30];  // Tupla de nombre y edad
let coordenadas: [number, number] = [45.6, -73.8];  // Tupla de coordenadas

console.log(persona[0]);  // Acceso al nombre
console.log(coordenadas[1]);  // Acceso a la longitud

enum Color {
    Rojo,
    Verde,
    Azul
}

let colorElegido: Color = Color.Verde; // Variable 'colorElegido' de tipo Color, asignada al valor Verde del enum

if (colorElegido === Color.Verde) {
    console.log("El color elegido es verde.");
}

let nombreInferido = "Alice";  // TypeScript infiere que 'nombreInferido' es de tipo string
let edadInferida = 25;        // TypeScript infiere que 'edadInferida' es de tipo number

nombreInferido = 42;  // Error: No se puede asignar un número a una variable de tipo string
