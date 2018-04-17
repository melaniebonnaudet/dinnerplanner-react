import React, { Component } from 'react';
import './SelectDish.css';
import Sidebar from '../Sidebar/Sidebar';
import Dishes from '../Dishes/Dishes';
import SearchBar from '../SearchBar/SearchBar';

class SelectDish extends Component {

  constructor(props) {
    super(props);

    this.state = {
      type: "",
      filter: ""
    }
  }

  componentWillReceiveProps(Props){
    this.setState({
      type: Props.type,
      filter: Props.filter
    })
  }

  searchTriggered = (type, filter)=> {
    console.log(type);
    this.setState({
      type: type,
      filter: filter
    })
  }

  render() {
    return (
      <div className="SelectDish">
        <h2>This is the Select Dish screen</h2>
        
        {/* We pass the model as property to the Sidebar component */}
        <div className="col-xs-3">
          <Sidebar model={this.props.model}/>
        </div>
        <div className="col-xs-9">
          <SearchBar onSearch={this.searchTriggered}/>
          <Dishes model={this.props.model} type={this.state.type} filter={this.state.filter}/>
        </div>
      </div>
    );
  }
}

export default SelectDish;

