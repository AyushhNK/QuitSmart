import { SmokingLog } from "./smoking.types";

export class CravingPredictionService {
  predictTopCravingHour(logs: SmokingLog[]) {
    const hourMap: Record<number, number> = {};

    logs.forEach((log) => {
      const hour = new Date(log.timestamp).getHours();
      hourMap[hour] = (hourMap[hour] || 0) + 1;
    });

    let maxHour = 0;
    let maxCount = 0;

    for (const hour in hourMap) {
      if (hourMap[hour] > maxCount) {
        maxCount = hourMap[hour];
        maxHour = Number(hour);
      }
    }

    return maxHour;
  }
}