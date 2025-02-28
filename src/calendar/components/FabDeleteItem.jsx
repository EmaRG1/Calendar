import { useCalendarStore } from "../../hooks/useCalendarStore"

const FabDeleteItem = () => {
  const {  startDeletingEvent, activeEvent } = useCalendarStore();
  const handleDelete = () => {
    startDeletingEvent();
  }

  return (
    <button onClick={handleDelete} className="btn btn-danger fab-delete" style={{display: activeEvent ? '' : 'none'}}>
      <i className="fa-trash-alt fas"></i>
    </button>
  )
}

export default FabDeleteItem