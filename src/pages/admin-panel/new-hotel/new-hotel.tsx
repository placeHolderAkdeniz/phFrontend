import "./new-hotel.scss";
import Sidebar from "../../../components/admin-components/sidebar/sidebar";
import Navbar from "../../../components/admin-components/navbar/navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface HotelInput {
  id: string;
  label: string;
  type: string;
  placeholder: string;
}

const hotelInputs: HotelInput[] = [
  { id: "hotel_name", label: "Name", type: "text", placeholder: "My Hotel" },
  { id: "city", label: "City", type: "text", placeholder: "City" },
  { id: "country", label: "Country", type: "text", placeholder: "Country" },
  { id: "distance", label: "Distance from", type: "text", placeholder: "2 km to city center" },
  { id: "email", label: "email", type: "text", placeholder: "example@gmail.com" },
  { id: "hotel_desc", label: "Description", type: "text", placeholder: "description" },
  { id: "features", label: "Features", type: "text", placeholder: "Features of hotel" },
];

const NewHotel: React.FC = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [info, setInfo] = useState<Record<string, any>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const list = await Promise.all(
        files
          ? Array.from(files).map(async (file) => {
              const data = new FormData();
              data.append("file", file);
              data.append("upload_preset", "upload");
              const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/dfsarmr16/image/upload",
                data
              );

              const { url } = uploadRes.data;
              return url;
            })
          : []
      );

      const newHotel = {
        ...info,
        photos: list,
      };

      console.log("New Hotel Data:", newHotel);

      await axios.post("https://phbackend-9rp2.onrender.com/hotels", newHotel, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Hotel successfully created");
    } catch (err) {
      console.log(err);
      alert("An error occurred while creating the hotel");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files && files.length > 0
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} onChange={handleChange} type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={'false'}>No</option>
                  <option value={'true'}>Yes</option>
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

export default NewHotel;
