import { getGeneralRepoInfo }  from "./compare-repo-info.js";
import { getDetailedRepoInfo } from "./get-new-details.js";

export async function getDataForD3() {
  try {
    const {
      unchangedRepos,
      newAndUpdatedGeneralRepoInfo,
      urlsToFetch
    } = await getGeneralRepoInfo();

    const newRepoData = await getDetailedRepoInfo(urlsToFetch, newAndUpdatedGeneralRepoInfo);

    return unchangedRepos.concat(newRepoData)
  } catch (e) {
    console.log(`I'm the message for getDataForD3: ${e}`)
  }
}