import mongoose from 'mongoose';
import assert from 'assert';
import venueModel from './api/Venues/venuesModel';
import config from './config';

//removed id, MongoDB assigns ObjectID / _ID

const venues = [
    {
        "id": "Wexford",
        "imageUrl": "../images/Wexford.png", 
        "name": "Wexford Archery",
        "phoneno": "051 123456", 
        "county": "Wexford",
        "town": "New Ross"
    }, 
    {
        "id": "Valley",
        "imageUrl": "../images/Valley.jpg", 
        "name": "Valley Bowmen",
        "phoneno": "051 345678", 
        "county": "Waterford",
        "town": "Kilmeaden"
    }, 
    {
        "id": "Laois",
        "imageUrl": "../images/Laois.jpg", 
        "name": "Laois Archery",
        "phoneno": "058 1234321", 
        "county": "Laois",
        "town": "Stradbally"
    }, 
    {
        "id": "Dunbrody",
        "imageUrl": "../images/Dunbrody.jpg", 
        "name": "Dunbrody Archers",
        "phoneno": "053 987654", 
        "county": "Wexford",
        "town": "Ballinaboola, nr. New Ross"
    }, 
    {
        "id": "Mayo", 
        "imageUrl": "../images/Mayo.jpg", 
        "name": "Mayo Archery Club",
        "phoneno": "098 765432", 
        "county": "Mayo",
        "town": "Ballina"
    }, 
    {
        "id": "Ashgrove", 
        "imageUrl": "../images/Ashgrove.jpg", 
        "name": "Ashgrove Archers",
        "phoneno": "051 8766789", 
        "county": "Kilkenny",
        "town": "Waddingstown, nr Mooncoin"
    }, 
    {
        "id": "Cork", 
        "imageUrl": "../images/Cork.jpg", 
        "name": "South Cork Field Archers",
        "phoneno": "021 2398764", 
        "county": "Cork",
        "town": "Riverstick"
    }, 
    {
        "id": "Cushinstown", 
        "imageUrl": "../images/Cushinstown.jpg", 
        "name": "Cushinstown Archers",
        "phoneno": "051 876409", 
        "county": "Wexford",
        "town": "Cushinstown"
    }
  ] ; 




export const loadVenues = ()=>{
venueModel.find({}).remove(function() { 
    venueModel.collection.insert(venues, (err,docs)=>{
    if (err){
      console.log(`failed to Load Event Data`);
    }
    else{
      console.info(`${venues.length} VENUES were successfully stored.`);
    }
  })
});
}