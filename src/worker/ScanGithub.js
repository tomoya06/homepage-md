const axios = require('axios');

const GITHUB = 'https://api.github.com';

axios.default.interceptors.response.use(
  response => {
    if (response.status !== 200) throw new Error(response.status);
    return response;
  },
  error => Promise.reject(error),
)

export async function requestGithubIdentity() {
  try {
    const url = new URL('https://github.com/login/oauth/authorize');
    const urlParams = new URLSearchParams();
    urlParams.set('client_id', '3c261a6406bdea085329');
    urlParams.set('scope', 'read:user');
    urlParams.set('redirect_uri', 'http://localhost:3000');
    const finalUrl = `${url}?${urlParams.toString()}`
    await axios.get(finalUrl);
  } catch (error) {
    
  }
}

export async function scanAllRepo() {
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

scanAllRepo();