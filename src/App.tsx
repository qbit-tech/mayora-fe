import React from 'react';
import RootNavigator from './navigation/RootNavigator';
import './assets/app.css';
import 'antd/dist/reset.css';
import ConfigProvider from './context/ConfigProvider';
import { Alert } from 'antd';
import { ThemeProvider } from 'styled-components';
import { theme } from './assets/theme';
import { AuthProvider } from 'react-auth-kit'
import { MsalProvider } from '@azure/msal-react';
import { IPublicClientApplication } from '@azure/msal-browser';
type AppProps = {
  azureInstance: IPublicClientApplication;
};

const { ErrorBoundary } = Alert;
function App({ azureInstance }: AppProps) {
  return (
    <ErrorBoundary>
      <MsalProvider instance={azureInstance}>
      <ConfigProvider>
        <ThemeProvider theme={theme}>
          <AuthProvider
            authType='localstorage'
            authName={'_auth'}
            // cookieDomain={window.location.hostname}
            // cookieSecure={window.location.protocol === "https:"}
          >
            <RootNavigator />
          </AuthProvider>
        </ThemeProvider>
      </ConfigProvider>
      </MsalProvider>
    </ErrorBoundary>
  );
}

export default App;
