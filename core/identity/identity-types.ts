import type { Role } from "./roles";
import type { Permission } from "./permissions";

/**
 * ==========================================
  * BZR Identity Types
   * ==========================================
    */

    export interface Identity {
      id: string;
        tenantId?: string;
          role: Role;
            permissions: Permission[];
              isAuthenticated: boolean;
              }

              export interface Session {
                sessionId: string;
                  identityId: string;
                    createdAt: Date;
                      expiresAt: Date;
                      }

                      export interface AuthenticationResult {
                        success: boolean;
                          identity?: Identity;
                            session?: Session;
                              message?: string;
                              }
                              