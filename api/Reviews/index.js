import express from 'express';
import _ from 'lodash';
import mongoose from 'mongoose';
import Review from './reviewsModel';
import config from './../../config';

//Connect to database
//mongoose.connect(config.mongoDb);

const router = express.Router();

//Return all Reviews
router.get('/', (req, res) => {
  Review.find((err, reviews) => {
    if(err) { return handleError(res, err); }
    return res.send({reviews});
  });
});
// fixed! changed from: return res.send(posts);

//Add a review
router.post('/', (req, res) => {
     const newReview = req.body;
    if (newReview){
           Review.create(newReview, (err, review) => {
              if(err) { return handleError(res, err); }
                 return res.status(201).send({review});
          });
      }else{
         return handleError(res, err);
      } 
});

//get a review
router.get('/:id', (req, res) => {
    const id = req.params.id;
   Review.findById(id, function (err, review) { 
        if(err) { return handleError(res, err); }
        return res.send({review});
  } );         
});

//Update a review
// DO THRU POSTMAN, NO BUTTONS IN SPA
router.put('/:id', (req, res) => {
   let key = req.params.id;
   let updateReview = req.body;

   if(updateReview._id) { delete updateReview._id; }
   Review.findById(req.params.id,  (err, review) => {
      if (err) { return handleError(res, err); }
        if(!review) { return res.send(404); }
            const updated = _.merge(review, req.body);
            updated.save((err) => {
                  if (err) { return handleError(res, err); }
                          return res.send(review);
            });
      });
});

// Delete a review
// DO THRU POSTMAN, NO BUTTONS IN SPA
router.delete('/:id', (req, res) => {
   let key = req.params.id;
   Review.findById(key, (err, review)=> {
    if(err) { return res.status(400).send(err);}
    if(!review) { return res.send(404); }
    review.remove(err => {
      if(err) { return handleError(res, err); }
      return res.send(review);
    });
  });   
});

//upvote a review
router.post('/:id/upvotes', (req, res) => {
	 const id = req.params.id;
   Review.findById(id, function (err, review) { 
        if(err) { return handleError(res, err); }
        review.upvotes++;
       review.save(err => {
          if (err) {return handleError(res, err);}
           return res.status(201).send({review});
        });
  } );     
});

//add comment
//Lab https://wit-computing.github.io/enterprise-web-2017/topic04/book1/index.html#/07
// post.comments.push(comment);
// post.save(err => {
router.post('/:id/comments', (req, res) => {
   const id = req.params.id;
   const comment = req.body;
   Review.findById(id, (err, review)=>{ 
        if(err) { return handleError(res, err); }
        review.comments.push(comment);
        review.save(err => {
          if (err) {return handleError(res, err);}
           return res.status(201).send({review});
        });
  });        
});

//upvote review comment
// fix typo - was: const reviewId = req.params.postId;
router.post('/:reviewId/comments/:commentId/upvotes', (req, res) => {
   const commentId = req.params.commentId;
   const reviewId = req.params.reviewId;
   Review.findById( reviewId, (err, review)=>{
        if(err) { return handleError(res, err); }
           review.comments.id(commentId).upvotes++;
           review.save(err => {
           if (err) {return handleError(res, err);}
                return res.status(201).send({review});
           });
  });
});

function handleError(res, err) {
  return res.status(500).send(err);
};

export default router;