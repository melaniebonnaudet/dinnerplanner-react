import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Dishes.css';
// Alternative to passing the moderl as the component property, 
// we can import the model instance directly
import {modelInstance} from '../data/DinnerModel';


class Dishes extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error 
    this.state = {
      status: 'INITIAL'
    }
  }

  update = function (type, filter) {
    //console.log("Im here now", this.props.type);
    modelInstance.getAllDishes(type, filter).then(dishes => {
      console.log(dishes);
      this.setState({
        status: 'LOADED',
        dishes: dishes.results
      })
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      })
    })
  }

  // this methods is called by React lifecycle when the 
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render
     
    this.update(this.props.type, this.props.filter);
  
  }

componentWillReceiveProps = (props) => {
    // when data is retrieved we update the state
    // this will cause the component to re-render
     
    this.update(props.type, props.filter);
  
  }
  


  render() {
    let dishesList = null;

    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case 'INITIAL':
        dishesList = <em>Loading...</em>
        break;
      case 'LOADED':
      console.log(this.state.dishes);
        dishesList = this.state.dishes.map((dish) =>
          <Link to={"./DishDetail/" + dish.id}>
            <div className="dishCard">
              <div key={dish.id}>{dish.title}</div>
              <img src={"https://spoonacular.com/recipeImages/" + dish.image} alt="food"></img>
            </div>
          </Link>
        )
        break;
      default:
        dishesList = <b>Failed to load data, please try again</b>
        break;
    }

    return (
      <div className="Dishes">
        <h3>Dishes</h3>

       {/* <select name="typeOfDish" id="typeOfDish">
          <option value="all">all</option>
          <option value="beverage">beverage</option>
          <option value="drink">drink</option>
          <option value="breakfast">breakfast</option>
          <option value="appetizer">appetizer</option>
          <option value="salad">salad</option>
          <option value="sauce">sauce</option>
          <option value="soup">soup</option>
          <option value="bread">bread</option>
          <option value="main course">main course</option>
          <option value="side dish">side dish</option>
          <option value="dessert">dessert</option>
        </select>
           
        <input type="text" placeholder="Enter key words" id="searchInput"></input>
       
        <button className="btn btn-warning" id="searchButton">search</button>*/}

        <div>
          {dishesList}
        </div>

      </div>
    );
  }
}

export default Dishes;
