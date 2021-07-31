import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import 'react-phone-number-input/style.css';

import { GlobalStyle } from './global.styles';
import { ThemeProvider } from 'styled-components';

import Spinner from 'components/ui/spinner/spinner.component';
import ErrorBoundary from 'components/error-boundary/error-boundary.component';
import MainLayoutRoutes from 'routes/MainLayoutRoutes';
import BlankLayoutRoutes from 'routes/BlankLayoutRoutes';
import CreateSellerLayoutRoutes from 'routes/CreateSellerLayoutRoutes';
import { useSelector } from 'react-redux';
import ShopProfileLayoutRoutes from 'routes/ShopProfileLayoutRoutes';

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
const HomeV2Page = lazy(() => import('pages/homepage/home-v2.page'));
const SearchResult = lazy(() => import('pages/search-result/search-result.component'));
const ExploreMainShopPage = lazy(() => import('pages/explore/explore-main.page'));
const CreateSellerPage = lazy(() => import('pages/create-seller/create-seller.page'));
const ShopProfileV2Page = lazy(() => import('pages/shop-profile-v2/shop-profile.page'));
const ExploreShopByCategoryPage = lazy(() => import('pages/explore/explore-shop-by-category.page'));

const App = () => {
  const location = useLocation();
  let background = location?.state?.background;
  console.info('locationAppp', location);
  const { accessToken, id } = useSelector((state) => {
    return state.user;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken && !!id);

  useEffect(() => {
    if (!!accessToken && !!id) {
      setIsAuthenticated(!!accessToken && !!id);
    }
  }, [accessToken, id]);
  console.info('isAuthenticated', isAuthenticated);

  return (
    <ThemeProvider theme={theme}>
      <div className='' style={{ filter: background && 'blur(10px)' }}>
        {/* <Header /> */}
        <GlobalStyle />
        <Switch location={background || location}>
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <MainLayoutRoutes exact path='/' component={HomeV2Page} />
              <MainLayoutRoutes exact path='/explore' component={ExploreMainShopPage} />
              <MainLayoutRoutes exact path='/explore/:categoryId' component={ExploreShopByCategoryPage} />
              <ShopProfileLayoutRoutes exact path='/shop-profile/:shopId' component={ShopProfileV2Page} />
              <BlankLayoutRoutes exact path='/phone-signin' component={PhoneSignin} />
              <BlankLayoutRoutes exact path='/phone-verification' component={PhoneVerification} />
              <BlankLayoutRoutes exact path='/signup' component={SignUpInfo} />
              <BlankLayoutRoutes exact path='/signup-info' component={SignUpPhone} />
              <MainLayoutRoutes path='/invoice/:invoiceId' component={Invoice} />
              <MainLayoutRoutes path='/your-invoice/:invoiceId' component={YourInvoice} />
              <MainLayoutRoutes path='/search-result' component={SearchResult} />
              {/* <Route path='/product/:productId' component={ProductDetail} /> */}
              <MainLayoutRoutes exact path='/product/:productId' component={ShopProfileV2Page} />
              <MainLayoutRoutes path='/transaction/vnpay-return' component={PaymentResult} />
              <MainLayoutRoutes path='/transaction/vnpay-mobile' component={MobilePaymentResult} />
              <MainLayoutRoutes path='/transaction/payme-success' component={PaymeSuccess} />
              <MainLayoutRoutes path='/transaction/payme-fail' component={PaymeFail} />

              <Route
                path={[
                  '/create-seller',
                  '/edit-profile',
                  '/change-password',
                  '/your-transaction',
                  '/individual-profile',
                  '/individual-shipping',
                  '/return-request/:invoiceId',
                  '/return-request',
                  '/return-info/:assessId/:requestId',
                ]}
              >
                {!isAuthenticated ? (
                  <Redirect to='/phone-signin' />
                ) : (
                  <>
                    <CreateSellerLayoutRoutes exact path='/create-seller' component={CreateSellerPage} />
                    <MainLayoutRoutes path='/edit-profile' component={EditProfile} />
                    <MainLayoutRoutes path='/change-password' component={ChangePassword} />
                    <MainLayoutRoutes path='/your-transaction' component={YourTransaction} />
                    <MainLayoutRoutes path='/individual-profile' component={IndividualProfile} />
                    <MainLayoutRoutes path='/individual-shipping' component={IndividualShipping} />
                    <MainLayoutRoutes path='/return-request/:invoiceId' component={ReturnRequestPage} />
                    <MainLayoutRoutes path='/return-request' exact component={ReturnRequestList} />
                    <MainLayoutRoutes path='/return-info/:assessId/:requestId' exact component={ReturnRequestInfo} />
                  </>
                )}
              </Route>
            </Suspense>
          </ErrorBoundary>
        </Switch>
        {/* <FooterSection /> */}
      </div>
    </ThemeProvider>
  );
};

export default App;
