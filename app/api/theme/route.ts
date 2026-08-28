import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const STORAGE_PATH = path.join(process.cwd(), 'data', 'theme-config.json');

// Get Saved Theme Config
export async function GET() {
  try {
      if (fs.existsSync(STORAGE_PATH)) {
            const fileContent = fs.readFileSync(STORAGE_PATH, 'utf-8');
                  const config = JSON.parse(fileContent);
                        return NextResponse.json({ success: true, config });
                            }
                                return NextResponse.json({ success: true, config: null });
                                  } catch (error) {
                                      return NextResponse.json(
                                            { success: false, error: 'Failed to load theme configuration' },
                                                  { status: 500 }
                                                      );
                                                        }
                                                        }

                                                        // Save Theme Config
                                                        export async function POST(req: Request) {
                                                          try {
                                                              const body = await req.json();

                                                                  const dir = path.dirname(STORAGE_PATH);
                                                                      if (!fs.existsSync(dir)) {
                                                                            fs.mkdirSync(dir, { recursive: true });
                                                                                }

                                                                                    fs.writeFileSync(STORAGE_PATH, JSON.stringify(body, null, 2), 'utf-8');

                                                                                        return NextResponse.json({
                                                                                              success: true,
                                                                                                    message: 'Theme configuration saved successfully!',
                                                                                                          timestamp: new Date().toISOString(),
                                                                                                              });
                                                                                                                } catch (error) {
                                                                                                                    return NextResponse.json(
                                                                                                                          { success: false, error: 'Failed to save theme configuration' },
                                                                                                                                { status: 500 }
                                                                                                                                    );
                                                                                                                                      }
                                                                                                                                      }
                                                                                                                                      