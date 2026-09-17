import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof import('@/locales/es/common.json');
      evaluations: typeof import('@/locales/es/evaluations.json');
      auth: typeof import('@/locales/es/auth.json');
    };
  }
}
