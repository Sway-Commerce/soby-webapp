import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import 'react-phone-number-input/style.css';

import { GlobalStyle } from './global.styles';
import Header from 'components/header/header.component';
import Spinner from 'components/ui/spinner/spinner.component';
import JwtRoute from './jwt-route';
import ErrorBoundary from 'components/error-boundary/error-boundary.component';

const HomePage = lazy(() => import('pages/homepage/homepage.component'));
const SignUp = lazy(() =>
  import('pages/register-phone/register-phone.component')
);
const SignUpInfo = lazy(() => import('pages/register/register.component'));
const PhoneVerification = lazy(() =>
  import('pages/phone-verification/phone-verification.component')
);
const PhoneSignin = lazy(() =>
  import('pages/phone-signin/phone-signin.component')
);
const PaymentResult = lazy(() =>
  import('pages/payment-result/payment-result.component')
);
const SignOut = lazy(() => import('pages/signout/signout.component'));
const ShopProfile = lazy(() =>
  import('pages/shop-profile/shop-profile.component')
);
const ProductDetail = lazy(() =>
  import('pages/product-detail/product-detail.component')
);
const Invoice = lazy(() => import('pages/invoice/invoice.component'));
const YourTransaction = lazy(() =>
  import('pages/your-transactions/your-transactions.component')
);
const IndividualProfile = lazy(() =>
  import('pages/individual-profile/individual-profile.component')
);
const IndividualShipping = lazy(() =>
  import('pages/individual-profile/individual-shipping.component')
);
const MobilePaymentResult = lazy(() =>
  import('pages/mobile-payment-result/mobile-payment-result.component')
);

const App = () => {
  return (
    <div>
      <Header />
      <GlobalStyle />
      <div className="body-container">
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <Route exact path="/" component={HomePage} />
              <Route
                exact
                path="/phone-verification"
                component={PhoneVerification}
              />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/signup-info" component={SignUpInfo} />
              <Route exact path="/signout" component={SignOut} />

              <Route path="/shop-profile/:shopId" component={ShopProfile} />
              <Route path="/product/:productId" component={ProductDetail} />
              <Route path="/invoice/:invoiceId" component={Invoice} />
              <JwtRoute path="/your-transaction" component={YourTransaction} />
              <JwtRoute
                path="/individual-profile"
                component={IndividualProfile}
              />
              <JwtRoute
                path="/individual-shipping"
                component={IndividualShipping}
              />
              <Route
                path="/transaction/vnpay_return"
                component={PaymentResult}
              />
              <Route
                path="/transaction/vnpay-mobile"
                component={MobilePaymentResult}
              />
              <Route path="/phone-signin" component={PhoneSignin} />
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </div>
    </div>
  );
};

export default App;
