import RoomCard from "../components/RoomCard";

const rooms = [
    {
        id: 1,
        name: "Room A",
        capacity: 10,
        description: "Small meeting room suitable for team discussions."
    },
    {
        id: 2,
        name: "Room B",
        capacity: 6,
        description: "Compact room suitable for small meetings."
    },
    {
        id: 3,
        name: "Room C",
        capacity: 20,
        description: "Large conference room for bigger meetings."
    }
];

function Rooms() {
    return (
        <div className="container">

            <div className="mb-4">
                <h2>Meeting Rooms</h2>
                <p className="text-muted">
                    Select a room to make a reservation.
                </p>
            </div>

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