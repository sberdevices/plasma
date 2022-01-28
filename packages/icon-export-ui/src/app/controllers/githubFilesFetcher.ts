import { Octokit } from 'octokit';

const isStringArray = (array: unknown[]): array is string[] => array.every((item) => typeof item === 'string');

export const getFilesSourceFromGH = async (owner: string, repo: string, paths: string[]): Promise<string[]> => {
    const octokit = new Octokit();

    const getFileSource = async (path: string) =>
        (
            await octokit.rest.repos.getContent({
                headers: {
                    accept: 'application/vnd.github.v3.raw',
                },
                owner,
                repo,
                path,
            })
        ).data;

    const filesSources = await Promise.all(paths.map(getFileSource));

    return isStringArray(filesSources) ? filesSources : [];
};
