

const FabAddNew = ({ onOpenModalWithEmptyEvent }) => {
  
  //TODO: set empty activeEvent
  return (
    <button onClick={onOpenModalWithEmptyEvent} className="btn btn-primary fab">
      <i className="fas fa-plus"></i>
    </button>
  )
}

export default FabAddNew