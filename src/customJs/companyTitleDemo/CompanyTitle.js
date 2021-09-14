import { getCompanyTitle } from '../sharedSingletonModule';

const React = window.unlayer.React;

export const CompanyTitle = () => {
  const title = getCompanyTitle();
  return <div>{title}</div>;
};
