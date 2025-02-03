import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
import { setNotification } from '../reducers/notificationReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        event.preventDefault()

        const filter = event.target.value

        dispatch(setFilter(filter))
        dispatch(setNotification(`filter is set to ${filter}`))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter