const rol = sessionStorage.getItem("rol");

//Creamos un array para agrupar todos los productos que se ofrecen.
let productos = []

//Creamos un array para agrupar todos los productos que se añaden al carrito.
let cart = [];
//Obtener el id del cart del usuario.
const getIdCartFromAPI = async ()=>{
    let res = await fetch("/api/carrito/current");
    res = await res.json();
    return res.data;
}

//Funciones de inteaccion con la API
    //Fetchs a /api/productos
        //Obtener todos los productos y pushearlos al array de productos.
const getProductsFromAPI = async ()=>{
    let res = await fetch("/api/productos");
    res = await res.json();
    productos = res.data;
}
        //Obtener un solo producto por su ID.
const getProductByIdFromAPI = async (id)=>{
    let res = await fetch(`/api/productos/${id}`);
    res = await res.json();
    if (res.error) return alertaInfo(res.message);
    return res.data;
}
        //Actualizar un producto pasandole un objeto con las propiedades a cambiar.
const updateProductAPI = async (id, obj)=>{
    const productUpdateData = JSON.stringify(obj);
    let res = await fetch(`/api/productos/${id}`, {
        method: "PUT",
        headers:{'Content-Type': 'application/json', "rol": `${rol}`},
        body: productUpdateData
    });
    res = await res.json();
    if (res.error) return alertaInfo(res.message);
    alertaInfo("producto actualizado exitosamente");
}
        //crear un producto pasandole un objeto con las propiedades del mismo.
const addProductAPI = async (obj)=>{
    const productAddData = JSON.stringify(obj);
    let res = await fetch(`/api/productos`, {
        method: "POST",
        headers:{'Content-Type': 'application/json', "rol": `${rol}`},
        body: productAddData
    });
    res = await res.json();
    if (res.error) return alertaInfo(res.message);
    alertaInfo("Producto creado exitosamente");
}
        //Eliminar un producto por id.
const deleteProductAPI = async (id)=>{
    let res = await fetch(`/api/productos/${id}`, {
        method: "DELETE",
        headers:{"rol": `${rol}`}
    });
    res = await res.json();
    if (res.error) return alertaInfo(res.message);
    alertaInfo("Producto eliminado exitosamente");
}

    //Fetchs a /api/carrito
        //Obtener los productos existentes en el carrito del usuario y pushearlos al array de cart.
const getProductsCartFromAPI = async ()=>{
    const id = await getIdCartFromAPI();
    let res = await fetch(`/api/carrito/${id}/productos`);
    if (res.status == 404 || res.status == 401){
        await createCartAPI();
        return false;
    }
    res = await res.json();
    if (res.error){
        alertaInfo(res.message);
        return false;
    }
    cart = res.data;
    return true;
}
        //Crear un carrito en la API y obtener su ID.
const createCartAPI = async ()=>{
    let res = await fetch("/api/carrito",{
        method: "POST"
    });
    res = await res.json();
    if (res.error) return alertaInfo(res.message);
    return res.data;
}
        //Eliminar un carrito completo de la API.
const deleteCartAPI = async ()=>{
    const id = await getIdCartFromAPI();
    let res = await fetch(`/api/carrito/${id}`,{
        method: "DELETE"
    });
    res = await res.json();
    if (res.error) return alertaInfo(res.message);
    alertaInfo("Carrito eliminado exitosamente");
}
        //Agregar un producto al carrito en la API.
const addProductCartAPI = async (idProd, quantity=1)=>{
    try {
        const idC = await getIdCartFromAPI();
        const obj = {
            idProd: idProd,
            quantity: quantity
        }
        let res = await fetch(`/api/carrito/${idC}/productos`,{
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        res = await res.json();
        if (res.error) return alertaInfo(res.message);
        alertaInfo("Producto agregado al carrito exitosamente");
    } catch (error) {
        alertaInfo(error.message)
    }
}
        //Eliminar un producto de un carrito en la API.
const deleteProductCartAPI = async (idP)=>{
    const idC = await getIdCartFromAPI();
    let res = await fetch(`/api/carrito/${idC}/productos/${idP}`,{
        method: "DELETE"
    });
    res = await res.json();
    if (res.error) return alertaInfo(res.message);
    alertaInfo("Producto eliminado exitosamente del carrito");
}

//Funciones para cambiar la clase del dialogoInfo luego de 2 segundos... Estas funciones son llamadas al hacer ejecutar la funcion "comprar".
const dialogoInfo = document.getElementById("dialogoInfo");
function verAlerta() {
    dialogoInfo.classList.toggle("dialogoInfo-active");
}
let identificadorDeTemporizador;
function temporizadorAlerta() {
  identificadorDeTemporizador = setTimeout(verAlerta, 2000);
}
function alertaInfo(contenidoHTML){
    dialogoInfo.innerHTML = contenidoHTML;
    verAlerta();
    temporizadorAlerta();
}