import config from './config';
import express from 'express';
import eventsRouter from './api/Events';
import reviewsRouter from './api/Reviews';
import venuesRouter from './api/Venues';
import detailsRouter from './api/VenueDetail';
import body_parser from 'body-parser';
import mongoose from 'mongoose';
import {loadEvents} from './eventData';
import {loadReviews} from './reviewData';
import {loadVenues} from './venuesData';
import {loadDetails} from './detailsData';
import {Mockgoose} from 'mockgoose';
import {nodeEnv}  from './config';

export const server = express();

// Connect to database
if (nodeEnv == 'test'){
	var mockgoose = new Mockgoose(mongoose); 
	mockgoose.prepareStorage().then(function() {
  	mongoose.createConnection(config.mongoDb);
	});
} 
else
{
	mongoose.createConnection(config.mongoDb);
}

mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: '+ err);
    process.exit(-1);
});

//pupulate DB with sample data
if (config.seedDb) {
	loadEvents();
	loadReviews(); 
	loadVenues();
	loadDetails(); 
}

//configure body-parser
server.use(body_parser.json());
server.use(body_parser.urlencoded({}));
server.use('/api/Events', eventsRouter); 
server.use('/api/Reviews', reviewsRouter);
server.use('/api/Venues', venuesRouter);
server.use('/api/VenueDetails', detailsRouter);
server.use(express.static('public'));

server.listen(config.port, config.host, () => {
  console.info('Express listening on port', config.port);
});