
import useAPI, { configRequest } from './useAPI';
import useAsync from './useAsync';
import useLoadMore from './useLoadMore';
import useSearch from './useSearch';
import useControllableValue from './useControllableValue';
import useDynamicList from './useDynamicList';
import useEventEmitter from './useEventEmitter';
import useLocalStorageState from './useLocalStorageState';
import useUpdateEffect from './useUpdateEffect';
import usePagination from './usePagination';
import useBoolean from './useBoolean';
import useToggle from './useToggle';
import useSelections from './useSelections';
import useThrottle from './useThrottle';
import useThrottleFn from './useThrottleFn';
import useDebounce from './useDebounce';
import useDebounceFn from './useDebounceFn';
import useMouse from './useMouse';
import useScroll from './useScroll';
import useFullscreen from './useFullscreen';
import useInViewport from './useInViewport';
import useKeyPress from './useKeyPress';

const useControlledValue: typeof useControllableValue = function (...args) {
  console.warn(
    'useControlledValue is deprecated and will be removed in the next major version. Please use useControllableValue instead.',
  );
  return useControllableValue(...args);
};

export {
  useAPI,
  useAsync,
  useLoadMore,
  useSearch,
  useControlledValue,
  useControllableValue,
  useDynamicList,
  useEventEmitter,
  useLocalStorageState,
  configRequest,
  useUpdateEffect,
  usePagination,
  useBoolean,
  useToggle,
  useSelections,
  useThrottle,
  useThrottleFn,
  useDebounce,
  useDebounceFn,
  useMouse,
  useScroll,
  useFullscreen,
  useInViewport,
  useKeyPress,
};
