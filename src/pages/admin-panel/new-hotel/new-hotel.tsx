import "./new-hotel.scss";
import Sidebar from "../../../components/admin-components/sidebar/sidebar";
import Navbar from "../../../components/admin-components/navbar/navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";

interface HotelInput {
  id: string;
  label: string;
  type: string;
  placeholder: string;
}

const hotelInputs: HotelInput[] = [
  {
    id: "name",
    label: "Name",
    type: "text",
    placeholder: "My Hotel",
  },
  {
    id: "type",
    label: "Type",
    type: "text",
    placeholder: "hotel",
  },
  {
    id: "city",
    label: "City",
    type: "text",
    placeholder: "New York",
  },
  {
    id: "address",
    label: "Address",
    type: "text",
    placeholder: "elton st, 216",
  },
  {
    id: "distance",
    label: "Distance from City Center",
    type: "text",
    placeholder: "500",
  },
  {
    id: "title",
    label: "Title",
    type: "text",
    placeholder: "The best Hotel",
  },
  {
    id: "desc",
    label: "Description",
    type: "text",
    placeholder: "description",
  },
  {
    id: "cheapestPrice",
    label: "Price",
    type: "text",
    placeholder: "100",
  },
];

const useFetch = (url: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

const NewHotel: React.FC = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [info, setInfo] = useState<Record<string, any>>({});
  const [rooms, setRooms] = useState<string[]>([]);

  const { data, loading } = useFetch("/rooms");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setRooms(value);
  };

  const handleClick = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
        rooms,
        photos: list,
      };

      await axios.post("/hotels", newHotel);
    } catch (err) {
      console.log(err);
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
                <label>Feautured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={'false'}>Yes</option>
                  <option value={'true'}>No</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Rooms: </label>
                <select className="sel-room" id="rooms" multiple onChange={handleSelect}>
                  {loading ? "loading" : data && data.map((room) => (
                    <option key={room._id} value={room._id}>{room.title}</option>
                  ))}
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
