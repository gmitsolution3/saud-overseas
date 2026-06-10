import { API_BASE_URL } from "@/services/index";
import { IGallery } from "@/types";

export async function getGalleriesData(): Promise<IGallery[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/galleries`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) throw new Error("Failed to fetch galleries");

    const result = await response.json();
    return result?.data ?? [];
  } catch (error) {
    console.error("Error fetching galleries:", error);
    return [];
  }
}
