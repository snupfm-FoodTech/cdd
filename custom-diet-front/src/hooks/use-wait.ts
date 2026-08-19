import { useTimeoutFn } from 'react-use';

const useWait = (ms = 500) => {
  const [isReady, cancel, reset] = useTimeoutFn(() => {}, ms);

  return {
    startWait: () =>
      new Promise<void>((resolve) => {
        reset();
        setTimeout(resolve, ms);
      }),
    cancelWait: cancel,
    isReady
  };
};

export default useWait;
