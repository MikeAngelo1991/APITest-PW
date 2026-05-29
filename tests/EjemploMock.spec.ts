// Mock es una función que simula el comportamiento de una función real, permitiendo controlar su salida y verificar cómo se utiliza en el código que se está probando.

import {test, expect} from '@playwright/test';

test('Haz un mock de una fruta que no viene de la API real', async ({ page }) => {

    //Hacemos un mock de la API antes de navegar // Interceptamos la llamada a la API y devolvemos una respuesta personalizada
    await page.route('*/**/api/v1/fruits', async route => { // se intercepta la llamada a la API que coincide con el patrón de URL especificado, en este caso, cualquier URL que 
                                                            // termine con '/api/v1/fruits', lo que permite simular una respuesta personalizada para esta llamada específica a la
                                                            //  API.
        const json = [{name: 'Strawberry', id:21 }]; // se define un objeto JSON que representa la respuesta simulada de la API, en este caso, una lista de frutas que contiene un 
                                                     // solo objeto con el nombre "Strawberry" y un ID de 21, lo que permite controlar los datos que se devolverán cuando se realice 
                                                     // la llamada a la API interceptada.
        await route.fulfill({json}); // se utiliza el método 'fulfill' del objeto 'route' para enviar la respuesta simulada de la API, pasando el objeto JSON definido anteriormente 
                                     // como el cuerpo de la respuesta, lo que permite que el código que realiza la llamada a la API reciba esta respuesta personalizada en lugar 
                                     // de la respuesta real de la API.

});

    //Vamos a la página
    await page.goto('https://demo.playwright.dev/api-mocking'); // navega a la URL especificada, que es una página de demostración para pruebas de automatización con Playwright, 
                                                                // donde se pueden realizar acciones relacionadas con la simulación de respuestas de API.


    // Validamos que Melocotón está disponible
    await expect(page.getByText('Melocotón')).toBeVisible();
    
});
