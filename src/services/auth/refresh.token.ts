import authRepo from "../../repository/auth/auth.repo";

export default async function refreshService(userId: string) {
  return await authRepo.refreshUser(userId);
}
