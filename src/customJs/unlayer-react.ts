import type ReactNamespace from 'react';
import type ReactDOMNamespace from 'react-dom';

export const {
  React,
  ReactDOM,
  ReactDND,
}: {
  React: typeof ReactNamespace;
  ReactDOM: typeof ReactDOMNamespace;
  ReactDND: any;
} = (window as any).unlayer;

export const {
  Children,
  isValidElement,
  useContext,
  useState,
  useReducer,
  useRef,
  useLayoutEffect,
  useEffect,
  useCallback,
  useMemo,
} = React;
