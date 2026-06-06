import { mockDashboardData } from "../mocks/dashboard.mock";
import type { DashboardData } from "../types/dashboard";

export async function getDashboardData(): Promise<DashboardData> {
  return mockDashboardData;

  // Later:
  // const response = await api.get<DashboardData>("/dashboard");
  // return response.data;
}
