/**
 * Analytics utility functions to track user interactions
 */

// Initialize pageview history for single page application tracking
const pageviewHistory: string[] = [];

/**
 * Track a page view event
 * @param path Optional path to track, defaults to current URL path
 */
export function trackPageView(path?: string) {
  const currentPath = path || window.location.pathname;
  
  // Avoid duplicate consecutive pageviews
  if (pageviewHistory.length > 0 && pageviewHistory[pageviewHistory.length - 1] === currentPath) {
    return;
  }
  
  // Log tracking of page view
  console.log(`Analytics Pageview: ${currentPath}`);
  
  // Store viewed path in history
  pageviewHistory.push(currentPath);
  
  // In a real implementation, this would call Google Analytics, Matomo, etc.
  // Example: ga('send', 'pageview', currentPath);
}

/**
 * Track an event interaction
 * @param category Event category
 * @param action Event action
 * @param label Optional event label
 * @param value Optional event value
 */
export function trackEvent(category: string, action: string, label?: string, value?: number) {
  // Log tracking of event
  console.log(`Analytics Event: ${category} - ${action}${label ? ` - ${label}` : ''}${value !== undefined ? ` - ${value}` : ''}`);
  
  // In a real implementation, this would call Google Analytics, Matomo, etc.
  // Example: ga('send', 'event', category, action, label, value);
}

/**
 * Track user conversion
 * @param conversionType Type of conversion
 * @param value Monetary value if applicable
 */
export function trackConversion(conversionType: string, value?: number) {
  // Log tracking of conversion
  console.log(`Analytics Conversion: ${conversionType}${value !== undefined ? ` - Value: ${value}` : ''}`);
  
  // In a real implementation, this would call Google Analytics, Matomo, etc.
  // Example: ga('send', 'event', 'Conversion', conversionType, '', value);
}

/**
 * Track a form submission
 * @param formName Name of the form being tracked
 * @param success Whether the submission was successful
 */
export function trackFormSubmission(formName: string, success: boolean) {
  const action = success ? 'Success' : 'Failure';
  
  // Log tracking of form submission
  console.log(`Analytics Form: ${formName} - ${action}`);
  
  // In a real implementation, this would call Google Analytics, Matomo, etc.
  // Example: ga('send', 'event', 'Form', action, formName);
}
