import { useAuthClient } from "@/hooks/use-auth-client";
import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { CurrentWeather } from "../types";

export const getCurrentWeather = (
  client: AxiosInstance,
): Promise<CurrentWeather> => {
  return client.get(`/weather/current-conditions`);
};

type UseCurrentWeatherOptions = {
  config?: QueryConfig<typeof getCurrentWeather>;
};

export const useCurrentWeather = ({
  config,
}: UseCurrentWeatherOptions = {}) => {
  const client = useAuthClient();

  return useQuery({
    ...config,
    queryKey: ["currentWeather"],
    queryFn: () => getCurrentWeather(client),
  });
};
