import { getGeneralRepoInfo }  from "./get-general-repo-info.js";
import { getDetailedRepoInfo } from "./get-detailed-repo-info.js";

export async function combineStaticDataAndApiUpdates() {
  try {
    const {
      objsForUnchangedRepos,
      objsForChangedReposMissingDetails,
      urlsForChangedRepos
    } = await getGeneralRepoInfo();

    const objsForChangedRepos = await getDetailedRepoInfo(urlsForChangedRepos, objsForChangedReposMissingDetails);
    
    const allRepoData = objsForUnchangedRepos.concat(objsForChangedRepos);

    return allRepoData;
  } catch (e) {
    console.log(`I'm the message for combineStaticDataAndApiUpdates: ${e}`)
  }
}