import AppProvider from 'hooks';
import { AuthProvider } from 'hooks/auth';
import { AppProps } from 'next/app';
import { GlobalStyles } from 'styles';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <AppProvider>
                <AuthProvider>
                    <GlobalStyles />
                    <Component {...pageProps} />
                </AuthProvider>
            </AppProvider>
        </>
    );
}

export default MyApp;
