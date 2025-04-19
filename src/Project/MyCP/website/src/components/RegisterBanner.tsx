import React from 'react';
import { ImageField, NextImage, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { BannerProps } from 'lib/component-props/banner';

type RegisterBannerProps = BannerProps & {
  fields: {
    Icon: ImageField;
  };
};

export const Default = ({ fields }: RegisterBannerProps): JSX.Element => (
  <div className="row">
    <div className="component content col-12 component-spacing">
      <div className="component-content">
        <div className="row">
          <div className="container component-register-banner">
            <div className="register-banner-box col-lg-12">
              <div className="icon">
                <NextImage field={fields.Icon} />
              </div>
              <div className="register-banner-content">
                <RichText field={fields.Description} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
