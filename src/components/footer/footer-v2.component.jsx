import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from 'shared/utils/assetsHelper';

const Footer = function () {
  return (
    <div className='container-fluid py-2' style={{ marginTop: 'auto', overflow: 'hidden' }}>
      <div className='d-flex justify-content-center align-items-center'>
        <div className='d-flex justify-content-center align-items-center' style={{ width: '1200px', height: '50px' }}>
          <div className='d-flex flex-column justify-content-between align-items-start p-0' style={{ width: '70%', height: '100%' }}>
            <div className='d-flex justify-content-center align-items-center p-0'>
              <div className=''>
                <a href='https://about.soby.vn/?page_id=2225' style={{ fontSize: '12px', color: '#6E7678', textDecoration: 'none' }}>
                  <span>Tạp chí</span>
                </a>
              </div>
              <div className='ms-4'>
                <a href='https://about.soby.vn/?page_id=5915' style={{ fontSize: '12px', color: '#6E7678', textDecoration: 'none' }}>
                  <span>FAQ</span>
                </a>
              </div>
              <div className='ms-4'>
                <a href='https://about.soby.vn/?page_id=5915' style={{ fontSize: '12px', color: '#6E7678', textDecoration: 'none' }}>
                  <span>Liên hệ</span>
                </a>
              </div>
              <div className='ms-4'>
                <a href='https://about.soby.vn/?page_id=7195' style={{ fontSize: '12px', color: '#6E7678', textDecoration: 'none' }}>
                  <span>Điều khoản bảo mật</span>
                </a>
              </div>
            </div>
            <div className='d-flex justify-content-center align-items-start p-0'>
              <div className=''>
                <a href='https://about.soby.vn/?page_id=8773' style={{ fontSize: '12px', color: '#6E7678', textDecoration: 'none' }}>
                  <span>Giới hạn dịch vụ</span>
                </a>
              </div>
              <div className='ms-4'>
                <a href='https://about.soby.vn/?page_id=8773' style={{ fontSize: '12px', color: '#6E7678', textDecoration: 'none' }}>
                  <span>Chính sách đổi trả</span>
                </a>
              </div>
              <div className='ms-4'>
                <a href='https://about.soby.vn/?page_id=8773' style={{ fontSize: '12px', color: '#6E7678', textDecoration: 'none' }}>
                  <span>Sản phẩm cấm - Chính sách hạn chế</span>
                </a>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-end align-items-center p-0' style={{ width: '30%', height: '100%' }}>
            <div className='me-2' onClick={() => window.open('https://play.google.com/store/apps/details?id=com.vn.soby&ah=XEe68UIQAM9wiZLtLjBCsOqeHng')}>
              <SVG src={toAbsoluteUrl('/assets/commons/android-download.svg')} style={{ height: '44px' }}></SVG>
            </div>
            <div>
              <SVG src={toAbsoluteUrl('/assets/commons/ios-download.svg')} style={{ height: '44px' }}></SVG>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
