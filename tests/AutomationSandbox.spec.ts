import { test, Browser, Page, expect } from '@playwright/test';
import { log } from 'node:console';

(async () => {
    let browser: Browser;
    let page: Page;

    let textoEscribir = 'Estoy aprendiendo Playwright';


    test.describe('Acciones en el Automation Sandbox', () => {

        //test.skip(browserName === 'chromium', 'No corre en Chromium todavía'); // para saltar este test en un navegador específico en toda la clase

        test('Click en Botón ID Dinámico', async ({ page }) => {

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {

                await page.goto('');

            })

            await test.step('Puedo hacer click en el botón con ID dinámico', async () => {

                //await page.getByRole('button', { name: 'Hacé click para generar un ID' }).click(); // manera sencilla de hacer click

                const botonIdDinamico = page.getByRole('button', { name: 'Hacé click para generar un ID' });
                await botonIdDinamico.click({ force: true }); // forzar un click para que lo haga en ocaciones que no lo permite
                /*await botonIdDinamico.dblclick(); //doble click
                await botonIdDinamico.click({button:'right'}); //click con botón derecho
                await botonIdDinamico.click({modifiers:['Shift']}) // mantener una tecla pulsada y luego hacer click
                await botonIdDinamico.hover(); //hacer hover o tocar el botón pero sin hacer click poonerse en el sin hacer click*/

                await expect(page.getByText('OMG, aparezco después de 3')).toBeVisible();


            })


        })

        test('Dado que lleno un campo de texto en Automation @Sandbox', async ({ page }) => {

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {

                await page.goto('');

            })

            await test.step('Puedo ingresar texto en el campo Un Aburrido Texto', async () => {

                await expect(page.getByRole('textbox', { name: 'Un aburrido texto' }), 'El campo de texto no admite edición').toBeEditable(); // si es editable el campo

                //await page.getByRole('textbox', { name: 'Un aburrido texto' }).fill('Estoy aprendiendo Playwright'); // se pasa el llenado harcodeado  .fill('Estoy aprendiendo Playwright');
                await page.getByRole('textbox', { name: 'Un aburrido texto' }).fill(textoEscribir); // ingresa el texto con una variable declarada al inicio de la clase
                //await page.getByRole('textbox', { name: 'Un aburrido texto' }).type(textoEscribir); // simuila ingresar la información pero escribiendolo
                //await page.getByRole('textbox', { name: 'Un aburrido texto' }).press('Enter'); // hacer como si se oprime un tecla 
                //await page.getByRole('textbox', { name: 'Un aburrido texto' }).press('Sheft+ArrowLeft'); // hacer como si se oprimen varias teclas

                await expect(page.getByRole('textbox', { name: 'Un aburrido texto' }), 'El campo no contiene el texto esperado').toHaveValue(textoEscribir);
                // validarlo como valor ya que se ingresa y no es contenido del DOM
            })


        })

        test('Dado que puedo seleccionar y deseleccionar checkboxes en el @Sandbox', async ({ page, browserName }) => { // para correr solo este test, se le agrega .only luego de test y para correrlo en un navegador específico se le agrega un skip dentro del test con la condición del navegador
            test.skip(browserName === 'chromium', 'No corre en Chromium todavía'); // para saltar este test en un navegador específico

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {

                await page.goto('');

            })

            await test.step('Puedo seleccionar el checkbox para Pasta', async () => {
                await page.getByRole('checkbox', { name: 'Pasta 🍝' }).check(); //valida se haya seleccionado el radiobutton o checkbox y lo deja seleccionado
                await expect(page.getByRole('checkbox', { name: 'Pasta 🍝' }), 'El checkbox no estaba seleccionado').toBeChecked(); // esta checkeado que se seleccionó

            })

            await test.step('Puedo desseleccionar el checkbox para Pasta', async () => {

                await page.getByRole('checkbox', { name: 'Pasta 🍝' }).uncheck(); // para deseleccionar
                await expect(page.getByRole('checkbox', { name: 'Pasta 🍝' })).not.toBeChecked(); // verificar que no esté seleccionado

            })

        })

        test('Dado que puedo seleccionar Radio Buttons', async ({ page }) => {

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {

                await page.goto('');

            })

            await test.step('Puedo seleccionar el Radio Button', async () => {
                await page.getByRole('radio', { name: 'Si' }).check(); // seleccionar un radio button // .uncheck no se permite por que se debe decidir cual
                await expect(page.getByRole('radio', { name: 'Si' }), 'El radio button no se seleccionó').toBeChecked(); // el radio button está seleccionado
            })

        })

        test.only('Dado que puedo seleccionar item del Dropdown', async ({ page }) => {

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {

                await page.goto('');

            })

            await test.step('Puedo seleccionar el deporte del Dropdown', async () => {

                await page.getByLabel('Dropdown').scrollIntoViewIfNeeded(); // para hacer scroll hasta el elemento si es que no se ve y luego hacer la acción
                await page.getByLabel('Dropdown').selectOption('Fútbol'); // seleccionar un elemento del dropdown ya que el elemento del dom lo permite al ser tipo select
                await expect(page.getByLabel('Dropdown')).toHaveValue('Fútbol'); // validar que el dropdown tenga el valor seleccionado
            })

        })

        test('Los items del Dropdown son los esperados', async ({ page }) => {

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {

                await page.goto('');

            })

            await test.step('Valido que la lista del Dropdown contiene los deportes esperados', async () => {

                const deportes = ['Fútbol', 'Tennis', 'Basketball', 'Bochas']; //generamos una lista para ser leida

                for (let opcion of deportes) { // iteramos para cada una de las opciones que tenemos en la lista deportes hacer
                    //pasamos el locator  >cuyo hijo es la opcion el texto de las opciones esperadas     
                    const elemento = await page.$(`select#formBasicSelect > option:is(:text("${opcion}"))`)
                    if (elemento) {
                        console.log(`Opción '${opcion}' presente en la lista`);
                    } else {
                        throw new Error(`Opción '${opcion}' no presente en la lista`);
                    }

                }
            })

        })

        test('Valido la columna Nombres de la tabla estática', async ({ page }) => {

            test.fail(); // para marcar este test como que falla, se le agrega esta línea al inicio del test se espera que falle o aun no está implementado.

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {

                await page.goto('');

            })

            await test.step('Puedo validar los elementos para la columna Nombre de la tabla estática', async () => {

                //pasamos un $$eval para ubicar a los hijos con un css selector (constructor = page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)') para la tabla
                //especifica // se crea luego una función flecha que encuentra todos los elementos creando un arreglo/array map del cual va a tener el contenido del texto
                const valoresColumnaNombres = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));
                const nombresEsperados = ['Messi', 'Ronaldo', 'Mbappe'];

                //los array deben estar en orden

                expect(valoresColumnaNombres).toEqual(nombresEsperados); //validar que el array 1 sea igual al array creado tomando el texto con el array map
            })


        })

        test('Valido todos los valores de la tabla dinamica luego de un reload', async ({ page }) => {

            // donde se coloca toma el screenshot de la página en ese momento y lo adjunta al reporte de la prueba con el nombre "screenshot" 
            // y el tipo de contenido que es una imagen png

            await test.info().attach('screenshot', { 
                                body: await page.screenshot(),
                contentType: 'image/png',
            })

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {

                await page.goto('');

            })

            await test.step('Valido que los valores cambiaron al hacer un reload a la web', async () => {

                // en esta ocación el css selector se le quita el child para tomar todos los valores de la tabla dinamica y crear un arreglo
                const valoresTablaDinamica = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
                console.log(valoresTablaDinamica);

                await test.info().attach('screenshot', { 
                                body: await page.screenshot(),
                contentType: 'image/png',
            })

                await page.reload(); //recarga la pagina

                //Creamos un arreglo con los valores luego de la recarga
                const valoresPostReload = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
                console.log(valoresPostReload);
                //Validar que los valores no sean iguales para cada celda.
                expect(valoresTablaDinamica).not.toEqual(valoresPostReload);// validar valores de ambos array de tabla dinámica

                await test.info().attach('screenshot', { 
                                body: await page.screenshot(),
                contentType: 'image/png',
            })
            })

        })

        test('Valido que los elementos visibles para los chackboxes', async ({ page }) => {

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {

                await page.goto('');

            })

            await test.step('Valido que todos los elementos de los checkboxes son los correctos', async () => {
                await expect.soft(page.getByText('Pizzaa 🍕'), 'No se encontro el elemento Pizza 🍕').toBeVisible();
                await expect.soft(page.getByText('Hamburguesa 🍔')).toBeVisible();
                await expect.soft(page.getByText('Pasta 🍝')).toBeVisible();
                await expect.soft(page.getByText('Heladoa 🍧'), 'No se encontro el elemento Helado 🍧').toBeVisible();
                await expect.soft(page.getByText('Torta 🍰')).toBeVisible();

            })


        })


        test('Dado que puedo seleccionar item del Dropdown Días de la Semana', async ({ page }) => {

            // para agregar una anotación o etiqueta al reporte de la prueba, se le puede agregar un tipo y una descripción
            test.info().annotations.push({type: 'User Story 123', description: 'El usuario puede seleccionar un día de la semana del dropdown'}); 
            

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {

                await page.goto('');

            })

            await test.step('Puedo seleccionar un día del Dropdown', async () => {
                await page.getByRole('button', { name: 'Día de la semana' }).click(); // se da primero un click a este dropdown para luego ver los días
                await page.getByRole('link', { name: 'Martes' }).click(); // luego viendo los días dar click en el elemneto a elegir.
            })


        })


        test.skip('Puedo subir archivos a Automation Sanbox', async ({ page }) => {

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {

                await page.goto('');

            })

            await test.step('Agrego archivos para ser subidos', async () => {
                await page.getByLabel('Upload file').setInputFiles('pathAlArchivo.pdf'); // subir un archivo en especifico
                await page.getByLabel('Upload file').setInputFiles(['pathAlArchivo.pdf', 'myfile.pdf']); // subir varios archivos en especifico
                await page.getByLabel('Upload file').setInputFiles([]); // elimino o desselecciona los archivos
            })


        })

        test.fixme('Puedo hacer un Drag and Drop de los elementos en Automation Sandbox -- NO IMPLEMENTADO EN PROD', async ({ page }) => {

            test.fixme(); // para marcar este test como que está pendiente de implementación, se le agrega esta línea al inicio del test

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {

                await page.goto('');

            })

            await test.step('Hago Drag and Drop del archivo', async () => {

                await page.getByTestId('DragFrom').dragTo(page.getByTestId('DragTo'));

            })


        })

        //popup de manera sencilla el camino feliz que contiene la promesa de popup
        test('Validando dentro de un popup', async ({ page }) => {
            //const popupPromise = page.waitForEvent('popup');

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {

                await page.goto('');

            })

            await test.step('Cuando hago click en el botón popup', async () => {
                await page.getByRole('button', { name: 'Mostrar popup' }).click();
            })

            await test.step('Puedo validar un elemento dentro del popup', async () => {

                //const popup = await popupPromise;
                //await popup.waitForLoadState();
                await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!');
                await page.getByRole('button', { name: 'Cerrar' }).click();

            })

        })



    })


})();