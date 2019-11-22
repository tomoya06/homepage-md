const axios = require('axios');

const GITHUB = 'https://api.github.com';

export async function scanAllRepo() {
  try {
    const allReposResult = await axios.get(GITHUB + '/users/tomoya06/repos');
    const allRepos = allReposResult.data;
    const it = allRepos.map(repo => new Promise(async (resolve) => {
      try {
        const { default_branch, branches_url, trees_url } = repo;
        const defaultBranchUrl = branches_url.replace(/\{\/\w+\}/, `/${default_branch}`);
        const defaultBranchResult = await axios.get(defaultBranchUrl);
        const defaultBranch = defaultBranchResult.data;
        const { commit: { sha } } = defaultBranch;
        const filetreeUrl = trees_url.replace(/\{\/\w+\}/, `/${sha}`);
        const filetreeResult = await axios.get(filetreeUrl);
        const filetree = filetreeResult.data;
        const { tree = [] } = filetree;
        const targetFile = tree.find((leave) => {
          return leave.name === 'tomoya_config';
        })
        if (!targetFile) {
          throw new Error('no file');
        }
        return resolve(targetFile.url);
      } catch (error) {
        return resolve(null);
      }
    }))
    const results = await Promise.all(it);
    return Promise.resolve(results);
  } catch (error) {
    return Promise.reject(error);
  }
}


