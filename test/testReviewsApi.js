import supertest from "supertest";
import {server} from  "./../server.js";
import should from "should";

//npm run test

// UNIT test begin
describe("Reviews API unit tests",function(){
  this.timeout(120000);

// #1 return a collection of json documents
  it("should return collection of JSON documents",function(done){

// calling home page api
    supertest(server)
    .get("/api/reviews")
    .expect("Content-type",/json/)
    .expect(200) // This is HTTP response
    .end(function(err,res){
// HTTP status should be 200
      res.status.should.equal(200);
      done();
    });
  });

// #2 add a review
  it("should add a review",function(done){
    supertest(server)
    .post('/api/reviews')
    .send({title:"Test Review",link:"https://www.rte.ie/news/brexit/"})
    .expect("Content-type",/json/)
    .expect(201)
    .end(function(err,res){
      res.status.should.equal(201);
      res.body.review.should.have.property('_id');
      res.body.review.title.should.equal('Test Review');
      done();
    });
  });

// #3 delete first review
  it("should delete review",function(done){
    const superserver = supertest(server);
    superserver
    .get("/api/reviews")
    .expect("Content-type",/json/)
    .expect(200) // This is HTTP response
    .end(function(err,res){
      const id = res.body[0]._id;
      superserver
        .delete("/api/reviews/"+id)
        .expect("Content-type",/json/)
        .expect(200) // This is HTTP response
        .end(function(err,res){
            res.body._id.should.equal(id);
            res.body.should.have.property("title");
            done();
          }
        );
      }
    );
  });

// #4 add & delete Review 999
  it("should add and delete Review 999",function(done){
    // post to /api/reviews
    // calling home page api
    const superserver = supertest(server);
    superserver
    .get("/api/reviews")
    .expect("Content-type",/json/)
    .expect(200) // This is HTTP response
    .end(function(err,res){
        const id = res.body[0]._id;
        superserver
        .put("/api/reviews/"+id)
        .send({title:"Review 999",link:"Review Test Link"})
        .expect("Content-type",/json/)
        .expect(200) // This is HTTP response
        .end(function(err,res){
            superserver
            .delete("/api/reviews/"+id)
            .expect("Content-type",/json/)
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                res.body._id.should.equal(id);
                res.body.title.should.equal("Review 999");
                done();
             }
           );
           }
         );
      });
    });  

  });