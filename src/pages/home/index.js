import { Link } from 'react-router-dom'
import { ROUTE_CONSTANTS } from '../../core/utils/constants'
import HomeBackgroundImg from '../../core/images/home_background.webp'
import './index.css'


const Home = () => {
    return (
        <div className="home_container" style={{ background: `url(${HomeBackgroundImg})` }}>
            <div>
                <h1> <span>Task</span>  <span>Managment</span> <span>App</span></h1>
                <Link to={ROUTE_CONSTANTS.REGISTER}><button className='home_button'>Get Started</button></Link>
            </div>
        </div>
    )
}

export default Home