export type User = {
  id: string;
  email: string;
  firstname?: string;
  lastname?: string;
  full_name: string;
  role: string;
  profile_picture?: string | null;
  date_joined: string;
  is_active: boolean;
};
