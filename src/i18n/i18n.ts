import en from './en.json';
import fr from './fr.json';
import es from './es.json';
import de from './de.json';

export interface ToolbarTranslations {
  toolbarLabel: string;
  pageNavigation: string;
  previousPage: string;
  nextPage: string;
  pageNumber: string;
  zoomControls: string;
  zoomOut: string;
  zoomIn: string;
  documentActions: string;
  rotateCounterClockwise: string;
  rotateClockwise: string;
  print: string;
  download: string;
  more: string;
}

export interface SearchTranslations {
  searchLabel: string;
  inputLabel: string;
  placeholder: string;
  noResults: string;
  previous: string;
  next: string;
  close: string;
}

export interface ErrorTranslations {
  moreInfo: string;
  lessInfo: string;
  closeError: string;
  invalidPdf: string;
  missingPdf: string;
  unexpectedResponse: string;
  genericError: string;
  messageLabel: string;
  stackLabel: string;
  fileLabel: string;
  lineLabel: string;
}

export interface ViewerTranslations {
  loading: string;
}

export interface Translations {
  toolbar: ToolbarTranslations;
  search: SearchTranslations;
  error: ErrorTranslations;
  viewer: ViewerTranslations;
}

export type TranslationsOverride = {
  [K in keyof Translations]?: Partial<Translations[K]>;
};

export const DEFAULT_LOCALE = 'en';

export const locales: Record<string, Translations> = { en, fr, es, de };

/**
 * Reads the browser's preferred language (e.g. `fr-FR` -> `fr`) and falls
 * back to `DEFAULT_LOCALE` when it isn't one we ship a translation for.
 */
export function detectBrowserLocale(): string {
  const browserLocale = typeof navigator !== 'undefined' ? navigator.language : undefined;
  const primarySubtag = browserLocale?.split('-')[0].toLowerCase();

  return primarySubtag && locales[primarySubtag] ? primarySubtag : DEFAULT_LOCALE;
}

/**
 * Merges the base translations for `locale` (falling back to the browser's
 * language, then to `DEFAULT_LOCALE`) with the consumer-provided `overrides`,
 * namespace by namespace.
 */
export function getTranslations(locale?: string, overrides?: TranslationsOverride): Translations {
  const resolvedLocale = locale && locales[locale] ? locale : detectBrowserLocale();
  const base = locales[resolvedLocale];

  if (!overrides) {
    return base;
  }

  const merged: Record<string, unknown> = {};
  (<(keyof Translations)[]>Object.keys(base)).forEach(namespace => {
    merged[namespace] = { ...base[namespace], ...overrides[namespace] };
  });

  return <Translations>(<unknown>merged);
}
