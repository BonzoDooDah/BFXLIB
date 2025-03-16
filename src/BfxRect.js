/** 
 * Class representing a rectangle.
 */
class BfxRect {
    /**
     * Creates a rectangle.
     * @param {number} x - The x value of the top-left corner.
     * @param {number} y - The y value of the top-left corner.
     * @param {number} width - The rectangle's width.
     * @param {number} height - The rectangle's height.
     */
    constructor(x, y, width, height) {
        this.x = Number(x) || 0;
        this.y = Number(y) || 0;
        this.width = Number(width) || 0;
        this.height = Number(height) || 0;
    }
    /**
     * Get the left value.
     * @returns {number} The left value.
     */
    get left() { return this.x; }
    /**
     * Set the left value.
     * @param {number} value - The left value.
     */
    set left(value) { this.x = Number(value) || 0; }
    /**
     * Get the right value.
     * @returns {number} The right value.
     */
    get right() { return (this.x + this.width); }
    /**
     * Set the right value.
     * @param {number} value - The right value.
     */
    set right(value) { this.width = (Number(value) || 0) - this.x; }
    /**
     * Get the top value.
     * @returns {number} The top value.
     */
    get top() { return this.y; }
    /**
     * Set the top value.
     * @param {number} value - The top value.
     */
    set top(value) { this.y = Number(value) || 0; }
    /**
     * Get the bottom value.
     * @returns {number} The bottom value.
     */
    get bottom() { return (this.y + this.height); }
    /**
     * Set the bottom value.
     * @param {number} value - The bottom value.
     */
    set bottom(value) { this.height = (Number(value) || 0) - this.y; }
    /**
     * Get the top-left corner.
     * @returns {BfxPoint} The top-left corner.
     */
    get topLeft() { return new BfxPoint(this.x, this.y); }
    /**
     * Get the bottom-left corner.
     * @returns {BfxPoint} The bottom-left corner.
     */
    get bottomLeft() { return new BfxPoint(this.x, (this.y + this.height)); }
    /**
     * Get the top-right corner.
     * @returns {BfxPoint} The top-right corner.
     */
    get topRight() { return new BfxPoint((this.x + this.width), this.y); }
    /**
     * Get the bottom-right corner.
     * @returns {BfxPoint} The bottom-right corner.
     */
    get bottomRight() { return new BfxPoint((this.x + this.width), (this.y + this.height)); }
    /**
     * Converts a rectangle to a string.
     * @returns {string} A string containg four comma-separated numbers.
     */
    toString() {
        return this.x.toString() + ',' + this.y.toString() + ',' + this.width.toString() + ',' + this.height.toString()
    }
    /**
     * Move the rectangle to the specified coordinates.
     * @param {number} x - The new x value.
     * @param {number} y - The new y value.
     */
    moveTo(x, y) {
        this.x = Number(x) || 0;
        this.y = Number(y) || 0;
    }
    /**
     * Move the rectangle by the specified distances.
     * @param {number} x - The distance to move horizontally.
     * @param {number} y - The distance to move vertically.
     */
    translate(x, y) {
        this.x += Number(x) || 0;
        this.y += Number(y) || 0;
    }
    /**
     * Normalizes the rectangle.
     */
    normalize() {
        if (this.width < 0) {
            this.x += this.width;
            this.width *= -1;
        }
        if (this.height < 0) {
            this.y += this.height;
            this.height *= -1;
        }
    }
    /**
     * Finds the intersection between two rectangles.
     * @param {BfxRect} rect - The rectangle to check.
     * @returns {BfxRect} The intersecting rectangle. If there is no intersection, a null rectangle is returned.
     */
    intersect(rect) {
        let rectIntersect = new BfxRect(0, 0, 0, 0);

        if (rect instanceof BfxRect) {
            this.normalize();
            rect.normalize();

            let leftX = Math.max(this.left, rect.left);
            let rightX = Math.min(this.right, rect.right);
            let topY = Math.max(this.top, rect.top);
            let bottomY = Math.min(this.bottom, rect.bottom);

            if ((leftX <= rightX) && (topY <= bottomY)) {
                rectIntersect.left = leftX;
                rectIntersect.right = rightX;
                rectIntersect.top = topY;
                rectIntersect.bottom = bottomY;
            }
        }

        return rectIntersect;
    }
    /**
     * Check if this is a null rectangle.
     * @returns {boolean} True if the width and height are both zero.
     */
    isNull() {
        return ((this.width == 0) && (this.height == 0));
    }
}