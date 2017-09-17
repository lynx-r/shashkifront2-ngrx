import { EnumOAuthType } from './oauth-type.enum';
export interface User {
  username: string;
  user_id_token: string;
  user_access_token: string;
  provider: EnumOAuthType;
}
