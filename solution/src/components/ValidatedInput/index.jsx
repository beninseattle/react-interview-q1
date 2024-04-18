import { TextField } from '@fluentui/react/lib/TextField';
import { useState, useCallback } from 'react';

const ValidatedInput = ({ label, setInput, validate }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const onChange = (e, newValue) => {
    console.log(e, newValue);
    setValue(newValue);
    validate(newValue).then(valid => {
      if (valid) {
        setError('');
        setInput(newValue);
      } else {
        setError('this name has already been taken');
      }
    })
  };
  return (
    <div>
      <TextField
        value={value}
        deferredValidationTime={500}
        errorMessage={error}
        label={label}
        onChange={onChange}
      />
    </div>
  );
};

export default ValidatedInput;