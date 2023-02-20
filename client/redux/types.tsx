export interface SigninRes {
  success: boolean;
  message: string;
  token?: string;
}
export interface SignupRes {
  success: boolean;
  message: string;
}

export interface AuthSigninProps {
  email: string;
  password: string;
}

export interface AuthState {
  loading: boolean;
  error: any;
  token: string | null;
  signinRes: SigninRes | null;
  signupRes: SignupRes | null;
}

export interface AuthSignupProps {
  nickname: string;
  email: string;
  password: string;
}
