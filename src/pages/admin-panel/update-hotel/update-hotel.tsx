import "./update-hotel.scss";
import Sidebar from "../../../components/admin-components/sidebar/sidebar";
import Navbar from "../../../components/admin-components/navbar/navbar";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import useFetch from "@/hooks/useFetch";
import {
  Tab,
  Tabs,
  Box,
  Typography,
  TextField,
  Button,
  Modal,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";

interface Hotel {
  _id: string;
  hotel_name: string;
  email: string;
  city: string;
  country: string;
  hotel_desc: string;
  distance: string;
  features: string[];
  featured: boolean;
}

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "20px"
};

const UpdateHotel: React.FC = () => {
  const { data: myHotelData } = useFetch("https://phbackend-9rp2.onrender.com/users/my-hotel");
  const hotels: Hotel[] = myHotelData || [];
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [info, setInfo] = useState<Record<string, any>>({});
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState<string | false>(false);

  useEffect(() => {
    if (hotels.length > 0) {
      setTabValue(hotels[0]._id);
      setSelectedHotel(hotels[0]);
      setInfo(hotels[0]);
    }
  }, [myHotelData]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
    const hotel = hotels.find((hotel) => hotel._id === newValue);
    if (hotel) {
      setSelectedHotel(hotel);
      setInfo(hotel);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    console.log("Input change event:", e);
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelectChange = (event: SelectChangeEvent<"true" | "false">) => {
    console.log("Select change event:", event);
    setInfo((prev) => ({ ...prev, featured: event.target.value === "true" }));
  };

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleConfirm = async () => {
    setOpen(false);
    const token = localStorage.getItem("token");
    if (!selectedHotel) return;

    try {
      const updatedHotel = {
        ...Object.keys(info).reduce((acc, key) => {
          if (info[key] !== selectedHotel[key as keyof Hotel]) {
            acc[key] = info[key];
          }
          return acc;
        }, {} as Record<string, any>),
        hotelId: selectedHotel._id,
      };

      console.log("Updating hotel with data:", updatedHotel);

      await axios.patch("https://phbackend-9rp2.onrender.com/hotels", updatedHotel, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Hotel successfully updated");
    } catch (err) {
      console.log("Error updating hotel:", err);
      alert("An error occurred while updating the hotel");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Update Hotel</h1>
        </div>
        <div className="bottom">
          <Box sx={{ width: '100%' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="hotel tabs">
              {hotels.map((hotel) => (
                <Tab label={hotel.hotel_name} value={hotel._id} key={hotel._id} />
              ))}
            </Tabs>
            {selectedHotel && (
              <Box p={3}>
                <Typography variant="h6">Update {selectedHotel.hotel_name}</Typography>
                <form>
                  <TextField
                    label="Hotel Name"
                    id="hotel_name"
                    placeholder={selectedHotel.hotel_name}
                    value={info.hotel_name || ""}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="City"
                    id="city"
                    placeholder={selectedHotel.city}
                    value={info.city || ""}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Country"
                    id="country"
                    placeholder={selectedHotel.country}
                    value={info.country || ""}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Email"
                    id="email"
                    placeholder={selectedHotel.email}
                    value={info.email || ""}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Description"
                    id="hotel_desc"
                    placeholder={selectedHotel.hotel_desc}
                    value={info.hotel_desc || ""}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Distance from"
                    id="distance"
                    placeholder={selectedHotel.distance}
                    value={info.distance || ""}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Features"
                    id="features"
                    placeholder={selectedHotel.features.join(", ")}
                    value={info.features || ""}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="featured-label">Featured</InputLabel>
                    <Select
                      labelId="featured-label"
                      id="featured"
                      value={info.featured ? "true" : "false"}
                      onChange={handleSelectChange}
                    >
                      <MenuItem value={"false"}>No</MenuItem>
                      <MenuItem value={"true"}>Yes</MenuItem>
                    </Select>
                  </FormControl>
                  <button onClick={handleSubmit}> 
                    Update Hotel
                  </button>
                </form>
              </Box>
            )}
          </Box>
        </div>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to update this hotel?
          </Typography>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Button variant="contained" color="primary" onClick={handleConfirm}>
              Confirm
            </Button>
            <Button variant="contained" color="error" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateHotel;
