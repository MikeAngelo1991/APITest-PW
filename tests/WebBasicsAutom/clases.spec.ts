class Persona{
    nombre: string;
    edad: number;


    constructor(nombre: string, edad: number){ 
        // el constructor es un método especial que se ejecuta al crear una instancia de la clase, recibe dos parámetros: nombre y edad, 
        // ambos de tipo string y number respectivamente, y asigna estos valores a las propiedades de la clase utilizando this.nombre y this.edad
        this.nombre = nombre;
        this.edad = edad;
    }

    mostrarDetalles(){ // método para mostrar los detalles de la persona en la consola
        console.log(`Nombre: ${this.nombre}, Edad: ${this.edad}`);
    }

}

//una función o metodo simple que recibe dos números y devuelve su resta
function restar(a:number, b:number): number{
    return a - b;
}