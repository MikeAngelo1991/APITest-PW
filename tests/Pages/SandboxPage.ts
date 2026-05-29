import {type Locator, type Page} from '@playwright/test';

// La clase SandboxPage representa una página de prueba en la que se pueden realizar acciones relacionadas con la automatización de pruebas, 
// como interactuar con elementos de la página, en este caso, un checkbox para "Pasta"
export class SandboxPage{ // se define la clase SandboxPage que encapsula la lógica relacionada con la página de prueba
    readonly page: Page;  // se declara una propiedad de solo lectura llamada 'page' que es de tipo Page, lo que indica que esta propiedad almacenará una 
                          // instancia de la página de Playwright y no podrá ser modificada después de su asignación
    readonly pastaCheckbox: Locator; // se declara una propiedad de solo lectura llamada 'pastaCheckbox' que es de tipo Locator, lo que indica que esta 
                                     // propiedad almacenará un localizador para el checkbox de "Pasta" en la página y no podrá ser modificada después de su 
                                     // asignación

    
    constructor(page: Page){ // el constructor de la clase recibe un parámetro 'page' de tipo Page, que es la instancia de la página de Playwright que se
                             //  utilizará para interactuar con los elementos de la página
        this.page = page; // se asigna el valor del parámetro 'page' a la propiedad 'page' de la clase, lo que permite que otras partes de la clase puedan 
                          // acceder a esta instancia
        this.pastaCheckbox = page.getByRole('checkbox', { name: 'Pasta' }); // se asigna a la propiedad 'pastaCheckbox' un localizador que busca un elemento de 
                                                                            // tipo checkbox con el nombre "Pasta" en la página, lo que permite
    }

    // async es una palabra clave que se utiliza para definir funciones o métodos asíncronos, lo que significa que pueden contener operaciones que no se 
    // ejecutan de manera secuencial,
    async checkPasta(){// se define un método asincrónico llamado 'checkPasta' que se encargará de interactuar con el checkbox de "Pasta" en la página
        await this.pastaCheckbox.check(); // se utiliza el localizador 'pastaCheckbox' para seleccionar el checkbox de "Pasta" en la página, y se espera a que 
                                          // esta acción se complete antes de continuar con cualquier otra operación que dependa de esta acción, asegurando 
                                          // así que el checkbox esté seleccionado antes de realizar cualquier otra interacción o validación relacionada con él
    }

}

