var test = "'" +  "text\" + "'";

let query = `mutation {create_item (item_name:jec, board_id:3688894632,value: \"{\\\"text\\\":\\\"google.com\\\"}\") {id}}`;
//let query = "mutation {create_item (item_name:"+"jec"+", board_id:3688894632,column_values: "+"{\"+" test :\"google.com\"}") {id}}";
//mutation {create_item (item_name:"jec!", board_id:3688894632,column_values: "{\"text\" :\"google.com\",\"text9\":\"cascade\"}") {id}}

fetch ("https://api.monday.com/v2", {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjIxNDU1MzE2NywidWlkIjozNzQ3NzQyNSwiaWFkIjoiMjAyMi0xMi0yOVQwNjoyOTozMy4wNjJaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTQ1MTg5MDEsInJnbiI6InVzZTEifQ.4YqSJlQLAFyBbd4nfU2mbInZ38ntoS_AU8zlJQAGVBs'
   },
   body: JSON.stringify({
     query : query
   })
  })
   .then(res => res.json())
   .then(res => console.log(JSON.stringify(res, null, 2)));


