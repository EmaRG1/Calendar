import { addHours, differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore} from '../../hooks/useCalendarStore';


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
  title: '',
  notes: '',
  start: new Date(),
  end: addHours(new Date(), 2)
}


export const CalendarModal = () => {

  const [formValues, setFormValues] = useState(initialForm);

  const [formSubmitted, setFormSubmitted] = useState(false);

  registerLocale('es', es);

  const { isDateModalOpen, closeModal } = useUiStore();
  const { activeEvent, startSavingEvent, setActiveDateEvent } = useCalendarStore();

  useEffect(() => {
    if (activeEvent !== null) { 
      setFormValues({...activeEvent})
    }
   }, [activeEvent])

  const titleClass = useMemo(() => {
    if ( !formSubmitted ) return '';

    return (formValues.title.length > 0)
    ? ''
      : 'is-invalid'
    
  }, [formValues.title, formSubmitted]);

  const onInputChange = ({target}) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const onDateChange = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event
    })
  }
  const onCloseModal = () => {
    closeModal();
    setActiveDateEvent(null);
    setFormValues(initialForm);
    setFormSubmitted(false);
  }


  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true); 

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (difference <= 0 || isNaN(difference)) {
      Swal.fire('Error', 'La fecha fin debe ser mayor a la fecha de inicio', 'error');
      return;
    };

    if(formValues.title.length <=0 ) return console.log('Error en el titulo');
    
    startSavingEvent(formValues);
    closeModal();
  }

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal} 
      style={customStyles}
      className='modal'
      overlayClassName='modal-fondo'
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>

        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            selected={formValues.start}
            className='form-control'
            onChange={(event) => onDateChange(event, 'start')}
            dateFormat='Pp'
            showTimeSelect
            locale='es'
            timeCaption='Hora'
          /> 
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            className='form-control'
            onChange={(event) => onDateChange(event, 'end')}
            dateFormat='Pp'
            showTimeSelect
            locale='es'
            timeCaption='Hora'
          />  
        </div>

          <hr />
          <div className="form-group mb-2">
              <label>Titulo y notas</label>
              <input 
                  type="text" 
                  className={`form-control ${titleClass}`}
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