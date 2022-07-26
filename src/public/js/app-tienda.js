const productosHTML = document.getElementById("productos");
const initial = async ()=>{
    if (idCart){
        await getProductsCartFromAPI(idCart);
    }else{
        idCart = await createCartAPI();
        console.log("CART CREADO EN initial", idCart);
    }
    await getProductsFromAPI();
    escribirProductosHTML(productos);
    escribirModalesHTML(productos);
}
initial();
