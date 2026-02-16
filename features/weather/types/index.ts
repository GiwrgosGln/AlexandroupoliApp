export interface CurrentWeather {
  icon: string;
  condition: string;
  temperature: {
    current: number;
    feelsLike: number;
    unit: string;
  };
}
