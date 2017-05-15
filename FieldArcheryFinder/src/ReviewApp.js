import React from 'react';
import _ from 'lodash';
import * as api from './reviewsApi';
//import api from './data/stubAPI';

//new import to support routing
import { Link } from 'react-router';

var Form = React.createClass({
   getInitialState: function() {
       return { title: '', link: '', username: ''};
    },
    handleTitleChange: function(e) {
       this.setState({title: e.target.value});
     },
     handleLinkChange: function(e) {
        this.setState({link: e.target.value});
     },
     handleUsernameChange: function(e) {
        this.setState({username: e.target.value});
     },     
     handleSubmit : function(e) {
        e.preventDefault();
        var title = this.state.title.trim();
        var link = this.state.link.trim();
        var username = this.state.username.trim();        
        if (!title ) {
            return;
        }
        this.props.addHandler(title,link,username );
        this.setState({title: '', link: '', username: ''});
     },

     render : function() {
       return (
         <form style={{marginTop: '30px'}}>
            <h3>Add a new review</h3>
            <div className="form-group">
              <input type="text"
                className="form-control" placeholder="REVIEW TITLE"
                value={this.state.title}
                onChange={this.handleTitleChange} ></input>
            </div>

            <div className="form-group">
              <input type="text"
                 className="form-control" placeholder="RELATED LINK"
                 value={this.state.link}
                 onChange={this.handleLinkChange} ></input>
            </div>

            <div className="form-group">
              <input type="text"
                 className="form-control" placeholder="USER NAME"
                 value={this.state.username}
                 onChange={this.handleUsernameChange} ></input>
            </div>            

            <button type="submit" className="btn btn-primary"
                 onClick={this.handleSubmit} >Submit</button>
          </form>
        );
      }
   });

//react router tag "Link to" added to replace "a href=" HTML hyperlink tag
var ReviewItem = React.createClass({
    handleVote : function() {
      this.props.upvoteHandler(this.props.review.id);
    },
    render : function() {
var lineStyle = {
     fontSize: '20px', marginLeft: '10px'  };
var cursor = { cursor: 'pointer' } ;
var line ;
    if (this.props.review.link ) {
       line = <a href={this.props.review.link} >
                    {this.props.review.title} 
                    {this.props.review.username}</a> ;
    } else {
       line = <span>{this.props.review.title} </span> ;
    }
      return (
      <div >
        <span className="glyphicon glyphicon-thumbs-up" 
            style={cursor} 
            onClick={this.handleVote} ></span>
            {this.props.review.upvotes}
          <span style={lineStyle} >{line}<span>
            <Link to={'/reviews/' + this.props.review.id }>Comments</Link>
          </span>
        </span>
      </div>  
    );
  }
}) ;

var ReviewList = React.createClass({
    render : function() {  
      var items = this.props.reviews.map(function(review,index) {
         return <ReviewItem key={index} review={review} 
            upvoteHandler={this.props.upvoteHandler}  /> ;
        }.bind(this) )
    return (
      <div>
        {items}
      </div>
    );
  }
}) ;  

var ReviewApp = React.createClass({ 

    getInitialState: function() {
    return {
      reviews: [{}],
    };
  },

  componentDidMount: function(){
    api.getAll().then(resp => {
      this.setState({
        reviews: resp.reviews
      });
      console.log("didMount: " + this.state.reviews)
    }).catch(console.error);
  },

//ORIG:
//    addReview : function(t,l) {   
//      if (api.add(t,l)) {  
//         this.setState({});
//      }
//    }, 

//Trial Fix - Uncaught TypeError: api.add is not a function:
// change method name to addReview to match method in api
// FIXED!!! Console log "reviewsApi.js addReview"
    addReview : function(t,l,u) {   
      if (api.addReview(t,l,u)) {  
         this.setState({});
      }
    },

    incrementUpvote : function(id) {
      api.upvote(id) ;
      this.setState({});
    },    
    render: function(){
    //    var reviews = _.sortBy(api.getAll(), function(post) {
    //                   return - post.upvotes;
    //         }
    //      );
      

      var reviews = this.state.reviews;
        return (
           <div >		   
      <h1>Reviews and feedback</h1>
      <p>Please find below a selection of reviews and links related to Field Archery.  Reviews are sorted by most popular ('thumbs-up').</p>

               <ReviewList reviews={reviews} 
                    upvoteHandler={this.incrementUpvote} />
               <Form addHandler={this.addReview}  />
          </div>
        );
    }
});

export default ReviewApp;
