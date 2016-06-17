package se.sandevind.minesweeper;

import org.junit.Test;

public class MineSweepTest {
    private MineSweep sweep = new MineSweep();

    @Test
    public void sweepTest () {
        sweep.pick(5, 5);
    }
}
