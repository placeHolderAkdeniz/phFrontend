import "./new-room.scss";
import Sidebar from "../../../components/admin-components/sidebar/sidebar";
import Navbar from "../../../components/admin-components/navbar/navbar";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import useFetch from "@/hooks/useFetch";

// Room input fields
interface RoomInput {
  id: string;
  label: string;
  type: string;
  placeholder: string;
}

const roomInputs: RoomInput[] = [
  { id: "title", label: "Title", type: "text", placeholder: "2 bed room" },
  { id: "price", label: "Price", type: "number", placeholder: "100" },
  { id: "adult", label: "Adult", type: "number", placeholder: "Number of Adults" },
  { id: "child", label: "Child", type: "number", placeholder: "Number of Children" },
  { id: "doubleBed", label: "Double Bed", type: "number", placeholder: "Number of Double Beds" },
  { id: "singleBed", label: "Single Bed", type: "number", placeholder: "Number of Single Beds" },
];

const featureOptions = [
  "wifi",
  "pool",
  "gym",
  "Mini Fridge",
  "Jacuzzi",
  "Balcony",
  "Room Service",
  "Mini Bar",
  "Parent Bathroom",
  "Terrace",
  "Bathroom with Bathtub",
  "Garden View",
];

const NewRoom: React.FC = () => {
  // State management
  const [info, setInfo] = useState<Record<string, any>>({});
  const [hotel, setHotelId] = useState<string | undefined>(undefined);

  // Fetch hotel data from API
  const { data: myHotelData } = useFetch("https://phbackend-9rp2.onrender.com/users/my-hotel");
  const hotels = myHotelData as { _id: string; hotel_name: string }[] || [];

  // Handle input change for room details
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Handle feature selection change
  const handleFeatureChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedFeatures = Array.from(e.target.selectedOptions, option => option.value);
    setInfo((prev) => ({ ...prev, features: selectedFeatures }));
  };

  // Handle hotel selection change
  const handleHotelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedHotelId = e.target.value;
    setHotelId(selectedHotelId);
    console.log("Selected Hotel ID:", selectedHotelId); // Seçilen otelin ID'sini konsola yazdır
  };

  // Handle form submission
  const handleClick = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Token'i local storage'dan al
    const token = localStorage.getItem("token");

    // Özellikleri ekle veya boş array olarak ayarla
    const features = info.features || [];

    // Gönderilecek verileri JSON olarak oluştur
    const requestBody = JSON.stringify({
      ...info,
      hotel,
      features
    });

    console.log("Request Body:", requestBody);

    try {
      await axios.post(
        "https://phbackend-9rp2.onrender.com/rooms",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Token'i Authorization başlığına ekle
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
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Choose a hotel</label>
                <select
                  id="hotel"
                  value={hotel || ""} // State boşsa boş string kullanılıyor
                  onChange={handleHotelChange} // Hotel değişikliği yönetiliyor
                >
                  {hotels.length > 0 ? (
                    hotels.map((hotel) => (
                      <option key={hotel._id} value={hotel._id}>
                        {hotel.hotel_name} ({hotel._id})
                      </option>
                    ))
                  ) : (
                    <option>No hotels available</option>
                  )}
                </select>
              </div>
              <div className="formInput">
                <label>Choose Features</label>
                <select multiple onChange={handleFeatureChange}>
                  {featureOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </form>
            <button onClick={handleClick}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
