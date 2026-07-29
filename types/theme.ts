// types/theme.ts

export type SettingType = 
  | 'text' 
    | 'textarea' 
      | 'color' 
        | 'image' 
          | 'range' 
            | 'select' 
              | 'boolean';

              export interface ThemeSettingSchema {
                id: string;
                  type: SettingType;
                    label: string;
                      default: any;
                        options?: { label: string; value: string }[]; // 'select' type ke liye
                          min?: number; // 'range' type ke liye
                            max?: number;
                              step?: number;
                              }

                              export interface BlockSchema {
                                type: string;
                                  name: string;
                                    settings: ThemeSettingSchema[];
                                    }

                                    export interface SectionSchema {
                                      type: string;
                                        name: string;
                                          max_blocks?: number;
                                            settings: ThemeSettingSchema[];
                                              blocks?: BlockSchema[];
                                                presets?: {
                                                    name: string;
                                                        settings: Record<string, any>;
                                                            blocks?: { type: string; settings: Record<string, any> }[];
                                                              }[];
                                                              }

                                                              export interface ThemeConfig {
                                                                id: string;
                                                                  name: string;
                                                                    version: string;
                                                                      settings: Record<string, any>; // Global settings (Colors, Typography)
                                                                        sections: {
                                                                            id: string; // Unique instance ID (e.g., 'hero_123')
                                                                                type: string; // Schema section type (e.g., 'hero-banner')
                                                                                    settings: Record<string, any>;
                                                                                        blocks?: { id: string; type: string; settings: Record<string, any> }[];
                                                                                          }[];
                                                                                            layout_order: string[]; // Order of section IDs on page
                                                                                            }
                                                                                            