
// Importamos las herramientas principales de Playwright:
// - test: para definir pruebas automáticas
// - Browser y Page: tipos para tipado del navegador y la página
import { test, Browser, Page, expect } from '@playwright/test';

// Función async autoejecutable para encapsular la ejecución del test
(async () => {

  // Declaramos variables para el navegador y la página
  // (aunque page se recibe por parámetro, esto mantiene consistencia)
  let browser: Browser;
  let page: Page;


  // Agrupamos todas las pruebas relacionadas con la navegación del sitio
  test.describe('Navegación en www.freerangetesters.com', () => {

    // Definimos las secciones que se quieren validar
    // Cada objeto representa un link del menú
    // - nombre: texto visible del link
    // - url: fragmento esperado en la URL
    // - tituloEsperado: título que debe tener la página destino
    const secciones = [
      { nombre: 'Cursos', url: '/cursos', tituloEsperado: 'Cursos' },
      { nombre: 'Mentorías', url: '/mentoria-1-1-con-pato', tituloEsperado: 'Mentoría personalizada de avance de carrera para testers de software' },
      { nombre: 'Recursos', url: '/recursos', tituloEsperado: 'Recursos' },
      { nombre: 'Blog', url: '/blog', tituloEsperado: 'Free Range Testers' }
      // Se pueden agregar más secciones si es necesario
    ];

    // Recorremos cada sección para generar un test dinámico por cada una
    for (const seccion of secciones) {

      // Creamos un test por cada sección del menú
      test(`Validar redirección a la sección "${seccion.nombre}"`, async ({ page }) => {

        // PASO 1 — Given:
        // Estado inicial del escenario:
        // El usuario se encuentra en la página principal
        await test.step(
          'Estando yo en la web principal www.freerangetesters.com',
          async () => {
            await page.goto('https://www.freerangetesters.com');
            // Validamos que el título principal cargó correctamente
            await expect(page).toHaveTitle('Free Range Testers');
          }
        );

        // PASO 2 — When:
        // Acción del usuario:
        // Hace clic en el link correspondiente a la sección actual
        await test.step(
          `Cuando hago click en "${seccion.nombre}"`,
          async () => {

            // Buscamos el link por su rol accesible dentro del header
            // Usamos exact: true para evitar coincidencias parciales
            await page
              .locator('#page_header')
              .getByRole('link', { name: seccion.nombre, exact: true })
              .click();

            // Esperamos a que la URL cambie y contenga el path esperado
            await page.waitForURL(`**${seccion.url}`);
          }
        );

        // PASO 3 — Then:
        // Resultado esperado:
        // El usuario es redirigido a la página correcta
        // y el título coincide con el esperado
        await test.step(
          `Soy redirigido a la sección con título "${seccion.tituloEsperado}"`,
          async () => {
            await expect(page).toHaveTitle(seccion.tituloEsperado);
            //await page.locator('xpath=botonLoco').click(); // busca un xpath y luego hace click
            //page.getByText('Este es otro párrafo de ejemplo', { exact: true }); // busca un texto y verifica que exista
           
            /*await page.getByRole('listitem') // busca todos los elementos con rol listitem 
              .filter({ hasText: 'Playstation 5' }) // recomendado para casos complejos, busca un listitem que tenga el texto "Playstation 5"
              .getByRole('button', { name: 'Add to cart' })
              .click(); // busca el producto "Playstation 5" y hace click en su botón "Add to cart"

            await page.getByRole('listitem')
              .filter({ has: page.getByRole('heading', { name: 'Xbox Series X' }) }) // recomendado para casos complejos, busca un listitem que tenga un heading con el texto "Xbox Series X"
              .getByRole('button', { name: 'Add to cart' }).click(); // busca el producto "Xbox Series X" y hace click en su botón "Add to cart"*/

            //await page.locator('button').locator('visible=true').click(); // busca un botón que sea visible y hace click

            //page.getByText('banana').click(); // busca un texto "banana" y hace click (si el texto es clickeable)

            /*page
              .getByRole('listitem')
              .filter({ hasText: 'banana' }).click();// busca un listitem que tenga el texto "banana" y hace click (si el listitem es clickeable) */

          /*  page.getByRole('listitem').nth(0).click(); // busca el primer listitem y hace click (indexado desde 0)
            page.getByRole('listitem').first().click(); // busca el primer listitem y hace click
            page.getByRole('listitem').last().click(); // busca el último listitem y hace click */
          }
        );

      });
    }
  })
})();
