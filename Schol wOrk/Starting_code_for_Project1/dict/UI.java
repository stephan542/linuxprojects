
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class UI extends JFrame {

    JTextField jtfText1;
    Reader r;
    Container container;
    static UI u;

    JButton btnTranslate;
    JButton btnSelectDict;
    JButton btnSelectData;
    JButton btnClose;

    public UI() {
        super("Translator Interface");
        container = getContentPane();
        container.setLayout(new FlowLayout());
        jtfText1 = new JTextField(10);
        btnTranslate = new JButton("Translate textbox");
        btnSelectDict = new JButton("Select Dictionary");
        btnSelectData = new JButton("Translate text file");
        btnClose = new JButton("Close");

        btnTranslate.setEnabled(false);
        btnSelectData.setEnabled(false);

        btnTranslate.addActionListener(new ButtonListener());
        btnSelectDict.addActionListener(new ButtonListener());
        btnSelectData.addActionListener(new ButtonListener());
        btnClose.addActionListener(new ButtonListener());


        container.add(jtfText1);
        container.add(btnTranslate);
        container.add(btnSelectDict);
        container.add(btnSelectData);

        container.add(btnClose);
        setSize(325, 150);
        setLocationRelativeTo(null); 
        setVisible(true);
    }

    public static void main(String [] args)
    {
        u = new UI();
    }

    class ButtonListener implements ActionListener {
        ButtonListener() {  }

        public void actionPerformed(ActionEvent e) {
            {
                try
                {
                    if (e.getActionCommand().equals("Select Dictionary"))
                        r = new Reader(u);
                    if (e.getActionCommand().equals("Translate text file"))
                        r.translateFile();
                    if (e.getActionCommand().equals("Translate textbox"))
                        r.translateText(jtfText1.getText());
                    if (e.getActionCommand().equals("Close"))
                    {
                        setVisible(false); 
                        dispose();
                    }
                }catch( Exception ex)
                {System.out.println(ex.getMessage());}

            }
        }
    }
}