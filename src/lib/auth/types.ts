import { type User } from "@supabase/supabase-js";

export type AuthUser = User;

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
}
