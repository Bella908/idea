import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useRole = () => {
  const { user, loading } = useAuth();

  const { data: role , isLoading } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      if (user?.email) {
        const response = await axios.get(`http://localhost:5000/${user.email}`);
        return response.data.role;
      }
      return '';
    },
  });

  return [role, isLoading];
};

export default useRole;
