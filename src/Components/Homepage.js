import React,{useState} from 'react';
import './Homepage.css';
import history from './History/History';
const Homepage=()=>{
    const [search,setSearch]=useState();
    const [searc,setSearc]=useState();
    const toggleShow= () =>{
        var el = document.getElementById("box");
        el.classList.toggle("show");
        history.push(`/search/${search}`);
      }
      const stocks = require('stock-ticker-symbol');
    return(
        <div className="homepage" >
       <div className="container">
      <input type="text" id="box" placeholder="Which Stock Info do you need?" className="search__box" onChange={(e)=>setSearc(e.target.value)}/>
      <i className="fas fa-search search__icon" id="icon" onClick={()=>toggleShow()}></i>  
  </div>
  {searc?<div className="container-1">
      {
          stocks.search(searc).map((dat,indx)=>{
              if(indx<3)
              return(<div onClick={()=>{setSearch(dat.ticker)
              history.push(`/search/${dat.ticker}`)}}>
                  <div>
            <h3>{dat.ticker}</h3>
 </div>
                  </div>)
          })
      }
       
        </div>:""}
        </div>
    )
};
export default Homepage;