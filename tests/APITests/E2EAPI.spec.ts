import { test, expect } from '@playwright/test';
 
const REPO = 'APITest-PW';
const USER = 'MikeAngelo1991';
 
// El contexto de la solicitud es reutilizado por todas las pruebas en el archivo.
let apiContext: any;
 
test.beforeAll(async ({ playwright }) => { //
    apiContext = await playwright.request.newContext({
        // Todos los requests que enviamos van a este endpoint.
        baseURL: 'https://api.github.com',
        extraHTTPHeaders: {
            // Configuramos este Header como nos dicen en la docu de GitHub.
            'Accept': 'application/vnd.github.v3+json',
            // Agregamos el token de autorización a todos los requests.
            // Acá ponemos el token que generamos en GitHub.
            'Authorization': `token ${process.env.API_TOKEN}`,
        },
    });
});
 
test.afterAll(async ({ }) => {
    // Nos deshacemos de todas las respuestas al final.
    await apiContext.dispose();
});
 
test('El último issue creado es el primero en la lista', async ({ page }) => {
    const newIssue = await apiContext.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Feature] Que el framework me planche la ropa',
        }
    });

    expect(newIssue.status()).toBe(201);

    // Espera para que GitHub procese
   //await new Promise(resolve => setTimeout(resolve, 10000));

    expect(newIssue.ok()).toBeTruthy();
 
    await page.goto(`https://github.com/${USER}/${REPO}/issues`);
    await page.waitForLoadState('networkidle'); // Espera a que la página cargue completamente
    //await page.waitForSelector('[data-hovercard-type="issue"]'); // Espera a que los issues estén visibles en la página
    const firstIssue = page.locator('[id="_R_7da6kpb_-list-view-node-_R_kbvda6kpb_"] [data-testid="issue-pr-title-link"]').first();
    await expect(firstIssue).toHaveText('[Feature] Que el framework me planche la ropa');
});