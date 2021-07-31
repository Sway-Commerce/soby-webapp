import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import { setSearchInput } from 'redux/user/user.actions';
import useDebounce from 'shared/hooks/useDebounce';
import SearchInput from './search-input.component';
import { toAbsoluteUrl } from 'shared/utils/assetsHelper';

const Header = ({ history }) => {
  const { user } = useSelector((state) => ({ user: state.user }), shallowEqual);
  const { accessToken, lastName, middleName, firstName, fullName, imageUrl } = user;
  const [isSignIn, setIsSignin] = useState(!!accessToken);
  const [inputSearch, setInputSearch] = useState('');
  const debouncedSearchTerm = useDebounce(inputSearch, 500);

  const dispatch = useDispatch();
  const dispatchSetSearchInput = (payload) => dispatch(setSearchInput(payload));

  useEffect(() => {
    setIsSignin(!!accessToken);
  }, [accessToken]);

  useEffect(() => {
    dispatchSetSearchInput(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const handleChange = (event) => {
    if (!event) {
      return;
    }
    const { value } = event?.target;
    setInputSearch(value);
  };

  return (
    <div className='container-fluid p-0'>
      <div className='d-flex justify-content-center align-items-center bg-white mb-0' style={{ height: '64px' }}>
        <div className='d-flex p-0' style={{ width: '1200px', height: '100%' }}>
          <div className='d-flex justify-content-start align-items-center' style={{ width: '12%' }}>
            <Link to='/'>
              <div>
                <SVG src={toAbsoluteUrl('/assets/logos/soby.svg')} style={{ height: '40px' }}></SVG>
              </div>
            </Link>
          </div>
          <div
            aria-label='search-bar'
            className='d-flex justify-content-center align-items-center fw-bold'
            style={{ fontSize: '14px', width: '22%' }}
          ></div>
          <div className='d-flex justify-content-end align-items-center' style={{ width: '66%', fontSize: '14px' }}>
            <Link to='/explore' className='me-3'>
              <div className='p-0'>
                <div className='m-0' style={{ color: '#0D1B1E', fontSize: '14px' }}>
                  <span className=''>Khám phá</span>
                </div>
              </div>
            </Link>
            {/* <Link to='/' className='me-3'>
              <div className='p-0'>
                <div className='m-0' style={{ color: '#0D1B1E', fontSize: '14px' }}>
                  <span className=''>Chatbot</span>
                </div>
              </div>
            </Link> */}
            <a href='https://soby.vn/#what-is-soby' className='me-4'>
              <div className='p-0'>
                <div className='m-0' style={{ color: '#0D1B1E', fontSize: '14px' }}>
                  <span className=''>Soby là gì?</span>
                </div>
              </div>
            </a>
            <Link to={`${isSignIn ? '/individual-profile' : '/phone-signin'}`} className='me-2'>
              <div className='p-0'>
                <div className='m-0' style={{ color: '#0D1B1E', fontSize: '14px' }}>
                  <span className=''>Đơn hàng của tôi</span>
                </div>
              </div>
            </Link>
            {isSignIn ? (
              <Link to='/individual-profile' className='me-2'>
                <div className='p-0'>
                  <div className='m-0' style={{ color: '#0D1B1E', fontSize: '14px' }}>
                    <span className='fst-italic me-1'>Chào,</span>
                    <span className='fw-bold'>{user?.firstName}</span>
                  </div>
                </div>
              </Link>
            ) : (
              <>
                <Link to='/phone-signin' className='me-3'>
                  <div className='p-0'>
                    <div className='m-0' style={{ color: '#0D1B1E', fontSize: '14px' }}>
                      <span className=''>Đăng nhập</span>
                    </div>
                  </div>
                </Link>
                <Link to='/signup' className='me-2'>
                  <div
                    className={`rounded-pill border px-3 align-items-center d-flex justify-content-center align-items-center`}
                    style={{
                      fontSize: '14px',
                      height: '40px',
                      color: '#0D1B1E',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <span className='fw-bold'>Đăng ký</span>
                  </div>
                </Link>
              </>
            )}

            <Link to='/create-seller' className=''>
              <div
                className={`rounded-pill border px-3 align-items-center d-flex justify-content-center align-items-center`}
                style={{
                  fontSize: '14px',
                  height: '40px',
                  color: '#FFFFFF',
                  backgroundColor: '#3366FF',
                }}
              >
                <span className='fw-bold'>Người bán</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {history.location.pathname.includes('search-result') && <SearchInput hide inputSearch={inputSearch} handleChange={handleChange} />}
    </div>
  );
};

export default withRouter(Header);
