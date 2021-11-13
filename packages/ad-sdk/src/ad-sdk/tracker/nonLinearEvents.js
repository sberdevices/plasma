/**
 * Interface for classes that may emit non linear VAST events.
 *
 * @interface NonLinearEvents
 */

/**
 * Fires when the user clicked or otherwise activated a control used to pause streaming content, which either expands the ad within the player’s viewable area or “takes-over” the streaming content area by launching an additional portion of the ad.
 *
 * @event NonLinearEvents#acceptInvitation
 */
export const acceptInvitation = "acceptInvitation";

/**
 * Fires when the user clicked or otherwise activated a control used to pause streaming content, which either expands the ad within the player’s viewable area or “takes-over” the streaming content area by launching an additional portion of the ad.
 *
 * @event NonLinearEvents#adCollapse
 */
export const adCollapse = "adCollapse";

/**
 * Fires when the user clicked or otherwise activated a control for removing the ad.
 *
 * @event NonLinearEvents#close
 */
export const close = "close";

const nonLinearEvents = {
    acceptInvitation,
    adCollapse,
    close,
};

export default nonLinearEvents;
