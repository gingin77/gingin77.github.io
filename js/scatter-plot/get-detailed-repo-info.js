export async function getDetailedRepoInfo(urls, objsWithRepoGeneralInfo) {
  try {
    let languageDetailsFromGitHub  = await requestLanguageDetailsFromGitHub(urls);
    let generalAndDetailedRepoInfo = combine(objsWithRepoGeneralInfo, languageDetailsFromGitHub);
    let arrayOfRepoObjects         = getTransformedCombinationObject(generalAndDetailedRepoInfo);
    let arrayOfLanguageObjects     = makeOneObjectForEveryRepoLanguage(arrayOfRepoObjects);
 
    return arrayOfLanguageObjects;
  } catch (e) {
    console.log(e);
  }
}

async function requestLanguageDetailsFromGitHub(urls) {
  return await Promise.all(
    urls.map(url => d3.json(url).then(data => {
      return {
        url_for_language_details:  url,
        language_details_for_repo: data
      }
    }))
  );
}

function combine(general, specific) {
  return general.map(g => {
    let details = specific.filter(s => {
     return s.url_for_language_details == g.url_for_language_details
    });

    return {
      name:                      g.name,
      url_for_language_details:  details[0].url_for_language_details,
      primary_language:          g.primary_language,
      created_at:                g.created_at,
      pushed_at:                 g.pushed_at,
      language_details_for_repo: details[0].language_details_for_repo
    }
  });
}

function getTransformedCombinationObject(generalAndDetailedRepoInfo) {
  return generalAndDetailedRepoInfo.map(repo => {
      let arrayOfLanguageObjects = [];

      Object.keys(repo.language_details_for_repo).forEach(key => {
        let newKeyValuePairs = {
          language: key,
          count:    repo.language_details_for_repo[key]
        }

        arrayOfLanguageObjects.push(newKeyValuePairs);
      });
      repo.language_details_for_repo = arrayOfLanguageObjects;

      return repo;
  });
}

function makeOneObjectForEveryRepoLanguage(arrayOfRepoObjects) {
  const arrayOfLanguageObjects = []

  arrayOfRepoObjects.map(repObj => {
    let languageDetailObjects = repObj.language_details_for_repo

    if (languageDetailObjects.length !== 0) {
      languageDetailObjects.map(languageObject => {
        arrayOfLanguageObjects.push({
          language:                 languageObject.language,
          count:                    languageObject.count,
          name:                     repObj.name,
          pushed_at:                repObj.pushed_at,
          primary_language:         repObj.primary_language,
          url_for_language_details: repObj.url_for_language_details
        });
      });
    } else {
      arrayOfLanguageObjects.push({
        language:                 'Null',
        count:                    0,
        name:                     repObj.name,
        pushed_at:                repObj.pushed_at,
        primary_language:         'na',
        url_for_language_details: repObj.url_for_language_details
      });
    }
  });

  return arrayOfLanguageObjects;
}