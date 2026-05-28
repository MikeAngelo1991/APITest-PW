
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

  // Agrupamos las pruebas relacionadas con la navegación del sitio
  test.describe('Navegación en www.freerangetesters.com', () => {

    // Definimos un test que valida que los links principales redirigen correctamente
    test('Los links principales redirigen correctamente', async ({ page }) => {

      // PASO 1 — Given:
      // Contexto inicial del escenario:
      // El usuario se encuentra en la página principal del sitio
      await test.step('Estando yo en la web principal www.freerangetesters.com', async () => {
          await page.goto('https://www.freerangetesters.com');
          await expect(page).toHaveTitle('Free Range Testers');
        }
      );

      // PASO 2 — When:
      // Acción del usuario:
      // El usuario hace clic en el enlace "Cursos" desde el header
      await test.step('Cuando hago click en "Cursos"', async () => {
          // Seleccionamos el enlace "Cursos" dentro del header
          // Usamos name exacto para evitar coincidencias incorrectas
          await page.locator('header').getByRole('link', { name: 'Cursos', exact: true }).click();
          // Esperamos a que la URL cambie y contenga "/cursos"
          // Esto asegura que la redirección se haya completado
          await page.waitForURL('**/cursos'); // **// significa cualquier dominio, seguido de /cursos en la ruta
        }
      );

      // PASO 3 — Then:
      // Resultado esperado:
      // El usuario es redirigido correctamente a la subpágina de cursos
      await test.step('Soy redirigido a la sección "Cursos"', async () => {
        await expect(page).toHaveTitle('Cursos')
          // Aquí normalmente se agregarían validaciones como:
          // expect(page.url()).toContain('/cursos');
          // expect(page.locator('h1')).toHaveText('Cursos');
        }
      );

    });
  });

// Ejecutamos la función async
})();
