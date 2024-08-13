import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentsList, onFavStar} = props
  const {name, date, isStarred, id} = appointmentsList

  const onFavorite = () => {
    onFavStar(id)
  }

  const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const starIcon = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-container">
      <div className="heading-container">
        <p className="name">{name}</p>
        <button
          className="stars-button"
          onClick={onFavorite}
          type="button"
          data-testid="star"
        >
          <img src={starIcon} alt="star" className="star-icon" />
        </button>
      </div>
      <p className="date">{`Date:${formattedDate}`}</p>
    </li>
  )
}

export default AppointmentItem
