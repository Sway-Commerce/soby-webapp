import React, { lazy, Suspense } from 'react';
import { Switch, Route, useLocation, BrowserRouter as Router, useHistory } from 'react-router-dom';
import 'react-phone-number-input/style.css';

import { GlobalStyle } from './global.styles';
import { ThemeProvider } from 'styled-components';
import MainLayoutRoute from 'layouts/main.layout';
import CustomLayout from 'layouts/custom.layout';

import Header from 'components/header/header.component';
import Spinner from 'components/ui/spinner/spinner.component';
import JwtRoute from 'jwt-route';
import ErrorBoundary from 'components/error-boundary/error-boundary.component';
import FooterSection from 'components/footer/footer.component';

const theme = {
  primary: '#2B74E4',
  stoke: '#828282',
  red: '#F53535',
  green: '#27AE60',
};

const SignUpPhone = lazy(() => import('pages/register-phone/register-phone.component'));
const SignUpInfo = lazy(() => import('pages/register/register.component'));
const PhoneVerification = lazy(() => import('pages/phone-verification/phone-verification.component'));
const PhoneSignin = lazy(() => import('pages/phone-signin/phone-signin.component'));
const PaymentResult = lazy(() => import('pages/payment-result/payment-result.component'));
const ProductDetail = lazy(() => import('pages/product-detail/product-detail.component'));
const YourTransaction = lazy(() => import('pages/your-transactions/your-transactions.component'));
const IndividualProfile = lazy(() => import('pages/individual-profile/individual-profile.component'));
const IndividualShipping = lazy(() => import('pages/individual-profile/individual-shipping.component'));
const MobilePaymentResult = lazy(() => import('pages/mobile-payment-result/mobile-payment-result.component'));
const PaymeSuccess = lazy(() => import('pages/payme-success/payme-success.component'));
const PaymeFail = lazy(() => import('pages/payme-fail/payme-fail.component'));
const ReturnRequestPage = lazy(() => import('pages/return-request/return-request.component'));
const Invoice = lazy(() => import('pages/invoice/invoice.component'));
const YourInvoice = lazy(() => import('pages/invoice/your-invoice.component'));
const ReturnRequestList = lazy(() => import('pages/return-request-list/return-request-list.component'));
const ReturnRequestInfo = lazy(() => import('pages/request-info/request-info.component'));
const EditProfile = lazy(() => import('pages/individual-profile/edit-profile.component'));
const ChangePassword = lazy(() => import('pages/individual-profile/edit-password.component'));
const HomePage = lazy(() => import('pages/homepage/homepage.component'));
const SearchResult = lazy(() => import('pages/search-result/search-result.component'));
const ExploreMainShopPage = lazy(() => import('pages/explore/explore-main.page'));
const CreateSellerPage = lazy(() => import('pages/create-seller/create-seller.page'));
const CreateSellerSuccessPage = lazy(() => import('pages/create-seller/create-seller-success'));
const ShopProfileV2Page = lazy(() => import('pages/shop-profile-v2/shop-profile.page'));
const ExploreShopByCategoryPage = lazy(() => import('pages/explore/explore-shop-by-category.page'));

const App = () => {
  const history = useHistory();
  const location = useLocation();
  let background = location?.state?.background;
  console.info('locationMainLayout', location);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Switch location={background || location}>
            <MainLayoutRoute exact path='/' component={HomePage} />
            <MainLayoutRoute exact path='/explore' component={ExploreMainShopPage} />
            <MainLayoutRoute exact path='/explore/:categoryId' component={ExploreShopByCategoryPage} />
            <MainLayoutRoute exact path='/shop-profile/:shopId' component={ShopProfileV2Page} />
            {/* <Route path='/shop-profile/:shopId' component={ShopProfile} /> */}
            {/* <Route path='/product/:productId' component={ProductDetail} /> */}
            <MainLayoutRoute exact path='/product/:productId' children={<ShopProfileV2Page />} />
            <MainLayoutRoute exact path='/search-result' component={SearchResult} />

            <MainLayoutRoute exact path='/phone-signin' component={PhoneSignin} />
            <MainLayoutRoute exact path='/phone-verification' component={PhoneVerification} />
            <MainLayoutRoute exact path='/signup' component={SignUpInfo} />
            <MainLayoutRoute exact path='/signup-info' component={SignUpPhone} />
            <MainLayoutRoute exact path='/invoice/:invoiceId' component={Invoice} />
            <MainLayoutRoute exact path='/your-invoice/:invoiceId' component={YourInvoice} />
            <MainLayoutRoute exact path='/transaction/vnpay-return' component={PaymentResult} />
            <MainLayoutRoute exact path='/transaction/vnpay-mobile' component={MobilePaymentResult} />
            <MainLayoutRoute exact path='/transaction/payme-success' component={PaymeSuccess} />
            <MainLayoutRoute exact path='/transaction/payme-fail' component={PaymeFail} />

            <MainLayoutRoute isAuthorized exact path='/create-seller' component={CreateSellerPage} />
            <MainLayoutRoute isAuthorized exact path='/edit-profile' component={EditProfile} />
            <MainLayoutRoute isAuthorized exact path='/change-password' component={ChangePassword} />
            <MainLayoutRoute isAuthorized exact path='/your-transaction' component={YourTransaction} />
            <MainLayoutRoute isAuthorized exact path='/individual-profile' component={IndividualProfile} />
            <MainLayoutRoute isAuthorized exact path='/individual-shipping' component={IndividualShipping} />
            <MainLayoutRoute isAuthorized exact path='/create-seller-success' component={CreateSellerSuccessPage} />
            <MainLayoutRoute isAuthorized exact path='/return-request/:invoiceId' component={ReturnRequestPage} />
            <MainLayoutRoute isAuthorized exact path='/return-request' component={ReturnRequestList} />
            <MainLayoutRoute isAuthorized exact path='/return-info/:assessId/:requestId' component={ReturnRequestInfo} />
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
