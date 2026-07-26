import { supabase } from "@/lib/supabase/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
      const { data, error } = await supabase
            .from("products")
                  .select("*");

                      if (error) {
                            return NextResponse.json(
                                    { 
                                              success: false, 
                                                        error: error.message 
                                                                },
                                                                        { status: 500 }
                                                                              );
                                                                                  }

                                                                                      return NextResponse.json({
                                                                                            success: true,
                                                                                                  message: "Supabase connected!",
                                                                                                        data,
                                                                                                            });
                                                                                                              } catch (error) {
                                                                                                                  return NextResponse.json(
                                                                                                                        { 
                                                                                                                                success: false, 
                                                                                                                                        error: "Connection failed" 
                                                                                                                                              },
                                                                                                                                                    { status: 500 }
                                                                                                                                                        );
                                                                                                                                                          }
                                                                                                                                                          }
                                                                                                                                                          