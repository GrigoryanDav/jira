import { Register, Login } from "./pages/auth"
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom'
import { ROUTE_CONSTANTS } from "./core/utils/constants"
import MainLayout from './components/layouts/Main'
import LoadingWrapper from "./components/sheard/LoadingWrapper"
import Cabinet from "./pages/cabinet"
import Profile from "./pages/profile"
import { auth } from "./services/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { AuthContext } from "./context/authContext"
import './styles/global.css'



const App = () => {
    const [isAuth, setIsAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setLoading(false)
            setIsAuth(Boolean(user))
        });
    }, []);
    return (
        <AuthContext.Provider value={{ isAuth }}>
            <LoadingWrapper loading={loading}>
                <RouterProvider
                    router={
                        createBrowserRouter(
                            createRoutesFromElements(
                                <Route path="/" element={<MainLayout />}>
                                    <Route path={ROUTE_CONSTANTS.LOGIN} element={isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET} /> : <Login />} />
                                    <Route path={ROUTE_CONSTANTS.REGISTER} element={isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET} /> : <Register />} />
                                    <Route path={ROUTE_CONSTANTS.CABINET} element={isAuth ? <Cabinet /> : <Navigate to={ROUTE_CONSTANTS.LOGIN} />} />
                                    <Route path={ROUTE_CONSTANTS.PROFILE} element={isAuth ? <Profile /> : <Navigate to={ROUTE_CONSTANTS.LOGIN} />} />
                                </Route>
                            )
                        )
                    }
                />
            </LoadingWrapper>
        </AuthContext.Provider>
    )
}

export default App