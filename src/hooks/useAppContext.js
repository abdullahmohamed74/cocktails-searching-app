import { useContext } from 'react';
import AppContext from '../context/context';

function useAppContext() {
  return useContext(AppContext);
}

export default useAppContext;
