import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import ReactDOM from "react-dom";

import "../styles/login.css";
import "../styles/loadAnimation.css";
import Logo from "../../images/logo plus.png";
import axios from 'axios';
import {apiUrl} from '../../variables/services';

import Dashboard from '../Dashboard/dashboard';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      loading: false
    }

    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const token = sessionStorage.getItem("token");

    if(token !== null) {
      ReactDOM.render(
        <Router>
          <Switch>
            <Route path="/one-medical" component={ Dashboard } key={1}/>
            <Redirect from="/" to="/one-medical/calendario" key={0} />
          </Switch>
        </Router>,
        document.getElementById('root')
      );
    }
  }

  handleChangeUserName(event) {
    this.setState({
      userName: event.target.value
    });
  }

  handleChangePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({loading: true});

    const {userName, password} = this.state;
    
    axios.post(`${apiUrl}Account/Login`, {
        userName: userName,
        password: password
      })
      .then(res => {
        this.setState({loading: false});
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));

        ReactDOM.render(
          <Router>
            <Switch>
              <Route path="/one-medical" component={ Dashboard } key={1}/>
              <Redirect from="/" to="/one-medical/calendario" key={0} />
            </Switch>
          </Router>,
          document.getElementById('root')
        );
      })
      .catch(error => {
        const div = document.getElementById('fondo');
        
        if(div !== null) {
          this.setState({loading: false});
          div.classList.add('shake');
          div.classList.add('shake-constant');

          setTimeout(() => {
            div.classList.remove('shake');
            div.classList.remove('shake-constant');
          }, 500);
        }
      })
  }

  render() {
    const {loading} = this.state;
    return (
      <div className="divFondo-login">
        <div id="fondo" className="div-vibration">
          <div className="CuadroLogin fadeInDown-login">
            <div id="Logo-login">
              <img src={Logo} alt="Logo"></img>
              <h1>One Medical</h1>
            </div>
            <form id="form_f-login" onSubmit={this.handleSubmit}>
              <div className="Form-login">
                <label>Usuario</label>
                <input
                  id="userName"
                  type="text"
                  className="form-control"
                  placeholder="Usuario*"
                  name="userName"
                  onChange={this.handleChangeUserName}
                  required
                />
                <label>Contraseña</label>
                <input
                  type="password"
                  id="userPass"
                  placeholder="Contraseña*"
                  className="form-control"
                  name="userPass"
                  onChange={this.handleChangePassword}
                  required
                ></input>
              </div>
              <div className="buttons-login btn-lg">
                <input
                  type="submit"
                  value="Ingresar"
                  className="btn"
                  id="ingresar"
                ></input>
              </div>
            </form>
            <div id="formFooter">
              <a className="underlineHover" href="#!">Recuperar contraseña</a>
            </div>
            {loading ? (
              <div className="gooey">
                <span className="dot"></span>
                <div className="dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
