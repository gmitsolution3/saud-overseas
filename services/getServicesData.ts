import { API_BASE_URL } from ".";
import { IService } from "@/types";

export async function getServicesData(): Promise<IService[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/services`, {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) throw new Error('Failed to fetch services');
    
    const result = await response.json();
    return result?.data ?? [];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}