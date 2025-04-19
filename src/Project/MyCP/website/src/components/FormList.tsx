import React, { useCallback, useEffect, useState } from 'react';
import { Field, Text, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { FormProps, States } from 'lib/component-props/form';
import downloadIcon from '/public/images/download-form.svg';
import Image from 'next/image';
import Link from 'next/link';
import { OptionType } from 'lib/component-props';
import dynamic from 'next/dynamic';
const CustomSelect = dynamic(() => import('src/shared/CustomSelect'), { ssr: false });

interface FormListProps {
  fields: {
    Forms: FormProps[];
    Heading: Field<string>;
    Description: Field<string>;
    States: States[];
  };
}

export const Default = ({ fields }: FormListProps): JSX.Element => {

  const [options, setOptions] = useState<OptionType[]>([]);
  
  const handleDropdownChange = useCallback((selected: OptionType) => {
    const slides = document.getElementsByClassName('form-doc-download-item');
    const selectedValue = selected.value;
    Array.from(slides).forEach((slide) => {
      if (slide instanceof HTMLLIElement) {
        const att = slide.getAttribute('data-states');
        if (selectedValue && att?.includes(selectedValue)) {
          slide.classList.remove('d-none');
        } else {
          slide.classList.add('d-none');
        }
      }
    });
  }, []);

  useEffect(() => {
    setOptions(fields.States.map((state) => ({
      value: state.fields.Key.value,
      label: state.fields.Value.value,
    })));
  }, []);

  return (
    <div className="component content col-12 form-component with-radio component-spacing-left">
      <div className="component-content">
        <div className="container forms-list">
          <form className="form-container needs-validation">
            <div className="row form-group">
              <div className="col-lg-6 left-container">
                <div className="title-container">
                  <Text tag="h5" className="no-typography" field={fields.Heading}></Text>
                  <RichText tag="p" field={fields.Description}></RichText>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 right-container">
                {/* <select
                  className="form-select form-select-lg custom-dropdown select2-hidden-accessible"
                  required
                  tabIndex={-1}
                  onChange={handleDropdownChange}
                >
                  <option value="">Select Your State</option>
                  {fields.States.map((state) => (
                    <option key={state.fields.Key.value} value={state.fields.Key.value}>
                      {state.fields.Value.value}
                    </option>
                  ))}
                </select> */}
                <CustomSelect
                  options={options}
                  onChange={handleDropdownChange}
                  placeholder="Select Your State"
                />
                <div className="invalid-feedback p-small semibold">Please select your State</div>
              </div>
            </div>
          </form>
        </div>
        <div>
          <div className="container text-center remove-tablet-default-padding">
            <ul className="form-doc-download">
              {fields.Forms.map((form: FormProps, index: number) => (
                <li
                  key={index}
                  className="form-doc-download-item d-none"
                  data-states={form.fields.States.map((state) => state.fields.Key.value).join(', ')}
                >
                  <Link href={form.fields.File.value.src || '/'} target="_blank">
                    <p className="bold">{form.fields.File.value.title}</p>
                    <Image src={downloadIcon} alt="download"></Image>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
