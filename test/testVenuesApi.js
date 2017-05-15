import supertest from "supertest";
import {server} from  "./../server.js";
import should from "should";

// UNIT test begin
describe("Venues API unit tests",function(){
  this.timeout(120000);

// #1 return a collection of json documents
  it("should return collection of JSON documents",function(done){

// calling home page api
    supertest(server)
    .get("/api/venues")
    .expect("Content-type",/json/)
    .expect(200) // This is HTTP response
    .end(function(err,res){
// HTTP status should be 200
      res.status.should.equal(200);
      done();
    });
  });

// #2 add a venue
  it("should add a venue",function(done){
    supertest(server)
    .post('/api/venues')
    .send({id:"001",name:"Test Venue",town:"Test Town",county:"Test County",phoneno:"Test Ph #",imageUrl:"Test Image URL"})
    .expect("Content-type",/json/)
    .expect(201)
    .end(function(err,res){
      res.status.should.equal(201);
      res.body.venue.should.have.property('_id');
      res.body.venue.town.should.equal('Test Town');
      done();
    });
  });

// #3 delete first venue
  it("should delete venue",function(done){
    const superserver = supertest(server);
    superserver
    .get("/api/venues")
    .expect("Content-type",/json/)
    .expect(200) // This is HTTP response
    .end(function(err,res){
      const id = res.body[0]._id;
      superserver
        .delete("/api/venues/"+id)
        .expect("Content-type",/json/)
        .expect(200) // This is HTTP response
        .end(function(err,res){
            res.body._id.should.equal(id);
            res.body.should.have.property("town");
            done();
          }
        );
      }
    );
  });

// #4 add & delete Venue 999
  it("should add and delete Venue 999",function(done){
    // post to /api/venue
    // calling home page api
    const superserver = supertest(server);
    superserver
    .get("/api/venues")
    .expect("Content-type",/json/)
    .expect(200) // This is HTTP response
    .end(function(err,res){
        const id = res.body[0]._id;
        superserver
        .put("/api/venues/"+id)
        .send({id:"001",name:"Venue 999",town:"999 Town",county:"999 County",phoneno:"999 Ph #",imageUrl:"999 Image URL"})
        .expect("Content-type",/json/)
        .expect(200) // This is HTTP response
        .end(function(err,res){
            superserver
            .delete("/api/venues/"+id)
            .expect("Content-type",/json/)
            .expect(200) // This is HTTP response
            .end(function(err,res){
                res.body._id.should.equal(id);
                res.body.name.should.equal("Venue 999");
                done();
             }
           );
           }
         );
      });
    });  


  });