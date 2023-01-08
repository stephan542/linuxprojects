let closingPrice = [];
let cm = new ChartManager(closingPrice);
let chart = cm.getChart();
let inter = null;
let dvalues = [];
let wvalues = [];
let news = [];

let newType = {
  "holiday":1,
  "low":2,
  "medium":3,
  "high":4
}
function addValue(val){
  cm.addVal(val);
}

function startInterval(){
  inter = setInterval(()=>{
    if(dvalues.length!=0){
      addValue(dvalues.shift());
    }else{
      stopInterval();
    }
    
  },1000)
}

function stopInterval(){
    clearInterval(inter);
}

function readData(arr){
  document.getElementById('inputfile')
            .addEventListener('change', function() {
              
            var fr=new FileReader();
            fr.onload=function(){
                dvalues = processTfData(fr.result.split(/[\n]/));
                startInterval();
            }
              
            fr.readAsText(this.files[0]);
        });

  document.getElementById('inputfile2')
        .addEventListener('change', function() {
          
        var fr=new FileReader();
        fr.onload=function(){
            wvalues = processTfData(fr.result.split(/[\n]/));
            startInterval();
        }
          
        fr.readAsText(this.files[0]);
    });

  document.getElementById('inputfile3')
        .addEventListener('change', function() {
          
        var fr=new FileReader();
        fr.onload=function(){
            news = processNewsData(fr.result.split(/[\n]/));
            startInterval();
        }
          
        fr.readAsText(this.files[0]);
    });
}

function processTfData(data,header=true,sperator=',',dataIndex=0,indexStart=0){
  let headers = [];
  let info = [];
  let index = indexStart;
  let resultIndex = dataIndex;
  if(header){
    headers = data[0].split(sperator)
    resultIndex = headers.findIndex((e)=> /close/gmi.test(e));
    index+=1;
  }
  let rawData='';
  for(index;index<data.length;index++){
    rawData = data[index].split(',')[resultIndex];
    if(rawData){
      info.push(rawData.match(/\d+\.?\d*/)[0]);
    }
  }
  return info;
}

function processNewsData(data,header=true,sperator=',',dataIndex=0,indexStart=0){
  let headers = [];
  let info = [];
  let index = indexStart;
  let resultIndex = dataIndex;

  if(header){
    headers = data[0].split(sperator)
    resultIndex = headers.findIndex((e)=> /close/gmi.test(e));
    index+=1;
  }

  let rawData='';
  for(index;index<data.length;index++){
    rawData = data[index].split(',');
    if(rawData){
      info.push([new Date(rawData[0]),rawData[1],newType[rawData[2]]]);
    }
  }
  return info;
}

readData();

class TradingBot{

  constructor(){

  }
}