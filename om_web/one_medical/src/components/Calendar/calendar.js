import React from "react";
//import ReactDOM from "react-dom";
import "../styles/calendar.css";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Autosuggest from 'react-autosuggest';
import Timekeeper from 'react-timekeeper';
import { apiUrl } from '../../variables/services';


var fecha;
const token = sessionStorage.getItem('token')
const axios = require("axios");
let pacients = [];
let promise = axios.get(`${apiUrl}Pacients`, { headers: { 'Authorization': "bearer " + token } });
promise.then(e => {
    pacients = e.data;
    //console.log(pacients);
    //console.log(e);
})
promise.catch(e => {
    console.log(e);
})

const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : pacients.filter(pac =>
        pac.firstname.toLowerCase().slice(0, inputLength) === inputValue);
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
    <div>
        {suggestion.firstname}
    </div>
);
export default class Calendar extends React.Component {
    property = {
        visible: true,
        modalisopen: false,
        value: '',
        suggestions: []

    }
    constructor() {
        super()
        this.state = {
            value: '',
            suggestions: [],
            cita: {

                idPersonal: null,
                idRoom: null,
                idPacient: null,
                dtAppointment: null,
                vlAppointmentHour: null,
                vlPrice: 0,
                active: 1,
                canceled: 0,
            },
            calendarEvents: [ ]
        }
    }

    cargarselect() {
        //console.log("Entro")
        let promise = axios.get(`${apiUrl}Personals`, { headers: { 'Authorization': "bearer " + token } });
        let dataSelect;
        promise.then(d => {
            //console.log(d.data);
            dataSelect = d.data;
            let select = document.querySelector("#doctor");
            //console.log(select);
            for (var value in dataSelect) {
                if (dataSelect[value].idTpPersonal === 1) {
                    //console.log("Crear la opcion " + dataSelect[value].firstname);
                    let options = document.createElement("option");
                    options.text = dataSelect[value].firstname;
                    options.value = dataSelect[value].id;
                    //console.log(options);
                    select.add(options);
                }
            }
        });
        //Rellenar Salas

        promise = axios.get(`${apiUrl}Rooms`, { headers: { 'Authorization': "bearer " + token } });
        promise.then(d => {
            //console.log(d.data);
            dataSelect = d.data;
            let select = document.querySelector("#Sala");
            for (var value in dataSelect) {
                let options = document.createElement("option");
                options.text = dataSelect[value].name;
                options.value = dataSelect[value].id;
                //console.log(options);
                select.add(options);
            }
        });
    }


    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    handleChange(e) {
        this.setState({
            ...this.state,
            cita: {
                [e.target.name]: e.target.value
            }
        })
        console.log(this.state.cita);
    }

    componentDidMount() {
        promise = axios.get(`${apiUrl}AppointmentRequests`, { headers: { 'Authorization': "bearer " + token } });
        let eventos = []
        let dataSelect
        promise.then(d => {
            console.log(d.data);
            dataSelect = d.data;
            let Appointmentsobj ={}
            dataSelect.map((u, i) => {
                console.log(u);
                Appointmentsobj={title: "Nombre: "+u.idPacientsNavigation.firstname +" "+u.idPacientsNavigation.lastname+" Especialidad: "+u.idSpecialityNavigation.name, 
                start: new Date(u.vlDate)}
                eventos.push(Appointmentsobj)
                console.log(Appointmentsobj)
            });
            this.setState({
                ...this.state,
                calendarEvents: eventos
            })
            console.log(this.state.calendarEvents);
        });
    }

    render() {
        const { value, suggestions } = this.state;

        return (
            <div className="card mx-5 my-5 px-5 py-5 roundabout shadow-lg" id="container">
                <FullCalendar defaultView="dayGridMonth" plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                    locale={esLocale} dateClick={this.handledateClick}
                    header={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek"
                    }}
                    events={this.state.calendarEvents} />
                <Modal isOpen={this.state.modalisopen} centered={true}
                    onOpened={this.cargarselect}>
                    <ModalHeader toggle={this.handledateClick.bind(this)}>Agregar Cita para el: {fecha}</ModalHeader>
                    <ModalBody>
                        <form>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">
                                    Doctor </label>
                                <div className="col-sm-10">
                                    <select className="custom-select" id="doctor"
                                        onChange={this.handleChange}>>
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">
                                    Sala </label>
                                <div className="col-sm-10">
                                    <select className="custom-select" id="Sala"
                                        onChange={this.handleChange}>>
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">
                                    Paciente
                                </label>
                                <div className="col-sm-4">
                                    <Autosuggest
                                        suggestions={suggestions}
                                        inputProps={{
                                            placeholder: 'Escriba para buscar un paciente',
                                            name: "pacient",
                                            id: "pacient",
                                            onChange: this.onChange,
                                            value,
                                            getSuggestionValue: this.getvalue
                                        }}
                                        onSuggestionsFetchRequested={
                                            //
                                            this.onSuggestionsFetchRequested
                                        }
                                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                        getSuggestionValue={getSuggestionValue}
                                        renderSuggestion={renderSuggestion} />
                                </div>

                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">
                                    Hora de cita
                                </label>
                                <div className="col-sm-10 my-auto">
                                    <Timekeeper
                                        time={this.state.time}
                                        className="mx-auto"
                                        coarseMinutes={15}
                                        forceCoarseMinutes
                                    />
                                </div>

                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary">Agregar</Button>
                        <Button color="secondary" onClick={this.handledateClick}>Cerrar</Button>
                    </ModalFooter>
                </Modal>
            </div>

        );
    }

    handledateClick = (arg) => {
        fecha = arg.dateStr
        this.setState({
            modalisopen: !this.state.modalisopen,
            cita: {
                dtAppointment: arg.date
            }
        });
    }

}