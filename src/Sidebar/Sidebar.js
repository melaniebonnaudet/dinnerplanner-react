import React, { Component } from 'react';
import './Sidebar.css';
import {modelInstance} from '../data/DinnerModel';

class Sidebar extends Component {

  constructor(props) {
    super(props)
    
    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menu: this.props.model.getFullMenu(),
      dish: {},
      dishNames: this.props.model.getMenuDishName(),
      test: ["hey"]
    }
  }

  // this methods is called by React lifecycle when the 
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer

  componentDidMount() {
    this.props.model.addObserver(this)
    //this.props.model.setMenuDishName();
    
    /*var i;
    for (i in this.state.menu) {
    modelInstance.getDish(i).then(dish => {
        //console.log(dish.title);
        this.state.dishesNames.push(dish.title);
     //   this.setState({
      //    dishesNames: []
      //  });
        //dishNames.push(dish.title);
        //console.log(dishNames);        
      });
    }*/
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests(),
      dishNames: this.props.model.getMenuDishName(),
      menu: this.props.model.getFullMenu(),
      test: ["hi"]
    })
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = (e) => {
    this.props.model.setNumberOfGuests(+e.target.value)
  }

  render() {
    var mymenu = this.state.menu;

    return (
      <div className="Sidebar">
        <h3>This is the sidebar</h3>
        <p>
        People: <input value={this.state.numberOfGuests} onChange={this.onNumberOfGuestsChanged}/>
        <br/>
        Total number of guests: {this.state.numberOfGuests}
        </p>

        <div id="dishesInSidebar">
          
            <div class='col-xs-8'>{this.state.dishNames}</div>
          
          <div class='col-xs-4'>SEK 0.00</div>
        </div>

      </div>
    );
  }
}

export default Sidebar;
