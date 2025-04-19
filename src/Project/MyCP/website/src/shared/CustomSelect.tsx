import { OptionType } from 'lib/component-props';
import { StylesConfig } from 'react-select';
import dynamic from 'next/dynamic';
const Select = dynamic(() => import('react-select'), { ssr: false });

interface CustomSelectProps {
  options: OptionType[];
  defaultValue?: OptionType;
  placeholder?: string;
  onChange?: (selected: OptionType | null) => void;
}

const CustomSelect = ({
  options,
  defaultValue,
  placeholder = 'Select...',
  onChange,
}: CustomSelectProps) => {


    const isFirstOrLastOption = (options: OptionType[], option: OptionType) => {
        const index = options.findIndex((o) => o.value === option.value);
        return index === 0 || index === options.length - 1;
    }

  const customStyles: StylesConfig<unknown, false> = {
     menuPortal: (base) => ({ 
        ...base, 
        zIndex: 9999 
    }),
     menu: (base) => ({
        ...base,
        marginTop: 0,
        marginBottom: 0,
      }),
      option: (styles, { isFocused, options, data}) => {
        return {
          ...styles,
          backgroundColor: isFocused ? '#F7F7F7' : '#ffffff',
          fontFamily: isFocused ? "OpenSans-Bold" : "OpenSans-SemiBold",
          color: '#333333',
          borderTopWidth: 1,
          borderTopStyle: 'solid',
          borderTopColor: '#DCDCDC',
          fontSize: '16px',
          lineHeight: '22px',
          paddingTop: '20px',
          paddingBottom: '20px',
          cursor: 'pointer',
          marginTop: isFirstOrLastOption(options as OptionType[], data as OptionType) ?-5 : 0,
          marginBottom: isFirstOrLastOption(options as OptionType[], data as OptionType) ?-5 : 0,
        };
      },
  };

  return (
    <Select
      options={options}
      defaultValue={defaultValue}
      placeholder={placeholder}
      menuPortalTarget={document.body} 
      styles={customStyles}
      onChange={onChange}
      isSearchable
      components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
      className="basic-select"
      classNamePrefix="select"
      menuPosition={'fixed'}
      maxMenuHeight={310}
    />
  );
};

export default CustomSelect;
