import mongoose from 'mongoose';
import assert from 'assert';
import detailModel from './api/VenueDetail/detailsModel';
import config from './config';
import { Link } from 'react-router';

const details = [

 {
        "id": "Ashgrove",
        "name": "Ashgrove Archers",
        "description": "The club take their name from a significant portion of the woodland available; ash! There's a hugh amount of ground available comprising of deciduous and evergreen forestry. The club mix and match their courses across the available woodland.", 
        "type": "Outdoor range",
        "link": "https://www.facebook.com/profile.php?id=100009143355252&fref=ts",
        "association": "Irish Field Archery Federation (IFAF)",
        "parking": "Yes",
        "toilet": "Yes",
        "refreshments": "Tea & coffee available",
        "other": "Camping on-site and B&B by prior request",        
        "directions": "From Waterford, take the N24 Waterford - Carrick On Suir road. Approximately 3.5 miles after turning onto the N24 turn right onto the L7431. Then follow local 'shoot' signage.",
        "images": "img/phones/Ashgrove2.jpg",
        "images1": "img/phones/Ashgrove1.jpg"
    }, 
    {
        "id": "Cork",
        "name": "South Cork Field Archers",
        "description": "The woods are situated on a gental slope leading to the bottom of the hill where a small stream runs through the bottom. The woods have a mix of evergreen and deciduous making for great shooting conditions.", 
        "type": "Outdoor range",
        "link": "http://southcorkfieldarchers.ie/",
        "association": "Irish Field Archery Federation (IFAF)",
        "parking": "Yes",
        "toilet": "Yes",
        "refreshments": "No",
        "other": "N/A",  
        "directions": "From the N27, after Cork Airport, take the R600 to Riverstick. In the village take the L3206 and follow local 'shoot' signage.",
        "images": "img/phones/Cork1.jpg",
        "images1": "img/phones/Cork.jpg"
    }, 
    {
        "id": "Laois",
        "name": "Laois Archery",
        "description": "The clubs' grounds are on a section of the historic Stradbally Hall. The woodland is open deciduous. The courses make best use of the variations in terrain and are often laid so that archers can interact with one another as moving from target to target.", 
        "type": "Outdoor & Indoor ranges",
        "link": "https://www.facebook.com/laois.archery?fref=ts",
        "association": "Irish Field Archery Federation (IFAF)",
        "parking": "Yes",
        "toilet": "Yes",
        "refreshments": "Tea & coffee available (Outdoor venue only)",
        "other": "N/A",
        "directions": "Outdoor: Take the N80 for Stradbally, following signs for Stradbally Hall. In the village, follow local 'shoot' signage. Indoor: Contact the club direct for directions.",                
        "images": "img/phones/Laois1.jpg",
        "images1": "img/phones/Laois.jpg"
    }, 
    {
        "id": "Dunbrody",
        "name": "Dunbrody Archers",
        "description": "Dunbrody Archers' shoot grounds have acres of woodland available. Two courses have been set-up todate; one on spare open terrain and the other in light deciduous woodland. The club also have an indoor shooting range at the New Ross Youth Centre, where the club meets 1-2 times per week", 
        "type": "Outdoor & Indoor ranges",
        "link": "http://dunbrodyarchers.com/",
        "association": "Irish Field Archery Federation (IFAF)",
        "parking": "Yes",
        "toilet": "Yes",
        "refreshments": "Yes - tea & coffee available (Outdoor only)",
        "other": "Camping on-site at woods",  
        "directions": "Outdoor: From New Ross, take the N25 Wexford - New Ross road. At the Horse & Hound Hotel turn onto the R736. Then follow local 'shoot' signage. Indoor: 'New Ross Youth Center', Google directions https://goo.gl/maps/MfedFWbV7ND2 ",
        "images": "img/phones/Dunbrody1.jpg",
        "images1": "img/phones/Dunbrody.jpg"
    }, 
    {
        "id": "Valley", 
        "name": "Valley Bowmen",
        "description": "The club have access to a huge parcel of woodland which has two forms, one fir and the other open copice. The mix of woodland along with terrain allow the club to have as many as three separate courses set-up and still have room to spare!", 
        "type": "Outdoor range",
        "link": "https://valleybowmen.blogspot.co.uk/",
        "association": "Irish Field Archery Federation (IFAF)",
        "parking": "Yes",
        "toilet": "Yes",
        "refreshments": "Yes - tea & coffee available",
        "other": "N/A",  
        "directions": "From Waterford City take the N25 Waterford - Cork road. In Kilmeaden take the R681 signposted Bunmahon. Then follow local 'shoot' signage.",
        "images": "img/phones/Valley1.jpg",
        "images1": "img/phones/Valley.jpg"
    },     
    {
        "id": "Mayo", 
        "name": "Mayo Archery Club (MAC)",
        "description": "MAC have access to beautiful, mature woodland. The woods, being their permanent shoot grounds, also have infastructure such as shooting platforms built.", 
        "venuetype": "Outdoor range",
        "venuelink": "https://https://www.facebook.com/mayoarchery/?fref=ts",
        "association": "Irish Field Archery Federation (IFAF)",
        "parking": "Yes",
        "toilet": "Yes",
        "refreshments": "Tea & coffee available",
        "other": "N/A",  
        "directions": "Take the N26 to Ballina. Take the N59 to Crossmolina. Then follow local 'shoot' signage after exiting Ballina.",
        "images": "img/phones/Mayo1.jpg",
        "images1": "img/phones/Mayo.jpg"
    }, 
    {
        "id": "Wexford", 
        "name": "Wexford Archery",
        "description": "The course is set primarily in the copice woodland at the edge of the grounds. The woods have a natural, meadering tails which complement the 'hunting trail' course layout preferred by the club. Good use of the lawn area in front of the House is made with several 'open' shots set-out.", 
        "venuetype": "Outdoor range",
        "venuelink": "https://www.facebook.com/Wexford-Archery-606440822748006/?fref=ts",
        "association": "Irish Field Archery Federation (IFAF)",
        "parking": "Yes",
        "toilet": "Yes",
        "refreshments": "Tea & coffee available",
        "other": "N/A",  
        "directions": "From New Ross, take the R700 (leading to N30) Enniscorty road. At Mannion's Bar turn in at the gatelodge to 'Woodville House' and follow the driveway in.",
        "images": "img/phones/Wexford1.jpg",
        "images1": "img/phones/Wexford.jpg"
    }, 
    {
        "id": "Cushinstown", 
        "name": "Cushinstown Archers",
        "description": "The indoor range is quaint, having been converted from old stone outbuildings. Whilst the range is small, it's perfectly formed and has a great atmosphere conducive to competition conditions and practice/technique development.", 
        "venuetype": "Outdoor range",
        "venuelink": "https://www.facebook.com/archeryforallireland/",
        "association": "Irish Field Archery Federation (IFAF)",
        "parking": "Yes",
        "toilet": "Yes",
        "refreshments": "Tea & coffee available",
        "other": "N/A",  
        "directions": "From New Ross take the N25 for Wexford. At Cushinstown church, turn off the main road into 'Archery for All' (AKA Cushinstown Archers).",
        "images": "img/phones/Cushinstown1.jpg",
        "images1": "img/phones/Cushinstown.jpg"
    }
  ] ; 


export const loadDetails = ()=>{
detailModel.find({}).remove(function() { 
    detailModel.collection.insert(details, (err,docs)=>{
    if (err){
      console.log(`failed to Load Venue Detail Data`);
    }
    else{
      console.info(`${details.length} venue details were successfully stored.`);
    }
  })
});
}