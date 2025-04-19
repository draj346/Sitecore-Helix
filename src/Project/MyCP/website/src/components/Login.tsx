import { Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';
import CustomLink from 'src/shared/CustomLink';

type LoginProps = {
  fields: {
    Login: Field<string>;
    Register: Field<string>;
    ForgetPassword: Field<string>;
    Heading: Field<string>;
  };
};

export const Default = ({ fields }: LoginProps): JSX.Element => (
  <div className="login-wrap">
    <div className="row">
      <div className="login-content">
        <div className="row align-items-md-center">
          <div className="login col-12">
            <Text tag="h2" className="h4" field={fields.Heading}></Text>
            <CustomLink
              href={process.env.NEXT_PUBLIC_LOGIN || '/'}
              className="btn btn-primary with-bs-icon chevron-right w-100 login-btn"
            >
              <Text field={fields.Login}></Text>
            </CustomLink>
          </div>
          <div className="register col-12">
            <CustomLink
              href={process.env.NEXT_PUBLIC_REGISTER || '/'}
              className="btn btn-primary with-bs-icon chevron-right w-100"
            >
              <Text field={fields.Register}></Text>
            </CustomLink>
          </div>
          <div className="guest col-12">
            <div className="forget-password">
              <CustomLink
                href={process.env.NEXT_PUBLIC_FORGET_PASSWORD || '/'}
                className="with-bs-icon external-link"
              >
                <Text field={fields.ForgetPassword}></Text>
              </CustomLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
