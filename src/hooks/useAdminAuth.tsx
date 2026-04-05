
import { useAuth } from '@/contexts/AuthContext';

export function useAdminAuth() {
  const { isAdmin, checkUserRole } = useAuth();

  const loginAdmin = async (_username: string, _password: string) => {
    return false;
  };

  const logoutAdmin = async () => {
    return true;
  };

  return { isAdmin, isLoading: false, loginAdmin, logoutAdmin, checkUserRole };
}
