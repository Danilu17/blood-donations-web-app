import { useGetEnrollmentsQuery } from "../apis/enrollments.api";

export default function useEnrollments() {
  const { data, isLoading, error } = useGetEnrollmentsQuery();

  return {
    enrollments: data?.data || data || [],
    isLoading,
    error,
  };
}
