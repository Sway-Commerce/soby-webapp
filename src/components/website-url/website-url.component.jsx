import React from 'react';

import { WebsiteGroup } from './website-url.styles';
import { ReactComponent as FbIcon } from 'shared/assets/facebook.svg';
import { ReactComponent as InstaIcon } from 'shared/assets/insta.svg';
import { ReactComponent as SiteIcon } from 'shared/assets/site.svg';
import { ReactComponent as ZaloIcon } from 'shared/assets/zalo.svg';

const WebsiteUrl = ({ url }) => {
  return (
    <WebsiteGroup>
      <div className="wrapper">
        <div className="sub-wrapper">
          {url.includes('facebook') ? (
            <React.Fragment>
              <div className="icon-wrapper">
                <FbIcon />
              </div>
              <p>Facebook</p>
            </React.Fragment>
          ) : url.includes('instagram') ? (
            <React.Fragment>
              <div className="icon-wrapper">
                <InstaIcon />
              </div>
              <p>Instagram</p>
            </React.Fragment>
          ) : url.includes('zalo') ? (
            <React.Fragment>
              <div className="icon-wrapper">
                <ZaloIcon />
              </div>
              <p>Zalo</p>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="icon-wrapper">
                <SiteIcon />
              </div>
              <p>Website</p>
            </React.Fragment>
          )}
        </div>
        <p
          className="url text-truncation"
          onClick={() => {
            navigator?.clipboard?.writeText(`${url}`);
            window.alert('Url is copied');
          }}
        >
          {url}
        </p>
      </div>
    </WebsiteGroup>
  );
};

export default WebsiteUrl;
