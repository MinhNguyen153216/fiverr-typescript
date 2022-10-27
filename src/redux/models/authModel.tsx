export interface Signup {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role?:string
}
export interface Signin {
  email: string;
  password: string;
}
