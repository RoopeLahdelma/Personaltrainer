import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, } from "react-router-dom";
import Navigator from './Components/Navigator';
import Training from './Components/Training';
import Customers from './Components/Customers';






function App() {

  return (

    <div className="App">

      <BrowserRouter>
        <div>

          <Navigator />

          <Switch>
            <Route exact path="/" component={Customers} />
            <Route path="/training" component={Training} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>

        </div>
      </BrowserRouter>



    </div>
  );
}

export default App;
