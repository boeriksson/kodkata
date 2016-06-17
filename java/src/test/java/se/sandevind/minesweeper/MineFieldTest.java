package se.sandevind.minesweeper;

import org.junit.Test;

public class MineFieldTest {

    @Test
    public void newMineField() {
        MineField mineField = new MineField(40, 10); //New minefield 40*40 where one in 10 is a bomb (-1)
        mineField.prettyPrint();
    }
}
