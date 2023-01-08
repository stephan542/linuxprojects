function script(){
    let row = document.querySelectorAll('.calendar__row--grey');
    let data = '';
    let w = '';
    let date = '';
    let time = '';
    let y = '';
    let x= '';
    let lastdate = '';
    dates = ['start','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    
    row.forEach((r)=>{
        w = r.querySelector('td:nth-child(5)').classList.value.match(/(?:high|low|holiday|medium)/)[0];
    
    y =  r.querySelector('td:nth-child(1)').textContent.match(/(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)|\d+/gmi);
    
    if(y){
       date = dates.findIndex((e)=>e==y[0])+"-"+y[1]+"-22";
       lastdate = date;
    }else{
        date = lastdate;
    }

    x = r.querySelector('td:nth-child(2)').textContent.match(/\d+|(?:pm|am)+/gmi);
    
      if(x==null){
        time = 0;
      }else if(x[2] == 'pm'){
        time = parseInt(x[0])+12;
       }else{
        time = x[0];
         }
        
       data+="\n"+date+','+time+','+w;
    })
    return data;
    }