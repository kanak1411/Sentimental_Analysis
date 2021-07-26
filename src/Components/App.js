import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router, Route } from "react-router-dom";
import history from './History/History'
import Homepage from './Homepage';
import Search from './Search';
const App=()=> {
  return (
    <div >
        <Router history={history}>
<div>
<Route path='/' exact component={Homepage} />
<Route path='/search/:id' exact component={Search} />
</div>
        </Router>
    </div>
  );
}

export default App;
