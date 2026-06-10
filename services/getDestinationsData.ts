import { IDestination } from "@/types";
import { API_BASE_URL } from ".";

export async function getDestinationsData(): Promise<IDestination[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/destinations`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) throw new Error("Failed to fetch destinations");

    const result = await response.json();
    return result?.data ?? [];
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return [];
  }
}
