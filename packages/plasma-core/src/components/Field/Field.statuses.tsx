import { success, warning, critical, buttonSuccess, buttonWarning, buttonCritical } from '../../tokens';

export const fieldStatuses = {
    success,
    warning,
    error: critical,
};
export const fieldBackgroundStatuses = {
    success: buttonSuccess,
    warning: buttonWarning,
    error: buttonCritical,
};
