import "./update-hotel.scss";
import Sidebar from "../../../components/admin-components/sidebar/sidebar";
import Navbar from "../../../components/admin-components/navbar/navbar";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
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

// Otel bilgileri arayüzü
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

// Modal stilleri
const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UpdateHotel: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [info, setInfo] = useState<Record<string, any>>({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedHotels = localStorage.getItem("hotels");
    if (storedHotels) {
      setHotels(JSON.parse(storedHotels));
    }
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    const hotel = hotels.find((hotel) => hotel._id === newValue);
    if (hotel) {
      setSelectedHotel(hotel);
      setInfo(hotel);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelectChange = (event: SelectChangeEvent<"true" | "false">) => {
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
        ...info,
        hotelId: selectedHotel._id,
      };

      await axios.put("https://phbackend-9rp2.onrender.com/hotels", updatedHotel, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Hotel successfully updated");
    } catch (err) {
      console.log(err);
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
            <Tabs onChange={handleTabChange} aria-label="hotel tabs">
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
                    value={info.hotel_name || ""}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="City"
                    id="city"
                    value={info.city || ""}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Country"
                    id="country"
                    value={info.country || ""}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Email"
                    id="email"
                    value={info.email || ""}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Description"
                    id="hotel_desc"
                    value={info.hotel_desc || ""}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Distance from City Center"
                    id="distance"
                    value={info.distance || ""}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Features"
                    id="features"
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
                  <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Update Hotel
                  </Button>
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
          <Button variant="contained" color="primary" onClick={handleConfirm}>
            Confirm
          </Button>
          <Button variant="contained" color="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateHotel;
