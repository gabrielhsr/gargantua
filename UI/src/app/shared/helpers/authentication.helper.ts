import { JwtHelperService, JwtModuleOptions } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

const TOKEN_KEY = 'auth-token';
const jwtService = new JwtHelperService();

export class AuthenticationHelper {
    public static saveToken(token: string): void {
        localStorage.setItem(TOKEN_KEY, token);
    }

    public static deleteToken(): void {
        localStorage.removeItem(TOKEN_KEY);
    }

    public static getToken(): string | null {
        const storedToken = localStorage.getItem(TOKEN_KEY);

        if (storedToken && !jwtService.isTokenExpired(storedToken)) {
            return storedToken;
        }

        return null;
    }

    public static get JWT_CONFIG(): JwtModuleOptions {
        return {
            config: {
                tokenGetter: this.getToken,
                allowedDomains: [environment.allowedDomains],
                skipWhenExpired: true
            }
        };
    }
}
