import React from 'react';
import { Field, ImageField, Link, NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import CustomLink from 'src/shared/CustomLink';
import { CustomLinkProps } from 'lib/component-props/link';

type FooterProps = {
  fields: {
    Copyrights: Field<string>;
    Logo: ImageField;
    Children: CustomLinkProps[];
  };
};

export const Default = ({ fields }: FooterProps): JSX.Element => (
  <div className="container-fluid">
    <div className="row">
      <div className="component content p-0">
        <div className="component-content">
          <div className="footer-component">
            <div className="container remove-tablet-default-padding">
              <div className="row align-items-xl-center">
                <div className="col-12 col-xl-2">
                  <div className="logo">
                    <CustomLink href="/">
                      <NextImage
                        field={fields.Logo}
                        height={0}
                        width={0}
                        style={{ width: '174px', height: 'auto' }}
                        sizes="100vw"
                        priority
                      />
                    </CustomLink>
                  </div>
                </div>
                <div className="col-12 col-xl-10">
                  <div className="footer-links">
                    <ul className="link d-xl-flex">
                      {fields.Children.map((child: CustomLinkProps, index: number) => (
                        <li key={index}>
                          <Link
                            className="with-bs-icon external-link"
                            field={child.Link}
                            rel="noopener noreferrer"
                          ></Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="copyrights">
              <div className="container">
                <div className="row">
                  <div className="col remove-tablet-default-padding">
                    <p className="p-small mb-0">
                      {fields.Copyrights.value?.replace(
                        '@DynamicYear',
                        new Date().getFullYear().toString()
                      )}
                    </p>
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
