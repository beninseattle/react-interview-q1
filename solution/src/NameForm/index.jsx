import { useCallback, useEffect, useState } from 'react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';

import ValidatedInput from '../components/ValidatedInput';
import Select from '../components/Select';
import Table from '../components/Table';
import { getLocations, isNameValid } from '../mock-api/apis';

const TABLE_COLUMNS = ['Name', 'Location'];

const NameForm = () => {
    const [name, setName] = useState('');
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [tableValues, setTableValues] = useState([]);

    useEffect(() => {
        const locations = getLocations();
        // Artificial timeout to demo input waiting for async data
        locations.then(values => setTimeout(() => setLocations(values),2000))
    }, []);

    const onLocationChange = (event, option, index) => {
        console.log(event, option, index);
        setSelectedLocation(option.key);
    };

    const addDisabled = !name.length || !selectedLocation.length;
    console.log('addDisabled', addDisabled);

    const addPerson = () => {
        console.log('Adding person');
        if (!addDisabled) {
            setTableValues( values => [...values, { key: name, name, location: selectedLocation }]);
        }
    };
    return (
        <div>
            <form action="">
            <ValidatedInput label="Name" setInput={setName} validate={isNameValid} />
            <Select
                label="Location"
                onChange={onLocationChange}
                options={locations}
                disabled={locations.length === 0}
            />
            <div>
                <DefaultButton text="Clear" />
                <PrimaryButton text="Add" disabled={addDisabled} onClick={addPerson} />
            </div>
            </form>
            <Table items={tableValues} columns={TABLE_COLUMNS} />
        </div>
    );
};

export default NameForm;
