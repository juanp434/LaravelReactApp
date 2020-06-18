import React, { Component } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";

const baseUrl = "http://localhost:8000/";

export default class Producto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            producto: [],
            productoBackup:[],
            textBuscar:''
        };
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
                </tr>
            );
        });
    }

    filter(event){
      var text = event.target.value;
      const data = this.state.productoBackup;
     
      const newData = data.filter(function(item){
        // variable de titulo
        const itemDataTitulo = item.titulo.toUpperCase()
        // variable de descripcion
        const itemDataDesc = item.descripcion.toUpperCase()
        // juntar titulo y descripcion
        const itemData = itemDataTitulo+ " "+itemDataDesc
        // variable de buscar
        const textData= text.toUpperCase()
        // filtrar si es verdadero o no y lo devuelve
        return itemData.indexOf(textData) > -1 
      })

      this.setState({
        producto: newData,
        textBuscar: text
      })
    }

    render() {
        return (
            <div className="container">
                <h3>Laravel y React APIRest</h3>
                <hr />

                <input
                    className="form-control col-md-4"
                    placeholder="Buscar"
                    value={this.state.textBuscar}
                    onChange={textBuscar => this.filter(textBuscar)}
                />
                <br></br>
                <table className="table table-bordered order-table ">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Descripcion</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody id="bodytable">{this.listData()}</tbody>
                </table>
            </div>
        );
    }
}

if (document.getElementById("producto")) {
    ReactDOM.render(<Producto />, document.getElementById("producto"));
}
