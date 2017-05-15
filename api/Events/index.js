import express from 'express';
import _ from 'lodash';
import mongoose from 'mongoose';
import Event from './eventsModel';
import config from './../../config';

// Connect to database
mongoose.connect(config.mongoDb);

const router = express.Router();

//Return all Events
router.get('/', (req, res) => {
 Event.find((err, events) => {
    if(err) { return handleError(res, err); }
    return res.send({events});
  });
});

//Add an event
router.post('/', (req, res) => {
		let newEvent = req.body;
		if (newEvent){
           Event.create(newEvent, (err, event) => {
              if(err) { return handleError(res, err); }
                 return res.status(201).send({event});
          });
      }else{
      	 return handleError(res, err);
      }
});

// get an event
router.get('/:id', (req, res) => {
  const id = req.params.id;
  Event.findById(id, function (err, event) { 
    if(err) { return handleError(res, err); }
    return res.send({event});
  });
});

//Update an event
router.put('/:id', (req, res) => {
	 let key = req.params.id;
	 let updateEvent = req.body;

   if(updateEvent._id) { delete updateEvent._id; }
   Event.findById(req.params.id,  (err, event) => {
      if (err) { return handleError(res, err); }
        if(!event) { return res.send(404); }
            const updated = _.merge(event, req.body);
            updated.save((err) => {
                  if (err) { return handleError(res, err); }
                          return res.send(event);
            });
      });
});

//Delete a event
router.delete('/:id', (req, res) => {
	 let key = req.params.id;
   Event.findById(key, (err, event)=> {
    if(err) { return res.status(400).send(err);}
    if(!event) { return res.send(404); }
    event.remove(err => {
      if(err) { return handleError(res, err); }
      return res.send(event);
    });
  });	  
});

function handleError(res, err) {
  return res.status(500).send(err);
};

export default router;
