// types/theme.ts

export type SettingType =
  | 'text'
  | 'textarea'
  | 'color'
  | 'image'
  | 'range'
  | 'select'
  | 'boolean'
  | 'switch';

export interface ThemeSettingSchema {
  id: string;
  type: SettingType;
  label: string;
  default: any;
  options?: { label: string; value: string }[];
  min?: number;
  max?: number;
  step?: number;
}

export interface BlockSchema {
  type: string;
  name: string;
  settings: ThemeSettingSchema[];
}

export interface ThemeSection {
  id: string;
  type: string;
  settings: Record<string, any>;
  blocks?: { id: string; type: string; settings: Record<string, any> }[];
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
  theme_name?: string;
  version: string;
  settings: Record<string, any>;
  sections: ThemeSection[];
  layout_order: string[];
}

export interface CustomizerMessagePayload {
  sectionId?: string;
  settingId?: string;
  value?: any;
  layoutOrder?: string[];
  section?: ThemeSection;
}

export interface CustomizerMessage {
  type: string;
  payload: CustomizerMessagePayload;
}
