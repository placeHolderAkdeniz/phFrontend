import "./new-room.scss";
import Sidebar from "../../../components/admin-components/sidebar/sidebar";
import Navbar from "../../../components/admin-components/navbar/navbar";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import axios from "axios";

interface RoomInput {
  id: string;
  label: string;
  type: string;
  placeholder: string;
}

const roomInputs: RoomInput[] = [
  { id: "title", label: "Title", type: "text", placeholder: "2 bed room" },
  { id: "price", label: "Price", type: "number", placeholder: "100" },
  { id: "adult", label: "Adult", type: "number", placeholder: "Number of Adult" },
  { id: "child", label: "Child", type: "number", placeholder: "Number of Child" },
  { id: "doubleBed", label: "Double Bed", type: "number", placeholder: "Number of Double Bed" },
  { id: "singleBed", label: "Single Bed", type: "number", placeholder: "Number of Single Bed" },
  { id: "features", label: "Features", type: "text", placeholder: "Type feature of room" },
];

const NewRoom: React.FC = () => {
  const [info, setInfo] = useState<Record<string, any>>({});
  const [hotelId, setHotelId] = useState<string | undefined>(undefined);
  const [rooms, setRooms] = useState<string>("");

  const { data: myHotelData } = useFetch("https://phbackend-m3r9.onrender.com/users/my-hotel");


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const features = info.features.split(",").map((feature: string) => feature.trim());
    const requestBody = {
      ...info,
      hotelId,
      features
    };

    try {
      await axios.post(
        "https://phbackend-m3r9.onrender.com/rooms",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Room successfully created");
    } catch (err) {
      console.log(err);
      alert("An error occurred while creating the room");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Rooms</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleChange} />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea onChange={(e) => setRooms(e.target.value)} placeholder="Give comma between room numbers." />
              </div>
              <div className="formInput">
                <label>Choose a hotel</label>
                <select id="hotelId" value={hotelId} onChange={(e) => setHotelId(e.target.value)}>
                  {myHotelData.length > 0 ? (
                    <option key={myHotelData[0]._id} value={myHotelData[0]._id}>{myHotelData[0].hotel_name}</option>
                  ) : (
                    <option>No hotels available</option>
                  )}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
