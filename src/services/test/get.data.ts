import testRepo from "../../repository/test/test.repo";

export default async function getUserDataService(name: string) {
  return await testRepo.getData(name);
}
