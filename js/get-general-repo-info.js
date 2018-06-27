export async function getGeneralRepoInfo() {
  try {
    let { apiData, staticData }           = await getData();
    let gitHubApiData                     = mapGitHubData(apiData);
    let objsForUnchangedRepos             = findUnchangedRepos(gitHubApiData, staticData);
    let objsForChangedReposMissingDetails = findNewAndUpdatedRepos(gitHubApiData, objsForUnchangedRepos);
    
    let urlsForChangedRepos = getUrls(objsForChangedReposMissingDetails);

    return {
      objsForUnchangedRepos:             objsForUnchangedRepos,
      objsForChangedReposMissingDetails: objsForChangedReposMissingDetails,
      urlsForChangedRepos:               urlsForChangedRepos
    }
  } catch (e) {
    console.log(e);
  }
}

async function getData() {
  try {
    const paths = [
      "https://api.github.com/users/gingin77/repos?per_page=100&page=1",
      "assets/static-data/saved_repo_data_06022018.json"
    ]

    let resolved = await Promise.all(paths.map(path => d3.json(path)))
      .then(([apiData, staticData]) => {
        return {
          apiData:    apiData,
          staticData: staticData
        }
      });

    return resolved
  } catch (e) {
    console.log(e);
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

function findUnchangedRepos(gitHubApiData, staticData) {
  let datesFromGitHubApiObjects = gitHubApiData.map(obj => obj.pushed_at);

  return staticData.filter(object => {
    return datesFromGitHubApiObjects.includes(object.pushed_at);
  })
}

function findNewAndUpdatedRepos(gitHubApiData, objsForUnchangedRepos) {
  let namesOfUnchangedRepos = new Set(objsForUnchangedRepos.map(repo => repo.name));

  return gitHubApiData.filter(object => {
    return !namesOfUnchangedRepos.has(object.name)
  });
}

function getUrls(repos) {
  return repos.map(object => object.url_for_language_details);
}