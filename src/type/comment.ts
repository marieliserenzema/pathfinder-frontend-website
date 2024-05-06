import { User } from './user.ts';

export type Comment = {
  _id: string;
  text: string;
  date: Date;
  hikeId: string;
  user: User | null;
}
