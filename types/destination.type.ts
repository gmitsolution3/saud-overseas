export interface IDestination {
  _id: string;
  name: string;
  img: string;
  cats: string[]; // Categories like "Student", "Work", "PR"
  imgPublicId?: string;
  createdAt: string;
  updatedAt: string;
}