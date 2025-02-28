import { useCalendarStore } from "../../hooks/useCalendarStore"

const FabDeleteItem = ({isModalOpen}) => {
  const {  startDeletingEvent, activeEvent } = useCalendarStore();
  const handleDelete = () => {
    startDeletingEvent();
  }

  console.log(isModalOpen)

  return (
    <button onClick={handleDelete} className="btn btn-danger fab-delete" style={{display: (activeEvent && !isModalOpen) ? '' : 'none'}}>
      <i className="fa-trash-alt fas"></i>
    </button>
  )
}

export default FabDeleteItem