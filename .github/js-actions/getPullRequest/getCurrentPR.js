const { getInput, setOutput, setFailed } = require('@actions/core');
const github = require('@actions/github');

async function main() {
    const token = getInput('github-token', { required: true });

    const octokit = github.getOctokit(token);
    const context = github.context;

    if (context.eventName === 'push') {
        const result = await octokit.repos.listPullRequestsAssociatedWithCommit({
            owner: context.repo.owner,
            repo: context.repo.repo,
            commit_sha: context.sha,
        });

        if (result.data.length > 0) {
            const openedPullRequests = result.data.filter((pr) => pr.state === 'open');

            const pullRequest = openedPullRequests[0];
            setOutput('pull_request', pullRequest);
        }
    }

    if (context.eventName === 'pull_request') {
        setOutput('pull_request', context.payload.pull_request);
    }
}

main().catch((err) => setFailed(err.message));
