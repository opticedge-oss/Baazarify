import type {
      Identity,
        Session,
        } from "./identity-types";

        export class IdentityManager {
          private identity?: Identity;
            private session?: Session;

              /**
                 * Set current authenticated identity.
                    */
                      setIdentity(identity: Identity): void {
                          this.identity = identity;
                            }

                              /**
                                 * Get current authenticated identity.
                                    */
                                      getIdentity(): Identity | undefined {
                                          return this.identity;
                                            }

                                              /**
                                                 * Set current session.
                                                    */
                                                      setSession(session: Session): void {
                                                          this.session = session;
                                                            }

                                                              /**
                                                                 * Get current session.
                                                                    */
                                                                      getSession(): Session | undefined {
                                                                          return this.session;
                                                                            }

                                                                              /**
                                                                                 * Check authentication status.
                                                                                    */
                                                                                      isAuthenticated(): boolean {
                                                                                          return this.identity?.isAuthenticated ?? false;
                                                                                            }

                                                                                              /**
                                                                                                 * Clear current identity and session.
                                                                                                    */
                                                                                                      clear(): void {
                                                                                                          this.identity = undefined;
                                                                                                              this.session = undefined;
                                                                                                                }
                                                                                                                }

                                                                                                                export const identityManager = new IdentityManager();
                                                                                                                