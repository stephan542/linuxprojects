
class Helper{
   range(min,max,step=1){
    let result = []
    for(let i=min;i<max;i+=step){
      result.push(i);
    }
    return result;
  }
}