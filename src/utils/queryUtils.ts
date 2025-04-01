/**
 * Type-safe assertion that a query is ready to display data
 * Useful for components that need to wait for data before rendering
 * @param query - The query result from useQuery
 * @returns Boolean indicating if the query has data and is not loading/fetching
 */
export const isQueryReady = <T>(query: {
	data: T | undefined;
	isLoading: boolean;
	isFetching: boolean;
	error: Error | null;
}): query is {
	data: T;
	isLoading: false;
	isFetching: false;
	error: null;
} => {
	return (
		!query.isLoading &&
		!query.isFetching &&
		query.error === null &&
		query.data !== undefined
	);
};

/**
 * Creates a default query state for handling disabled queries
 * @param defaultData - The default data to use
 * @returns An object with default query state values
 */
export const createDefaultQueryState = <T>(defaultData: T) => {
	return {
		data: defaultData,
		isLoading: false,
		isFetching: false,
		error: null,
		isError: false,
		isSuccess: true,
	};
};
