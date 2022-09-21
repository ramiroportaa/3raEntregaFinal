const renderCart = async()=>{
    const productosHTML = document.getElementById("productos"); 
    const btnDeleteCart = document.querySelector("[data-delete]");
    productosHTML.innerHTML = "";
    await getProductsCartFromAPI();
    let total = 0;
    //Si el array de productos en la ultima orden se encuentra vacio...
    if (!cart?.length){
        $("#productos").append(`<p>EL CARRITO ESTA VACIO</p>`)
        $("#finalizarCompra").css({
            display: "none"
        })
        btnDeleteCart.classList.add("d-none");
    }else{
    //Agregamos cada producto del carrito por DOM.
    //Tambien el evento click sobre el icono de basurero para llamar el metodo "borrarProducto" de la orden.
    //Tambien modificamos total
    cart.forEach(producto => {
        total += (producto.data.precio * producto.quantity);
        $("#productos").append(`<tr>
                                <th class="pl-0 border-0" scope="row">
                                <div class="media align-items-center"><a id="detalle-${producto.data._id}" class="reset-anchor d-block" href="/tienda/detalle"><img src="${producto.data.foto}" alt="${producto.data.nombre}" width="70"/></a>
                                    <div class="media-body ms-3"><strong class="h6"><a id="detalle2-${producto.data._id}" class="reset-anchor" href="/tienda/detalle">${producto.data.nombre}</a></strong></div>
                                </div>
                                </th>
                                <td class="align-middle border-0">
                                    <p class="mb-0 small">$${producto.data.precio}</p>
                                </td>
                                <td class="align-middle border-0">
                                <div class="border d-flex align-items-center justify-content-between px-3"><span class="small text-uppercase text-gray headings-font-family">Cantidad</span>
                                    <div class="quantity">
                                        <input id="cantidad-carrito-${producto.data._id}" class="form-control form-control-sm border-0 shadow-0 p-0" type="number" value="${producto.quantity}" min="1" max="${producto.data.stock}"/>
                                        <button id="cantidad-carrito-${producto.data._id}-modificar" class="ps-2">Modificar</button>
                                    </div>
                                </div>
                                </td>
                                <td class="align-middle border-0">
                                    <p id="total-${producto.data._id}" class="mb-0 small">$${producto.data.precio*producto.quantity}</p>
                                </td>
                                <td id="carrito-borrarItem-${producto.data._id}" class="align-middle border-0"><a class="reset-anchor" href="#"><i class="fas fa-trash-alt small text-muted"></i></a></td>
                            </tr> `);
        
        document.querySelector(`#carrito-borrarItem-${producto.data._id}`).addEventListener("click", async () => {
            await deleteProductCartAPI(producto.data._id);
            await renderSidebarCart();
            await renderCart();
        });

        $(`#cantidad-carrito-${producto.data._id}-modificar`).click(async function() {
            let cantidad = document.querySelector(`#cantidad-carrito-${producto.data._id}`).value
            cantidad = parseInt(cantidad);
            if (producto.data.stock < cantidad) return alertaInfo(`Solo quedan ${producto.data.stock} unidades`);
            await deleteProductCartAPI(producto.data._id);
            await addProductCartAPI(producto.data._id, cantidad);
            await renderCart();
            return alertaInfo(`Modificación del carrito exitosa`);
        });

        $(`#total-${producto.data._id}`).text(`$${producto.data.precio*producto.quantity}`);
        //Modificamos el DOM del total de la Orden.
        $("#subtotalOrden").text(`$${total}.-`)
        $("#totalOrden").text(`$${total}.-`)
        $("#descOrden").addClass("d-none");

        //Añadimos manejador de evento click para almacenar variable en LocalStorage y transmitirla al js de detalle al hacer click en la imagen o en el nombre.
        $(`#detalle-${producto.data._id}`).click( () => {
            localStorage.setItem("detalle-id", producto.data._id);
        });
        $(`#detalle2-${producto.data._id}`).click( () => {
            localStorage.setItem("detalle-id", producto.data._id);
        });
    });
    btnDeleteCart.classList.add("d-block");
    btnDeleteCart.addEventListener("click", async function () {
        await deleteCartAPI();
        location.reload();
    })

    };
    //Formulario de cupon.
    //Borramos descuento del localStorage para que no se aplique el descuento al pasar al checkout en caso de no haber puesto un cupon.
    localStorage.setItem("desc", 0);
    //Asociamos el evento submit al formulario
    $("#formCupon").submit((e) =>{
        e.preventDefault();
        let cupon = $("#formInput")[0].value;
        if (cupon === "coderhouse") {
            const porcentaje = 10;
            const descuento = total*porcentaje/100;
            const NuevoTotal = total-descuento;
            $("#descOrden").removeClass("d-none");
            $($("#descOrden").children()[0]).text( `Descuento ${porcentaje}%` );
            $($("#descOrden").children()[1]).text( `$${descuento}.-`);
            $("#totalOrden").text(`$${NuevoTotal}.-`);
            localStorage.setItem("desc", porcentaje);
        }else {
            alertaInfo("El cupón ingresado no es valido");
        } 
    })
}

renderCart();