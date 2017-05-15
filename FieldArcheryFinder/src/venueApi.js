//06-May-17
import axios from 'axios';

export const getAll = () => {
  console.log("venueApi.js getAllVenues")
   return axios('/api/Venues')
              .then(resp => resp.data);
};

export const getVenue = venueId => {
  return axios('/api/Venues')
              .then(resp => resp.data);
};

export const addVenue = (newID,newImageUrl,newName,newPhoneno,newCounty,newTown) => {
  return axios.put('/api/Venues', {
    id: newID,
    imageUrl: newImageUrl,
    name: newName,
    phoneno: newPhoneno,
    county: newCounty,
    town: newTown 
  })
  .then(resp => resp.data);
};

export const deleteVenue = venueId => {
  //console.log("venueApi.js deleteVenue");
  return axios.delete('/api/Venues/${venueId}')
              .then(resp => resp.data);
};

export const updateVenue = (id,imageUrl,name,phoneno,county,town) => {
  return axios.put('/api/Venues', { 
    id: id,
    imageUrl: imageUrl,
    name: name,
    phoneno: phoneno,
    county: county,
    town: town 
  })
  .then(resp => resp.data);
};