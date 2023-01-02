const title = [];
const url = [];

async function getDataFromSampleRepository() {

  const { Octokit } = require("@octokit/rest");

  const octokit = new Octokit({
    auth: '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'
    //  auth: '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'
  })

  const result = await octokit.request('GET /repos/{owner}/{repo}/issues{?milestone,state,assignee,creator,mentioned,labels}', {
    owner: 'Blackfyre27',
    repo: 'gh-test'
  })

  for (i = 0; i < result.data.length; i++) {
    title.push(result.data[i].title);
    url.push(result.data[i].url);
  }

  console.log(title);
  console.log(url);


}

getDataFromSampleRepository();




