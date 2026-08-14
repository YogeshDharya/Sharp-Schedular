import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import RoomDetails from "./pages/RoomDetails";
import Reservations from "./pages/Reservations";

function App() {
    return (
        <>
            <Navbar />

            <main className="page-container">

                <Routes>

                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/rooms"
                        element={<Rooms />}
                    />

                    <Route
                        path="/rooms/:id"
                        element={<RoomDetails />}
                    />

                    <Route
                        path="/reservations"
                        element={<Reservations />}
                    />

                </Routes>

            </main>
        </>
    );
}

export default App;