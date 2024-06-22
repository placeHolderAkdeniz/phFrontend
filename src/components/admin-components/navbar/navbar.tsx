import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useAuth } from "@/AuthContext";
import useFetch from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import { Button, Popper, Paper, Typography, Box } from "@mui/material";
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';

const Navbar: React.FC = () => {
  const { user } = useAuth();
  const { data: myHotelData } = useFetch("https://phbackend-9rp2.onrender.com/users/my-hotel");
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
            <Button aria-describedby={id} type="button" startIcon={<ApartmentOutlinedIcon />} onClick={handleClick} sx={{color:'#3acbe1', textTransform:'capitalize', fontWeight:'bold'}}>
              My Hotels
            </Button>
            <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-start" style={{ zIndex: 1 }}>
              <Paper className="popper">
                {myHotelData && myHotelData.length > 0 ? (
                  <Box p={2}>
                    <Typography variant="h6">{myHotelData[0].hotel_name}</Typography>
                    <Typography variant="body1">{myHotelData[0].hotel_desc}</Typography>
                    <Typography variant="body2">{myHotelData[0].city}, {myHotelData[0].country}</Typography>
                    <Typography variant="body2">Average Star: {myHotelData[0].average_star}</Typography>
                  </Box>
                ) : (
                  <Box p={2}>
                    <Typography variant="body1">No hotel information available.</Typography>
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
