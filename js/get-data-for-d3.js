import { getGeneralRepoInfo }  from "./get-general-repo-info.js";
import { getDetailedRepoInfo } from "./get-detailed-repo-info.js";

export async function getDataSetForD3() {
  try {
    const {
      unchangedRepos,
      newAndUpdatedGeneralRepoInfo,
      urlsToFetch
    } = await getGeneralRepoInfo();

    const newRepoData = await getDetailedRepoInfo(urlsToFetch, newAndUpdatedGeneralRepoInfo);
    const allRepoData = unchangedRepos.concat(newRepoData);

    return allRepoData;
  } catch (e) {
    console.log(`I'm the message for getDataSetForD3: ${e}`)
  }
}