import React from 'react';
import { Popover, Button, Box, Typography } from '@mui/material';

interface PersonCountPopoverProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  adults: number;
  setAdults: (value: number) => void;
  children: number;
  setChildren: (value: number) => void;
}

const PersonCountPopover: React.FC<PersonCountPopoverProps> = ({ anchorEl, onClose, adults, setAdults, children, setChildren }) => {
  const open = Boolean(anchorEl);

  const handleAdultChange = (delta: number) => {
    setAdults(Math.max(0, adults + delta));
  };

  const handleChildrenChange = (delta: number) => {
    setChildren(Math.max(0, children + delta));
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <Box p={2}>
        <Typography variant="h6">Select People</Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" gap='10px' my={1}>
          <Typography>Adults</Typography>
          <Box display="flex" alignItems="center" border='1px solid black;' borderRadius='10px'>
            <Button onClick={() => handleAdultChange(-1)}>-</Button>
            <Typography>{adults}</Typography>
            <Button onClick={() => handleAdultChange(1)}>+</Button>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" gap='10px' my={1}>
          <Typography>Children</Typography>
          <Box display="flex" alignItems="center" border='1px solid black;' borderRadius='10px'>
            <Button onClick={() => handleChildrenChange(-1)}>-</Button>
            <Typography>{children}</Typography>
            <Button onClick={() => handleChildrenChange(1)}>+</Button>
          </Box>
        </Box>
      </Box>
    </Popover>
  );
};

export default PersonCountPopover;
