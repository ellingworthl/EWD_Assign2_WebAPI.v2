import React from 'react';
// import api from './data/eventAPI';
import * as api from './eventsApi';
import buttons from './content/eventButtons';

    var EventForm = React.createClass({
        getInitialState: function() {
           return { round: '', venue: '', date : ''};
       },
       handleRoundChange: function(e) {
            this.setState({round: e.target.value});
       },
       handleVenueChange: function(e) {
           this.setState({venue: e.target.value});
       },
       handleDateChange: function(e) {
           this.setState({date: e.target.value});
       },
       handleSubmit: function(e) {
        e.preventDefault();
        var round = this.state.round.trim();
        var venue = this.state.venue.trim();
        var date = this.state.date.trim();
        if (!round || !venue || !date) {
          return;
        }
        this.props.addHandler(round,venue,date);
        this.setState({round: '', venue: '', date: ''});
       },  
       render: function(){
          return (
            <tr>
              <td>
              <input type="text" className="form-control" 
                     placeholder="Event Type"
                     value={this.state.round}
                     onChange={this.handleRoundChange}
              />
              </td>
              <td>
              <input type="text" className="form-control"
                     placeholder="Host Club/Venue"
                     value={this.state.venue}
                     onChange={this.handleVenueChange}
              />
              </td>
              <td>
              <input type="date" className="form-control" 
                     placeholder="Date (YYYY/MM/DD)"
                     value={this.state.date}
                     onChange={this.handleDateChange}
              />
              </td>
              <td>
              <input type="button" className="btn btn-primary" value="Add"
                       onClick={this.handleSubmit} />
              </td>
            </tr>
            )
        }
      });

    var Event = React.createClass({
          getInitialState : function() {
             return {
              status : '',
              round: this.props.event.round,
              venue: this.props.event.venue,
              date: this.props.event.date
             } ;
          },
          handleDelete : function() {
             this.setState({ status : 'del'} )
          },
          handleEdit : function() {
              this.setState({ status : 'edit'} )
          }, 
          handleConfirm : function(e) {              
//*****   this.props.deleteHandler(this.props.event.date) ;//Handler uses the key / k
            this.props.deleteHandler(this.props.event._id);   // _id provided from Mongo
          },    
          handleCancel : function() {
             this.setState({ status : '', 
                   round: this.props.event.round,
                   venue: this.props.event.venue,
                   date: this.props.event.date} ) ;
            }, 
          handleSave : function(e) {
              e.preventDefault();
              var round = this.state.round.trim();
              var venue = this.state.venue.trim();
              var date = this.state.date.trim();
              if (!round || !venue || !date) {
                return;
              }
              this.setState({status : ''} )
              this.props.updateHandler(
                this.props.event._id,      // Key   from mongo
                round, venue, date
              );  // this.props.event.date part of the key
          }, 
          handleRoundChange: function(e) {
              this.setState({round: e.target.value});
            },
          handleVenueChange: function(e) {
              this.setState({venue: e.target.value});
            },
          handleDateChange: function(e) {
              this.setState({date: e.target.value});
            },
          render: function(){
               var activeButtons = buttons.normal ;
               var leftButtonHandler = this.handleEdit ;
               var rightButtonHandler = this.handleDelete ;
               var fields = [
                     <td key={'round'} >{this.state.round}</td>,
                      <td key={'venue'}>{this.state.venue}</td>,
                      <td key={'date'}>{this.state.date}</td>
                   ] ;
              if (this.state.status === 'del' ) {
                   activeButtons = buttons.delete ;
                   leftButtonHandler = this.handleCancel;
                   rightButtonHandler = this.handleConfirm ;
              } else if (this.state.status === 'edit' ) {
                   activeButtons = buttons.edit ;
                   leftButtonHandler = this.handleSave;
                   rightButtonHandler = this.handleCancel ;
                   fields = [
                      <td key={'round'}><input type="text" className="form-control"
                         value={this.state.round}
                         onChange={this.handleRoundChange} /> </td>,
                      <td key={'venue'}><input type="text" className="form-control"
                         value={this.state.venue}
                         onChange={this.handleVenueChange} /> </td>,
                      <td key={'date'}><input type="date" className="form-control"
                         value={this.state.date}
                         onChange={this.handleDateChange} /> </td>,
                   ] ;
               }
              return (
                    <tr >
                      {fields}
                      <td>
                          <input type="button" className={'btn ' + activeButtons.leftButtonColor} 
                                 value={activeButtons.leftButtonVal}
                                 onClick={leftButtonHandler} />
                      </td>
                      <td>
                         <input type="button" className={'btn ' + activeButtons.rightButtonColor} 
                               value={activeButtons.rightButtonVal} 
                               onClick={rightButtonHandler} />
                      </td>
                      </tr>
                   ) ;
            }
          });

		  //was <Event key={event.date}  event={event} 
    var EventList = React.createClass({
          render: function(){
              var eventRows = this.props.events.map(function(event){
                  return (
                   <Event key={event._id}  event={event} 
                       deleteHandler={this.props.deleteHandler} 
                       updateHandler={this.props.updateHandler} />
                    ) ;
                }.bind(this) );
              return (
                  <tbody >
                      {eventRows}
                      <EventForm 
                           addHandler={this.props.addHandler}/>
                  </tbody>
                ) ;
            }
          });

//TABLE FORMAT      
// ORIG: <table className="table table-bordered"> 
// ALT FORMATS:http://allenfang.github.io/react-bootstrap-table/example.html#basic  
    var EventsTable = React.createClass({
          render: function(){
              return (
        <table className="table table-striped table-hover table-condensed">
                    <thead>
                      <tr>
                      <th>EVENT</th>
                      <th>VENUE</th>
                      <th>DATE</th>
                      <th></th>
                      <th></th>
                      </tr>
                    </thead>
                      <EventList events={this.props.events} 
                          deleteHandler={this.props.deleteHandler} 
                          addHandler={this.props.addHandler}
                           updateHandler={this.props.updateHandler}  />
                </table>
                );
          }
      });


var EventApp = React.createClass({

    getInitialState: function() {
      return {
        events: [{}]
      };
    },

    componentDidMount: function(){
      api.getAll().then(resp => {
          this.setState({
                events: resp.events
         });
          console.log(this.state.events);
      }).catch(console.error);
    },

    deleteEvent : function(k) {
      console.log("FAF delete event: " + k);  //date is the key
       //api.delete(k);   //***** method in api is deleteEvent
       api.deleteEvent(k);
       this.setState( {} ) ;
    },

    addEvent : function(r,v,d) {
      api.addEvent(r,v,d)    //***** method name
      .then(resp => {         // handle promise
        const newEvent = {"id": resp.id, "round": resp.round, "venue": resp.venue, "date": resp.date};
        this.setState({events: this.state.events.concat([newEvent])});
      })
    },

    updateEvent : function(key,r,v,d) {
      console.log("FAF updateEvent " + key);
      console.log("round: " + r);
      console.log("venue: " + v);
      console.log("date: " + d);
      //if (api.update(key,r,v,d) )  {   //***** method in api is updateEvent
      api.updateEvent(key,r,v,d)
        .then(resp => {
          const newEvent = {"id": resp.id, "round": resp.round, "venue": resp.venue, "date": resp.date};
          this.setState({events: this.state.events.concat([newEvent])});
        })             
    },  

          render: function(){
              var events = this.state.events ;
              console.log(events); 
              return (    
                    <div>
                       <h1>Upcoming Archery Events</h1>
             <p>Country-wide competitions are listed here. </p>
             <p>Check regularly for new events and updates to any published events.</p>
                       <EventsTable events={events} 
                          deleteHandler={this.deleteEvent}
                          addHandler={this.addEvent} 
                          updateHandler={this.updateEvent}  />
                    </div>
              );
          }
      });
    
export default EventApp;