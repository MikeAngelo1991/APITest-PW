
// Importamos las utilidades principales de Playwright:
// - test: para definir pruebas
// - Browser y Page: tipos para tipado del navegador y la página
import { test, Browser, Page } from '@playwright/test';

// Función async autoejecutable para encapsular la lógica del test
(async () => {

  // Declaramos las variables que almacenarán el navegador y la página
  let browser: Browser;
  let page: Page;

  // Agrupamos un conjunto de pruebas bajo una misma característica (Feature)
  test.describe('Feature', () => {

    // Definimos un escenario individual de prueba
    test('Scenario 1', async ({ page }) => {

      // PASO 1 (Given):
      // Este step representa una condición inicial del escenario
      // En este caso: el usuario navega a la página principal
      await test.step('Given I go to the home page', async () => {
        // Navega a la URL indicada
        await page.goto('https://www.freerangetesters.com');
      });

      // PASO 2 (When):
      // Este step representa una acción que realiza el usuario
      // Aquí se asume que se verifica o navega a la sección "About"
      await test.step('When I check the about page of the website', async () => {
        // Aquí normalmente iría una acción como:
        // click en un enlace, validación de URL, etc.
      });

      // PASO 3 (Then):
      // Este step representa el resultado esperado
      // Se validaría que los datos de contacto estén visibles o disponibles
      await test.step('Then I get the contact details', async () => {
        // Aquí normalmente iría una validación como:
        // expect(locator).toBeVisible();
      });

    });
  });

})();
