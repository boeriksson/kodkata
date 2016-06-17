package se.sandevind.minesweeper;

import java.util.Random;

public class MineField {
    private Random random = new Random();
    private int[][] field;
    public MineField(int size, int randomness) {
        field = new int[size][size];
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                field[i][j] = (random.nextInt(randomness) == 0) ? -9: 0;
            }
        }
    }

    public int[][] getField() {
        return field;
    }

    public void setFieldPos(int x, int y, int value) {
        this.field[x][y] = value;
    }

    public void prettyPrint() {
        prettyPrint(this.field);
    }
    public void  prettyPrint(int [][] field) {
        for (int i = 0; i < field.length; i ++) {
            System.out.print('\n');
            for (int j = 0; j < field.length; j ++) {
                System.out.print((field[i][j] == -9) ? "X" : "0");
            }
        }
    }
}
