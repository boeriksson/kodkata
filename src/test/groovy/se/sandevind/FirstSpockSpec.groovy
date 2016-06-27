package se.sandevind

import spock.lang.Specification

class FirstSpockSpec extends Specification {

    def "Should calc the power of 2"() {
        expect:
            Math.pow(2,3) == 8
    }
}
