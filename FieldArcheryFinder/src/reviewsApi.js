import axios from 'axios';
//***** Mongo _id is the key, like Events

//get all reviews
export const getAll = () => {
   console.log("reviewsApi.js getAllReviews")
   return axios('/api/Reviews')
              .then(resp => resp.data);
};

//get single review
export const getReview = _Id => {
  return axios.get(`/api/Reviews/${_Id}`)
              .then(resp => resp.data);
};

//add a review
export const addReview = (newTitle, newLink, newUsername) => {
  console.log("reviewsApi.js addReview");
  return axios.post('/api/Reviews', { title: newTitle, link: newLink, username: newUsername})
              .then(resp => resp.data);
};

//delete a review
export const deleteReview = _Id => {
  console.log("reviewsApi.js deleteReview");  
  return axios.delete(`/api/Reviews/${_Id}`)
              .then(resp => resp.data);
};

//get upvote info on review
export const upvote = _Id => {
  return axios.post(`/api/Reviews/${_Id}/upvote`)
              .then(resp => resp.data);
};

//modify an Review
export const updateReview = (_id, title,link,username) => {
  console.log("api.js updateReview");
  console.log("reviewsApi " + _id);
  console.log(title + "  " + link + "  " + username + "  " );
  return axios.put(`/api/Reviews/${_id}`, {title: title, link: link, username: username})
  .then(resp => resp.data);
};