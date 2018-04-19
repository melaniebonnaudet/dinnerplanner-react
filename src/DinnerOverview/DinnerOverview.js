import React, { Component } from 'react';
import './DinnerOverview.css';
import {modelInstance} from '../data/DinnerModel';
import { Link } from 'react-router-dom';

class DinnerOverview extends Component {
	constructor(props) {
    super(props)
    
    // we put on state the properties we want to use and modify in the component
    this.state = {
		dish: {},
		dishNames: modelInstance.getMenuDishName(),
		dishPrices: modelInstance.getMenuDishPrice(),
		menuPrice: modelInstance.getTotMenuPrice(),
		menuImg: modelInstance.getMenuImg()
    }
  }

	    //0801710

  render() {

    return (
      
    <div>
      	{this.state.menuImg.map((img) =>
			<img src={img} alt="food"></img>
		)}
  		
		{this.state.dishNames.map((dishName) =>
           
            <p>{dishName}</p>
         )}

		{this.state.dishPrices.map((dishPrice) =>
          <p>SEK {dishPrice}</p>
        )}	

		<div>Total Price: SEK {this.state.menuPrice}</div>

		<Link to="/dinnerprintout">
			<button className="btn btn-warning">Print Dinner!</button>
		</Link>
	
	</div>
      
    );
  }
}

export default DinnerOverview;
