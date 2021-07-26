import React,{useState,useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar'
import Spinner from 'react-bootstrap/Spinner'
var add=0;
var c=new Date();
var gttime=c.getTime();
const Search=(props)=>{
    const[val,setval]=useState([]);
    const[moddata,setModdata]=useState([]);
    const[chategories,setCategories]=useState(["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00"]);
    const[findata,setfindata]=useState([]);
    useEffect(() => {
      const stocks = require('stock-ticker-symbol');
       axios.get(`http://91d174aa89c0.ngrok.io/${(stocks.lookup(props.match.params.id)).substr(0,(stocks.lookup(props.match.params.id).indexOf(' ')))}`).then(res=>{
       let info=res.data;
       console.log(info)
        var count=23;
        var d = new Date();
        var n = d.getHours(); 
  var temp=[];
        while(count>=0){
            if(n<10){
              temp[count--]="0"+n+":00";
              n--;
              if(n<0){
                  n=23;
              }
              continue;
            }
    temp[count--]=n+":00";
    n--;
    if(n<0){
        n=23;
    }
  }
  setCategories(temp);
 
        var arr=[];
        for(let i=0;i<info.length;i++){
          arr[parseInt(info[i].time.substring(0,2))]=0;
      }
        for(let i=0;i<info.length;i++){
      
              arr[parseInt(info[i].time.substring(0,2))]=(arr[parseInt(info[i].time.substring(0,2))])+info[i].weighted_sentiment_value;
          
  
        }
        var d = new Date();
        var n = d.getHours();
        var temparr=[]; 
        var anarr=[];
        for(let i=23;i>=0;i--){
          anarr[i]=(arr[n]);
          temparr[i]=(arr[n])+add;
          n--;
          if(n<0){
              n=23;
          }
        }
        setval(anarr)
        setModdata(temparr);
       }).catch((err)=>window.alert("Try Again  "))
          var options = {
            method: 'GET',
            url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart',
            params: {interval: '60m', symbol: `${props.match.params.id}`, range: '1d'},
            headers: {
              'x-rapidapi-key': '1992074339msh6aa7ad5cd7db7ebp17623cjsn67ef2663916c',
              'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
            }
          };
          axios.request(options).then((response)=> {
    add=response.data.chart.result[0].indicators.quote[0].close[0];
            if(response.data.chart.result[0].indicators.quote[0].close.length<24){
              var temsp=response.data.chart.result[0].indicators.quote[0].close;
              for(let i=0;i<23;i++){
                if(temsp[i]==null){
                  temsp[i]=temsp[i-1];
                }
              }
            }
            setfindata(temsp);
        }).catch((error)=> {
            console.error(error);
        });
      
    },[]);
   
    const series = [{name:"Sentimental Analysis",data:moddata},{name:"Financial Data",data:findata}];
    const options = {chart:{zoom:{enabled:!1},toolbar:{show:!1}},colors:["#556ee6","#f46a6a","#34c38f"],dataLabels:{enabled:!1},stroke:{width:[3,4,3],curve:"straight",dashArray:[0,8,5]},title:{text:"Page Statistics",align:"left"},markers:{size:0,hover:{sizeOffset:6}},xaxis:{categories:chategories},tooltip:{y:[{title:{formatter:function(e){return e+" (mins)"}}},{title:{formatter:function(e){return e+" per session"}}},{title:{formatter:function(e){return e}}}]},grid:{borderColor:"#f1f1f1"}};
    const series1 = [{name:"Sentimental Analysis",data:val}];
    const options1 = {chart:{zoom:{enabled:!1},toolbar:{show:!1}},colors:["#556ee6","#f46a6a","#34c38f"],dataLabels:{enabled:!1},stroke:{width:[3,4,3],curve:"straight",dashArray:[0,8,5]},title:{text:"Page Statistics",align:"left"},markers:{size:0,hover:{sizeOffset:6}},xaxis:{categories:chategories},tooltip:{y:[{title:{formatter:function(e){return e+" (mins)"}}},{title:{formatter:function(e){return e+" per session"}}},{title:{formatter:function(e){return e}}}]},grid:{borderColor:"#f1f1f1"}};
      return (
        
        <div>
          {
            findata.length!=0? <div> <ReactApexChart options={options} series={series} type="line" height="380" />
            { val.length==0?<div style={{position:"absolute",top:"100%",left:"50%"}}>  <Spinner animation="border" /></div>:  <ReactApexChart options={options1} series={series1} type="line" height="380" />}
            </div>:
          <div style={{position:"absolute",top:"50%",left:"50%"}}>  <Spinner animation="border" /></div>
          }

        </div>
          
            
      );
}
export default Search;