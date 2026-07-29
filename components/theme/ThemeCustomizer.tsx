'use client';

import React, { useState, useRef } from 'react';
import { ThemeConfig, ThemeSection } from '@/types/theme';
import { defaultThemeConfig } from '@/lib/theme-engine/default-theme';
import { SECTION_SCHEMAS } from '@/lib/theme-engine/schemas';
import { saveStoreThemeConfig } from '@/lib/actions/theme-actions';

interface ThemeCustomizerProps {
  initialConfig?: ThemeConfig;
  previewUrl?: string;
  storeId?: string;
}

export default function ThemeCustomizer({
  initialConfig = defaultThemeConfig,
  previewUrl = '/store-preview',
  storeId = 'default-store',
}: ThemeCustomizerProps) {
  const [config, setConfig] = useState<ThemeConfig>(initialConfig);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const sendIframeMessage = (type: string, payload: any) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type, payload }, '*');
    }
  };

  const handleIframeLoad = () => {
    sendIframeMessage('REORDER_SECTIONS', { layoutOrder: config.layout_order || [] });
  };

  const handleSaveConfig = async () => {
    setIsSaving(true);
    try {
      const result = await saveStoreThemeConfig(storeId, config);
      if (result?.success) {
        alert('Theme layout saved successfully!');
      } else {
        alert(`Save failed: ${result?.error ?? 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Error saving theme config:', err);
      alert('Failed to save layout configuration.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSettingChange = (sectionId: string, settingId: string, value: any) => {
    setConfig((prev) => ({
      ...prev,
      sections: (prev.sections || []).map((sec) =>
        sec.id === sectionId ? { ...sec, settings: { ...(sec.settings || {}), [settingId]: value } } : sec
      ),
    }));

    sendIframeMessage('UPDATE_SECTION_SETTING', { sectionId, settingId, value });
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const currentOrder = config.layout_order || [];
    const newOrder = [...currentOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newOrder.length) return;

    const [movedId] = newOrder.splice(index, 1);
    newOrder.splice(targetIndex, 0, movedId);

    setConfig((prev) => ({ ...prev, layout_order: newOrder }));
    sendIframeMessage('REORDER_SECTIONS', { layoutOrder: newOrder });
  };

  const handleAddSection = (type: string) => {
    const schema = SECTION_SCHEMAS[type as keyof typeof SECTION_SCHEMAS];
    if (!schema) return;

    const newId = `${type}_${Date.now()}`;
    const defaultSettings: Record<string, any> = {};

    (schema.settings || []).forEach((s) => {
      defaultSettings[s.id] = s.default;
    });

    const newSection: ThemeSection = {
      id: newId,
      type,
      settings: defaultSettings,
    };

    setConfig((prev) => ({
      ...prev,
      sections: [...(prev.sections || []), newSection],
      layout_order: [...(prev.layout_order || []), newId],
    }));

    sendIframeMessage('ADD_SECTION', { section: newSection });
    setActiveSectionId(newId);
  };

  const handleRemoveSection = (sectionId: string) => {
    setConfig((prev) => ({
      ...prev,
      sections: (prev.sections || []).filter((s) => s.id !== sectionId),
      layout_order: (prev.layout_order || []).filter((id) => id !== sectionId),
    }));

    sendIframeMessage('REMOVE_SECTION', { sectionId });
    if (activeSectionId === sectionId) setActiveSectionId(null);
  };

  const activeSection = (config.sections || []).find((s) => s.id === activeSectionId) || null;
  const activeSchema = activeSection ? SECTION_SCHEMAS[activeSection.type as keyof typeof SECTION_SCHEMAS] : null;

  return (
    <div className="flex h-screen w-full bg-slate-900 text-slate-100 overflow-hidden font-sans">
      {/* LEFT SIDEBAR */}
      <div className="w-full md:w-96 border-r border-slate-800 bg-slate-950 flex flex-col h-full">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-lg text-white">Theme Customizer</h1>
            <p className="text-xs text-slate-400">{config.name} (v{config.version})</p>
          </div>
          <button
            onClick={handleSaveConfig}
            disabled={isSaving}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold rounded-md shadow transition"
          >
            {isSaving ? 'Saving...' : 'Save Layout'}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {activeSection && activeSchema ? (
            <div className="space-y-4">
              <button
                onClick={() => setActiveSectionId(null)}
                className="text-xs text-blue-400 hover:underline flex items-center gap-1"
              >
                ← Back to Sections List
              </button>

              <div className="border-b border-slate-800 pb-2">
                <h2 className="font-semibold text-sm text-slate-200">{activeSchema.name} Settings</h2>
              </div>

              {activeSchema.settings.map((setting) => {
                const rawValue = activeSection.settings?.[setting.id];
                const currentValue = rawValue !== undefined ? rawValue : setting.default;

                return (
                  <div key={setting.id} className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300 block">
                      {setting.label}
                    </label>

                    {setting.type === 'text' && (
                      <input
                        type="text"
                        value={currentValue ?? ''}
                        onChange={(e) =>
                          handleSettingChange(activeSection.id, setting.id, e.target.value)
                        }
                        className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    )}

                    {setting.type === 'textarea' && (
                      <textarea
                        rows={3}
                        value={currentValue ?? ''}
                        onChange={(e) =>
                          handleSettingChange(activeSection.id, setting.id, e.target.value)
                        }
                        className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    )}

                    {setting.type === 'select' && (
                      <select
                        value={currentValue ?? ''}
                        onChange={(e) =>
                          handleSettingChange(activeSection.id, setting.id, e.target.value)
                        }
                        className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white focus:outline-none focus:border-blue-500"
                      >
                        {setting.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    )}

                    {setting.type === 'range' && (
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min={setting.min ?? 1}
                          max={setting.max ?? 10}
                          step={setting.step ?? 1}
                          value={currentValue ?? 0}
                          onChange={(e) =>
                            handleSettingChange(
                              activeSection.id,
                              setting.id,
                              Number(e.target.value)
                            )
                          }
                          className="w-full"
                        />
                        <span className="text-xs text-slate-400 w-6">{currentValue}</span>
                      </div>
                    )}

                    {setting.type === 'switch' && (
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="checkbox"
                          checked={Boolean(currentValue)}
                          onChange={(e) =>
                            handleSettingChange(
                              activeSection.id,
                              setting.id,
                              e.target.checked
                            )
                          }
                          className="rounded bg-slate-900 border-slate-800"
                        />
                        <span className="text-xs text-slate-400">Enable</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Active Sections
              </h2>

              <div className="space-y-2">
                {(config.layout_order || []).map((secId, index) => {
                  const sec = (config.sections || []).find((s) => s.id === secId);
                  if (!sec) return null;
                  const schema = SECTION_SCHEMAS[sec.type as keyof typeof SECTION_SCHEMAS];

                  return (
                    <div
                      key={secId}
                      className="flex items-center justify-between p-2.5 bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 transition group"
                    >
                      <button
                        onClick={() => setActiveSectionId(secId)}
                        className="text-xs font-medium text-slate-200 hover:text-blue-400 text-left flex-1"
                      >
                        {schema ? schema.name : sec.type}
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMoveSection(index, 'up')}
                          disabled={index === 0}
                          className="px-1.5 py-0.5 text-xs text-slate-400 hover:text-white disabled:opacity-30"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => handleMoveSection(index, 'down')}
                          disabled={index === (config.layout_order || []).length - 1}
                          className="px-1.5 py-0.5 text-xs text-slate-400 hover:text-white disabled:opacity-30"
                        >
                          ↓
                        </button>
                        <button
                          onClick={() => handleRemoveSection(secId)}
                          className="px-1.5 py-0.5 text-xs text-red-400 hover:text-red-300 ml-1"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-slate-800">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                  Add New Section
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {Object.keys(SECTION_SCHEMAS).map((type) => (
                    <button
                      key={type}
                      onClick={() => handleAddSection(type)}
                      className="w-full text-left p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-xs text-slate-300 font-medium transition"
                    >
                      + {SECTION_SCHEMAS[type as keyof typeof SECTION_SCHEMAS].name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDEBAR: LIVE PREVIEW IFRAME */}
      <div className="flex-1 bg-slate-900 p-4 md:p-6 flex justify-center items-center overflow-hidden">
        <div className="w-full h-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-800 flex flex-col">
          <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <span className="text-xs text-slate-500 font-mono">Live Storefront Preview</span>
            <div className="w-12" />
          </div>

          <iframe
            ref={iframeRef}
            src={previewUrl}
            onLoad={handleIframeLoad}
            className="w-full flex-1 border-none"
            title="Theme Preview"
          />
        </div>
      </div>
    </div>
  );
}
