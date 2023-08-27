import { useRecoilState, useRecoilValue } from 'recoil';

// Custom hook for accessing Recoil state
export function useCustomRecoilState(recoilState) {
  const [state, setState] = useRecoilState(recoilState);
  return [state, setState];
}

// Custom hook for accessing Recoil state value
export function useCustomRecoilValue(recoilState) {
  return useRecoilValue(recoilState);
}
