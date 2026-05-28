import {test, expect} from '@playwright/test';
import { title } from 'node:process';

const REPO = "APITest-PW"; // Asegúrate de que este repositorio exista en tu cuenta de GitHub y que el token tenga permisos para acceder a él
const USER = "MikeAngelo1991"; // Asegúrate de que el token de autenticación tenga permisos para acceder a este repositorio y realizar acciones como crear issues

// Prueba para verificar que se pueden crear issues en el repositorio de GitHub utilizando la API de GitHub a través de Playwright
test('Se puede crear un Issue en el repositorio de Github', async ({ request }) => { // El test recibe un objeto 'request' que permite realizar solicitudes HTTP a la API de GitHub
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, { // Se realiza una solicitud POST a la ruta de la API de GitHub para crear un nuevo issue en el repositorio especificado por USER y REPO
        data: {
            title: '[Bug] reporte 1', // El título del issue que se va a crear, en este caso se indica que es un reporte de bug
            body: 'Descripción del bug', // El cuerpo del issue que se va a crear, proporcionando una descripción del bug reportado
        }
    });

    //debugging
    console.log("STATUS:", newIssue.status());
    console.log("BODY:", await newIssue.text());

   // expect(newIssue.ok()).toBeTruthy(); // Se espera que la respuesta de la solicitud sea exitosa (código de estado HTTP 200-299) y se verifica que el issue se haya creado correctamente
    expect(newIssue.status()).toBe(201); // Se espera que el código de estado de la respuesta sea 201, lo que indica que el issue se ha creado exitosamente

    // Después de crear el issue, se realiza una solicitud GET a la misma ruta para obtener la lista de issues del repositorio y verificar que el nuevo issue se haya agregado correctamente
    const issues = await request.get(`/repos/${USER}/${REPO}/issues`); 
    expect(issues.ok()).toBeTruthy(); // Se espera que la respuesta de la solicitud GET sea exitosa, lo que indica que se pudo obtener la lista de issues del repositorio
    expect(await issues.json()).toContainEqual(expect.objectContaining({ // Se espera que la lista de issues obtenida contenga un objeto que tenga al menos las propiedades 'title' y 'body' con los valores especificados para el issue creado
        title: '[Bug] reporte 1',
        body: 'Descripción del bug',
    }));
});

// Prueba para verificar que se pueden crear requests de tipo feature en el repositorio de GitHub utilizando la API de GitHub a través de Playwright
test('Se puede crear un request de feature', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Feature] request 1',
            body: 'Descripción del feature',
        }
    });

    //debugging
    console.log("STATUS:", newIssue.status());
    console.log("BODY:", await newIssue.text());

    expect(newIssue.status()).toBe(201); // Se espera que el código de estado de la respuesta sea 201, lo que indica que el issue se ha creado exitosamente

    const issues = await request.get(`/repos/${USER}/${REPO}/issues`); 
    expect(issues.ok()).toBeTruthy(); // Se espera que la respuesta de la solicitud GET sea exitosa, lo que indica que se pudo obtener la lista de issues del repositorio
    expect(await issues.json()).toContainEqual(expect.objectContaining({ // Se espera que la lista de issues obtenida contenga un objeto que tenga al menos las propiedades 'title' y 'body' con los valores especificados para el issue creado
        title: '[Feature] request 1',
        body: 'Descripción del feature',
    }));
});
