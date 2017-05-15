import reviewModel from './api/Reviews/reviewsModel';
import mongoose from 'mongoose';
import assert from 'assert';
import config from './config';

//removed id, MongoDB assigns ObjectID / _ID
//10-May 20:47, added ID field back

const  reviews = [
      { 
        title : 'IFAF is great for Field Archery in Ireland',
        link : 'http://ifaf.ie/wordpress/',
        username : 'JackL',
        comments : [],
        upvotes : 10
      },
     { 
        title : 'International Field Archery Assn: Q1 2017 newsletter is out!',
        link : 'http://www.ifaa-archery.org/index.php/ifaa-newsletters/2017',
        username : 'stringie',
        comments : [],
        upvotes : 9
      },
      { 
        title : 'Membership in NFAS (UK) nearing 10k',
        link : 'http://www.nfas.net/home.asp',
        username : 'Recurver',
        comments : [],
        upvotes : 5
      },
      { 
        title : 'New site with loads of FREE online archery games. Great fun.',
        link : 'http://www.bgames.com/archery-games/',
        username : 'janedoe',
        comments : [],
        upvotes : 2
      },
      { 
        title : 'Latest post reviewData.js for Assignment2.',
        link : 'https://github.com/ellingworthl/EWD_Assign2_WebAPI',
        username : 'TiggerLady',
        comments : [],
        upvotes : 2
      }	  
      ] ;

export const loadReviews = ()=>{
reviewModel.find({}).remove(function() { 
    reviewModel.collection.insert(reviews, (err,docs)=>{
    if (err){
      console.log(`failed to Load Review Data`);
    }
    else{
      console.info(`${reviews.length} Reviews were successfully stored.`);
    }
  })
});
}