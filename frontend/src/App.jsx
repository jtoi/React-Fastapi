import React from "react";
import { Routes, Route} from "react-router-dom"; 
import { UserProvider } from './contexts/UserContext'; // Importa el UserProvider
import { ProtectedRoute } from "./components/protectedRoute";
import { AppInitializer } from './components/AppInitializer';

import "./styles/App.css";
import "./styles/var2.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { Home } from "./pages/main/Home";
import { Header } from "./pages/main/Header";
import { Footer } from "./pages/main/Footer";
import { Users } from "./pages/users/Users";
import { Login } from "./pages/users/Login";
import { Logout } from "./pages/users/Logout";

export function App() {
    return (
            <UserProvider> {/* Envuelve tu aplicación con UserProvider */}
                <AppInitializer>
                    <div>
                        <div className="fluid">
                            <Header />
                        </div>
                        <main className="container mt-4">
                            <Routes>
                                <Route element={<ProtectedRoute />} >
                                    <Route path="/" element={<Home />} />
                                    <Route path="/users" element={<Users />} />
                                    <Route path="/logout" element={<Logout />} />
                                </Route>
                                <Route path="/login" element={<Login />} />
                            </Routes>
                        </main>
                        <div className="container">
                            <Footer />
                        </div>
                    </div>
                </AppInitializer>
            </UserProvider>
    );
}