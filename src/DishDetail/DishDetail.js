import React, { Component } from 'react';
import './DishDetail.css';
import Sidebar from '../Sidebar/Sidebar';
import Dishes from '../Dishes/Dishes';
import {modelInstance} from '../data/DinnerModel';

class DishDetail extends Component {
	constructor(props) {
	    super(props);
	    // We create the state to store the various statuses
	    // e.g. API data loading or error 
	    this.state = {
	      status: 'INITIAL',
	      dish: {} 
	    }
	  }

	componentDidMount = () => {
	    // when data is retrieved we update the state
	    // this will cause the component to re-render
	    modelInstance.getDish(this.props.match.params.dishID).then(mydish => {
	    	console.log(mydish)
	      this.setState({
	        status: 'LOADED',
	        dish: mydish
	      })
	    }).catch(() => {
	      this.setState({
	        status: 'ERROR'
	      })
	    })
	  }

	addToMenu = () => {
		modelInstance.addDishToMenu(this.props.match.params.dishID)
		//console.log(modelInstance.getFullMenu());
		modelInstance.setMenuDishName();
		modelInstance.setMenuDishPrice();
		//console.log(modelInstance.getMenuDishName());
	}

	removeFromMenu = () => {
		modelInstance.removeDishFromMenu(this.props.match.params.dishID)
		console.log(modelInstance.getFullMenu())
	}		

  render() {

	let dishDetail = null;

	    // depending on the state we either generate
	    // useful message to the user or show the list
	    // of returned dishes
    switch (this.state.status) {
      case 'INITIAL':
        dishDetail = <em>Loading...</em>
        break;
      case 'LOADED':
      	let dish = this.state.dish;
        dishDetail = (
        <div className="col-xs-9">
         	<div className="col-xs-6">
	          <div className="dishDetail">
	            <div key={dish.id}>{dish.title}</div>
	            <img src={dish.image} alt="food"></img>
	            <p>{dish.instructions}</p>
	          </div>
	        </div>

	        <div className="col-xs-6">
	        	<div className="panel panel-warning" id="ingredientsView">
          			<div className= "panel-heading">
              			<span>INGREDIENTS FOR</span> <span id="numberOfGuests">{modelInstance.getNumberOfGuests()}</span> <span>PEOPLE</span>
        			</div>
          
          			<div className="panel-body">
              
	         			<div className="container col-xs-12">
	           				<div className="col-xs-3" id="amount">
	          					{dish.extendedIngredients.map((ingredient)=>
	          						<p>{ingredient.amount}</p>)} 
	         				</div>
	           
	           				<div className="col-xs-6" id="ingredients">
	        					{dish.extendedIngredients.map((ingredient)=>
	        					<p>{ingredient.name}</p>)}
	        				</div>
	              		</div>
	              
	        			<div className="col-xs-12">
	            			<div className="col-xs-10">
	            				<p>
	        						<button className="btn btn-warning" id="btn_addtomenu" onClick={this.addToMenu}>add to menu</button>
	            				</p>
	                
	             				<p>
	        						<button className="btn btn-warning" id="btn_removeFromMenu" onClick={this.removeFromMenu}>remove from menu</button>
	            				</p>      
	            			</div>

			        		<div className="col-xs-2">
			          			<p id="ingredientsViewTotPrice">
			       					<span className="price">{((dish.pricePerServing / dish.servings)*modelInstance.getNumberOfGuests()).toFixed(2)}</span>
			              		</p>
			        		</div>
	    				</div>
              		</div>
          		</div>
	    	</div>
        </div>
        );
        break;
      default:
        dishDetail = <b>Failed to load data, please try again</b>
        break;
    }


    return (
      <div className="DishDetail">
        <h2>This is the Dish Detail screen</h2>
        
        {/* We pass the model as property to the Sidebar component */}
        <div className="col-xs-3">
          <Sidebar model={modelInstance}/>
        </div>

        
        <div>
        	{dishDetail}
        </div>


      </div>
    );
  }
}

export default DishDetail;
