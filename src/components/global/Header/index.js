import { ROUTE_CONSTANTS } from "../../../core/utils/constants";
import { Link } from "react-router-dom";
import { Flex, Button } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import AuthProfileDropDown from '../../sheard/AuthProfileDropDown'
import './index.css'


const Header = () => {
    const { isAuth, userProfileInfo } = useContext(AuthContext)
    return (
        <div className="main_header">
            <Flex justify="space-between" align="center">
                <p>Logo</p>

                <div>
                    {
                        isAuth ? <AuthProfileDropDown userProfileInfo={userProfileInfo} /> : <Link to={ROUTE_CONSTANTS.LOGIN}><Button>Sign In</Button></Link>
                    }
                </div>
            </Flex>
        </div>
    )
}

export default Header