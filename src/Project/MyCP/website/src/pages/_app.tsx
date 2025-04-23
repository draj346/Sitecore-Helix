import type { AppProps } from 'next/app';
import { I18nProvider } from 'next-localization';
import { SitecorePageProps } from 'lib/page-props';
import Bootstrap from 'src/Bootstrap';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'assets/app.css';
import 'assets/global.css';
import 'assets/font.css';
import 'assets/reactSelect.css';
// component styles which we need to change according to module
import 'assets/header.css';
import 'assets/footer.css';
import 'assets/loginLinkSection.css';
import 'assets/registerBanner.css';
import 'assets/faqJumplink.css';
import 'assets/faq.css';
import 'assets/contactUs.css';
import 'assets/title.css';
import 'assets/customerService.css';
import 'assets/payment.css';
import 'assets/formList.css';
import 'assets/breadcrumb.css';
import 'assets/component-form.css';
import 'assets/component-search-result.css';
import 'assets/component-pagination.css';

function App({ Component, pageProps }: AppProps<SitecorePageProps>): JSX.Element {
  const { dictionary, ...rest } = pageProps;

  return (
    <>
      <Bootstrap {...pageProps} />
      {/*
        // Use the next-localization (w/ rosetta) library to provide our translation dictionary to the app.
        // Note Next.js does not (currently) provide anything for translation, only i18n routing.
        // If your app is not multilingual, next-localization and references to it can be removed.
      */}
      <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
        <Component {...rest} />
      </I18nProvider>
    </>
  );
}

export default App;
