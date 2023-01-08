import java.util.concurrent.*;

public class DictionBin extends DictionBase
{
   

    public DictionBin() throws Exception
    {
          super();
    }
    public  String translate(String eng) throws Exception
    {
        return translateB(eng,0,this.getCount());
    }  

     private  String translateB ( String eng,int lo, int hi) throws Exception
    {

        int mid, found =0;
         String returnval;
          returnval = "No comprehendo";
                    
         TimeUnit.NANOSECONDS.sleep(1);

        while(lo<hi && found==0){

            mid=(lo+hi)/2;

            if(this.getKey(mid).equalsIgnoreCase(eng)){
                returnval = this.getVal(mid);
                found=1;
            }else if(this.getKey(mid).compareTo(eng) < 0){
                //if word is before
                hi = mid - 1;
            }else {
                //if word is after
                lo = mid + 1;
            }
        }
     return returnval;
    }
    
     
}
