import React from "react";
import "../styles/signin.css"
import Logo from '../../images/logo.png';

class Verificacion extends React.Component {
    render() {
        return (
            <div className="altura">
                <div className="card centro shadow-lg px-4 pb-4 mx-auto my-5 cont">
                    <div className="text-center">
                        <img src={Logo} alt="Logo" className="mx-auto my-3"></img>
                    </div>
                    <h2 className="card-title text-center pb-2">Verificar Clínica</h2>
                    <div className="card-body ">
                        <form>
                            <div className="form-group row">
                            <label className="col-form-label col-sm-4">Ingresar código de verificacion</label>
                                <div className="col-sm-8 my-auto">
                                    <input
                                        id=""
                                        type="text"
                                        className="form-control"
                                        placeholder="Código de verificacion"
                                        required
                                        /*onChange={this.handleChange}
                                        value={this.state.signin.nbClinic}*/
                                        name=""
                                    />
                                </div>
                            </div>
                            <input
                                type="submit"
                                className="py-3 mt-2 btn btn-success btn-lg float-lg-right"
                                value="Verificar"
                                id="boton"
                            />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Verificacion;