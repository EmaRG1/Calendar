const FabAddNew = ({ onOpenModalWithEmptyEvent }) => {
  

  return (
    <button onClick={onOpenModalWithEmptyEvent} className="btn btn-primary fab">
      <i className="fas fa-plus"></i>
    </button>
  )
}

export default FabAddNew