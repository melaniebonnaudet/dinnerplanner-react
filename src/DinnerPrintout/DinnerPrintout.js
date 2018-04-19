import React, { Component } from 'react';
import './DinnerPrintout.css';
import {modelInstance} from '../data/DinnerModel';

class DinnerPrintout extends Component {
	constructor(props) {
    super(props)
    
    // we put on state the properties we want to use and modify in the component
    this.state = {
		dish: {},
		dishNames: modelInstance.getMenuDishName(),
		menuImg: modelInstance.getMenuImg(),
		menuInstructions: modelInstance.getMenuInstructions()
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
	
		{this.state.menuInstructions.map((instruction) =>   
            <p>{instruction}</p>
        )}

	</div>
      
    );
  }
}

export default DinnerPrintout;
