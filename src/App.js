import React, { useEffect,useRef } from 'react';
import Graph from './Components/Graph/Graph';
import DatePickerComponent from './Components/DatePicker/DatePicker';
import TableComponent from './Components/Table/Table'
import moment from 'moment';
import './App.css';

const calculateXandY =(data) =>{
  let x = [], y = [];
  for (let i = 0; i < data.length; i++) {
    x.push(data[i].timestamp);
    y.push(data[i].ecpm)
  }
  return {x,y};
}

function App() {

  const [graphData, setGraphData] = React.useState([]);
  const [filteredData,setFilteredData]= React.useState({ x: [], y: [] });
  const [filterTableData,setFilteredTableData]=React.useState([]);

  useEffect(async () => {
    let res = await fetch("http://www.mocky.io/v2/5cd04a20320000442200fc10");
    let data = await res.json();
    data=data.map((item,index)=>{
      item['key']=index+1 +'';
      item['ecpm'] = (item.revenue / item.impressions) * 1000
      return item;
    })

    let {x,y} = calculateXandY(data);
    
    let obj = Object.assign(graphData, { x, y });
    
    setGraphData(
      data
    )
    setFilteredTableData(data)
    setFilteredData({
      ...obj
    })
  }, []);

  const rangeHandler =(start,end) =>{
    let rangedData= graphData.filter((item)=>moment(start)<=moment(item.timestamp) && moment(item.timestamp)<=moment(end));
    let {x,y} = calculateXandY(rangedData);
    let obj = Object.assign({}, { x, y });
     setFilteredData({
       ...obj
     });
     setFilteredTableData(rangedData);
  }

  return (
    <div className="App">
      <DatePickerComponent rangeHandler={rangeHandler} />
      <Graph graphData={filteredData} />
      <TableComponent graphData={filterTableData} />
    </div>
  );
}

export default App;
