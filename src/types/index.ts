export interface User {
  loggedIn: boolean;
  email: string | null;
  displayName?: string;
  image?: string;
  id?: string;
}
