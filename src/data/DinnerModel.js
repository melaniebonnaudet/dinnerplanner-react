const httpOptions = {
  headers: {'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'}
};

const DinnerModel = function () {

  let numberOfGuests = 4;
  let observers = [];
  let menu = [];
  let dishNames = ["812966"];

  this.setNumberOfGuests = function (num) {
    numberOfGuests = num;
    notifyObservers();
  };

  this.getNumberOfGuests = function () {
    return numberOfGuests;
  };

  this.getFullMenu = function() {
    return menu;
  };

  this.addDishToMenu = function(id) {
    menu.push(id);
    notifyObservers();
  };

  this.removeDishFromMenu = function(id) {
    var index = menu.indexOf(id);
    menu.splice(index, 1);
    notifyObservers();   
  };

  this.setMenuDishName = function() {
    var i;
    //var dish;
    if (menu.length != 0) {
      while (dishNames.length > 0) {
            dishNames.pop();
          }
      for (i in menu) {
        this.getDish(menu[i]).then(dish => {

          dishNames.push(dish.title);
          console.log(dishNames);
          console.log(this.getMenuDishName());
        });
      }
      notifyObservers();
    }
  }

  this.getMenuDishName = function() {
    return dishNames;
  }

  // API Calls

  this.getAllDishes = function (type, filter) {
  
    let url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search';
    let number = "";
      if (type == "all") {
          type = "";
          number = "10";
      }

      if (type !== ""){
        url += '?type=' + type;
      }

      if (filter !== ""){
        url += '&query=' + filter;
      }

    console.log(url);
    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)
  }

  this.getDish = function (id) {
  const url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/'+ id +'/information'
  return fetch(url, httpOptions)
    .then(processResponse)
    .catch(handleError)
}
  
  // API Helper methods

  const processResponse = function (response) {
    if (response.ok) {
      return response.json()
    }
    throw response;
  }
  
  const handleError = function (error) {
    if (error.json) {
      error.json().then(error => {
        console.error('getAllDishes() API Error:', error.message || error)
      })
    } else {
      console.error('getAllDishes() API Error:', error.message || error)
    }
  }

  // Observer pattern

  this.addObserver = function (observer) {
    observers.push(observer);
  };

  this.removeObserver = function (observer) {
    observers = observers.filter(o => o !== observer);
  };

  const notifyObservers = function () {
    observers.forEach(o => o.update());
  };
};

export const modelInstance = new DinnerModel();
