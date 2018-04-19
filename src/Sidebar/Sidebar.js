import React, { Component } from 'react';
import './Sidebar.css';
import {modelInstance} from '../data/DinnerModel';
import { Link } from 'react-router-dom';

class Sidebar extends Component {

  constructor(props) {
    super(props)
    
    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      dish: {},
      dishNames: this.props.model.getMenuDishName(),
      dishPrices: this.props.model.getMenuDishPrice(),
      menuPrice: this.props.model.getTotMenuPrice()
    }
  }

  // this methods is called by React lifecycle when the 
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer

  componentDidMount() {
    this.props.model.addObserver(this)
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = (e) => {
    this.props.model.setNumberOfGuests(+e.target.value)
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests(),
      dishNames: this.props.model.getMenuDishName(),
      dishPrices: this.props.model.getMenuDishPrice(),
      menuPrice: this.props.model.getTotMenuPrice()
    })
  }

  render() {

    return (
      <div className="Sidebar">
        <h3>This is the sidebar</h3>
        <p>
        People: <input value={this.state.numberOfGuests} onChange={this.onNumberOfGuestsChanged}/>
        <br/>
        Total number of guests: {this.state.numberOfGuests}
        </p>

        <div id="dishesInSidebar">
          {this.state.dishNames.map((dishName) =>
            <div className='col-xs-10'>{dishName}</div>
          )}
          
          {this.state.dishPrices.map((dishPrice) =>
          <div className='col-xs-2'>SEK {dishPrice}</div>
          )}

        </div>

        <div id="total_price" className="col-sm-12">
          <p>
            <span className="price">SEK {this.state.menuPrice}</span>
          </p>
        </div>

        <Link to="/dinneroverview">
          <button className="btn btn-warning">Confirm Dinner</button>
        </Link>

      </div>
    );
  }
}

export default Sidebar;
