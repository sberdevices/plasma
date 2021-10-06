export type Status = 'error' | 'success';

export interface ValidationResult {
    message?: string;
    status?: Status;
    data?: File;
}
