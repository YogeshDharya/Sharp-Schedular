import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import BookingForm from "../components/BookingForm";
import { getRoom } from "../services/api";

function RoomDetails() {
    const { id } = useParams();

    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadRoom = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getRoom(id);

                setRoom(data);
            } catch (err) {
                console.error(err);
                setError("Unable to load the room.");
            } finally {
                setLoading(false);
            }
        };

        loadRoom();
    }, [id]);

    if (loading) {
        return (
            <div className="container">
                <div className="text-center mt-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">
                            Loading...
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container">
                <div className="alert alert-danger">
                    {error}
                </div>
            </div>
        );
    }

    if (!room) {
        return (
            <div className="container">
                <div className="alert alert-warning">
                    Room not found.
                </div>
            </div>
        );
    }

    return (
        <div className="container">

            <div className="mb-4">
                <Link to="/rooms" className="text-decoration-none">
                    ← Back to Rooms
                </Link>
            </div>

            <div className="card mb-4">
                <div className="card-body">
                    <h2>{room.name}</h2>

                    <p className="text-muted mb-1">
                        Capacity: {room.capacity} people
                    </p>

                    <p className="mb-0">
                        {room.description}
                    </p>
                </div>
            </div>

            <BookingForm roomId={room.id} roomName={room.name} />

        </div>
    );
}

export default RoomDetails;