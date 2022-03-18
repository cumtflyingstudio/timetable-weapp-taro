import { useStorage } from ".";

const defaultList = [] as Application[];

const useApplicationStorage = () => {
  return useStorage("@organizations", defaultList);
};
export default useApplicationStorage;
