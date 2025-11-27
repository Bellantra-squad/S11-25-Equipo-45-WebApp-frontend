export interface ICategory {
  id: string;
  title: string;
}

export interface IUser {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface IEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  color: string;
  category: ICategory;
  participants: IUser[];
}
