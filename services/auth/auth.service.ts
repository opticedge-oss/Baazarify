import { supabase } from "@/lib/supabase/client";
import { createClient } from "@/lib/supabase/server";

export class AuthService {
  static async signUp(email: string, password: string, storeName?: string) {
      const { data, error } = await supabase.auth.signUp({
            email,
                  password,
                        options: {
                                data: {
                                          store_name: storeName || email.split("@")[0],
                                                  },
                                                        },
                                                            });

                                                                if (error) throw error;
                                                                    return data;
                                                                      }

                                                                        static async signIn(email: string, password: string) {
                                                                            const { data, error } = await supabase.auth.signInWithPassword({
                                                                                  email,
                                                                                        password,
                                                                                            });

                                                                                                if (error) throw error;
                                                                                                    return data;
                                                                                                      }

                                                                                                        static async signOut() {
                                                                                                            const { error } = await supabase.auth.signOut();
                                                                                                                if (error) throw error;
                                                                                                                  }

                                                                                                                    static async getCurrentUser() {
                                                                                                                        const supabase = await createClient();
                                                                                                                            const { data, error } = await supabase.auth.getUser();
                                                                                                                                if (error) throw error;
                                                                                                                                    return data.user;
                                                                                                                                      }

                                                                                                                                        static async getSession() {
                                                                                                                                            const supabase = await createClient();
                                                                                                                                                const { data, error } = await supabase.auth.getSession();
                                                                                                                                                    if (error) throw error;
                                                                                                                                                        return data.session;
                                                                                                                                                          }
                                                                                                                                                          }
                                                                                                                                                          