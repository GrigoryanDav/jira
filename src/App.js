import { Register, Login } from "./pages/auth"
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom'
import { ROUTE_CONSTANTS } from "./core/utils/constants"
import MainLayout from './components/layouts/Main'
import LoadingWrapper from "./components/sheard/LoadingWrapper"
import Profile from "./pages/profile"
import CabinetLayout from "./components/layouts/Cabinet"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchUserProfileInfo } from "./state-managment/slices/userProfile"
import './styles/global.css'




const App = () => {
    const { loading, authUserInfo: { isAuth } } = useSelector((store) => store.userProfile)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUserProfileInfo())
    }, [dispatch])


    return (
            <LoadingWrapper loading={loading}>
                <RouterProvider
                    router={
                        createBrowserRouter(
                            createRoutesFromElements(
                                <Route path="/" element={<MainLayout />}>
                                    <Route path={ROUTE_CONSTANTS.LOGIN} element={isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET} /> : <Login />} />
                                    <Route path={ROUTE_CONSTANTS.REGISTER} element={isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET} /> : <Register />} />

                                    <Route
                                        path={ROUTE_CONSTANTS.CABINET}
                                        element={isAuth ? <CabinetLayout /> : <Navigate to={ROUTE_CONSTANTS.LOGIN} />}
                                    >
                                        <Route
                                            path={ROUTE_CONSTANTS.PROFILE}
                                            element={<Profile />}
                                        />
                                    </Route>
                                </Route>
                            )
                        )
                    }
                />
            </LoadingWrapper>
    )
}

export default App