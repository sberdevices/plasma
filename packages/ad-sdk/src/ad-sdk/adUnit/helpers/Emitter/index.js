/* eslint-disable filenames/match-exported */
/**
 * @class
 * @description Subset of  node's [Emitter class]{@link https://nodejs.org/api/events.html#events_class_eventemitter}
 * @param {Object} logger - Optional logger instance. Must comply to the [Console interface]{@link https://developer.mozilla.org/es/docs/Web/API/Console}.
 */
class Emitter {
    constructor(logger) {
        this.evts = {};
        this.logger = logger || console;
    }

    /**
     * Adds the listener function to the end of the listeners array for the event named eventName.
     *
     * @param {string} eventName - The name of the event.
     * @param {Function} listener - Listener fn that handles the evt.
     * @returns {Emitter} - The Emitter instance.
     */
    on(eventName, listener) {
        const evts = this.evts;
        const evtListeners = evts[eventName] || (evts[eventName] = []);

        evtListeners.push(listener);

        return this;
    }

    /**
     * Removes the specified listener from the listener array for the event named eventName.
     *
     * @param {string} eventName - The name of the event.
     * @param {Function} listener - Listener fn that handles the evt.
     * @returns {Emitter} - The Emitter instance.
     */
    removeListener(eventName, listener) {
        const evts = this.evts;
        const evtListeners = evts[eventName] || (evts[eventName] = []);

        evts[eventName] = evtListeners.filter((eListener) => eListener !== listener && eListener._ !== listener);

        return this;
    }

    /**
     * Removes all listeners, or those of the specified eventName.
     *
     * @param {string} eventName - The name of the event. Optional if omitted all listeners will be removed.
     * @returns {Emitter} - The Emitter instance.
     */
    removeAllListeners(eventName) {
        if (eventName) {
            this.evts[eventName] = null;
        } else {
            this.evts = {};
        }

        return this;
    }

    /**
     * Adds a one time listener function for the event named eventName. The next time eventName is triggered,
     * this listener is removed and then invoked.
     *
     * @param {string} eventName - The name of the event.
     * @param {Function} listener - Listener fn that handles the evt.
     * @returns {Emitter} - The Emitter instance.
     */
    once(eventName, listener) {
        const handler = (...args) => {
            this.removeListener(eventName, handler);
            listener(...args);
        };

        handler._ = listener;

        return this.on(eventName, handler);
    }

    /**
     * Synchronously calls each of the listeners registered for the event named eventName, in the order they were registered,
     * passing the supplied arguments to each.
     *
     * @param {string} eventName - The name of the event.
     * @returns {boolean} - Returns true if the event had listeners, false otherwise.
     */
    emit(eventName, ...args) {
        const evts = this.evts;
        const evtListeners = evts[eventName] || (evts[eventName] = []);
        const hasListeners = evtListeners.length > 0;

        evtListeners.forEach((handler) => {
            try {
                handler(...args);
            } catch (error) {
                this.logger.error(error, error.stack);
            }
        });

        return hasListeners;
    }
}

export default Emitter;
