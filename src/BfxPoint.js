/** 
 * Class representing a point.
 */
class BfxPoint {
    /**
     * Creates a point.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        this.x = Number(x) || 0;
        this.y = Number(y) || 0;
    }
    /**
     * Converts a point to a string.
     * @returns {string} A string containg two comma-separated numbers.
     */
    toString() {
        return this.x.toString() + ',' + this.y.toString();
    }
    /**
     * Convert a string containing two comma-separated numbers into a point.
     * @param {string} val - The string containg two comma-separated values.
     * @returns {BfxPoint} A new point. If the string cannot be converted, the point will have zero values.
     */
    static fromString(val) {
        let str = val.split(',');
        return new BfxPoint(Number(str[0]), Number(str[1]));
    }
    /**
     * Move the point to the specified coordinates.
     * @param {number} x - The new x value.
     * @param {number} y - The new y value.
     */
    moveTo(x, y) {
        this.x = Number(x) || 0;
        this.y = Number(y) || 0;
    }
    /**
     * Move the point by the specified distances.
     * @param {number} x - The distance to move horizontally.
     * @param {number} y - The distance to move vertically.
     */
    translate(x, y) {
        this.x += Number(x) || 0;
        this.y += Number(y) || 0;
    }
    /**
     * Check if this point is within a specified rectangle.
     * @param {BfxRect} rect - The rectangle to check.
     * @returns {boolean} True if the point is within the specified rectangle, false if the point is not or the rectangle specified is not of the type BfxRect.
     */
    inRect(rect) {
        if (rect instanceof BfxRect) {
            if (((this.x >= rect.left) && (this.x <= rect.right)) && ((this.y >= rect.top) && (this.y <= rect.bottom))) {
                return true;
            }
        }
        return false;
    }
}