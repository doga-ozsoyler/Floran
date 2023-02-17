export interface SigninRes {
  success: boolean;
  message: string;
  token?: string;
}

export interface AuthState {
  loading: boolean;
  error: any;
  token: string | null;
  signinRes: SigninRes | null;
}
