
Claro, aquí tienes el instructivo utilizando Markdown:

Desarrollar una aplicación Front End con Angular o React
El objetivo es crear una aplicación que se conecte a la API de saldo.com.ar y cumpla con las siguientes historias de usuario:

Historias de usuario:
Iniciar sesión:

Al ingresar a la ruta /login, el usuario debe poder ingresar sus datos en un formulario: email y contraseña.
Los datos ingresados deben ser verificados haciendo una solicitud POST a https://api.saldo.com.ar/bridge/login.
Se deben enviar los siguientes valores: email=admin@saldo.com.ar y password=CoolSite.
El usuario será redirigido a /systems si los datos son correctos, de lo contrario, se mostrará un mensaje de error.
Redirección si ya está logueado:

Si el usuario accede a la ruta /login y ya está logueado, debe ser redirigido a /systems.
Ver activos disponibles:

Al acceder a la ruta /systems, el usuario debe poder ver todos los activos disponibles para intercambiar en la plataforma saldo.com.ar.
Redirección si no está logueado:

Si el usuario intenta acceder a cualquier ruta que no sea /login y no está logueado, será redirigido a la página /login.
Mostrar nombre de usuario y opción para cerrar sesión:

En cualquier ruta que no sea /login, se mostrará el nombre del usuario en la parte superior, junto con un enlace para cerrar sesión.
Ver precios de activos seleccionados:

Al hacer clic en un activo en la página /systems, el usuario podrá ver sus precios en relación con otros pares.
Esto puede ser en la misma página /systems o en una nueva ruta como /systems/:system_id, donde system_id es el identificador del activo seleccionado.
Colapsar vista de activos:

El usuario debe poder colapsar la vista de precios de un activo específico y volver a la lista de activos.
Cerrar sesión:

El usuario podrá cerrar sesión en cualquier momento, siendo redirigido a la página de /login.
Manejo de rutas no definidas:

Si el usuario intenta acceder a una ruta no definida, será redirigido a /systems o /login, dependiendo de su estado de autenticación.
