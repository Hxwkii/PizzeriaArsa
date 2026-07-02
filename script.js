const preciosProductos = {
    "Pizza Pepperoni": 20,
    "Pizza Hawaiana": 19,
    "Pizza Americana": 17.5,
    "Pizza Vegetariana": 21,
    "Pizza Suprema": 25,
    "Pizza Meat Lovers": 27.5,
    "Pizza 4 Quesos": 24,
    "Pizza Continental": 22.5,
    "Pizza Napolitana": 19,
    "Pan al Ajo": 6
};

const pedidosIniciales = [
    { id: "001", cliente: "Juan Perez", productos: "Pizza Pepperoni", cantidad: 1, total: 20, estado: "Enviado" },
    { id: "002", cliente: "Maria Garcia", productos: "Pizza Hawaiana", cantidad: 2, total: 38, estado: "En proceso" },
    { id: "003", cliente: "Luis Torres", productos: "Pizza Americana", cantidad: 1, total: 17.5, estado: "Preparando" },
    { id: "004", cliente: "Ana Ramos", productos: "Pizza Vegetariana", cantidad: 1, total: 21, estado: "Enviado" },
    { id: "005", cliente: "Pedro Castillo", productos: "Pizza Suprema", cantidad: 1, total: 25, estado: "En proceso" },
    { id: "006", cliente: "Sofia Luna", productos: "Pizza Meat Lovers", cantidad: 2, total: 55, estado: "Preparando" },
    { id: "007", cliente: "Carlos Ruiz", productos: "Pizza 4 Quesos", cantidad: 1, total: 24, estado: "Enviado" },
    { id: "008", cliente: "Lucia Mendez", productos: "Pizza Continental", cantidad: 1, total: 22.5, estado: "En proceso" },
    { id: "009", cliente: "Jose Castro", productos: "Pizza Napolitana", cantidad: 1, total: 19, estado: "Preparando" },
    { id: "010", cliente: "Elena Salas", productos: "Pan al Ajo", cantidad: 3, total: 18, estado: "Enviado" }
];

const ofertasEspeciales = [
    { producto: "Pizza Americana", descuento: 60, precio: 14, urgencia: "Ultimas unidades" },
    { producto: "Pizza Pepperoni", descuento: 50, precio: 20, urgencia: "Quedan 2 unidades" },
    { producto: "Pizza Hawaiana", descuento: 50, precio: 19, urgencia: "Solo por 10 minutos" },
    { producto: "Pan al Ajo", descuento: 70, precio: 3.6, urgencia: "Ultimas unidades" },
    { producto: "Pizza Napolitana", descuento: 55, precio: 17.1, urgencia: "Queda solo 1" },
    { producto: "Pizza Vegetariana", descuento: 50, precio: 21, urgencia: "Ultimas unidades" },
    { producto: "Pizza Continental", descuento: 50, precio: 22.5, urgencia: "Quedan 3 unidades" },
    { producto: "Pizza 4 Quesos", descuento: 40, precio: 28.8, urgencia: "Oferta del momento" },
    { producto: "Pizza Suprema", descuento: 50, precio: 25, urgencia: "Ultimas unidades" },
    { producto: "Pizza Meat Lovers", descuento: 45, precio: 30.25, urgencia: "Quedan 2 unidades" }
];

function mostrarMensaje(id, texto, tipo = "info") {
    const contenedor = document.getElementById(id);
    if (!contenedor) return;
    contenedor.textContent = texto;
    contenedor.className = `mensaje ${tipo}`;
    contenedor.hidden = false;
}

function formatearSoles(valor) {
    return `S/ ${Number(valor).toFixed(2)}`;
}

function obtenerPedidosGuardados() {
    const datos = localStorage.getItem("pedidosArsa");
    return datos ? JSON.parse(datos) : [];
}

function guardarPedidos(pedidos) {
    localStorage.setItem("pedidosArsa", JSON.stringify(pedidos));
}

function pintarCampo(idCampo, valido) {
    const campo = document.getElementById(idCampo);
    if (!campo) return;
    campo.classList.toggle("campo-error", !valido);
}

function marcarIntentoLogin() {
    mostrarMensaje("loginMensaje", "Validando datos de acceso...", "info");
}

function validarLogin(event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value.trim();

    pintarCampo("usuario", usuario.length >= 3);
    pintarCampo("password", password.length >= 6);

    if (usuario.length < 3) {
        mostrarMensaje("loginMensaje", "El usuario debe tener al menos 3 caracteres.", "error");
        return false;
    }

    if (password.length < 6) {
        mostrarMensaje("loginMensaje", "La contrasena debe tener al menos 6 caracteres.", "error");
        return false;
    }

    localStorage.setItem("usuarioArsa", usuario);
    mostrarMensaje("loginMensaje", `Bienvenido, ${usuario}. Redirigiendo al inicio...`, "exito");
    setTimeout(() => {
        window.location.href = "index.html";
    }, 900);
    return false;
}

function mostrarOcultarPassword(idCampo, idCheck) {
    const campo = document.getElementById(idCampo);
    const check = document.getElementById(idCheck);
    if (!campo || !check) return;
    campo.type = check.checked ? "text" : "password";
}

function evaluarSeguridadRegistro() {
    const pass = document.getElementById("pass");
    if (!pass) return;

    const valor = pass.value;
    let texto = "Seguridad: baja";
    let tipo = "error";

    if (valor.length >= 8 && /[0-9]/.test(valor) && /[A-Z]/.test(valor)) {
        texto = "Seguridad: alta";
        tipo = "exito";
    } else if (valor.length >= 6) {
        texto = "Seguridad: media";
        tipo = "info";
    }

    mostrarMensaje("registroMensaje", texto, tipo);
}

function validarRegistro(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const pass = document.getElementById("pass").value;
    const confirmar = document.getElementById("pass_confirm").value;

    pintarCampo("nombre", nombre.length >= 5);
    pintarCampo("correo", correo.includes("@") && correo.includes("."));
    pintarCampo("pass", pass.length >= 6);
    pintarCampo("pass_confirm", pass === confirmar && confirmar.length > 0);

    if (nombre.length < 5) {
        mostrarMensaje("registroMensaje", "Ingrese su nombre completo.", "error");
        return false;
    }

    if (!correo.includes("@") || !correo.includes(".")) {
        mostrarMensaje("registroMensaje", "Ingrese un correo electronico valido.", "error");
        return false;
    }

    if (pass.length < 6) {
        mostrarMensaje("registroMensaje", "La contrasena debe tener al menos 6 caracteres.", "error");
        return false;
    }

    if (pass !== confirmar) {
        mostrarMensaje("registroMensaje", "Las contrasenas no coinciden.", "error");
        return false;
    }

    localStorage.setItem("usuarioArsa", nombre.split(" ")[0]);
    mostrarMensaje("registroMensaje", "Registro correcto. Ahora puede iniciar sesion.", "exito");
    setTimeout(() => {
        window.location.href = "login.html";
    }, 1100);
    return false;
}

function actualizarImpactoInicio() {
    const impacto = document.getElementById("impactoInicio");
    if (!impacto) return;

    const pedidos = obtenerPedidosGuardados();
    const comidasBase = 36;
    const comidasRescatadas = comidasBase + pedidos.length;
    const ahorro = comidasRescatadas * 4.5;

    impacto.innerHTML = `<strong>${comidasRescatadas}</strong> comidas rescatadas y <strong>${formatearSoles(ahorro)}</strong> de ahorro estimado esta semana.`;
}

function cambiarOfertaInicio() {
    const ofertas = ["Pizza Americana al 60%", "Pan al Ajo al 70%", "Pizza Napolitana al 55%"];
    const indice = Math.floor(Math.random() * ofertas.length);
    const destacada = document.getElementById("ofertaDestacada");
    if (!destacada) return;

    destacada.textContent = `Oferta destacada: ${ofertas[indice]}`;
    destacada.style.backgroundColor = "#fff0d7";
    destacada.style.color = "#7a2f22";
}

function iniciarInicio() {
    const saludo = document.getElementById("saludoUsuario");
    const usuario = localStorage.getItem("usuarioArsa");

    if (saludo && usuario) {
        saludo.textContent = `Hola, ${usuario}. Gracias por ayudar a reducir el desperdicio.`;
        saludo.hidden = false;
    }

    actualizarImpactoInicio();
}

function seleccionarProducto(nombre) {
    localStorage.setItem("productoSeleccionadoArsa", nombre);
    mostrarMensaje("menuMensaje", `${nombre} fue seleccionado. Se cargara en el formulario de pedido.`, "exito");
}

function filtrarMenu() {
    const busqueda = document.getElementById("buscarMenu").value.toLowerCase();
    const filtro = document.getElementById("filtroMenu").value;
    const tarjetas = document.querySelectorAll(".menu-card");
    let visibles = 0;

    tarjetas.forEach((tarjeta) => {
        const nombre = tarjeta.dataset.nombre.toLowerCase();
        const precio = Number(tarjeta.dataset.precio);
        const coincideTexto = nombre.includes(busqueda);
        const coincidePrecio = filtro === "todos" || (filtro === "menor20" && precio < 20) || (filtro === "mayor20" && precio >= 20);
        const visible = coincideTexto && coincidePrecio;

        tarjeta.style.display = visible ? "grid" : "none";
        if (visible) visibles++;
    });

    mostrarMensaje("menuMensaje", `Se encontraron ${visibles} productos disponibles.`, "info");
}

function iniciarMenu() {
    const totalProductos = document.querySelectorAll(".menu-card").length;
    if (totalProductos > 0) {
        mostrarMensaje("menuMensaje", `${totalProductos} productos disponibles para rescatar hoy.`, "info");
    }
}

function actualizarResumenPedido() {
    const resumen = document.getElementById("resumenPedido");
    if (!resumen) return;

    const cantidad = Number(document.getElementById("cantidad")?.value || 1);
    const seleccionados = Array.from(document.querySelectorAll('input[name="producto"]:checked')).map((item) => item.value);
    const subtotal = seleccionados.reduce((total, producto) => total + preciosProductos[producto], 0);
    const total = subtotal * cantidad;

    resumen.innerHTML = seleccionados.length
        ? `Productos: <strong>${seleccionados.join(", ")}</strong><br>Total estimado: <strong>${formatearSoles(total)}</strong>`
        : "Seleccione al menos un producto para calcular el total.";
}

function cargarProductoSeleccionado() {
    const parametros = new URLSearchParams(window.location.search);
    const productoUrl = parametros.get("producto");
    const productoGuardado = localStorage.getItem("productoSeleccionadoArsa");
    const producto = productoUrl || productoGuardado;

    if (!producto) return;

    const check = document.querySelector(`input[name="producto"][value="${producto}"]`);
    if (check) {
        check.checked = true;
        actualizarResumenPedido();
    }
}

function enviarPedido(event) {
    event.preventDefault();

    const cliente = document.getElementById("cliente").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const cantidad = Number(document.getElementById("cantidad").value);
    const seleccionados = Array.from(document.querySelectorAll('input[name="producto"]:checked')).map((item) => item.value);

    pintarCampo("cliente", cliente.length >= 5);
    pintarCampo("direccion", direccion.length >= 5);
    pintarCampo("telefono", /^[0-9]{9}$/.test(telefono));
    pintarCampo("cantidad", cantidad >= 1);

    if (cliente.length < 5 || direccion.length < 5) {
        mostrarMensaje("pedidoMensaje", "Complete correctamente el nombre y la direccion.", "error");
        return false;
    }

    if (!/^[0-9]{9}$/.test(telefono)) {
        mostrarMensaje("pedidoMensaje", "El telefono debe tener 9 digitos numericos.", "error");
        return false;
    }

    if (cantidad < 1 || seleccionados.length === 0) {
        mostrarMensaje("pedidoMensaje", "Seleccione una cantidad valida y al menos un producto.", "error");
        return false;
    }

    const subtotal = seleccionados.reduce((total, producto) => total + preciosProductos[producto], 0);
    const pedidos = obtenerPedidosGuardados();
    const nuevoPedido = {
        id: String(100 + pedidos.length + 1),
        cliente,
        direccion,
        telefono,
        productos: seleccionados.join(", "),
        cantidad,
        total: subtotal * cantidad,
        estado: "En proceso"
    };

    pedidos.push(nuevoPedido);
    guardarPedidos(pedidos);
    localStorage.removeItem("productoSeleccionadoArsa");
    mostrarMensaje("pedidoMensaje", "Pedido registrado correctamente.", "exito");
    setTimeout(() => {
        window.location.href = "pedidos.html";
    }, 900);
    return false;
}

function claseEstado(estado) {
    if (estado === "Enviado") return "enviado";
    if (estado === "Preparando") return "preparando";
    return "proceso";
}

function pintarPedidos() {
    const cuerpo = document.getElementById("pedidosBody");
    if (!cuerpo) return;

    const filtro = document.getElementById("filtroPedidos").value;
    const todos = pedidosIniciales.concat(obtenerPedidosGuardados());
    const pedidos = filtro === "todos" ? todos : todos.filter((pedido) => pedido.estado === filtro);

    cuerpo.innerHTML = "";
    pedidos.forEach((pedido) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${pedido.id}</td>
            <td>${pedido.cliente}</td>
            <td>${pedido.productos}</td>
            <td>${pedido.cantidad}</td>
            <td>${formatearSoles(pedido.total)}</td>
            <td><span class="estado ${claseEstado(pedido.estado)}">${pedido.estado}</span></td>
        `;

        cuerpo.appendChild(fila);
    });

    const total = pedidos.reduce((suma, pedido) => suma + Number(pedido.total), 0);
    mostrarMensaje("pedidosMensaje", `Mostrando ${pedidos.length} pedidos. Total acumulado: ${formatearSoles(total)}.`, "info");
}

function limpiarPedidosNuevos() {
    guardarPedidos([]);
    pintarPedidos();
    mostrarMensaje("pedidosMensaje", "Se limpiaron los pedidos registrados desde el formulario.", "exito");
}

function pintarTablaOfertas() {
    const cuerpo = document.getElementById("tablaOfertasBody");
    if (!cuerpo) return;

    cuerpo.innerHTML = "";
    ofertasEspeciales.forEach((oferta) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${oferta.producto}</td>
            <td>${oferta.descuento}%</td>
            <td>${formatearSoles(oferta.precio)}</td>
            <td>${oferta.urgencia}</td>
        `;
        cuerpo.appendChild(fila);
    });
}

function filtrarOfertas() {
    const minimo = Number(document.getElementById("filtroOfertas").value);
    const tarjetas = document.querySelectorAll(".oferta-card");
    let visibles = 0;

    tarjetas.forEach((tarjeta) => {
        const descuento = Number(tarjeta.dataset.descuento);
        const visible = descuento >= minimo;
        tarjeta.style.display = visible ? "grid" : "none";
        if (visible) visibles++;
    });

    mostrarMensaje("ofertasMensaje", `Hay ${visibles} ofertas con descuento desde ${minimo}%.`, "info");
}

function comprarOferta(nombre) {
    localStorage.setItem("productoSeleccionadoArsa", nombre);
    mostrarMensaje("ofertasMensaje", `${nombre} fue reservado como oferta. Complete el formulario para confirmar.`, "exito");
}

function iniciarContadorOfertas() {
    const contador = document.getElementById("contadorOferta");
    if (!contador) return;

    let segundos = 600;
    setInterval(() => {
        const minutos = Math.floor(segundos / 60);
        const resto = segundos % 60;

        contador.textContent = `${minutos}:${String(resto).padStart(2, "0")}`;
        segundos = segundos > 0 ? segundos - 1 : 600;
    }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
    iniciarInicio();
    iniciarMenu();
    cargarProductoSeleccionado();
    actualizarResumenPedido();
    pintarPedidos();
    pintarTablaOfertas();
    iniciarContadorOfertas();
});
