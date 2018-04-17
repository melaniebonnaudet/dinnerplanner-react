import React, { Component } from 'react';

class SearchBar extends Component {

	constructor(props) {
	    super(props);
		this.state = {
	      type: "",
	      filter: ""
	    }
  }

  handleFilterChange = (e) => {
    console.log(this.refs.typeinput.value, this.refs.filterinput.value);
    this.props.onSearch(this.refs.typeinput.value, this.refs.filterinput.value);
  }

  handleTypeChange = (e) => {	
  	console.log(this.refs.typeinput.value, this.refs.filterinput.value);
    this.props.onSearch(this.refs.typeinput.value, this.refs.filterinput.value);
  }

  render() {
    return (
      <div className="SelectDish">
       
        <select ref="typeinput" onChange={this.handleTypeChange}>
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

        <input ref="filterinput" onChange={this.handleFilterChange}/>

      </div>
    );
  }
}

export default SearchBar;