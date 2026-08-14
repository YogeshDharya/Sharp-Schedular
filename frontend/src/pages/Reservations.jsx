import { useEffect, useState } from "react";

import {
    deleteReservation,
    getReservations
} from "../services/api";

function Reservations() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadReservations = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getReservations();

            setReservations(data);
        } catch (err) {
            console.error(err);

            setError(
                "Unable to load reservations. Make sure the API is running."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReservations();
    }, []);

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to cancel this reservation?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteReservation(id);

            setReservations((current) =>
                current.filter((reservation) =>
                    reservation.id !== id
                )
            );
        } catch (err) {
            console.error(err);

            setError("Unable to cancel the reservation.");
        }
    };

    if (loading) {
        return (
            <div className="container text-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </div>

                <p className="mt-3">
                    Loading reservations...
                </p>
            </div>
        );
    }

    return (
        <div className="container">

            <div className="mb-4">
                <h2>Reservations</h2>

                <p className="text-muted">
                    View and manage your reservations.
                </p>
            </div>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {!error && reservations.length === 0 && (
                <div className="alert alert-info">
                    There are no reservations yet.
                </div>
            )}

            {reservations.length > 0 && (
                <div className="table-responsive">

                    <table className="table table-bordered table-hover bg-white">

                        <thead className="table-dark">
                            <tr>
                                <th>Room</th>
                                <th>Start</th>
                                <th>End</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {reservations.map((reservation) => (
                                <tr key={reservation.id}>

                                    <td>
                                        {reservation.roomName}
                                    </td>

                                    <td>
                                        {new Date(
                                            reservation.startTime
                                        ).toLocaleString()}
                                    </td>

                                    <td>
                                        {new Date(
                                            reservation.endTime
                                        ).toLocaleString()}
                                    </td>

                                    <td>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() =>
                                                handleDelete(
                                                    reservation.id
                                                )
                                            }
                                        >
                                            Cancel
                                        </button>
                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>
            )}

        </div>
    );
}

export default Reservations;