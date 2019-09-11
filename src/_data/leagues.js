const fetch = require("node-fetch");
const token = process.env.DATOCMS_TOKEN;

async function getAllLeagues() {
  const recordsPerQuery = 100;
  let recordsToSkip = 0;
  let makeNewQuery = true;
  let leagues = [];

  try {
    const dato = await fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        query: `{
          allLeagues(
            first: ${recordsPerQuery},
            skip: ${recordsToSkip},
            orderBy: _createdAt_DESC,
            filter: {
              _status: {eq: published}
            }
          )
          {
            id
            name
            sponsor
            division {
              id
              name
            }
          }
        }`
      })
    });
    const response = await dato.json();
    leagues = response.data.allLeagues;
    return leagues;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = getAllLeagues;
