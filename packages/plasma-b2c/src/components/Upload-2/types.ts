export type Status = 'error' | 'success' | undefined;

export interface ValidationResult {
    message?: string;
    status?: Status;
    data?: File;
}
