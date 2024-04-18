import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { TextField } from '@fluentui/react/lib/TextField';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';

import Table from '../components/Table';
import { getLocations, isNameValid } from '../mock-api/apis';

const TABLE_COLUMNS = ['Name', 'Location'];
const LOADING_OPTION_KEY = 'loading';

const INFO_LOADING_LOCATIONS = 'Loading locations...';
const ERROR_INVALID_NAME = 'this name has already been taken';

const PersonForm = () => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [nameValidating, setNameValidating] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const locations = getLocations();
    // Artificial timeout to demo select location waiting for async data
    locations.then(values => setTimeout(() => setLocations(values), Math.random() * 2000))
  }, []);

  // Debounce the callback to avoid spamming the api needlessly. Leading and trailing
  // help make sure that our status flags are set/cleared appropriately for the user
  const debouncedNameValidate = useDebouncedCallback(
    newValue => {
      isNameValid(newValue).then(valid => {
        setNameValidating(false);
        if (valid) {
          setNameError('');
        } else {
          setNameError(ERROR_INVALID_NAME);
        }
      })
    },
    500,
    { leading: true, maxwait: 500, trailing: true }
  );

  // Since we're controlling the input components, save the values being passed, but then validate
  const onNameChange = (e, newValue) => {
    setName(newValue);
    setNameValidating(true);
    debouncedNameValidate(newValue);
  };

  const onLocationChange = (e, option) => {
    setSelectedLocation(option.text);
  };

  // Disable button if user can't use it (no name entered, name error present, no location selected,
  // or name validation occurring)
  const addButtonDisabled = !name.length || nameError.length || !selectedLocation.length || nameValidating;

  const resetForm = () => {
    setName('');
    setSelectedLocation('');
  }

  const addPerson = () => {
    if (!addButtonDisabled) {
      setPersons(values => [...values, { key: `${values.length}-person`, name, location: selectedLocation }]);
    }
  };

  // Attempted to have a 'locations are loading' show up in dropdown, but when disabled it doesn't show any options
  const locationsLoading = !locations.length
  const loadingOptions = { key: LOADING_OPTION_KEY, text: locationsLoading ? INFO_LOADING_LOCATIONS : '' }
  const locationsOptions = locations.map(location => ({ key: location.toLowerCase(), text: location }));

  return (
    <div>
      <form>
          <div className='form-input' style={{ position: 'relative' }}>
            {/* Controlling text field to handle validation logic */}
            <TextField
              value={name}
              deferredValidationTime={500}
              errorMessage={nameError}
              label={"Name"}
              onChange={onNameChange}
            />
            {/* Provide visual feedback. How to inject 'aria-busy' into TextField tho? */}
            <Spinner
              size={SpinnerSize.small}
              styles={{
                root: {
                  display: nameValidating ? 'block' : 'none',
                }
              }}
            />
          </div>
          <div className='form-input'>
            <Dropdown
              label="Location"
              onChange={onLocationChange}
              options={locationsLoading ? loadingOptions : locationsOptions}
              selectedKey={locationsLoading ? LOADING_OPTION_KEY : selectedLocation.toLocaleLowerCase()}
              disabled={locationsLoading}
            />
          </div>

        <div className='controls'>
          <DefaultButton text="Clear" onClick={resetForm} />
          <PrimaryButton text="Add" disabled={addButtonDisabled} onClick={addPerson} />
        </div>
        <div className="table">
        <Table items={persons} columns={TABLE_COLUMNS} />
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
