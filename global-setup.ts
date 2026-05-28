
import { chromium } from '@playwright/test';

// La función globalSetup se ejecuta antes de que se ejecuten las pruebas y se utiliza para configurar el entorno de prueba, en este caso, 
// para iniciar sesión en GitHub y guardar el estado de autenticación en un archivo llamado auth.json, lo que permite que las pruebas posteriores puedan 
// reutilizar este estado de autenticación sin tener que iniciar sesión nuevamente
export default async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://github.com/login');

  await page.fill('#login_field', process.env.GH_USER!);
  await page.fill('#password', process.env.GH_PASSWORD!);
  await page.click('input[type="submit"]');

  await page.waitForURL('https://github.com/**');

  await page.context().storageState({ path: 'auth.json' });

  await browser.close();
};
