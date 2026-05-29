interface EnvConfig { // Interfaz que define la estructura de la configuración para cada entorno, incluyendo las URLs base, URLs de API, URLs específicas para Free Range Testers y headers adicionales opcionales
    baseURL: string;
    apiURL: string;
    frtBaseURL: string; // Nueva propiedad para la URL de Free Range Testers
    /*extraHTTPHeaders?: { // Propiedad opcional para headers adicionales específicos de cada entorno
        [key: string]: string; // Permite definir cualquier cantidad de headers personalizados para cada entorno, con clave y valor de tipo string
    };*/
}
 
export class Environment { // Clase que maneja la configuración de diferentes entornos (desarrollo, pruebas, producción) y proporciona un método para obtener la configuración actual basada en una variable de entorno
    private static configs: Record<string, EnvConfig> = { // Objeto que almacena la configuración para cada entorno, utilizando un Record para mapear el nombre del entorno a su configuración correspondiente
        DEV: {
            baseURL: "https://dev.example.com",
            apiURL: "https://api.dev.example.com",
            /*extraHTTPHeaders: {
                Authorization: `Bearer dev_token`, // Ejemplo de cómo agregar un header específico para el entorno de desarrollo
            },*/
            frtBaseURL: "https://www.freerangetesters.dev.com"
 
        },
        TEST: {
            baseURL: "https://test.example.com",
            apiURL: "https://api.test.example.com",
            /*extraHTTPHeaders: {
                Authorization: `Bearer test_token`, // Ejemplo de cómo agregar un header específico para el entorno de desarrollo
            },*/
            frtBaseURL: "https://www.freerangetesters.test.com"
 
        },
        PROD: {
            baseURL: "https://prod.example.com",
            apiURL: "https://api.prod.example.com",
            /*extraHTTPHeaders: {
                Authorization: `Bearer prod_token`, // Ejemplo de cómo agregar un header específico para el entorno de desarrollo
            },*/
            frtBaseURL: "https://www.freerangetesters.com"
        },
        DEFAULT: {
            baseURL: "https://thefreerangetester.github.io/sandbox-automation-testing/",
            apiURL: "https://api.github.com",
            /*extraHTTPHeaders: {
                Authorization: `Bearer default_token`, // Ejemplo de cómo agregar un header específico para el entorno de desarrollo
            },*/
            frtBaseURL: "https://www.freerangetesters.com", // URL para Free Range Testers
        },
    };
 
    static getConfig(): EnvConfig { // Método para obtener la configuración del entorno actual, leyendo la variable de entorno ENVIRONMENT y 
                                    // devolviendo la configuración correspondiente, o la configuración por defecto si no se encuentra una 
                                    // coincidencia
        const env = process.env.ENVIRONMENT || "DEFAULT";
        return Environment.configs[env] || Environment.configs.DEFAULT;
    }
}

/*Luego en la terminal (o en los pasos definidos para un pipeline), usamos:
Bash
export ENVIRONMENT=development
Shell
$env:ENVIRONMENT = "development"*/