
const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

export interface HealthResponse {
  status: string;
  message: string;
  timestamp: string;
}

export async function getApiHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_URL}/health`);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return (await response.json()) as HealthResponse;
}
