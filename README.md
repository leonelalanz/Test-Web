### Contenido

Se realiza consulta a la URL https://prueba-admision-web.herokuapp.com/session para determinar si los datos introducidos en el formulario son correctos o incorrectos, teniendo en cuenta que las credenciales especificadas son las siguientes: 
    "username": "synergy",
    "password": "synergy123",
    "type": "V"
En caso de ser correctos los datos, el sistema realiza una peticion a la URL https://prueba-admision-web.herokuapp.com/data para obtener los datos del servidor con una estructura similar a lo siguiente 
{
    "id": 1,
    "title": "accusamus beatae ad facilis cum similique qui sunt",
    "url": "http://placehold.it/600/92c952",
    "thumbnailUrl": "http://placehold.it/150/30ac17"
}
En caso de ser incorrectos los datos suministrados, el sistema retorna un error 400 y un status fallido, devolviendo en la respuesta la siguiente estructura: 
    {status: "failed", cid: null}
Verificar peticiones para validar.

El sistema es desplegado al visitar la direccion ruta-local/Test-Web/src/