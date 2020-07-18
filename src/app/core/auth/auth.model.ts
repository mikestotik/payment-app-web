export interface IClientConfig {
    client_id: string;
    cookie_policy: string;
    scope: string;
    fetch_basic_profile: boolean;
    hosted_domain: string;
    openid_realm: string;
    ux_mode: string;
    redirect_uri: string;
}

export interface IUserCredentials {
    username: string;
    password: string;
}

export interface ITokenPayload {
    sub: string;
    auth: string;
    exp: number;
}

export interface LogInResponse {
    id_token: string;
}
