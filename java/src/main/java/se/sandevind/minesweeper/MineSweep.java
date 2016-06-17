package se.sandevind.minesweeper;

public class MineSweep {
    private MineField mineField = new MineField(10, 10);

    public int[][] pick(int x, int y) {
        int [][] field = mineField.getField();
        if (field[x][y] == -9) {
            throw new RuntimeException("Boom");
        }

        checkField(x, y, field);
        return field;
    }

    private void checkField(int x, int y, int[][] field) {
        int nearMines = 0;
        for (int i = x-1; i <= x+1; i++) {
            for(int j = y-1; j <= y+1; j++) {
                if (field[i][j] == -9) {
                    nearMines ++;
                }
            }
        }
        System.out.println("NearMines: " + ((nearMines > 0) ? nearMines : -1));
        field[x][y] = (nearMines > 0) ? nearMines : -1;
        mineField.setFieldPos(0,0,3);
        mineField.prettyPrint(field);
        return;
    }

    public MineField getMineField() {
        return mineField;
    }
}
