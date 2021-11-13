/**
 * Interface for classes that may emit linear VAST events.
 *
 * @interface LinearEvents
 */

/**
 * Fires when the the creative was played to the end at normal speed so that 100% of the creative was played.
 *
 * @event LinearEvents#complete
 */
export const complete = "complete";

/**
 * Fires when a user clicks the ad.
 *
 * @event LinearEvents#clickThrough
 */
export const clickThrough = "clickThrough";

/**
 * Fires when there was an error with the linear creative.
 *
 * @event LinearEvents#error
 */
export const error = "error";

/**
 * Fires when the creative played continuously for at least 25% of the total duration at normal speed.
 *
 * @event LinearEvents#firstQuartile
 */
export const firstQuartile = "firstQuartile";

/**
 * Fires when there was an impression of the linear creative.
 *
 * @event LinearEvents#impression
 */
export const impression = "impression";

/**
 * Fires when more than 50% of the creative is visible.
 *
 * @event LinearEvents#viewable
 */
export const viewable = "viewable";

/**
 * Fires when less than 50% of the creative is visible.
 *
 * @event LinearEvents#notViewable
 */
export const notViewable = "notViewable";

/**
 * Fires when there is no way to determine visibility of the creative.
 *
 * @event LinearEvents#viewUndetermined
 */
export const viewUndetermined = "viewUndetermined";

/**
 * Fires when the creative played continuously for at least 50% of the total duration at normal speed.
 *
 * @event LinearEvents#midpoint
 */
export const midpoint = "midpoint";

/**
 * Fires when the user activated the mute control and muted the creative.
 *
 * @event LinearEvents#mute
 */
export const mute = "mute";

/**
 * Optional metric that can capture all other user interactions under one metric such a s hover-overs, or custom clicks. It should NOT replace clickthrough events or other existing events like mute, unmute, pause, etc.
 *
 * @event LinearEvents#otherAdInteraction
 */
export const otherAdInteraction = "otherAdInteraction";

/**
 * Fires when the user clicked the pause control and stopped the creative.
 *
 * @event LinearEvents#pause
 */
export const pause = "pause";

/**
 * Fires when the user activated a control to reduce player to a smaller size. This event replaces the exitFullscreen event per the 2014 Digital Video In-Stream Ad Metric Definitions.
 *
 * @event LinearEvents#playerCollapse
 */
export const playerCollapse = "playerCollapse";

/**
 * Fires when the user activated a control to reduce player to a smaller size.
 *
 * @event LinearEvents#exitFullscreen
 */
export const exitFullscreen = "exitFullscreen";

/**
 * Fires when the user activated a control to extend the player to a larger size. This event replaces the fullscreen event per the 2014 Digital Video In-Stream Ad Metric Definitions.
 *
 * @event LinearEvents#playerExpand
 */
export const playerExpand = "playerExpand";

/**
 * Fires when the user activated a control to extend the player to a larger size. Only for VAST 3.
 *
 * @event LinearEvents#fullscreen
 */
export const fullscreen = "fullscreen";

/**
 * Fires when the creative played for a duration at normal speed that is equal to or greater than the value provided in an additional offset attribute for the <Tracking> element under Linear ads. Values can be time in the format HH:MM:SS or HH:MM:SS.mmm or a percentage value in the format n%.
 *
 * @event LinearEvents#progress
 */
export const progress = "progress";

/**
 * Fires when the user activated the resume control after the creative had been stopped or paused.
 *
 * @event LinearEvents#resume
 */
export const resume = "resume";

/**
 * Fires when the user activated the rewind control to access a previous point in the creative timeline.
 *
 * @event LinearEvents#rewind
 */
export const rewind = "rewind";

/**
 * Fires when the user activated a skip control to skip the creative.
 *
 * @event LinearEvents#skip
 */
export const skip = "skip";

/**
 * This event is used to indicate that an individual creative within the ad was loaded and playback began. As with creativeView, this event is another way of tracking creative playback.
 *
 * @event LinearEvents#start
 */
export const start = "start";

/**
 * Fires when the creative played continuously for at least 75% of the duration at normal speed.
 *
 * @event LinearEvents#thirdQuartile
 */
export const thirdQuartile = "thirdQuartile";

/**
 * Amount of video viewed at normal speed in seconds or other appropriate time-based units. If a rewind event occurs during play, time spent viewing may be calculated on total amount of video viewed at normal speed, which may include additional amounts of video viewed after rewinding. The offset attribute for the <Tracking> element under Linear ads may be used to track when time spent viewing meets the threshold. Otherwise, a macro may be provided so that the player may return a time value. VAST does not provide a standard macro for this value, so the involved parties must establish these parameters if this metric is to be used.
 *
 * @event LinearEvents#timeSpentViewing
 */
export const timeSpentViewing = "timeSpentViewing";

/**
 * Fires when the user activated the mute control and unmuted the creative.
 *
 * @event LinearEvents#unmute
 */
export const unmute = "unmute";

/**
 * Fires when the user clicked the creative icon.
 *
 * @event LinearEvents#iconClick
 */
export const iconClick = "iconClick";

/**
 * Fires when the user viewed the creative icon.
 *
 * @event LinearEvents#iconView
 */
export const iconView = "iconView";

/**
 * The viewer has chosen to close the linear ad unit. This is currently inuse by some of the largest mobile SDKs to mark the dismissal of the end card companion that follows the video, as well as a close of the video itself, if applicable
 *
 * @event LinearEvents#closeLinear
 */
export const closeLinear = "closeLinear";

/**
 * Not to be confused with an impression, this event indicates that an individual creative portion of the ad was viewed.
 *
 * @event LinearEvents#creativeView
 */
export const creativeView = "creativeView";

const linearEvents = {
    clickThrough,
    closeLinear,
    complete,
    creativeView,
    error,
    exitFullscreen,
    firstQuartile,
    fullscreen,
    iconClick,
    iconView,
    impression,
    midpoint,
    mute,
    notViewable,
    otherAdInteraction,
    pause,
    playerCollapse,
    playerExpand,
    progress,
    resume,
    rewind,
    skip,
    start,
    thirdQuartile,
    timeSpentViewing,
    unmute,
    viewable,
    viewUndetermined,
};

export default linearEvents;
