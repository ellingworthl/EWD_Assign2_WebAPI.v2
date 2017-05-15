import mongoose from 'mongoose';
import assert from 'assert';
import eventModel from './api/Events/eventsModel';
import config from './config';

//removed id, MongoDB assigns ObjectID / _ID

const events = [
    {
        "round": "IFAA Field",
        "targets": "2x14",        
        "venue": "Valley Bowmen",
        "date": "2017/04/23"	
    },
    
    {	
        "round": "IFAA UAR",
        "targets": "1x28",        
        "venue": "Wexford Archery",
        "date": "2017/05/07"	
    },
    
    {
        "round": "Hunting Trail",
        "targets": ">30",        
        "venue": "South Cork Field Archers",
        "date": "2017/05/21"
    },
    
    {
        "round": "SBG",
        "targets": "1x36",        
        "venue": "Mayo Archery Club",
        "date": "2017/06/04"
    },
	
    {
        "round": "IFAA UAR",
        "targets": "2x14",
        "venue": "Ashgrove Archers",
        "date": "2017/06/18"
    }	
  ] ; 




export const loadEvents = ()=>{
eventModel.find({}).remove(function() { 
    eventModel.collection.insert(events, (err,docs)=>{
    if (err){
      console.log(`failed to Load Event Data`);
    }
    else{
      console.info(`${events.length} events were successfully stored.`);
    }
  })
});
}