import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="container">

            <section className="hero-section text-center">

                <h1 className="hero-title">
                    Meeting Room Reservation
                </h1>

                <p className="lead text-muted mt-3">
                    Find and reserve meeting rooms without worrying
                    about double bookings.
                </p>

                <Link
                    to="/rooms"
                    className="btn btn-primary btn-lg mt-4"
                >
                    View Available Rooms
                </Link>

            </section>

            <div className="row text-center mt-4">

                <div className="col-md-4 mb-4">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5>Choose a Room</h5>
                            <p className="text-muted">
                                Select the room that fits your meeting.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5>Select a Time</h5>
                            <p className="text-muted">
                                Pick your meeting start and end time.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5>Reserve</h5>
                            <p className="text-muted">
                                The system prevents overlapping bookings.
                            </p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Home;