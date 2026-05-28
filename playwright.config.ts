import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv'; // Importa la biblioteca dotenv para cargar variables de entorno desde un archivo .env
import path from 'path'; // Importa el módulo path para resolver rutas de archivos de manera segura y compatible con diferentes sistemas operativos
dotenv.config({ path: path.resolve(__dirname, '.env') }); // Carga las variables de entorno desde el archivo .env ubicado en la raíz 
                                                         // del proyecto, utilizando __dirname para asegurar que la ruta sea correcta 
                                                         // independientemente de dónde se ejecute el script

console.log("Verificación de TOKEN:", process.env.API_TOKEN); // Imprime el valor de la variable de entorno API_TOKEN en la consola para verificar que se ha cargado correctamente

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  globalSetup: './global-setup.ts',
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'https://thefreerangetester.github.io/sandbox-automation-testing/',
    testIdAttribute: 'data-test-id', // Personalización del atributo para selección de elementos en tests
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace:  'on',  //'on-first-retry',
    storageState: 'auth.json', // Configuración para mantener el estado de autenticación entre pruebas, utilizando un archivo llamado auth.json
  }, 

  /* Configure projects for major browsers */
  projects: [

    {
      name: 'Computadora 1', 
      //testIgnore: 'FreeRangeTesters.spec.ts', // Ignora este test específico para este proyecto
      testMatch: 'AutomationSandbox.spec.ts',
      retries: 1,
      use: {
        
        ...devices['Desktop Chrome'], // Personaliza el navegador para este proyecto
        viewport: { width: 1280, height: 720 }, // Personaliza el tamaño de la ventana para este proyecto
        video: 'on', // Personaliza el navegador y habilita video para este proyecto
        screenshot: 'only-on-failure', // Personaliza el navegador y habilita video y screenshots solo en caso de falla
        
      },
    },
    {
      name: 'Computadora 2',
      //testIgnore: 'FreeRangeTesters.spec.ts', // Ignora este test específico para este proyecto
      testMatch: 'AutomationSandbox.spec.ts',
      retries: 1, 
      use: {...devices['Desktop Chrome']},
    },
    {
      name: 'Iphone',
      testMatch: 'AutomationSandbox.spec.ts',
      retries: 1, 
      use: {...devices['iPhone 12']},
    },
    {
      name: 'Tablet',
      testMatch: 'AutomationSandbox.spec.ts',
      retries: 1, 
      use: {...devices['iPad (gen 7)']},
    },
    {
      name: 'Api Tests', // Personaliza el nombre del proyecto para pruebas de API
      testMatch: 'APITests/**/*', // Solo ejecuta los tests que estén dentro de la carpeta APITests
      use: {
        baseURL: 'https://api.github.com', // Personaliza la base URL para las pruebas de API endpoint
        extraHTTPHeaders: {
          'Accept': 'application/vnd.github.v3+json', // Personaliza el header de aceptación para las pruebas de API
          'Authorization': `token ${process.env.API_TOKEN}`, // Personaliza el token de autenticación para las pruebas de API de manera segura
        }
      },
    },

    /*
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },*/

    /* Test against mobile viewports. */
   /* {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  {
       name: 'Mobile Safari',
       use: { ...devices['iPhone 12'] },
    },

    /* Test against branded browsers. */
   /* {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },*/
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
