package se.sandevind.loops;

import java.util.stream.IntStream;

public class AbsRange {

    String range1(int arg) {
        StringBuilder sb = new StringBuilder();
        for (int i = arg; i >= (0 - arg); i --) {
            sb.append(Math.abs(i));
        }
        return sb.toString();
    }

    String range2(int arg) {
        return IntStream.rangeClosed(arg, (0 - arg)).collect(StringBuilder::new,
                StringBuilder::appendCodePoint, StringBuilder::append).toString();
    }
}
