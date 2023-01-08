class ChartManager{
  closingPrices = []
  chart = null;

    constructor(cp=[]){
        this.closingPrices=cp;
        this.setup();
    }

    getChart(){
      return this.chart;
    }
 
    addVal(val){
      if(this.chart){
        if(this.closingPrices.length<288){
          this.closingPrices.push(val);
        }else{
          this.closingPrices.shift();
          this.closingPrices.push(val);
        }
        this.chart.update();
        document.getElementById('currentPrice').innerHTML = val;
      }
    }

    setup(){
     this.chart = new Chart('myChart',{
            type:'line',
            data: {
              labels:Helper.prototype.range(0,288),
                datasets:[{
                  pointRadius:1,
                  fill:false,
                  pointBackgroundColor: "rgb(0,0,255)",
                  borderColor: "#3e95cd",
                  data:this.closingPrices,
                }]
              },
                options: {
                  plugins:{
                    legend: {display: false},
                  },
                  animation: {
                    duration: 0
                  },
                  scales: {
                    x:{
                      grid: {display:false},
                      ticks: {
                        display:false,
                      }
                    },
                    y:{
                      grid: {display:false}
                    }
                  }
                }
        });
    }
}