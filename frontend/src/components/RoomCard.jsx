import { Link } from "react-router-dom";

function RoomCard({ room }) {
    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100 room-card">
                <div className="card-body d-flex flex-column">

                    <h5 className="card-title">
                        {room.name}
                    </h5>

                    <p className="card-text text-muted">
                        Capacity: {room.capacity} people
                    </p>

                    <p className="card-text">
                        {room.description}
                    </p>

                    <Link
                        // to={`/rooms/${room.id}`}
                        to="/reservations"
                        className="btn btn-primary mt-auto"
                    >
                        Book Room
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default RoomCard;