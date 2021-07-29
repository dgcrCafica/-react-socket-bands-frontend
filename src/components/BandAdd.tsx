import React, { useContext, useState } from 'react';
import { SocketContext } from '../context/SocketContext';

export const BandAdd = () => {

  const [ valor, setValor ] = useState('');
  const { socket } = useContext( SocketContext )

  const handleSubmit = ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();

    if( valor.trim().length > 0 ) {
      // Emitir el evento
      socket.emit('create-band', {
        nombre: valor
      });
      setValor('');
    }
  }

  const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    setValor( e.target.value );
  }

  return (
    <div>
      <h3>Agregar Banda</h3>

      <form onSubmit={ handleSubmit }>
        <input 
          type="text" 
          className='form-control'  
          placeholder='Nuevo nombre de la banda'
          onChange={ handleChange }
        />
      </form>
    </div>
  )
}
