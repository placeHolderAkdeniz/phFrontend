import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useAuth } from "@/AuthContext";
import useFetch from "@/hooks/useFetch";
import { useState, useEffect } from "react";
import { Button, Popper, Paper, Typography, Box, List, ListItem, ListItemText } from "@mui/material";
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import dayjs from 'dayjs';

interface Hotel {
  _id: string;
  hotel_name: string;
  hotel_desc: string;
  city: string;
  country: string;
  average_star: number;
  createdAt: string;
  rooms: string[];
}

const Navbar: React.FC = () => {
  const { user } = useAuth();
  
  const { data: myHotelData } = useFetch("https://phbackend-9rp2.onrender.com/users/my-hotel");

  const hotels: Hotel[] = myHotelData as Hotel[] || [];

  useEffect(() => {
    if (hotels.length > 0) {
      localStorage.setItem('myHotel', JSON.stringify(hotels));
    }
  }, [myHotelData]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <Button aria-describedby={id} type="button" startIcon={<ApartmentOutlinedIcon />} onClick={handleClick} sx={{ color: '#3acbe1', textTransform: 'capitalize', fontWeight: 'bold' }}>
              My Hotels
            </Button>
            <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-start" style={{ zIndex: 1 }}>
              <Paper className="popper">
                {hotels.length > 0 ? (
                  <Box p={2}>
                    <List>
                      {hotels.map((hotel, index) => (
                        <ListItem key={hotel._id}>
                          <ListItemText
                            primary={`Hotel ${index + 1}: ${hotel.hotel_name}`}
                            secondary={
                              <>
                                <Typography variant="body2" component="span">
                                  {hotel.hotel_desc}
                                </Typography>
                                <br />
                                <Typography variant="body2" component="span">
                                  {hotel.city}, {hotel.country}
                                </Typography>
                                <br />
                                <Typography variant="body2" component="span">
                                  Average Star: {hotel.average_star}
                                </Typography>
                                <br />
                                <Typography variant="body2" component="span">
                                  Created At: {dayjs(hotel.createdAt).format('DD/MM/YYYY')}
                                </Typography>
                                <br />
                                <Typography variant="body2" component="span">
                                  Room Count: {hotel.rooms.length}
                                </Typography>
                              </>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                ) : (
                  <Box p={2}>
                    <Typography variant="body2" component="span">
                      No hotels available.
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Popper>
          </div>
          <div className="item">
            <p className="avatar">{`${user?.first_name} ${user?.last_name}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
