import list from "./fake";
function getOrganizationList() {
  return new Promise<{ name: string }[]>(resolve => {
    setTimeout(() => {
      resolve(list);
    }, 1000);
  });
}
export default getOrganizationList;
