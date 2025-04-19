import { RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { BannerProps } from 'lib/component-props/banner';
import React from 'react';

type TitleProps = BannerProps & {
  params: {
    Styles: string;
  };
};

export const Default = ({ fields, params }: TitleProps): JSX.Element => (
  <div className={`component content page-title-section col-12 ${params?.Styles || ''}`}>
    <div className="component-content">
      <div className="container">
        <RichText tag="h1" field={fields.Heading} />
        {fields.Description?.value && (
          <RichText tag="p" className="h6" field={fields.Description} />
        )}
      </div>
    </div>
  </div>
);
