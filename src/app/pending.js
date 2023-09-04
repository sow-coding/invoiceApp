import { atom } from 'recoil';

export const pending = atom({
  key: `pending`,
  default: false, 
});
