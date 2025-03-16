/**
 * The global BonzoFX variable.
 */
const BonxoFX = new BfxEngine(true);

/**
 * The main engine loop.
 * @param {number} timeStamp - The timestamp from requestAnimationFrame
 */
function engineLoop(timeStamp) {
    const timeValue = (timeStamp - BonxoFX.timeStart);

    BonxoFX.update(timeValue);
    BonxoFX.render();
    requestAnimationFrame((t) => engineLoop(t));
}

/**
 * Starts the main engine loop.
 */
requestAnimationFrame(engineLoop);