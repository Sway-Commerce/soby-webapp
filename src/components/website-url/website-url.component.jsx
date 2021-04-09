import React from 'react';

import { ReactComponent as Car } from 'shared/assets/category-car.svg';
import { WebsiteGroup } from './website-url.styles';
import { ReactComponent as FbIcon } from 'shared/assets/fb-icon.svg';
import { ReactComponent as Temp } from 'shared/assets/temp.svg';

const WebsiteUrl = ({ url }) => {
  return (
    <WebsiteGroup>
      <div className="wrapper">
        <div className="sub-wrapper">
          {url.includes('facebook') ? (
            <>
              <div className="icon-wrapper">
                <FbIcon />
              </div>
              <p>Facebook</p>
            </>
          ) : (
            <>
              <Temp className="temp" />
              <p>Website</p>
            </>
          )}
        </div>
        <p
          className="url text-truncation"
          onClick={() => {
            navigator.clipboard.writeText(`${url}`);
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
