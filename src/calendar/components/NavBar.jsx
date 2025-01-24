
export const NavBar = () => {
  return (
    <div className="bg-dark mb-4 px-4 navbar navbar-dark">
      <span className="navbar-brand">
        <i className="fa-calendar-alt fas"></i>
        &nbsp;
        Emanuel
      </span>

      <button className="btn btn-outline-danger">
        <i className="fa-sign-out-alt fas"></i>
        &nbsp;
        <span>Salir</span>
      </button>

    </div>
  )
}
