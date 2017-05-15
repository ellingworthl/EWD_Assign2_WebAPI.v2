//06-May-17
import axios from 'axios';

export const getAll = () => {
  //console.log("venueDetailApi.js getAllDetails")
   return axios('/api/VenueDetail')
              .then(resp => resp.data);
};

export const getDetail = venueId => {
  return axios.get('/api/VenueDetail/${venueId}')
              .then(resp => resp.data);
};

export const addVenue = (newID,newName,newDescription,newType,newLink,newAssociation,newParking,newToilet,newRefreshments,newOther,newDirections,newImages,newImages1 ) => {
  return axios.put('/api/VenueDetail', { 
    id: newID,
    name: newName, 
    description: newDescription, 
    type: newType,
    link: newLink,
    association: newAssociation,
    parking: newParking,
    toilet: newToilet, 
    refreshments: newRefreshments,
    other: newOther, 
    directions: newDirections, 
    images: newImages, 
    images1: newImages1
  })
  .then(resp => resp.data);
};

export const deleteDetail = venueId => {
  //console.log("venueDetailApi.js deleteDetail");
  return axios.delete('/api/VenueDetail/${venueId}')
              .then(resp => resp.data);
};

export const updateDetail = (id,name,description,type,link,association,parking,toilet,refreshments,other,directions,images,images1) => {
  return axios.put('/api/VenueDetail', { 
    id: id,
    name: name, 
    description: description, 
    type: type,
    link: link,
    association: association,
    parking: parking,
    toilet: toilet, 
    refreshments: refreshments,
    other: other, 
    directions: directions, 
    images: images, 
    images1: images1
  })
  .then(resp => resp.data);
};