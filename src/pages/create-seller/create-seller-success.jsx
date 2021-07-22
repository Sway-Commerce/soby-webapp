import CreateSellerSuccessImg from '../../shared/assets/create_shop_success.svg';
import AndroidDownload from '../../shared/assets/android_download.svg';
import IOSDownload from '../../shared/assets/ios_download.svg';
import { Link } from 'react-router-dom';

const CreateSellerSuccess = function() {
  return (
    <div className='container mt-2 mb-4' style={{ border: '1px black'}}>
        <div className='row d-flex justify-content-center' style={{ border: '1px black'}}>
          <div style={{ width: '480px', textAlign: 'center', border: '1px black', alignItems: 'center' }}>
            <img style={{ maxWidth: '100%' }} src={CreateSellerSuccessImg} />
            <h4 className='fw-bold mt-4 justify-content-center' style={{ fontSize: '24px', marginTop: '25px' }}>
              You are all set to go!
            </h4>
            <p style={{ fontSize: '14px', color: '#3D494B', margin: '0 55px'}}> 
              Great job but there's more you can do.  These next steps will complete your profile & build your rank. 
            </p>
            <div style={{alignItems: 'center', marginTop: '20px'}}>
              <img style={{verticalAlign: 'middle', display: 'inline-block', padding: '4px'}} src={AndroidDownload} 
              onClick={() =>
                (window.open('https://play.google.com/store/apps/details?id=com.vn.soby&ah=XEe68UIQAM9wiZLtLjBCsOqeHng'))
              }/>
              <img style={{verticalAlign: 'middle', display: 'inline-block', padding: '4px'}} src={IOSDownload} />
            </div>
            <Link to="/" style={{marginTop: '90px'}}>
              <div className="back-btn" style={{marginTop: '90px'}}>Back to homepage</div>
            </Link>
          </div>
        </div>
      </div>
  );
};

export default CreateSellerSuccess;