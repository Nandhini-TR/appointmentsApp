import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {appointmentsList: [], name: '', date: '', activeStarredButton: false}

  starredAppointments = () => {
    this.setState(prevState => ({
      activeStarredButton: !prevState.activeStarredButton,
    }))
  }

  onFavStar = id => {
    const {appointmentsList} = this.state
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))

    console.log(appointmentsList)
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {name, date} = this.state
    const newAppointmet = {
      id: uuidv4(),
      name,
      date,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointmet],
      name: '',
      date: '',
    }))
  }

  addTitle = event => {
    this.setState({name: event.target.value})
  }

  addDate = event => {
    this.setState({date: event.target.value})
  }

  getFilteredAppointment = () => {
    const {appointmentsList, activeStarredButton} = this.state
    if (activeStarredButton) {
      return appointmentsList.filter(appointment => appointment.isStarred)
    }
    return appointmentsList
  }

  render() {
    const {name, date, activeStarredButton} = this.state
    const filteredAppointmentList = this.getFilteredAppointment()

    const activeStar = activeStarredButton ? 'star-button' : 'starred-button'

    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="add-image-appointment-container">
            <div className="add-appointment-container">
              <h1 className="heading">Add Appointment</h1>
              <form className="form-container" onSubmit={this.onAddAppointment}>
                <label htmlFor="Title" className="title-label">
                  TITLE
                </label>
                <input
                  value={name}
                  id="Title"
                  className="input-title"
                  onChange={this.addTitle}
                />
                <label htmlFor="Date" className="date-label">
                  DATE
                </label>
                <input
                  id="Date"
                  type="date"
                  className="date-input"
                  value={date}
                  onChange={this.addDate}
                />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-image"
            />
          </div>
          <hr className="seperator" />
          <div className="appointments-container">
            <h1 className="appointment-heading">Appointments</h1>
            <button
              className={activeStar}
              type="button"
              onClick={this.starredAppointments}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-list">
            {filteredAppointmentList.map(eachAppointment => (
              <AppointmentItem
                appointmentsList={eachAppointment}
                key={eachAppointment.id}
                onFavStar={this.onFavStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
