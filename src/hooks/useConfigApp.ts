import { useContext } from 'react';
import ConfigContext from '../context/ConfigContext';

export default function useConfigApp() {

  const { config, setConfig } = useContext(ConfigContext);
  const { counterBatch, sidebarCollapsed } = config;
  
  const toggleSidebar = () => {
    if (sidebarCollapsed) {
      setConfig({
        ...config,
        sidebarCollapsed: false
      })
    } else {
      setConfig({
        ...config,
        sidebarCollapsed: true
      })
    }
  };


  return {
    sidebarCollapsed,
    counterBatch,
    toggleSidebar,
  }
}