import { test, Browser, Page, expect } from '@playwright/test';
import { Environment } from './Utils/environment'; // ajusta la ruta si es necesario
 
(async () => {
  let browser: Browser;
  let page: Page;
  const config = Environment.getConfig();

  test.describe('Navegación en www.freerangetesters.com', () => {
  // Se define un array de objetos que representan las secciones principales del sitio, cada objeto contiene el nombre del enlace, la URL 
  // esperada después de hacer clic y el título esperado de la página resultante. Esto permite iterar sobre las secciones y realizar 
  // pruebas de redirección de manera más eficiente y mantenible.
    const secciones = [
      { nombre: 'Cursos', url: '/cursos', tituloEsperado: 'Cursos' },
      { nombre: 'Udemy', url: '/udemy', tituloEsperado: 'Udemy' },
      { nombre: 'Recursos', url: '/recursos', tituloEsperado: 'Recursos' },
      { nombre: 'Blog', url: '/login', tituloEsperado: 'Acceder a Free Range Testers' }
      // Agrega más secciones si es necesario
    ];
    for (const seccion of secciones) {
      test(`Validar redirección a la sección "${seccion.nombre}"`, async ({ page }) => {
        await test.step(`Estando yo en la web principal www.freerangetesters.com`, async () => {
          //page.goto('https://www.freerangetesters.com');
          await page.goto(config.frtBaseURL); // Usamos la URL base de Free Range Testers desde la configuración del entorno
          await expect(page).toHaveTitle('Free Range Testers');
        });
 
        await test.step(`Cuando hago click en "${seccion.nombre}"`, async () => {
          page.locator('#page_header').getByRole('link', { name: seccion.nombre, exact: true }).click();
          await page.waitForURL(`**${seccion.url}`);
        });
 
        await test.step(`Soy redirigido a la sección de título "${seccion.tituloEsperado}"`, async () => {
          await expect(page).toHaveTitle(seccion.tituloEsperado);
        /*
          page.getByText('banana').click();
 
          page
            .getByRole('listitem')
            .filter({ hasText: 'banana' }).click();
 
          page.getByRole('listitem').last();*/
 
        });
      });
    }
 
  })
 
 
})(); 