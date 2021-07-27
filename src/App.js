import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import 'react-phone-number-input/style.css';

import { GlobalStyle } from './global.styles';
import { ThemeProvider } from 'styled-components';

import Header from 'components/header/header.component';
import Spinner from 'components/ui/spinner/spinner.component';
import JwtRoute from './jwt-route';
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
const ShopProfile = lazy(() => import('pages/shop-profile/shop-profile.component'));
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
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <GlobalStyle />
      <div className='body-container'>
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/explore' component={ExploreMainShopPage} />
              <Route exact path='/explore/:categoryId' component={ExploreShopByCategoryPage} />
              <Route exact path='/shop-profile/:shopId' component={ShopProfileV2Page} />
              {/* <Route path='/shop-profile/:shopId' component={ShopProfile} /> */}
              <JwtRoute exact path='/create-seller' component={CreateSellerPage} />
              <Route path='/phone-signin' component={PhoneSignin} />
              <Route exact path='/phone-verification' component={PhoneVerification} />
              <Route exact path='/signup' component={SignUpInfo} />
              <Route exact path='/signup-info' component={SignUpPhone} />
              <Route path='/invoice/:invoiceId' component={Invoice} />
              <Route path='/your-invoice/:invoiceId' component={YourInvoice} />
              <JwtRoute path='/edit-profile' component={EditProfile} />
              <JwtRoute path='/change-password' component={ChangePassword} />
              <Route path='/search-result' component={SearchResult} />
              <Route path='/product/:productId' component={ProductDetail} />
              <JwtRoute path='/your-transaction' component={YourTransaction} />
              <JwtRoute path='/individual-profile' component={IndividualProfile} />
              <JwtRoute path='/individual-shipping' component={IndividualShipping} />
              <Route path='/transaction/vnpay-return' component={PaymentResult} />
              <Route path='/transaction/vnpay-mobile' component={MobilePaymentResult} />
              <Route path='/transaction/payme-success' component={PaymeSuccess} />
              <Route path='/transaction/payme-fail' component={PaymeFail} />
              <JwtRoute path='/create-seller-success' component={CreateSellerSuccessPage} />
              <JwtRoute path='/return-request/:invoiceId' component={ReturnRequestPage} />
              <JwtRoute path='/return-request' exact component={ReturnRequestList} />
              <JwtRoute path='/return-info/:assessId/:requestId' exact component={ReturnRequestInfo} />
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </div>
      <FooterSection />
    </ThemeProvider>
  );
};

export default App;
