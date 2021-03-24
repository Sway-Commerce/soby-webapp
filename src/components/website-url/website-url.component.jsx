import React from 'react';

import { ReactComponent as Car } from 'assets/category-car.svg';
import { WebsiteGroup } from './website-url.styles';
import { ReactComponent as FbIcon } from 'assets/fb-icon.svg';
import { ReactComponent as Temp } from 'assets/temp.svg';

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
        <p className="url">{url}</p>
      </div>
    </WebsiteGroup>
  );
};

export default WebsiteUrl;
