import { addHours } from 'date-fns';
import { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const initialForm = {
  title: 'Emanuel',
  notes: 'Rojas',
  start: new Date(),
  end: addHours(new Date(), 2)
}


export const CalendarModal = () => {

  const [isOpen, setIsOpen] = useState(true);

  const [formValues, setFormValues] = useState(initialForm)


  const onInputChange = ({target}) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const onCloseModal = () => {
    console.log('cerrando el modal')
    setIsOpen(false);
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className='modal'
      overlayClassName='modal-fondo'
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container">

          <div className="form-group mb-2">
            <label>Fecha y hora inicio</label>
            <input className="form-control" placeholder="Fecha inicio" /> 
          </div>

          <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
              <input className="form-control" placeholder="Fecha inicio" /> 
          </div>

          <hr />
          <div className="form-group mb-2">
              <label>Titulo y notas</label>
              <input 
                  type="text" 
                  className="form-control"
                  placeholder="Título del evento"
                  name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
              />
              <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
          </div>

          <div className="form-group mb-2">
              <textarea 
                  type="text" 
                  className="form-control"
                  placeholder="Notas"
                  rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
              ></textarea>
              <small id="emailHelp" className="form-text text-muted">Información adicional</small>
          </div>

          <button
              type="submit"
              className="btn-block btn-outline-primary btn"
          >
              <i className="fa-save far"></i>
              <span> Guardar</span>
          </button>

      </form>

    </Modal>
  )
}
