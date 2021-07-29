import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Band } from '../interfaces/Band';

export const BandList = () => {
  
  const [ bands, setBands ] = useState<Band[]>( [] );
  const { socket } = useContext( SocketContext );

  const handleChange = ( event: React.ChangeEvent<HTMLInputElement>, id: string ) => {
    const newName = event.target.value;

    setBands( bands => bands.map( band => {
      if( band.id === id ) {
        band.name = newName;
      }

      return band;
    }));
  }

  const onLostFocus = ( id: string, name: string ) => {
    // Disparar el evento del socket
    socket.emit('change-band-name', {
      id,
      nombre: name,
    });
  }

  const votarBanda = ( id: string ) => {
    socket.emit('vote-band', id);
  }

  const borrarBanda = ( id: string ) => {
    socket.emit('delete-band', id);
  }

  useEffect(() => {
    socket.on('current-bands', ( bands ) => {
      setBands( bands );
    });

    return () => {
      socket.off('current-bands')
    };
  }, [ socket ]);

  const createRows = () => {
    return (

      bands.map( band => (
        <tr key={ band.id }>
          <td>
            <button 
              className='btn btn-primary'
              onClick={ () => votarBanda( band.id ) }
              type='button'
            >
              +1
            </button>
          </td>
          <td>
            <input 
              type="text" 
              className='form-control'
              value={ band.name }
              onChange={ ( event ) => handleChange( event, band.id ) }
              onBlur={ () => onLostFocus( band.id, band.name ) }
            />
          </td>
          <td>
            <h3> { band.votes } </h3>
          </td>
          <td>
            <button 
              className='btn btn-danger'
              onClick={ () => borrarBanda( band.id ) }
            >
              Borrar
            </button>
          </td>
        </tr>
      ))

    );
  }

  return (
    <div>
      <table className='table table-stripped'>
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>

        <tbody>
          { createRows() }
        </tbody>

      </table>
    </div>
  )
}
