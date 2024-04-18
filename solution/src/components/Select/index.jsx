import { Dropdown } from '@fluentui/react/lib/Dropdown';

const Select = ({ disabled, label, onChange, options }) => {
  const mappedOptions = options.map(option => ({ key: option, text: option }));
  return (
    <div>
      <Dropdown
        label={label}
        onChange={onChange}
        options={mappedOptions}
        disabled={disabled}
      />
    </div>
  );
};

export default Select;