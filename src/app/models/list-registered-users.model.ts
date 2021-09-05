import { RegisteredUser } from './registered-user.model';

export interface ListRegisteredUsers {
  data: RegisteredUser[];
  nextToken: string;
}
