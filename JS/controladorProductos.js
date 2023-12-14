// Create a ItemsController class
export class ControladorProductos {
  // Set up the items and currentId property in the contructor
  constructor() {
    this.productos = [];
  }

  // Función agregar productos
  agregarProducto(name, brand, description, animal, category, quantity, price, discount, image) {
    let idUltimoProducto;
    this.productos = this.cargarProductosFromLocalStorage();
    if (this.productos.length === 0) {
      idUltimoProducto = -1;
    } else {
      idUltimoProducto = this.productos[this.productos.length - 1].id;
    }
    const producto = {
      id: idUltimoProducto + 1,
      nombreProducto: name,
      marcaProducto: brand,
      descripcionProducto: description,
      imagenProducto: image,
      animalProducto: animal,
      categoriaProducto: category,
      cantidadProducto: quantity,
      precioProducto: Number(price),
      descuentoProducto: discount,
      fechaProducto: new Date().getTime()
    };
    this.productos.push(producto);
    this.pushProductosLocalStorage();
  }

  pushProductosLocalStorage() {
    localStorage.setItem("productos", JSON.stringify(this.productos));
  }

  // Función para borrar un producto por su índice
  borrarProducto(id) {
    this.productos = this.cargarProductosFromLocalStorage();
    this.productos.splice(id, 1);
    this.pushProductosLocalStorage();
  }

  // Función para modificar un producto
  modificarProducto(id, nuevoNombreProducto, nuevoDescripcionProducto, nuevoMarcaProducto, nuevoAnimalProducto, nuevoCategoriaProducto, nuevoCantidadProducto, nuevoPrecioProducto, nuevoDescuentoProducto, nuevoImagenProducto) {
    this.productos = this.cargarProductosFromLocalStorage();
    const index = this.productos.findIndex((producto) => producto.id == id);
    console.log("Indice encontrado: ", index);
    if (index !== -1) {
      console.log("objeto encontrado: " + JSON.stringify(this.productos[index]));
      this.productos[index].nombreProducto = nuevoNombreProducto; // sobreescribir
      this.productos[index].descripcionProducto = nuevoDescripcionProducto;
      this.productos[index].marcaProducto = nuevoMarcaProducto;
      this.productos[index].animalProducto = nuevoAnimalProducto;
      this.productos[index].categoriaProducto = nuevoCategoriaProducto;
      this.productos[index].cantidadProducto = nuevoCantidadProducto;
      this.productos[index].precioProducto = nuevoPrecioProducto;
      this.productos[index].descuentoProducto = nuevoDescuentoProducto;
      this.productos[index].imagenProducto = nuevoImagenProducto;
      this.productos[index].fechaProducto = new Date().getTime();
      this.pushProductosLocalStorage();
    } else {
      console.log(`No se encontró la publicación con el ID: ${id}`);
    }
  }

  // Función para borrar todos los productos
  borrarTodosProductos() {
    this.productos = this.cargarProductosFromLocalStorage();
    this.productos.splice(0, this.productos.length);
    this.pushProductosLocalStorage();
  }

  cargarProductosFromLocalStorage() {
    const storageProductos = localStorage.getItem("productos")
    if (storageProductos) {
      return JSON.parse(storageProductos);
    } else {
      return [];
    }
  }

  inicializarCheckboxes() {
    //event listener para los checkboxes por grupo filtrado(precio, descuento, marca)
    const checkBoxesPrecio = document.getElementsByClassName("checkboxFiltroPrecio");
    const checkBoxesDescuento = document.getElementsByClassName("checkboxFiltroDescuento");
    const checkBoxesMarcas = document.getElementsByClassName("checkboxFiltroMarcas");
    const jsonAModificar = this.cargarProductosFromLocalStorage()
    for (var i = 0; i < checkBoxesPrecio.length; i++) {

      checkBoxesPrecio[i].addEventListener("change", function () {
        //quitar seleccion de otras checkboxes de precio
        quitarSeleccion(checkBoxesPrecio, this);
        console.log(this.productos)
        this.productos = filtrado(jsonAModificar)
        console.log(this.productos)

      });

    }
    for (var i = 0; i < checkBoxesDescuento.length; i++) {
      checkBoxesDescuento[i].addEventListener("change", function () {
        //quitar seleccion de otras checkboxes de descuento
        quitarSeleccion(checkBoxesDescuento, this);
        this.productos = filtrado(jsonAModificar)
      });

    }
    for (var i = 0; i < checkBoxesMarcas.length; i++) {
      checkBoxesMarcas[i].addEventListener("change", function () {
        this.productos = filtrado(jsonAModificar)
      });

    }
  }
};

function quitarSeleccion(checkBoxes, checkboxSeleccionado) { //quita seleccion de otros checkboxes del mismo grupo
  for (var i = 0; i < checkBoxes.length; i++) {
    if (checkBoxes[i] !== checkboxSeleccionado) {
      checkBoxes[i].checked = false;
    }
  }
}



function filtrado(jsonDeLocalStorage) {
  //event listener para los checkboxes por grupo filtrado(precio, descuento, marca)
  const checkBoxesPrecio = document.getElementsByClassName("checkboxFiltroPrecio");
  const checkBoxesDescuento = document.getElementsByClassName("checkboxFiltroDescuento");
  const checkBoxesMarcas = document.getElementsByClassName("checkboxFiltroMarcas");
  //buscar que filtros aplicar
  var jsonModificado = jsonDeLocalStorage;
  // checar cual checkbox esta checado de precio y aplicar filtro necesario al json
  console.log("aqui hago filtrado");

  //============================filtro precio==================
  for (var i = 0; i < checkBoxesPrecio.length; i++) {
    if (checkBoxesPrecio[i].checked == true) {
      console.log(checkBoxesPrecio[i].value)
      switch (checkBoxesPrecio[i].value) {
        case "0 a 300": {
          jsonModificado = jsonModificado.filter((producto) => producto.precioProducto < 300);
          break;
        }
        case "300 a 700": {
          jsonModificado = jsonModificado.filter((producto) => producto.precioProducto > 300 && producto.precioProducto < 700);
          break;
        }
        case "700 a 1000": {
          jsonModificado = jsonModificado.filter((producto) => producto.precioProducto > 700 && producto.precioProducto < 1000);
          break;
        }
        case "1000 o mas": {
          jsonModificado = jsonModificado.filter((producto) => producto.precioProducto > 1000);
          break;
        }
      }
    }
  }

  //=================================================filtro descuento==================================
  for (var i = 0; i < checkBoxesDescuento.length; i++) {
    if (checkBoxesDescuento[i].checked == true) {
      console.log(checkBoxesDescuento[i].value)

      switch (checkBoxesDescuento[i].value) {
        case "10 o mas": {
          jsonModificado = jsonModificado.filter((producto) => producto.descuentoProducto > 10 && producto.descuentoProducto < 20);
          break;
        }
        case "20 o mas": {
          jsonModificado = jsonModificado.filter((producto) => producto.descuentoProducto > 20 && producto.descuentoProducto < 30);
          break;
        }
        case "30 o mas": {
          jsonModificado = jsonModificado.filter((producto) => producto.descuentoProducto > 30);
          break;
        }
      }
    }
  }

  //=========================================================filtro marca============================================
  for (var i = 0; i < checkBoxesMarcas.length; i++) {
    if (checkBoxesMarcas[i].checked == true) {
      console.log(checkBoxesMarcas[i].value)

      switch (checkBoxesMarcas[i].value) {
        case "Whole Hearted": {
          jsonModificado = jsonModificado.filter((producto) => producto.marcaProducto == 'Whole Hearted');
          break;
        }
        case "Royal Cannin": {
          jsonModificado = jsonModificado.filter((producto) => producto.marcaProducto == 'Royal Cannin');
          break;
        }
      }
    }
  }
  console.log(JSON.stringify(jsonModificado,undefined,4));// el parametro 4 indenta el resultado en consola pa que se vea bonito

  // checar cual checkbox esta checado de descuento y aplicar filtro necesario al json
  // checar cuales checkbox esta checado de marcas y aplicar filtro necesario al json

  //imprimir json modificado en pantalla
  return jsonModificado
}