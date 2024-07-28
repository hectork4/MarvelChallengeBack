## Consideraciones

Este proyecto es parte del servicio ofrecido por el backend al proyecto en el repositorio [MarvelChallangeFront](https://github.com/hectork4/MarvelChallangeFront).

Este proyecto incluye un sistema de autenticación opcional. Al iniciar la aplicación, los usuarios verán las opciones de Login (Iniciar sesión) y Register (Registrarse) si no están autenticados. Por el contrario, si el usuario ya está autenticado, se mostrará la opción de Logout (Cerrar sesión) en lugar de las opciones de inicio de sesión y registro.

Para evaluar el sistema de autenticación, es necesario que el back-end esté en funcionamiento. Debe ejecutar el servidor del back-end, que se ejecutará en el puerto 3001. Asegúrese de que el back-end esté correctamente configurado y en ejecución para permitir que el sistema de autenticación funcione adecuadamente.

Si decide probar el sistema de autenticación, siga estos pasos:

Inicie el servidor del back-end: Asegúrese de que el back-end esté corriendo en el puerto 3001. Esto permitirá que la aplicación front-end se comunique correctamente con el servidor para manejar el inicio de sesión, el registro y la sesión del usuario.

## Ejecutar

### `npm run dev`

En el back-end, los datos de usuario (como el nombre de usuario, la contraseña y los favoritos) se almacenan localmente en un archivo JSON. Esta implementación permite que la selección de favoritos hecha en el front-end se persista de manera efectiva. El back-end está desarrollado en Node.js utilizando un modelo MVC simplificado.
