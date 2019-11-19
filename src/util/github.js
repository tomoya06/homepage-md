const axios = require('axios');

const GITHUB = 'https://api.github.com';

axios.default.interceptors.response.use(
  response => {
    if (response.status !== 200) throw new Error(response.status);
    return response;
  },
  error => Promise.reject(error),
)

function requestGithubIdentity() {
  const url = 'https://github.com/login/oauth/authorize';
  const urlParams = new URLSearchParams();
  urlParams.set('client_id', '3c261a6406bdea085329');
  urlParams.set('scope', 'read:user');
  urlParams.set('redirect_uri', 'http://localhost:3000');
  const finalUrl = `${url}?${urlParams.toString()}`
  window.location.href = finalUrl;
}

export async function exchangeToken() {
  try {
    const curUrl = new URL(window.location.href);
    const code = curUrl.searchParams.get('code');
    if (!code) {
      requestGithubIdentity();
      return;
    }
    const url = `https://tomoya-github-gatekeeper.herokuapp.com/authenticate/${code}`;
    const authResult = await axios.get(url);
    const { data: { token = undefined } } = authResult;
    if (!token) {
      requestGithubIdentity();
      return;
    }
    setHeader(token);
    return Promise.resolve();
  } catch (error) {
    console.error(error);
    return Promise.reject();
  }
}

function setHeader(token) {
  axios.default.interceptors.request.use(
    config => {
      config.headers.authorization = `token ${token}`;
      return config;
    },
    error => Promise.reject(error),
  )
}
