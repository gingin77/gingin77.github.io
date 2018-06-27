export async function getGeneralRepoInfo() {
  try {
    let { apiData, oldStaticData } = await getData();
    let gitHubApiData              = mapGitHubData(apiData);

    // sort inputs to identify what new requests need to happen and what data needs to be preserved
    let objsForUnchangedRepos             = findUnchangedRepos(gitHubApiData, oldStaticData);
    let objsForChangedReposMissingDetails = findNewAndUpdatedRepos(gitHubApiData, objsForUnchangedRepos);
    
    // identify repo urls to send fetch requests to for retrieving repo language details
    let urlsForChangedRepos = getUrls(objsForChangedReposMissingDetails);

    return {
      objsForUnchangedRepos:             objsForUnchangedRepos,
      objsForChangedReposMissingDetails: objsForChangedReposMissingDetails,
      urlsForChangedRepos:               urlsForChangedRepos
    }
  } catch (e) {
    console.log(`I'm the message for getGeneralRepoInfo: ${e}`);
  }
}

async function getData() {
  try {
    const paths = [
      "https://api.github.com/users/gingin77/repos?per_page=100&page=1",
      "assets/static-data/saved_repo_data_06022018.json"
    ]

    let resolved = await Promise.all(paths.map(path => d3.json(path)))
      .then(([apiData, oldStaticData]) => {
        return {
          apiData:       apiData,
          oldStaticData: oldStaticData
        }
      });

    return resolved
  } catch (e) {
    console.log(`I'm the message for getData: ${e}`);
  }
}

function mapGitHubData(apiData) {
  return apiData.map(repo => {
    return {
      name:                     repo.name,
      primary_language:         repo.language,
      url_for_language_details: repo.languages_url,
      created_at:               repo.created_at,
      pushed_at:                repo.pushed_at
    }
  })
}

function findUnchangedRepos(gitHubApiData, oldStaticData) {
  let datesFromGitHubApiObjects = gitHubApiData.map(obj => obj.pushed_at);

  return oldStaticData.filter(oldObject => {
    return datesFromGitHubApiObjects.includes(oldObject.pushed_at);
  })
}

function findNewAndUpdatedRepos(gitHubApiData, objsForUnchangedRepos) {
  let namesOfUnchangedRepos = new Set(objsForUnchangedRepos.map(repo => repo.name));

  return gitHubApiData.filter(saved => {
    return !namesOfUnchangedRepos.has(saved.name)
  });
}

function getUrls(repos) {
  return repos.map(obj => obj.url_for_language_details);
}