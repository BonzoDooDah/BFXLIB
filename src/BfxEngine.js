/**
 * Class BfxEngine, the entry and control point for the BonzoFX library.
 */
class BfxEngine {
    #htmlCanvas = undefined;
    #drawContext = undefined;
    #timeStart = undefined;
    #screenArray = new Array();
    #screenActive = null;
    #posMouse = new BfxPoint(0, 0);
    // testing section
    #testMode = false;
    #testString = '';
    /**
     * Creates and initialises the BonzoFX engine.
     * @param {boolean} testMode - Flag to initiate test mode.
     */
    constructor(testMode = false) {
        this.#htmlCanvas = document.querySelector('canvas');;
        this.#drawContext = this.#htmlCanvas.getContext('2d');
        this.#timeStart = document.timeline.currentTime;
        this.#testMode = testMode;

        // set up events
        this.#htmlCanvas.addEventListener("mousemove", (ev) => {
            this.#posMouse.x = ev.clientX - (this.#htmlCanvas.offsetLeft);
            this.#posMouse.y = ev.clientY - (this.#htmlCanvas.offsetTop);
        });
    }
    /**
     * Get the HTML Canvas element.
     * @returns {HTMLCanvasElement}
     */
    get htmlCanvas() { return this.#htmlCanvas; }
    /**
     * Get the 2D rendering context of the HTML Canvas element.
     * @returns {CanvasRenderingContext2D}
     */
    get drawContext() { return this.#drawContext; }
    /**
     * Get the time that this engine was started.
     * @returns {number}
     */
    get timeStart() { return this.#timeStart; }
    /**
     * The Update cycle of the eninge.
     * @param {number} timeValue - The total run time of the engine.
     */
    update(timeValue) {
        if (this.#testMode) {
            let d = new Date(timeValue);
            let str = d.toJSON().substring(11);
            this.#testString = 'Engine running time: ' + str.substring(0, (str.length - 1));
        }

        if (this.#screenActive != null) {
            if (this.#screenActive.update != undefined) {
                this.#screenActive.update(timeValue);
            }
        }
    }
    /**
     * The Render cycle of the engine.
     */
    render() {
        this.#drawContext.clearRect(0, 0, this.#htmlCanvas.width, this.#htmlCanvas.height);

        if (this.#testMode) {
            let colour = this.drawContext.fillStyle;
            this.drawContext.fillStyle = 'yellow';
            this.drawContext.fillText('TEST INFORMATION', 0, 10);
            this.drawContext.fillText(this.#testString, 0, 20);
            this.drawContext.fillText('Cursor: ' + this.#posMouse.toString(), 0, 30);
            this.drawContext.fillStyle = colour;
        }

        // draw default mouse cursor
        this.drawContext.strokeStyle = '#fff';
        this.drawContext.beginPath();
        this.drawContext.moveTo(this.#posMouse.x - 5, this.#posMouse.y);
        this.drawContext.lineTo(this.#posMouse.x + 5, this.#posMouse.y);
        this.drawContext.moveTo(this.#posMouse.x, this.#posMouse.y - 5);
        this.drawContext.lineTo(this.#posMouse.x, this.#posMouse.y + 5);
        this.drawContext.closePath();
        this.drawContext.stroke();

        // draw active screen
        if (this.#screenActive != null) {
            if (this.#screenActive.render != undefined) {
                this.#screenActive.render();
            }
        }
    }
}