import { identityManager } from "./identity-manager";
import type {
  AuthenticationResult,
    Identity,
      Session,
      } from "./identity-types";

      export class IdentityService {
        /**
           * Authenticate an identity.
              */
                authenticate(
                    identity: Identity,
                        session: Session
                          ): AuthenticationResult {
                              identityManager.setIdentity(identity);
                                  identityManager.setSession(session);

                                      return {
                                            success: true,
                                                  identity,
                                                        session,
                                                            };
                                                              }

                                                                /**
                                                                   * Logout current identity.
                                                                      */
                                                                        logout(): void {
                                                                            identityManager.clear();
                                                                              }

                                                                                /**
                                                                                   * Get current identity.
                                                                                      */
                                                                                        getIdentity() {
                                                                                            return identityManager.getIdentity();
                                                                                              }

                                                                                                /**
                                                                                                   * Get current session.
                                                                                                      */
                                                                                                        getSession() {
                                                                                                            return identityManager.getSession();
                                                                                                              }

                                                                                                                /**
                                                                                                                   * Check authentication status.
                                                                                                                      */
                                                                                                                        isAuthenticated(): boolean {
                                                                                                                            return identityManager.isAuthenticated();
                                                                                                                              }
                                                                                                                              }

                                                                                                                              export const identityService = new IdentityService();