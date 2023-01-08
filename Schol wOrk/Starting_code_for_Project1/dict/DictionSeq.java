import java.util.concurrent.*;    

public class DictionSeq extends DictionBase
{

    public DictionSeq() throws Exception
    {
         super();
    }
    public  String translate(String eng) throws Exception
    {
        return translateS(eng);
    }  


   private String translateS (String eng) throws Exception
    {
        int ndx = 0, found =0;
        String returnval = "No comprehendo";
        while((ndx< this.getCount()) && (found==0))
        {
         TimeUnit.NANOSECONDS.sleep(1);
            if(this.getKey(ndx).equalsIgnoreCase(eng)){
                returnval = this.getVal(ndx);
                found=1;
            }
         ndx+=1;
        }
      
      return returnval;
    }

}
