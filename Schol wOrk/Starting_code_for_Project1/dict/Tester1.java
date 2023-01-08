public class Tester1{
    
    public int countA(BinaryTree tree){
        if(tree.emptyTree()){
            return 0;
        }else{
            if(tree.getRoot() == 'A'){
                return 1 + countA(tree.getLeft())+countA(tree.getRight());
            }else{
                return countA(tree.getLeft())+countA(tree.getRight());
            }
        }
    }

        public int countLeaves(BinaryTree tree){
            if(tree.emptyTree()){
                return 1;
            }else{
                return countLeaves(tree.getLeft())+countLeaves(tree.getRight());
            }
        }

        public String postOrder(BinaryTree tree)
        {
            if (tree.emptyTree()){
                return "";
            }else{
               return postOrder(tree.getLeft()) + postOrder(tree.getRight()) + (tree.getRoot() + " "); 
            }
        }

        public String inorder(BinaryTree tree)
        {
            if (tree.emptyTree()){
                return "";
            }else{
               return inorder(tree.getLeft()) + (tree.getRoot() + " ") + inorder(tree.getRight()); 
            }
        }

        public static void main(String[] args) {
            BinaryTree tree = new BinaryTree();
            tree.insertNode('+', 0);
            tree.insertNode('/', 0);
            tree.insertNode('*', 1);

            BinaryTree t = tree.getLeft();

            t.insertNode('*', 0);
            t.insertNode('-', 1);

            BinaryTree t2 = tree.getRight();

            t2.insertNode('5', 0);
            t2.insertNode('-', 1);

            BinaryTree t3 = t2.getRight();

            t2.insertNode('4', 0);
            t2.insertNode('1', 1);

            BinaryTree t5 = t.getRight();

            t2.insertNode('2', 0);
            t2.insertNode('3', 1);

            BinaryTree t6= t3.getRight();

            t2.insertNode('2', 0);
            t2.insertNode('1', 1);
        }
}
