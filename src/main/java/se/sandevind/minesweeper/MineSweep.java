package se.sandevind.minesweeper;

import java.util.List;

public class MineSweep {
    private MineField mineField = new MineField(10, 10);

    public List<List<Integer>> pick(int x, int y) {
        List<List<Integer>> field = mineField.getField();
        if (field.get(y).get(x) == -9) {
            throw new RuntimeException("Boom");
        }

        checkField(x, y, field);
        return field;
    }

    private void checkField(int x, int y, List<List<Integer>> field) {
        int nearMines = 0;
        for (int i = y-1; i <= y+1; i++) {
            List<Integer> row = field.get(i);
            for(int j = x-1; j <= x+1; j++) {
                if (row.get(i) == -9) {
                    nearMines ++;
                }
            }
        }
        int element = (nearMines > 0) ? nearMines : -1;
        System.out.println("NearMines: " + (element));
        field.get(y).set(x, element);
        if (element == -1) {

        }
    }

    private void checkSurroundings(int x, int y, List<List<Integer>> field, )

    public MineField getMineField() {
        return mineField;
    }
}
