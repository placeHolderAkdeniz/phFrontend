import * as React from 'react';
import styles from './search-bar.module.scss';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { DatePick } from '../date-pick/date-pick';

export function SearchBar() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
      <div className={styles.left}>
        <Autocomplete
        multiple
        id="tags-outlined"
        options={locations}
        getOptionLabel={(option) => option.location}
        defaultValue={[locations[0]]}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="Location"
            placeholder="Choose location"
          />
        )}
      /></div>
      <div className={styles.mid}>
      <DatePick/>
      </div>
      <div className={styles.right}>
        <TextField id="room-number" label="Room #" variant="outlined" />
        <button>Search</button>
      </div>
      </div>
      
      
      
    </div>
  );
}



const locations = [
  { location: 'Antalya, Turkey' },
  { location: 'Adana, Turkey' },
  { location: 'New York, USA' },
  { location: 'Paris, France' },
  { location: 'Tokyo, Japan' },
  { location: 'London, England' },
  { location: 'Los Angeles, California, USA' },
  { location: 'Rome, Italy' },
  { location: 'Sydney, Australia' },
  { location: 'Rio de Janeiro, Brazil' },
  { location: 'Moscow, Russia' },
  { location: 'Berlin, Germany' },
  { location: 'Istanbul, Turkey' },
  { location: 'Cairo, Egypt' },
  { location: 'Dubai, United Arab Emirates' },
  { location: 'Mumbai, India' },
  { location: 'Toronto, Ontario, Canada' },
  { location: 'Mexico City, Mexico' },
  { location: 'Cape Town, South Africa' },
  { location: 'Bangkok, Thailand' },
  { location: 'Seoul, South Korea' },
  { location: 'Havana, Cuba' },
  { location: 'Buenos Aires, Argentina' },
  { location: 'Amsterdam, Netherlands' },
  { location: 'Athens, Greece' },
  { location: 'Hong Kong, China' },
  { location: 'Dublin, Ireland' },
  { location: 'Madrid, Spain' },
  { location: 'Vienna, Austria' },
  { location: 'Stockholm, Sweden' },
  { location: 'Zurich, Switzerland' },
  { location: 'Oslo, Norway' },
  { location: 'Helsinki, Finland' },
  { location: 'Brussels, Belgium' },
  { location: 'Warsaw, Poland' },
  { location: 'Prague, Czech Republic' },
  { location: 'Budapest, Hungary' },
  { location: 'Lisbon, Portugal' },
  { location: 'Copenhagen, Denmark' },
  { location: 'Edinburgh, Scotland' },
  { location: 'Auckland, New Zealand' }
];