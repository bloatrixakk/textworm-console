import { getFilters } from "shared-remote-utils";

export async function getAndSetFilters(setLanguages, setLevels, setTopics) {
  const res = await getFilters();
  if (res?.body) {
    setLanguages(res.body.languages || []);
    setLevels(res.body.levels || []);
    setTopics(res.body.topics || []);
    console.log(res.body.languages);
  }
}