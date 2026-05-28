
// Importamos las utilidades principales de Playwright:
// - test: para definir pruebas
// - Browser y Page: tipos para tipado del navegador y la página
import { test, Browser, Page } from '@playwright/test';

// Función async autoejecutable para encapsular la lógica del test
(async () => {

  // Declaramos las variables que almacenarán el navegador y la página
  let browser: Browser;
  let page: Page;

  
    test.describe('Navegación en www.freerangetesters.com', () => {

        test('Los links principales redirigen correctamente', async ({ page }) => {

            await test.step('Estando yo en la web principal www.freerangetesters.com', async () => {
                page.goto('https://www.freerangetesters.com');
            })

            await test.step('Cuando hago click en "Cursos"', async () => {
                page.locator('#page_header').getByRole('link', { name: 'Cursos', exact: true }).click();
                await page.waitForURL('**/cursos');
            })

            await test.step('Soy redirigido a la subpágina "cursos"', async () => {

            })

        })

    })


})();