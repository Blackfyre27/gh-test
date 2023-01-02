const title = [];
const url = [];

async function getDataFromSampleRepository() {

//GH Authentication - you may change the token if it doesn't work on your local machine and replace it with your own personal access token.
  const { Octokit } = require("@octokit/rest");
  const { createTokenAuth } = require("@octokit/auth-token");

  const auth = createTokenAuth("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"); //change this to your gh token
  const authentication = await auth();

  const octokit = new Octokit({
    auth: "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" //change this to your gh token

  })

  // This function allows us to get all the issues from the current repository
  const result = await octokit.request('GET /repos/{owner}/{repo}/issues{?milestone,state,assignee,creator,mentioned,labels}', {
    owner: 'Blackfyre27', //change the owner
    repo: 'gh-test' //change the repository name
  })

  //console.log(result.data);
 
  //This block of code will filter the result and only get the issues with the label of -cascadeo
  for (i = 0; i < result.data.length; i++) {

    for (j = 0; j < result.data[i].labels.length; j++) {

      if (result.data[i].labels[j].name == "cascadeo") {
        title.push(result.data[i].title);
        url.push(result.data[i].url);
        toMonday(3688894632,result.data[i].title, result.data[i].url);
      }
    }

  //This function will create a new item in the Monday board.
    function toMonday(board_id, title, url) {
      let query = `mutation {create_item (item_name:"` + title + `", board_id:`+board_id+`,column_values: \"{\\\"text\\\":\\\"` + url + `\\\"}\") {id}}`;

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
  }
  
  //This console logs will output the result in the terminal.
  console.log(title);
  console.log(url);
  console.log(result.data[1].labels[2].name);
}

getDataFromSampleRepository();
