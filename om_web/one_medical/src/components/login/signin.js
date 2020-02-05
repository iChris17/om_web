import React from "react";
import "../styles/signin.css"
import Logo from '../../images/logo.png';
import {apiUrl} from '../../variables/services';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import ReactDOM from "react-dom";
import Verificacion from './verificacion';

const stateinicial = {
    signin: {
        nbClinic: "",
        vlDescripcion: "",
        vlEmail: "",
        nbOwner: "",
        vlAddress: "",
        vlRuc: "",
        vlCity: "",
        vlImageLg: "",
        vlImageSm: "",
        vlPhone: ""
    },
    error: false
};
const axios = require("axios");

class Signin extends React.Component {
    
    constructor (props){
        super(props)
        this.state={...stateinicial}
    }

    handleChange = e => {
        this.setState({
            signin: {
                ...this.state.signin,
                [e.target.name]: e.target.value
            }
        });
    };

    onChangelg(e) {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        let fileinput = document.getElementById('lg_image');
        let nombre = fileinput.files[0].name;
        let lgimagename = document.getElementById('nombre_lg_image');
        lgimagename.innerHTML = nombre;

        reader.onload = (e) => {
            let result = e.target.result.split(',')[1];
            this.setState({
                signin: {       
                    ...this.state.signin,             
                    vlImageLg: result                    
                }                
            });
        }
    }
    onChangesm(e) {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        let fileinput = document.getElementById('sm_image');
        let nombre = fileinput.files[0].name;
        let smimagename = document.getElementById('nombre_sm_image');
        smimagename.innerHTML = nombre;

        reader.onload = (e) => {
            let result = e.target.result.split(',')[1];
            this.setState({
                signin: {       
                    ...this.state.signin,             
                    vlImageSm: result                    
                }                
            });
        }
    }

    handleSubmit = e => {
        e.preventDefault();

        const {nbClinic,vlDescripcion,vlEmail,nbOwner,vlAddress,vlRuc,vlCity,vlImageLg,vlImageSm,vlPhone} = this.state.signin;
        if (
            nbClinic.trim() === "" ||
            vlDescripcion.trim() === "" ||
            vlEmail.trim() === "" ||
            nbOwner.trim() === "" ||
            vlAddress.trim() === "" ||
            vlRuc.trim() === "" ||
            vlCity.trim() === "" ||
            vlImageLg.trim() === "" ||
            vlImageSm.trim() === "" ||
            vlPhone.trim() === ""
        ) {
            this.setState({
                error: true
            });
            return
        }

        const Nuevostate = { ...this.state.signin };
        Nuevostate.id = 0;
        console.log('El estado que se envia es',Nuevostate);
        let promise = axios.post(`${apiUrl}Clinics`, Nuevostate);

        promise
            .then(e => {
                Nuevostate.id = e.data.id;
                //this.props.CrearNuevoPaciente(Nuevostate);
                this.setState({ error: false });
                console.log('Entro a la promesa');
                ReactDOM.render(
                    <Router>
                      <Switch>
                        <Route path="/one-medical" component={ Verificacion } key={1}/>
                        <Redirect from="/" to="/one-medical/verificacion" key={0} />
                      </Switch>
                    </Router>,
                    document.getElementById('root')
                  );
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
            <div className="altura">
                <div className="card centro shadow-lg px-4 pb-4 mx-auto my-5 cont">
                    <div className="text-center">
                        <img src={Logo} alt="Logo" className="mx-auto my-3"></img>
                    </div>
                    <h2 className="card-title text-center pb-2">Nuevo consultorio</h2>
                    <div className="card-body ">
                        <form onSubmit={this.handleSubmit}>
                            <h4>Datos de la Clínica</h4>
                            <div className="form-group row">
                                <label className="col-form-label col-sm-4">Nombre de la clínica</label>
                                <div className="col-sm-8 my-auto">
                                    <input
                                        id="nb_clinica"
                                        type="text"
                                        className="form-control"
                                        placeholder="Nombre de la clínica"
                                        required
                                        onChange={this.handleChange}
                                        value={this.state.signin.nbClinic}
                                        name="nbClinic"
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-form-label col-sm-4">Descripción</label>
                                <div className="col-sm-8 my-auto">
                                    <textarea
                                        id="rtbox"
                                        className="form-control"
                                        placeholder="Descripción"
                                        rows="5"
                                        onChange={this.handleChange}
                                        value={this.state.signin.vlDescripcion}
                                        name="vlDescripcion"
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-form-label col-sm-4">Teléfono</label>
                                <div className="col-sm-8 my-auto">
                                    <input
                                        id="phone"
                                        type="tel"
                                        className="form-control"
                                        placeholder="Teléfono"
                                        required
                                        onChange={this.handleChange}
                                        value={this.state.signin.vlPhone}
                                        name="vlPhone"
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-form-label col-sm-4">Dirección</label>
                                <div className="col-sm-8 my-auto">
                                    <input
                                        id="address"
                                        type="text"
                                        className="form-control"
                                        placeholder="Dirección"
                                        required
                                        onChange={this.handleChange}
                                        value={this.state.signin.vlAddress}
                                        name="vlAddress"
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-form-label col-sm-4">RUC</label>
                                <div className="col-sm-8 my-auto">
                                    <input
                                        id="vl_ruc"
                                        type="text"
                                        className="form-control"
                                        placeholder="RUC"
                                        required
                                        onChange={this.handleChange}
                                        value={this.state.signin.vlRuc}
                                        name="vlRuc"
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-form-label col-sm-4">Ciudad</label>
                                <div className="col-sm-8 my-auto">
                                    <input
                                        id="city"
                                        type="text"
                                        className="form-control"
                                        placeholder="Ciudad"
                                        required
                                        onChange={this.handleChange}
                                        value={this.state.signin.vlCity}
                                        name="vlCity"
                                    />
                                </div>
                            </div>
                            <hr />
                            <h4>Correo</h4>
                            <div className="form-group row">
                                <label className="col-form-label col-sm-4">E-mail</label>
                                <div className="col-sm-8 my-auto">
                                    <input
                                        id="correo"
                                        type="email"
                                        className="form-control"
                                        placeholder="Correo de registro"
                                        required
                                        onChange={this.handleChange}
                                        value={this.state.signin.vlEmail}
                                        name="vlEmail"
                                    />
                                </div>
                            </div>
                            <hr />
                            <h4>Datos del propietario</h4>
                            <div className="form-group row">
                                <label className="col-form-label col-sm-4">Propietario</label>
                                <div className="col-sm-8 my-auto">
                                    <input
                                        id="owner"
                                        type="text"
                                        className="form-control"
                                        placeholder="Nombre del propietario"
                                        required
                                        onChange={this.handleChange}
                                        value={this.state.signin.nbOwner}
                                        name="nbOwner"
                                    />
                                </div>
                            </div>
                            <hr />
                            <h4>Imágenes</h4>
                            <div className="form-group row">
                                <label className="col-form-label col-sm-3">Imágen Grande</label>
                                <div className="input-group col-sm-9 my-auto">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="inputGroupFileAddon01">Cargar Imágen</span>
                                    </div>
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="lg_image"
                                            aria-describedby="inputGroupFileAddon01" accept=".jpg,.jpeg,.png"
                                            onChange={(e) => this.onChangelg(e)} 
                                             />
                                        <label className="custom-file-label" id="nombre_lg_image" htmlFor="inputGroupFile01">Buscar</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-form-label col-sm-3">Imágen Pequeña</label>
                                <div className="input-group col-sm-9 my-auto">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="inputGroupFileAddon02">Cargar Imágen</span>
                                    </div>
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="sm_image"
                                            aria-describedby="inputGroupFileAddon02" accept=".jpg,.jpeg,.png"
                                            onChange={(e) => this.onChangesm(e)}/>
                                        <label className="custom-file-label" id="nombre_sm_image" htmlFor="inputGroupFile01">Buscar</label>
                                    </div>
                                </div>
                            </div>
                            <input
                                type="submit"
                                className="py-3 mt-2 btn btn-success btn-lg float-lg-right"
                                value="Agregar"
                                id="boton"
                            />
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}
export default Signin;