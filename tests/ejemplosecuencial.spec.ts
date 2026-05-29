
// Importa las funciones necesarias de Playwright
import { test, type Page } from '@playwright/test';

// Configura que todos los tests se ejecuten en modo serial (uno tras otro)
// Esto es útil cuando los tests dependen del mismo estado
test.describe.configure({ mode: 'serial' }); // Configura que los tests dentro de esta suite se ejecuten de forma secuencial, lo que significa que cada test se ejecutará
                                             // uno después del otro, en lugar de ejecutarse en paralelo. Esto es especialmente útil cuando los tests dependen del mismo estado 
                                             // o recurso compartido, como una página del navegador, para evitar conflictos y asegurar que cada test tenga un entorno limpio y 
                                             // controlado, pero causa que los tests tarden más en ejecutarse, ya que no se aprovecha la capacidad de ejecución paralela de Playwright
                                             //y si ejecuta los test por separarado no tendra todo seteado para evitar errores de ejecución.

let page: Page; // Se declara la variable "page" que representa la página del navegador

// Se ejecuta UNA vez antes de todos los tests
test.beforeAll(async ({ browser }) => { // Se abre una nueva página en el navegador
  // Se abre una nueva página en el navegador
  page = await browser.newPage();
});

// Se ejecuta UNA vez después de todos los tests
test.afterAll(async () => { // Se cierra la página abierta
  // Se cierra la página abierta
  await page.close();
});

// Primer test
test('Si no corro primero exploto', async () => { // Este test depende de que la página esté abierta, por lo que debe ejecutarse después del test anterior
  // Navega a la página oficial de Playwright
  await page.goto('https://playwright.dev/');
});

// Segundo test
test('Si no corro segundo exploto', async () => { // Este test también depende de que la página esté abierta, por lo que debe ejecutarse después del primer test
  // Busca el texto "Get Started" y hace clic sobre él
  await page.getByText('Get Started').click();
});
