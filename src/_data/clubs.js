const fetch = require("node-fetch");
const token = process.env.DATOCMS_TOKEN;

async function getAllClubs() {
  const recordsPerQuery = 100;
  let recordsToSkip = 0;
  let makeNewQuery = true;
  let clubs = [];

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
          allClubs(orderBy: orgname_ASC) {
            id
            orgname
            stadium {
              id
              orgunit
              streetaddress
              locality
              region
              postalcode
              geo {
                latitude
                longitude
              }
            }
            league {
              name
            }
          }
        }`
      })
    });
    const response = await dato.json();
    clubs = response.data.allClubs;
    return clubs;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = getAllClubs;
