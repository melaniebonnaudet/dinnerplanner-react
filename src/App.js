import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Welcome from './Welcome/Welcome';
import DishDetail from './DishDetail/DishDetail';
import { modelInstance } from './data/DinnerModel'
import SelectDish from "./SelectDish/SelectDish";
import SearchBar from "./SearchBar/SearchBar";
import DinnerOverview from "./DinnerOverview/DinnerOverview";
import DinnerPrintout from "./DinnerPrintout/DinnerPrintout";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Dinner Planner',
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.state.title}</h1>
          
          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome}/>
          <Route path="/search" render={() => <SelectDish model={modelInstance}/>}/>
          <Route path="/search" render={() => <SearchBar model={modelInstance}/>}/>
          <Route path="/dishdetail/:dishID" component={DishDetail}/>
          <Route path="/dinneroverview" component={DinnerOverview}/>
          <Route path="/dinnerprintout" component={DinnerPrintout}/>
        
        </header>
      </div>
    );
  }
}

export default App;
