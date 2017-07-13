/**
 *  Feed it a string and a start pos, and it will scan for brackets and return position of where the
 *  closing bracket is taking it down to the the same level it started at.
 *  
 *  Returns null if end of string is encountered first
 */
export default findClosingBracket = (searchStr, start, level = 0) => {
    let pos = start;
    while (pos < searchStr.length) {
        switch (searchStr.charAt(pos)) {
            case '{':
                pos = this.findClosingBracket(searchStr, pos + 1, level + 1);
                if (level === 0) {
                    return pos + 1;
                }
                break;
            case '}':
                return pos;
            default:
        }
        pos++;
    }
    return null;
};