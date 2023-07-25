import { useState, useEffect, Dispatch, SetStateAction, useCallback } from 'react';

const useScrollLoadMore = (callback: Function):
  [
    boolean,
    Dispatch<SetStateAction<boolean>>,
    Dispatch<SetStateAction<boolean>>
  ] => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  const handleScroll = useCallback(() => {
    let scrollHeight = document.documentElement.offsetHeight;
    let scrollTop = window.innerHeight + document.documentElement.scrollTop;
    if (isEnded || isLoading || scrollTop < scrollHeight - 200) {
      return
    }
    setIsLoading(true);
  }, [isEnded, isLoading])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    if (isLoading) {
      callback();
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [callback, handleScroll, isLoading]);

  return [isLoading, setIsLoading, setIsEnded];
};

export default useScrollLoadMore;
