import { context as eventContext, getOctokit } from '@actions/github';

const { GITHUB_EVENT_NAME = '' } = process.env;
const pullRequestEvents = ['pull_request', 'pull_request_target'];

const getPullRequestCommitList = async (token: string) => {
    const octokit = getOctokit(token);
    const { owner, repo, number } = eventContext.issue;
    const { data: commits } = await octokit.rest.pulls.listCommits({
        owner,
        repo,
        // eslint-disable-next-line @typescript-eslint/camelcase
        pull_number: number,
    });
    return commits.map(({ commit }) => commit.message);
};

const getPushCommitList = async () => {
    return eventContext.payload.commits.map((commit: { message: string }) => commit.message);
};

/**
 * Из пуллреквеста или пуша вытащит лог коммитов.
 */
export const getCommitList = async (token: string) => {
    if (pullRequestEvents.includes(GITHUB_EVENT_NAME)) {
        return getPullRequestCommitList(token);
    }
    return getPushCommitList();
};
