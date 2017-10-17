package se.sandevind.minesweeper;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class MineField {
    private Random random = new Random();
    private List<List<Integer>> field;
    public MineField(int size, int randomness) {
        field = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            List<Integer> row = new ArrayList<>();
            for (int j = 0; j < size; j++) {
                row.add((random.nextInt(randomness) == 0) ? -9: 0);
            }
            field.add(row);
        }
    }

    public List<List<Integer>> getField() {
        return field;
    }

    public void setFieldPos(int x, int y, int value) {
        List row = field.get(y);
        row.set(x, new Integer(value));
    }

    public void prettyPrint() {
        prettyPrint(this.field);
    }
    public void  prettyPrint(List<List<Integer>> field) {
        for (List<Integer> row : field) {
            System.out.print('\n');
            for (Integer value : row) {
                System.out.print(value);
            }
        }
    }
}
