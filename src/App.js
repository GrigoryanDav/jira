import { Register, Login } from "./pages/auth"
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom'
import { ROUTE_CONSTANTS } from "./core/utils/constants"
import MainLayout from './components/layouts/Main'
import Cabinet from "./pages/cabinet"
import { auth } from "./services/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import './styles/global.css'


const App = () => {
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setIsAuth(Boolean(user))
        });
    }, []);
    return (
        <RouterProvider
            router={
                createBrowserRouter(
                    createRoutesFromElements(
                        <Route path="/" element={<MainLayout />}>
                            <Route path={ROUTE_CONSTANTS.LOGIN} element={isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET} /> : <Login />} />
                            <Route path={ROUTE_CONSTANTS.REGISTER} element={isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET} /> : <Register />} />
                            <Route path={ROUTE_CONSTANTS.CABINET} element={isAuth ? <Cabinet /> : <Navigate to={ROUTE_CONSTANTS.LOGIN} />} />
                        </Route>
                    )
                )
            }
        />
    )
}

export default App