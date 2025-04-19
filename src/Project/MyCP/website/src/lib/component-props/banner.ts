import { Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';

/**
 * Shared styleguide specimen fields
 */
export type BannerProps = {
  fields: {
    Heading: Field<string>;
    Description: Field<string>;
  };
};

export type BannerWithImageProps = BannerProps & {
  fields: {
    Icon: ImageField;
  };
};
