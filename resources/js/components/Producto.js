import React, { Component } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";

const baseUrl = "http://localhost:8000/";

export default class Producto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            producto: [],
            productoBackup: [],
            textBuscar: "",
            formNombre: "",
            formDescripcion: "",
            formPrecio: "",
            formCantidad: "",
            idProducto: 0,
            edit: false
        };

        // funciones de onchange de los campos en  el formulario
        this.handleChangeNombre = this.handleChangeNombre.bind(this);
        this.handleChangeDescp = this.handleChangeDescp.bind(this);
        this.handleChangePreci = this.handleChangePreci.bind(this);
        this.handleChangeCantidad = this.handleChangeCantidad.bind(this);
    }

    componentDidMount() {
        axios
            .get(baseUrl + "api/producto/list")
            .then(response => {
                this.setState({
                    producto: response.data,
                    productoBackup: response.data
                });
            })
            .catch(error => {
                alert("Error " + error);
            });
    }

    listData() {
        return this.state.producto.map(data => {
            return (
                <tr key={data.id}>
                    <th>{data.titulo}</th>
                    <th>{data.descripcion}</th>
                    <th>$ {data.precio}</th>
                    <th>{data.cantidad}</th>
                    <th>
                        <div
                            className="btn-group"
                            role="group"
                            aria-label="Button group example"
                        >
                            <button
                                className="btn btn-info"
                                type="button"
                                onClick={() => this.showModalEdit(data)}
                            >
                                Editar
                            </button>
                            <button
                                className="btn btn-danger"
                                type="button"
                                onClick={() => this.showModalDelete(data)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </th>
                </tr>
            );
        });
    }

    filter(event) {
        var text = event.target.value;
        const data = this.state.productoBackup;

        const newData = data.filter(function(item) {
            // variable de titulo
            const itemDataTitulo = item.titulo.toUpperCase();
            // variable de descripcion
            const itemDataDesc = item.descripcion.toUpperCase();
            // juntar titulo y descripcion
            const itemData = itemDataTitulo + " " + itemDataDesc;
            // variable de buscar
            const textData = text.toUpperCase();
            // filtrar si es verdadero o no y lo devuelve
            return itemData.indexOf(textData) > -1;
        });

        this.setState({
            producto: newData,
            textBuscar: text
        });
    }
    // campo de nombre
    handleChangeNombre(event) {
        this.setState({ formNombre: event.target.value });
    }
    // campo de descripcion
    handleChangeDescp(event) {
        this.setState({ formDescripcion: event.target.value });
    }
    // campo de precio
    handleChangePreci(event) {
        this.setState({ formPrecio: event.target.value });
    }
    // campo de cantidad
    handleChangeCantidad(event) {
        this.setState({ formCantidad: event.target.value });
    }

    showModalEdit(data) {
        this.setState({
            idProducto: data.id,
            formNombre: data.titulo,
            formDescripcion: data.descripcion,
            formPrecio: data.precio,
            formCantidad: data.cantidad,
            edit: true
        });
        $("#exampleModal").modal("show");
    }

    showModalCreate() {
        this.setState({
            idProducto: 0,
            formNombre: "",
            formDescripcion: "",
            formPrecio: "",
            formCantidad: "",
            edit: false
        });
        $("#exampleModal").modal("show");
    }

    showModalDelete(data) {
        this.setState({
            idProducto: data.id
        });

        $("#exampleModalDelete").modal("show");
    }

    sendNetworkProduct() {
        const formData = new FormData();
        formData.append("nombre", this.state.formNombre);
        formData.append("descripcion", this.state.formDescripcion);
        formData.append("precio", this.state.formPrecio);
        formData.append("cantidad", this.state.formCantidad);

        axios
            .post(baseUrl + "api/producto/create", formData)
            .then(response => {
                if (response.data.success == true) {
                    //alert(response.data.message);
                    // cargar datos de nuevo
                    this.componentDidMount();
                    // para cerrar el modal
                    $("#exampleModal").modal("hide");
                }
            })
            .catch(error => {
                alert("Error " + error);
            });
    }

    sendNetworkUpdate(data) {
        const formData = new FormData();
        formData.append("id", this.state.idProducto);
        formData.append("nombre", this.state.formNombre);
        formData.append("descripcion", this.state.formDescripcion);
        formData.append("precio", this.state.formPrecio);
        formData.append("cantidad", this.state.formCantidad);

        axios
            .post(baseUrl + "api/producto/update", formData)
            .then(response => {
                if (response.data.success == true) {
                    //alert(response.data.message);
                    // cargar datos de nuevo
                    this.componentDidMount();
                    // para cerrar el modal
                    $("#exampleModal").modal("hide");
                }
            })
            .catch(error => {
                alert("Error " + error);
            });
    }

    sendNetworkDelete() {
        const formData = new FormData();
        formData.append("id", this.state.idProducto);

        axios
            .post(baseUrl + "api/producto/delete", formData)
            .then(response => {
                if (response.data.success == true) {
                    //alert(response.data.message);
                    // cargar datos de nuevo
                    this.componentDidMount();
                    // para cerrar el modal
                    $("#exampleModalDelete").modal("hide");
                }
            })
            .catch(error => {
                alert("Error " + error);
            });
    }

    render() {
        return (
            <div className="container">
                <h3>Laravel y React APIRest</h3>
                <hr />

                <div className="row">
                    <input
                        className="form-control col-md-8"
                        placeholder="Buscar"
                        value={this.state.textBuscar}
                        onChange={textBuscar => this.filter(textBuscar)}
                    />

                    <button
                        type="button"
                        className="btn btn-primary col-md-4"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={() => this.showModalCreate()}
                    >
                        Crear producto
                    </button>
                </div>

                <br></br>
                <table className="table table-bordered order-table ">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Descripcion</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="bodytable">{this.listData()}</tbody>
                </table>

                <div
                    className="modal fade"
                    id="exampleModalDelete"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5
                                    className="modal-title"
                                    id="exampleModalLabel"
                                >
                                    Eliminar
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Desea eliminar el producto?</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => this.sendNetworkDelete()}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <form>
                    <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5
                                        className="modal-title"
                                        id="exampleModalLabel"
                                    >
                                        Formulario de producto
                                    </h5>
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">
                                            Nombre de producto{" "}
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.formNombre}
                                            onChange={this.handleChangeNombre}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">
                                            Descripcion de producto
                                        </label>
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            value={this.state.formDescripcion}
                                            onChange={this.handleChangeDescp}
                                        ></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">
                                            Precio
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={this.state.formPrecio}
                                            onChange={this.handleChangePreci}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">
                                            Cantidad
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={this.state.formCantidad}
                                            onChange={this.handleChangeCantidad}
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                    >
                                        Cancelar
                                    </button>
                                    {this.state.edit ? (
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() =>
                                                this.sendNetworkUpdate()
                                            }
                                        >
                                            Actualizar
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() =>
                                                this.sendNetworkProduct()
                                            }
                                        >
                                            Guardar
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

if (document.getElementById("producto")) {
    ReactDOM.render(<Producto />, document.getElementById("producto"));
}
