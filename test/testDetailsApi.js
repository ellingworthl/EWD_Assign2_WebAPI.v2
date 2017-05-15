import supertest from "supertest";
import {server} from  "./../server.js";
import should from "should";

// UNIT test begin
describe("Details API unit tests",function(){
  this.timeout(120000);

// #1 return a collection of json documents
  it("should return collection of JSON documents",function(done){

// calling home page api
    supertest(server)
    .get("/api/details")
    .expect("Content-type",/json/)
    .expect(200) // This is HTTP response
    .end(function(err,res){
// HTTP status should be 200
      res.status.should.equal(200);
      done();
    });
  });

// #2 add venue detail
  it("should add a venue detail",function(done){
    supertest(server)
    .post('/api/details')
    .send({id:"001",name:"Test Venue",description:"Test Discription",type:"Test Type",link:"Test URL",association:"Test association",parking:"Test parking",toilet:"Test W/C",refreshments:"Test refreshments",other:"Test Other",directions:"Test directions URL",images:"Test Image0",images1:"Test Image1"})
    .expect("Content-type",/json/)
    .expect(201)
    .end(function(err,res){
      res.status.should.equal(201);
      res.body.details.should.have.property('_id');
      res.body.details.description.should.equal('Test Discription');
      done();
    });
  });

// #3 delete first venue detail
  it("should delete venue",function(done){
    const superserver = supertest(server);
    superserver
    .get("/api/details")
    .expect("Content-type",/json/)
    .expect(200) // This is HTTP response
    .end(function(err,res){
      const id = res.body[0]._id;
      superserver
        .delete("/api/details/"+id)
        .expect("Content-type",/json/)
        .expect(200) // This is HTTP response
        .end(function(err,res){
            res.body._id.should.equal(id);
            res.body.should.have.property("description");
            done();
          }
        );
      }
    );
  });

// #4 add & delete Venue Detail 999
  it("should add and delete Venue Detail 999",function(done){
    // post to /api/details
    // calling home page api
    const superserver = supertest(server);
    superserver
    .get("/api/details")
    .expect("Content-type",/json/)
    .expect(200) // This is HTTP response
    .end(function(err,res){
        const id = res.body[0]._id;
        superserver
        .put("/api/details/"+id)
        .send({id:"001",name:"999 Venue",description:"999 Discription",type:"999 Type",link:"999 URL",association:"999 association",parking:"999 parking",toilet:"999 W/C",refreshments:"999 refreshments",other:"999 Other",directions:"999 directions URL",images:"999 Image0",images1:"999 Image1"})
        .expect("Content-type",/json/)
        .expect(200) // This is HTTP response
        .end(function(err,res){
            superserver
            .delete("/api/details/"+id)
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