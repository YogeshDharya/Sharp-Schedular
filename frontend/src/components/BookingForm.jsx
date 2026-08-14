import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createReservation } from "../services/api";

function BookingForm({ roomId, roomName }) {
    const navigate = useNavigate();

    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (!startTime || !endTime) {
            setError("Please select both start and end time.");
            return;
        }

        if (new Date(startTime) >= new Date(endTime)) {
            setError("Start time must be before end time.");
            return;
        }

        try {
            setLoading(true);

            await createReservation({
                roomId: roomId,
                startTime: startTime,
                endTime: endTime
            });

            setSuccess("Reservation created successfully.");

            setStartTime("");
            setEndTime("");

            setTimeout(() => {
                navigate("/reservations");
            }, 1000);

        } catch (err) {
            console.error(err);

            if (err.response?.status === 409) {
                setError(
                    "This room is already reserved during the selected time."
                );
            } else if (err.response?.status === 404) {
                setError("The selected room could not be found.");
            } else if (err.response?.status === 400) {
                setError(
                    err.response?.data ||
                    "The reservation details are invalid."
                );
            } else {
                setError(
                    "Unable to create the reservation. Please try again."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card booking-card">

            <div className="card-body">

                <h3 className="card-title mb-4">
                    Book {roomName}
                </h3>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="alert alert-success">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label
                            htmlFor="startTime"
                            className="form-label"
                        >
                            Start Time
                        </label>

                        <input
                            type="datetime-local"
                            id="startTime"
                            className="form-control"
                            value={startTime}
                            onChange={(event) =>
                                setStartTime(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="endTime"
                            className="form-label"
                        >
                            End Time
                        </label>

                        <input
                            type="datetime-local"
                            id="endTime"
                            className="form-control"
                            value={endTime}
                            onChange={(event) =>
                                setEndTime(event.target.value)
                            }
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Reservation..."
                            : "Reserve Room"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default BookingForm;