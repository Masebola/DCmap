import { store } from './state.js';
import { toast } from './utils.js';

export function exportProgress() {
  const payload = { ...store.value, version: 7, exportedAt: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `dc-reading-progress-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
  toast('Progress exported');
}

export function importProgress(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      if ([6, 7].includes(parsed.version)) {
        store.replace(parsed);
      } else {
        store.replace({
          version: 7,
          issueProgress: parsed.issueProgress || {},
          legacyProgress: parsed.roadProgress || {},
          essentials: parsed.essentials || [],
          preferences: { theme: 'system', readingMode: 'curated' },
          migrations: {},
          recent: []
        });
      }
      toast('Progress imported');
    } catch {
      toast('That progress file could not be read');
    }
  };
  reader.readAsText(file);
}
