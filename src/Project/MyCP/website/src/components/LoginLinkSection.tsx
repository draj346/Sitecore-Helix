import {
  EditFrame,
  Field,
  Link,
  Placeholder,
  RichText,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { CustomLinkProps } from 'lib/component-props/link';
import React from 'react';
import { DefaultEditFrameButtons, GetEditFrameProps } from 'src/utils/EditFrameConstant';

type LoginLinkSectionProps = ComponentProps & {
  fields: {
    WelcomeTitle: Field<string>;
    LogoutTitle: Field<string>;
    LogoutLinkSectionTitle: Field<string>;
    LogoutMessage: Field<string>;
    LoginTitle: Field<string>;
    LoginLinkSectionTitle: Field<string>;
    Links: CustomLinkProps[];
  };
};

const LinkContent = ({ Links }: { Links: CustomLinkProps[] }): JSX.Element => (
  <li className="left-col">
    {Links &&
      Links.map((child: CustomLinkProps, index: number) => (
        <EditFrame key={index} {...GetEditFrameProps(child?.id, DefaultEditFrameButtons)}>
          <Link className="with-bs-icon chevron-right" field={child.Link}></Link>
        </EditFrame>
      ))}
  </li>
);

export const Default = ({ fields, rendering }: LoginLinkSectionProps): JSX.Element => {
  return (
    <div className="row">
      <div className="component content col-12 component-spacing">
        <div className="component-content">
          <div className="component-login">
            <div className="row login-section ">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 text-container">
                    <RichText tag="p" className="h5 title light" field={fields.WelcomeTitle} />
                    <RichText
                      tag="p"
                      className="h5 title thanks light"
                      field={fields.LogoutMessage}
                    />
                    <Text tag="h1" className="login-text" field={fields.LoginTitle}></Text>
                    <RichText tag="h1" className="logout-text" field={fields.LogoutTitle} />
                    <div className="policy-links d-none d-lg-block">
                      <RichText
                        tag="p"
                        className="login-links"
                        field={fields.LoginLinkSectionTitle}
                      />
                      <RichText
                        tag="p"
                        className="logout-links"
                        field={fields.LogoutLinkSectionTitle}
                      />
                      <ul>
                        <LinkContent Links={fields.Links}></LinkContent>
                        <li className="right-col"></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-6 login-container">
                    <Placeholder name="login-placeholder" rendering={rendering} />
                  </div>
                  <div className="col-12 d-lg-none">
                    <div className="policy-links">
                      <RichText
                        tag="p"
                        className="login-links"
                        field={fields.LoginLinkSectionTitle}
                      />
                      <RichText
                        tag="p"
                        className="logout-links"
                        field={fields.LogoutLinkSectionTitle}
                      />
                      <ul>
                        <LinkContent Links={fields.Links}></LinkContent>
                        <li className="right-col"></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
