const title = [];
const url = [];

async function getDataFromSampleRepository() {

  const { Octokit } = require("@octokit/rest");
  const { createTokenAuth } = require("@octokit/auth-token");

  
  const auth = createTokenAuth("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");
  const authentication = await auth();
  
  const octokit = new Octokit({
    auth: authentication //change this to your gh token
    
  })

  const result = await octokit.request('GET /repos/{owner}/{repo}/issues{?milestone,state,assignee,creator,mentioned,labels}', {
    owner: 'Blackfyre27',
    repo: 'gh-test'
  })

  for (i = 0; i < result.data.length; i++) {
    title.push(result.data[i].title);
    url.push(result.data[i].url);

    let query = `mutation {create_item (item_name:"`+result.data[i].title+`", board_id:3688894632,column_values: \"{\\\"text\\\":\\\"`+result.data[i].url+`\\\"}\") {id}}`;

  fetch("https://api.monday.com/v2", {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjIxNDU1MzE2NywidWlkIjozNzQ3NzQyNSwiaWFkIjoiMjAyMi0xMi0yOVQwNjoyOTozMy4wNjJaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTQ1MTg5MDEsInJnbiI6InVzZTEifQ.4YqSJlQLAFyBbd4nfU2mbInZ38ntoS_AU8zlJQAGVBs'
    },
    body: JSON.stringify({
      query: query
    })
  })
    .then(res => res.json())
    .then(res => console.log(JSON.stringify(res, null, 2)));
  }

  console.log(title);
  console.log(url);
}

getDataFromSampleRepository();

