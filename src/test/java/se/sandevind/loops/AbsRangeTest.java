package se.sandevind.loops;

import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class AbsRangeTest {

    private AbsRange absRange = new AbsRange();

    @Test
    public void absRange1() {
        String result = absRange.range1(3);
        assertEquals("3210123", result);
    }

//    @Test
//    public void absRange2() {
//        String result = absRange.range2(3);
//        System.out.println("result: " + result);
//        assertEquals("3210123", result);
//    }
}
