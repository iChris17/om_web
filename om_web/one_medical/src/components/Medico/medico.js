import React from "react";
//import ReactDOM from "react-dom";
import "../styles/Medico.css";
import { apiUrl } from '../../variables/services';

const stateinicial = {
    personal: {
        idTpPersonal: 1,
        firstname: "",
        middlename: "",
        lastname: "",
        dni: "",
        phonenumber: "",
        email: "",
        gender: "",
        vlBirthdate: ""
    },
    error: false
};

const token = sessionStorage.getItem('token')
const axios = require("axios");

class Medico extends React.Component {
    constructor(props) {
        super(props)
        this.state = { ...stateinicial }
    }
    async componentDidMount() {        
        let promise = axios.get(`${apiUrl}TpPersonals`, { headers: {'Authorization': "bearer " + token}});
        let dataSelect;
        promise.then(d => {
            console.log(d.data);
            dataSelect = d.data;
            let select = document.getElementsByTagName("select")[0];
            for (var value in dataSelect) {
                let options = document.createElement("option");
                options.text = dataSelect[value].name;
                options.value = dataSelect[value].id;
                console.log(options);
                select.add(options);
            }
        });
    }

    handleChange = e => {
        //console.log(e.target.name + ":" + e.target.value);
        this.setState({
            personal: {
                ...this.state.personal,
                [e.target.name]: e.target.value
            }
        });
    };
    handleSubmit = e => {
        e.preventDefault(e);

        const { idTpPersonal, firstname, middlename, lastname, dni, phonenumber, email, gender, vlBirthdate } = this.state.personal;
        if (
            idTpPersonal === null ||
            firstname.trim() === "" ||
            middlename.trim() === "" ||
            lastname.trim() === "" ||
            dni.trim() === "" ||
            phonenumber.trim() === "" ||
            email.trim() === "" ||
            gender === null ||
            vlBirthdate.trim() === ""
        ) {
            console.log("error de validacion")
            this.setState({
                error: true
            });
            return
        }

        const Nuevostate = { ...this.state.personal };
        Nuevostate.id = 0;

        //Para que funcione
        const DataJSON = {
            idTpPersonal: Number(Nuevostate.idTpPersonal),
            firstname: Nuevostate.firstname,
            middlename: Nuevostate.middlename,
            lastname: Nuevostate.lastname,
            dni: Nuevostate.dni,
            phonenumber: Nuevostate.phonenumber,
            email: Nuevostate.email,
            gender: Nuevostate.gender,
            vlBirthdate: Nuevostate.vlBirthdate
        }

        console.log('El estado que se envia es', DataJSON);
        let promise = axios.post(`${apiUrl}Personals`, DataJSON, { headers: {'Authorization': "bearer " + token}});

        promise
            .then(e => {
                Nuevostate.id = e.data.id;
                //this.props.CrearNuevoPaciente(Nuevostate);
                this.setState({ error: false });
                console.log('Entro a la promesa');
            })
            .catch(e => {
                console.log(e);
                console.log(e.message);
                this.setState({ error: true });
            })

        this.setState({ ...stateinicial });
    };
    render() {
        return (
            <div className="card mx-5 my-5 roundabout shadow-lg" id="container">
                <div className="card-body">
                    <h2 className="card-title text-center mb-5">Personal</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                                Primer Nombre
              </label>
                            <div className="col-sm-4 ">
                                <input
                                    id="firstname"
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre"
                                    onChange={this.handleChange}
                                    value={this.state.personal.firstname}
                                    name="firstname"
                                />
                            </div>

                            <label className=" col-sm-2 col-form-label">
                                Segundo nombre
              </label>
                            <div className="col-sm-4 ">
                                <input
                                    id="middlename"
                                    type="text"
                                    className="form-control"
                                    placeholder="Segundo nombre"
                                    onChange={this.handleChange}
                                    value={this.state.personal.middlename}
                                    name="middlename"
                                />
                            </div>
                        </div>

                        {/* form-group */}

                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-2 col-form-label">
                                Apellido
              </label>
                            <div className="col-sm-8 col-lg-4">
                                <input
                                    id="lastname"
                                    type="text"
                                    className="form-control"
                                    placeholder="Apellido"
                                    onChange={this.handleChange}
                                    value={this.state.personal.lastname}
                                    name="lastname"
                                />
                            </div>

                            <label className="col-sm-4 col-lg-2 col-form-label">
                                Identificación
              </label>
                            <div className="col-sm-8 col-lg-4">
                                <input
                                    id="dni"
                                    type="text"
                                    className="form-control"
                                    placeholder="Identificación"
                                    pattern="[0-9]{3}-[0-9]{6}-[0-9]{4}[A-Z]{1}"
                                    onChange={this.handleChange}
                                    value={this.state.personal.dni}
                                    name="dni"
                                />
                            </div>
                        </div>
                        {/* form-group */}
                        <div className="form-group row">
                            <label className="col-sm-1 col-form-label">E-mail</label>
                            <div className="col-sm-5">
                                <input
                                    id="email"
                                    className="form-control"
                                    type="email"
                                    placeholder="E-mail"
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                    onChange={this.handleChange}
                                    value={this.state.personal.email}
                                    name="email"
                                ></input>
                            </div>
                            <label className="col-sm-2 col-form-label">Fecha de nacimiento</label>
                            <div className="col-sm-4 ">
                                <input
                                    id="age"
                                    type="date"
                                    className="form-control"
                                    onChange={this.handleChange}
                                    value={this.state.personal.vlBirthdate}
                                    name="vlBirthdate"
                                />
                            </div>
                        </div>
                        {/* form-group */}
                        <div className="form-group row">

                        </div>
                        {/* form-group */}
                        <div className="form-group row">
                            <label className="col-sm-1 col-form-label">Género</label>
                            <div className="col-sm-1">
                                <input
                                    id="gender"
                                    type="text"
                                    className="form-control"
                                    placeholder="M/F*"
                                    required
                                    onChange={this.handleChange}
                                    value={this.state.personal.gender}
                                    name="gender"
                                />
                            </div>
                            <label className="col-sm-1 col-form-label">
                                Teléfono
              </label>
                            <div className="col-sm-3 ">
                                <input
                                    id="phonenumber"
                                    type="tel"
                                    className="form-control"
                                    onChange={this.handleChange}
                                    value={this.state.personal.phonenumber}
                                    name="phonenumber"
                                    placeholder="Teléfono"
                                ></input>
                            </div>
                            <label className="col-sm-2 col-form-label">
                                Tipo de Personal
              </label>
                            <div className="col-sm-4">
                                <select className="custom-select"
                                    /* value={this.state.personal.IdTpPersonal} */
                                    name="idTpPersonal"
                                    onChange={this.handleChange}>
                                    <option></option>
                                </select>
                            </div>
                        </div>
                        {/* form-group */}

                        <div className="form-group row">

                        </div>
                        {/* form-group */}
                        <input
                            type="submit"
                            className="py-3 mt-2 btn btn-success btn-lg float-lg-right"
                            value="Agregar"
                            id="boton"
                        />
                    </form>
                </div>
            </div>
        );
    }
}
export default Medico;