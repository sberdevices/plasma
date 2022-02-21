type LocalRunTests = {
    command: 'open-ct';
    platform: 'sberbox' | 'sberportal' | 'mobile';
};

type DockerRunTests = {
    command: 'run-ct';
    platform: never;
};

export type Params = {
    config: string;
    [key: string]: string;
} & (LocalRunTests | DockerRunTests);
