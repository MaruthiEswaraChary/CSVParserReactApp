import React, { Component } from 'react';
import './App.css';
import { Chart } from "react-charts";

class App extends Component {
  inputFile=[];
  constructor() {
    super();
    this.state = {
      data: []
   }
    this.openFile = this.openFile.bind(this);
    this.submitFile = this.submitFile.bind(this);
  }
  submitFile(){
    for (var index = 0; index < this.inputFile.length; index++) {
      let reader = new FileReader();
      reader.onload = () => {
          // this 'text' is the content of the file
          var text = reader.result;
         const multi= this.parseCSVData(text);
         this.setState({data: multi})
      }
      reader.readAsText(this.inputFile[index]);
  };
  }
  openFile(event) {
    this.inputFile = event.target.files;
    alert();
}
  parseCSVData(s){
    var data = s.split('\n');
    let obj = [];
    for(let i=0;i<data.length;i++)
    {
      let serObj = {};
      let line = data[i].split(",");
      for(let j =0;j<line.length;j++)
      {
        let colData = line[j]; 
        if(j===0){
          serObj.label = colData
          serObj.data= [];
        }else{
          let d = colData.split("|");
          if(d.length>=2)
          serObj.data.push( {
            "x": d[0],
            "y": d[1]
          })
        }
      }
      obj.push(serObj)
    }
    console.log(JSON.stringify(obj))
    return obj;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
         
        CSV Parser Demo
        </header>
        <input type="file" onChange={this.openFile} />
        <button onClick={this.submitFile}>Submit</button>

         <div
    style={{
      width: "400px",
      height: "300px"
    }}
  >
    <Chart
      data={this.state.data}
      axes={[
        { primary: true, type: "linear", position: "bottom" },
        { type: "linear", position: "left" }
      ]}
    />
  </div>

      </div>
    );
  }
}

export default App;
