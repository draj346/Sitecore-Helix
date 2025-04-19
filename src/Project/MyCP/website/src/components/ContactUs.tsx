import React from 'react';
import { EditFrame, Field, ImageField, NextImage, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { BannerWithImageProps } from 'lib/component-props/banner';
import { CustomLinkProps } from 'lib/component-props/link';
import { GetEditFrameButtons, GetEditFrameProps } from 'src/utils/EditFrameConstant';

type ContactUsProps = BannerWithImageProps & {
  fields: {
    CTATitle: Field<string>;
    CTADescription: Field<string>;
    CTAIcon: ImageField;
    Contacts: CustomLinkProps[];
  };
};

export const Default = ({ fields }: ContactUsProps): JSX.Element => (
  <div className="component content component-spacing component-customer-service col-12">
    <div className="component-content">
      <div className="row">
        <div className="container remove-tablet-default-padding">
          <div className="section">
            <div className="left-container col-lg-6">
              <div className="desc-section">
                <Text tag="h2" field={fields.Heading}></Text>
                <div className="contact">
                  <div className="icon-hours">
                    <div>
                      <span className="call_icon_circle">
                        <NextImage field={fields.CTAIcon} height={60} width={60} />
                      </span>
                    </div>
                    <div className="call-hours">
                      <Text tag="h5" field={fields.CTATitle}></Text>
                      <Text tag="p" className="semibold" field={fields.CTADescription}></Text>
                    </div>
                  </div>
                  <div className="contacts-list row row-cols-1 row-cols-lg-1">
                    {fields.Contacts.map((contact: CustomLinkProps, index: number) => (
                      <EditFrame
                        key={index}
                        {...GetEditFrameProps(contact?.id, GetEditFrameButtons(['Link']))}
                      >
                        <div className="col col-md-6">
                          <p className="h6-small">{contact.Link?.value?.title}</p>
                          <a
                            className="a-medium"
                            title="phone number"
                            href={contact.Link?.value?.href?.substring(1)}
                          >
                            {contact.Link?.value?.text}
                          </a>
                        </div>
                      </EditFrame>
                    ))}
                  </div>
                </div>
              </div>
              <div className="gradient-border"></div>
            </div>
            <div
              className="right-container col-lg-6"
              style={{ backgroundImage: `url(${fields.Icon.value?.src})` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
