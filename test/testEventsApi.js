import supertest from "supertest";
import {server} from  "./../server.js";
import should from "should";

//correct case on API (was "/api/events" now "/api/Events")

// UNIT test begin
describe("Events API unit tests",function(){
  this.timeout(120000);

// #1 return a collection of json documents
  it("should return collection of JSON documents",function(done){

// calling home page api
    supertest(server)
    .get("/api/Events")
    .expect("Content-type",/json/)
    .expect(200) // This is HTTP response
    .end(function(err,res){
// HTTP status should be 200
      res.status.should.equal(200);
      done();
    });
  });

// #2 add an event
  it("should add an event",function(done){
    supertest(server)
    .post('/api/Events')
    .send({round:"Test Round",venue:"Test Venue",date:"2017/09/22"})
    .expect("Content-type",/json/)
    .expect(201)
    .end(function(err,res){
      res.status.should.equal(201);
      res.body.event.should.have.property('_id');
      res.body.event.round.should.equal('Test Round');
      done();
    });
  });

// #3 delete first event
  it("should delete event",function(done){
    const superserver = supertest(server);
    superserver
    .get("/api/Events")
    .expect("Content-type",/json/)
    .expect(200) // This is HTTP response
    .end(function(err,res){
      const id = res.body[0]._id;
      superserver
        .delete("/api/Events/"+id)
        .expect("Content-type",/json/)
        .expect(200) // This is HTTP response
        .end(function(err,res){
            res.body._id.should.equal(id);
            res.body.should.have.property("round");
            done();
          }
        );
      }
    );
  });

// #4 add & delete Event 999
  it("should add and delete Event 999",function(done){
    // post to /api/Events
    // calling home page api
    const superserver = supertest(server);
    superserver
    .get("/api/Events")
    .expect("Content-type",/json/)
    .expect(200) // This is HTTP response
    .end(function(err,res){
        const id = res.body[0]._id;
        superserver
        .put("/api/Events/"+id)
        .send({round:"999 Round",venue:"999 Venue",date:"999 Date"})
        .expect("Content-type",/json/)
        .expect(200) // This is HTTP response
        .end(function(err,res){
            superserver
            .delete("/api/Events/"+id)
            .expect("Content-type",/json/)
            .expect(200) // This is HTTP response
            .end(function(err,res){
                res.body._id.should.equal(id);
                res.body.round.should.equal("Round 999");
                done();
             }
           );
           }
         );
      });
    });  

  });