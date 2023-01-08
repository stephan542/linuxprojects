

import java.io.*;
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import javax.swing.SwingUtilities;
import javax.swing.filechooser.*;
import java.util.Scanner;
import java.util.StringTokenizer;



 public abstract class DictionBase
{
    
       static String [][] dictionArr;


     private int x;

  
    public DictionBase() throws Exception
    {
         
          JFileChooser dictfile = new JFileChooser();
          File workingDirectory = new File(System.getProperty("user.dir"));
          dictfile.setCurrentDirectory(workingDirectory);
          FileNameExtensionFilter filter = new FileNameExtensionFilter("Dictionary Files","dct","dct");
          dictfile.setFileFilter(filter);
           int returnVal = dictfile.showOpenDialog(null);
       
         if (returnVal == JFileChooser.APPROVE_OPTION) 
           {    String dictionStr = new Scanner(new File(".//" + dictfile.getSelectedFile().getName())).useDelimiter("\\Z").next();
                 StringTokenizer dictTOK = new StringTokenizer(dictionStr,"|");
                dictionArr = new String[dictTOK.countTokens()][2];
                String[] cvtArr;
                int dictNdx =0;
                  while (dictTOK.hasMoreTokens())
                {
                      cvtArr = dictTOK.nextToken().split(",");
                      dictionArr[dictNdx][0] = cvtArr[0].replaceAll("\\s","");
                      dictionArr[dictNdx][1] = cvtArr[1].replaceAll("\\s","");
                       dictNdx++;
                    }
                
               System.out.println(":::::::::::Dictionary initialized with "+ getCount()+" entries:::::::::::::::");
              
                
    }

 
   }
   
   public int getCount()
   {
         return dictionArr.length;
    }
     public String getKey(int key1)
   {   
       return dictionArr[key1][0];
       
    }
  public String getVal(int key1)
   {    
    return dictionArr[key1][1];
    }
   
       public abstract String  translate(String eng) throws Exception;
       
}
