export type StatusType = 'error' | 'success';

export interface ValidationResult {
    message?: string;
    status?: StatusType;
    data: File | null;
}
