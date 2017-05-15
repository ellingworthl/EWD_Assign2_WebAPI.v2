import express from 'express';
import _ from 'lodash';
import mongoose from 'mongoose';
import Detail from './detailsModel';
import config from './../../config';

//Connect to database
//mongoose.connect(config.mongoDb);

const router = express.Router();

//Return all venue details
router.get('/', (req, res) => {
  Detail.find((err, details) => {
    if(err) { return handleError(res, err); }
    return res.send({details});
  });
});

//get venue detail
router.get('/:id', (req, res) => {
    const id = req.params.id;
   Detail.findById(id, function (err, detail) { 
        if(err) { return handleError(res, err); }
        return res.send({detail});
  } );
});

//Add venue detail
router.post('/', (req, res) => {
    const newDetail = req.body;
    if (newDetail){
           Detail.create(newDetail, (err, detail) => {
              if(err) { return handleError(res, err); }
                 return res.status(201).send({detail});
          });
      }else{
         return handleError(res, err);
      }
});

//Update venue detail
router.put('/:id', (req, res) => {
   const key = req.params.id;
   const updateDetail = req.body;
   if(updateDetail._id) { delete updateDetail._id; }
   Detail.findById(req.params.id,  (err, detail) => {
      if (err) { return handleError(res, err); }
        if(!detail) { return res.send(404); }
            const updated = _.merge(detail, req.body);
            updated.save((err) => {
                  if (err) { return handleError(res, err); }
                          return res.send(detail);
            });
      });
});

//Delete venue detail
router.delete('/:id', (req, res) => {
   const key = req.params.id;
   Detail.findById(key, (err, detail)=> {
    if(err) { return res.status(400).send(err);}
    if(!detail) { return res.send(404); }
    detail.remove(err => {
      if(err) { return handleError(res, err); }
      return res.send(detail);
    });
  });   
});

export default router; 