# 3ra entrega de proyecto final | Curso de Backend | Coderhouse 2022

## Aclaraciones:
1) Para realizar la prueba de funcionalidad se incluyó el parte del frontend en la carpeta "public" y se generaron vistas con EJS a modo de practica de esta herramienta.
Se incorporo la ruta /tienda y su Controller para renderizar y aplicar la lógica de las vistas a mostrar.

2) En CartController: Se agrego el campo quantity a los productos del array "productos" del carrito al agregar uno (ya que ningún desafío lo pedía pero me pareció super necesario).

3) Para cargar productos en el carrito y finalizar alguna orden en el checkout, se debe estar logueado (se uso middleware de autenticación para bloquear el acceso a las rutas de /api/carrito).

4)Rutas de ADMIN: Para los métodos POST, PUT y DELETE de la ruta /api/productos, se incorporo un middleware de autenticación y autorización según el rol del usuario. Por lo que es necesario hacer login con un user que tenga en el atributo "role" el valor "admin". Para esto cambiar dicho valor directamente desde mongo atlas. En caso de estar haciendo pruebas desde el deploy en heroku (que usa mi base de datos) probar con el siguiente user:
    - email: rami@mail.com
    - password: rami123
Para usuarios con "role" distinto de ADMIN, se puede crear uno para probar desde la ruta /register.

5) Dejo ejemplos de productos para testear cargando desde POSTMAN:

```json
{
    "nombre": "Remera",
    "descripcion": "La mejor remera del condado",
    "codigo": "xxx001",
    "foto": "https://cdn1.iconfinder.com/data/icons/clothes-outfit-line-shop-aholic/512/T-Shirt-512.png",
    "precio": 4900,
    "stock": 23
}
{
    "nombre": "Pantalón",
    "descripcion": "Un excelente jean",
    "codigo": "xxx002",
    "foto": "https://cdn1.iconfinder.com/data/icons/clothes-outfit-line-shop-aholic/512/Jeans-256.png",
    "precio": 7900,
    "stock": 7
}
{
    "nombre": "Chaqueta",
    "descripcion": "Chaqueta pesada para los días muy fríos",
    "codigo": "xxx003",
    "foto": "https://cdn1.iconfinder.com/data/icons/clothes-outfit-line-shop-aholic/512/Jacket-256.png",
    "precio": 8500,
    "stock": 14
}
{
    "nombre": "Zapatillas",
    "descripcion": "Las zapatillas para toda ocasión",
    "codigo": "xxx004",
    "foto": "https://cdn3.iconfinder.com/data/icons/streamline-icon-set-free-pack/48/Streamline-11-256.png",
    "precio": 19750,
    "stock": 9
}

```
6) Se opto por el uso de "Winston" como logger para los logs.

7) Si bien se dejó el contenedor de Firebase, se optó por solo usar Mongo Atlas (por eso el DAO de userModel solo existe para MONGO).

8) Ejemplo de archivo .env a incorporar para probar en local:

```
    MODO= 'FORK o CLUSTER' //Optar por uno de los 2.
    URLMONGO= 'mongodb+srv://usuario:contraseña@coderhouse.ymdhmxh.mongodb.net/ecommerce?retryWrites=true&w=majority'
    TEST_MAIL= miMail@gmail.com //Para el uso de nodemailer
    PASS_MAIL= passwordDeMiMail //Para el uso de nodemailer
    twilioAccountSid= sidBrindadoPorTwilio.
    twilioAuthToken= tokenBrindadoPorTwilio.
    twilioWhatsappFrom= 'numeroBrindadoPorTwilio'
    twilioWhatsappTo= 'miNumeroVerificadoEnTwilio'
    twilioSMSFrom= 'numeroBrindadoPorTwilio'
    twilioSMSTo= 'miNumeroVerificadoEnTwilio'
```

9) El schema de users incorpora un atributo "currentCart" para mantener registro de cual es el carrito actual correspondiente a cada usuario. Asi, cuando vuelve a iniciar sesión se carga el mismo carrito con los productos que ya tenia. Esto también permite que, en un mismo navegador, al cerrar sesión con un usuario y luego iniciar sesión con otro usuario, cada uno mantenga su propio carrito de productos en el estado que lo dejó.

10) link a deploy en HEROKU: ??

------------------------------

### Consigna de la 1ra pre-entrega:
Deberás entregar el estado de avance de tu aplicación eCommerce Backend, que implemente un servidor de aplicación basado en la plataforma Node.js y el módulo express. El servidor implementará dos conjuntos de rutas agrupadas en routers, uno con la url base '/productos' y el otro con '/carrito'. El puerto de escucha será el 8080 para desarrollo y process.env.PORT para producción en glitch.com

## Aspectos a incluir en el entregable: 
1) El router base '/api/productos' implementará cuatro funcionalidades:
    a. GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
    b. POST: '/' - Para incorporar productos al listado (disponible para administradores)
    c. PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
    d. DELETE: '/:id' - Borra un producto por su id (disponible para administradores)

2) El router base '/api/carrito' implementará tres rutas disponibles para usuarios y administradores:
    a. POST: '/' - Crea un carrito y devuelve su id.
    b. DELETE: '/:id' - Vacía un carrito y lo elimina.
    c. GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
    d. POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
    e. DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto

3) Crear una variable booleana administrador, cuyo valor configuraremos más adelante con el sistema de login. Según su valor (true ó false) me permitirá alcanzar o no las rutas indicadas. En el caso de recibir un request a una ruta no permitida por el perfil, devolver un objeto de error. Ejemplo: { error : -1, descripcion: ruta 'x' método 'y' no autorizada }

5) Un producto dispondrá de los siguientes campos:  id, timestamp, nombre, descripcion, código, foto (url), precio, stock.

6) El carrito de compras tendrá la siguiente estructura: { id, timestamp(carrito), productos: [{ id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock }]}

7) El timestamp puede implementarse con Date.now()

8) Realizar la persistencia de productos y del carrito de compras en el filesystem.

------------------------------

### Consigna de la 2da pre-entrega:
Basándose en los contenedores ya desarrollados (memoria, archivos) desarrollar dos contenedores más (que cumplan con la misma interfaz) que permitan realizar las operaciones básicas de CRUD en MongoDb (ya sea local o remoto) y en Firebase. Luego, para cada contenedor, crear dos clases derivadas, una para trabajar con Productos, y otra para trabajar con Carritos.

## Aspectos a incluir en el entregable: 
a) A las clases derivadas de los contenedores se las conoce como DAOs (Data Access Objects), y pueden ir todas incluidas en una misma carpeta de ‘daos’.

b) En la carpeta de daos, incluir un archivo que importe todas las clases y exporte una instancia de dao de productos y una de dao de carritos, según corresponda. Esta decisión se tomará en base al valor de una variable de entorno cargada al momento de ejecutar el servidor (opcional: investigar el uso de imports dinámicos).

c) Incluir un archivo de configuración (config) que contenga los datos correspondientes para conectarse a las bases de datos o medio de persistencia que corresponda.

------------------------------

### Consigna de la entrega actual (3er pre-entrega):
Se debe entregar:
1) Un menú de registro y autenticación de usuarios basado en passport local, guardando en la base de datos las credenciales y el resto de los datos ingresados al momento del registro. 
- El registro de usuario consiste en crear una cuenta en el servidor almacenada en la base de datos, que contenga el email y password de usuario, además de su nombre, dirección, edad, número de teléfono (debe contener todos los prefijos internacionales) y foto ó avatar. La contraseña se almacenará encriptada en la base de datos.
- La imagen se podrá subir al servidor y se guardará en una carpeta pública del mismo a la cual se tenga acceso por url.

2) Un formulario post de registro y uno de login. De modo que, luego de concretarse cualquiera de estas operaciones en forma exitosa, el usuario accederá a su home.
- El usuario se logueará al sistema con email y password y tendrá acceso a un menú en su vista, a modo de barra de navegación. Esto le permitirá ver los productos totales con los filtros que se hayan implementado y su propio carrito de compras e información propia (datos de registro con la foto). Además, dispondrá de una opción para desloguearse del sistema.
- Ante la incorporación de un usuario, el servidor enviará un email al administrador con todos los datos de registro y asunto 'nuevo registro', a una dirección que se encuentre por el momento almacenada en una constante global.

3) Envío de un email y un mensaje de whatsapp al administrador desde el servidor, a un número de contacto almacenado en una constante global.
- El usuario iniciará la acción de pedido en la vista del carrito.
- Será enviado una vez finalizada la elección para la realizar la compra de productos.
- El email contendrá en su cuerpo la lista completa de productos a comprar y en el asunto la frase 'nuevo pedido de ' y el nombre y email del usuario que los solicitó. En el mensaje de whatsapp se debe enviar la misma información del asunto del email.
- El usuario recibirá un mensaje de texto al número que haya registrado, indicando que su pedido ha sido recibido y se encuentra en proceso.

## Aspectos a incluir en el entregable: 
- El servidor trabajará con una base de datos DBaaS (Ej. MongoDB Atlas) y estará preparado para trabajar en forma local o en la nube a través de la plataforma PaaS Heroku.
- Habilitar el modo cluster para el servidor, como opcional a través de una constante global.
- Utilizar alguno de los loggers ya vistos y así reemplazar todos los mensajes a consola por logs eficientes hacia la misma consola. En el caso de errores moderados ó graves el log tendrá además como destino un archivo elegido.
- Realizar una prueba de performance en modo local, con y sin cluster, utilizando Artillery en el endpoint del listado de productos (con el usuario vez logueado). Verificar los resultados.


### Prueba de performance con Artillery.
Nota: curl me funciono en CMD y no en PowerShell. También asegurarse de tener una carpeta "profiling" creada en la ruta base del proyecto.

- Prueba en modo FORK:
   1. Ejecuto el servidor con npm start (asegurandome que en el .env tengo el MODO="FORK").
   2. En una nueva consola en la ruta del proyecto → curl -H "Content-Type: application/json" -X POST http://localhost:8080/login -d "{\"email\":\"rami@mail.com\", \"password\" : \"rami123\"}"
   3. Luego → artillery quick --count 20 -n 50 http://localhost:8080/api/productos > profiling/result_fork.txt

 - Prueba con modo CLUSTER:
   1. Ejecuto el servidor con npm start (asegurandome que en el .env tengo el MODO="CLUSTER").
   2. En una nueva consola en la ruta del proyecto → curl -H "Content-Type: application/json" -X POST http://localhost:8080/login -d "{\"email\":\"rami@mail.com\", \"password\" : \"rami123\"}"
   3. Luego → artillery quick --count 20 -n 50 http://localhost:8080/api/productos > profiling/result_cluster.txt

    ![Artillery](https://user-images.githubusercontent.com/86528930/191414631-6a774fdd-46de-4bca-b52b-6521660514cd.JPG)
   
   Conclusion: Como podemos ver en las imágenes anteriores, el servidor es un poco mas eficiente al ejecutarse en modo CLUSTER ya que las peticiones son recepcionadas por 6 procesos distintos, evitando que una nueva solicitud tenga que esperar a la siguiente como para en modo FORK al tener un solo proceso activo recibiendo todas las peticiones. Comparando los resultados entre modo CLUSTER y modo FORK, el servidor pudo atender un 10% mas de solicitudes por segundo, en tanto la media de respuesta al cliente aumentó de 68.7ms a 70.1ms y la medida de sesiones paso de 9416.8ms a 9607.1ms.
