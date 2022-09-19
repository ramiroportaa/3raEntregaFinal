const productosHTML = document.getElementById("productos");
const initial = async ()=>{
    await getProductsCartFromAPI();
    await getProductsFromAPI();
    escribirProductosHTML(productos);
    escribirModalesHTML(productos);
}
initial();
