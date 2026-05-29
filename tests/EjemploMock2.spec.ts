import { test, expect } from '@playwright/test';

// Api no existe se hace un Mock para simular la respuesta de la API y validar que la UI se comporta como esperamos con esa respuesta mockeada
test('Haz un mock de una fruta que no viene de la API real', async ({ page }) => {

    //Hacemos un mock de la API antes de navegar // Interceptamos la llamada a la API y devolvemos una respuesta personalizada
    await page.route('*/**/api/v1/fruits', async route => { 
        const json = [{name: 'Melocotón', id:21 }]; 
        await route.fulfill({json});

});

    //Vamos a la página
    await page.goto('https://demo.playwright.dev/api-mocking'); 

    // Validamos que Melocotón está disponible
    await expect(page.getByText('Melocotón')).toBeVisible();
    
});



 // Obtenemos la respuesta real y le agregamos un extra a la respuesta real de la API utilizando el método 'fetch' del objeto 'route', lo que permite acceder a los datos reales
test('Obtengo la respuesta real y le agrego algo no tan real', async ({ page }) => {
    // Obtenemos la respuesta y le agregamos un extra
    await page.route('*/**/api/v1/fruits', async route => {
        const response = await route.fetch(); // se obtiene la respuesta real de la API utilizando el método 'fetch' del objeto 'route', lo que permite acceder a los datos reales 
                                              // que se devolverían en una llamada normal a la API.
        const json = await response.json();
        json.push({ name: 'Lionel Messi', id: 200 }); // se agrega un nuevo objeto al array JSON obtenido de la respuesta real, lo que permite simular una respuesta de la API 
                                                      // que incluye datos adicionales, en este caso, un objeto con el nombre "Lionel Messi" y un ID de 200.
        // Obtenemos la respuesta real mientras que le agregamos un extra
        
        // al objeto JSON que va a estar siendo representado.
        await route.fulfill({ response, json });
    });
 
    // Vamos a la página
    await page.goto('https://demo.playwright.dev/api-mocking');
 
    // Validamos que vino la respuesta real con el extra que le sumamos antes
    await expect(page.getByText('Lionel Messi', { exact: true })).toBeVisible();
});