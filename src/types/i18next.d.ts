// Type definitions for i18next resources
import 'react-i18next';

// Define the resources for type safety
declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: Record<string, string>;
      navigation: Record<string, string>;
      sections: Record<string, string>;
      content: Record<string, string>;
    };
  }
}
