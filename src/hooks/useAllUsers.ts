import { useQuery } from '@tanstack/react-query';
import { UserApi } from '@/api';
import { GetServiceAccountsResponse } from '@/types/dto/UserApi';

import { createQueryConfig, QueryConfigOverrides } from '@/utils/queryConfig';

export const USE_ALL_USERS_QUERY_KEY = ['getAllUsers'] as const;

const useAllUsers = (options: QueryConfigOverrides = {}) => {
	const { data, isLoading, isError, error } = useQuery<GetServiceAccountsResponse>({
		queryKey: USE_ALL_USERS_QUERY_KEY,
		queryFn: () => UserApi.getAllUsers(),
		...createQueryConfig(options),
	});

	return {
		users: data,
		isLoading,
		isError,
		error,
	};
};

export default useAllUsers;
