const axios = require('axios');

const GITHUB = 'https://api.github.com';

async function scanAllRepo() {
  try {
    const allReposResult = await axios.get(GITHUB + '/users/tomoya06/repos');
    const allRepos = allReposResult.data;
    const it = allRepos.map(repo => new Promise(async (resolve) => {
      try {
        const { default_branch, branches_url, trees_url } = repo;
        const defaultBranchUrl = branches_url.replace(/\{\d+\}/, `/${default_branch}`);
        const defaultBranchResult = await axios.get(defaultBranchUrl);
        const defaultBranch = defaultBranchResult.data;
        const { commit: { sha } } = defaultBranch;
        const filetreeUrl = trees_url.replace(/\{\d+\}/, `/${sha}`);
        const filetreeResult = await axios.get(filetreeUrl);
        const filetree = filetreeResult.data;
        const { tree } = filetree;
        debugger;
      } catch (error) {
        debugger
        return resolve(null);
      }
    }))
    await Promise.all(it);
  } catch (error) {
    debugger
  }
}


