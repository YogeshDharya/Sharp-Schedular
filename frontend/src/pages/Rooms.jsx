import { useEffect, useState } from "react";

import RoomCard from "../components/RoomCard";
import { getRooms } from "../services/api";

function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadRooms = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getRooms();

                setRooms(data);
            } catch (err) {
                console.error(err);
                setError(
                    "Unable to load rooms. Make sure the API is running."
                );
            } finally {
                setLoading(false);
            }
        };

        loadRooms();
    }, []);

    if (loading) {
        return (
            <div className="container text-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </div>

                <p className="mt-3">
                    Loading rooms...
                </p>
            </div>
        );
    }

    return (
        <div className="container">

            <div className="mb-4">
                <h2>Meeting Rooms</h2>

                <p className="text-muted">
                    Select a room to make a reservation.
                </p>
            </div>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {!error && rooms.length === 0 && (
                <div className="alert alert-info">
                    No rooms are currently available.
                </div>
            )}

            <div className="row">
                {rooms.map((room) => (
                    <RoomCard
                        key={room.id}
                        room={room}
                    />
                ))}
            </div>

        </div>
    );
}

export default Rooms;