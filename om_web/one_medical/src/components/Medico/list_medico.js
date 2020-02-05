import React from 'react';
import Consultorio from './viewconsultorio';

const listmedico = ({ consultorios }) => {
    /*const Mensaje =
    Object.keys(consultorios).length === 0
      ? "No hay consultorios"
      : "Administra los consultorios aqui";*/
  return (
    <div className="card mt-2 py-5">
      <div className="card-body">
        <h2 className="card-title text-center">{Mensaje}</h2>
        <div className="lista-consultorio">
          <div className="media mt-3">
            <div className="media-body table-responsive" >
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="ocultarID">ID</th>
                    <th scope="col">Nombre Completo</th>
                    <th scope="col">Identificación</th>
                    <th scope="col">Fecha de nacimiento</th>
                  </tr>
                </thead>
                <tbody>
                  {consultorios.map(consultorios => (
                    <Consultorio
                      key={consultorios.id}
                      consultorios={consultorios}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default listmedico;