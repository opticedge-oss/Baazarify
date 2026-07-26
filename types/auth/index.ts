export interface AuthUser {
      id: string;
        email: string;
          role?: string;
            created_at: string;
            }

            export interface AuthSession {
              access_token: string;
                refresh_token: string;
                  expires_at: number;
                  }
                  