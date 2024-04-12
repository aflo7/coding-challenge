import { useEffect, useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';
import '../../styles/create.scss';
import { Toast } from 'primereact/toast';

import { Checkbox } from 'primereact/checkbox';

const Create = () => {
  const [name, setName] = useState('');
  const toast = useRef(null);
  const [checked, setChecked] = useState(false);

  const success = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Record created successfully',
      life: 3000
    });
  };

  const showErrorMessage = () => {
    toast.current.show({
      severity: 'error',
      summary: 'Error',
      detail: 'Error creating record',
      life: 3000
    });
  };

  const createNewPerson = () => {
    if (!name) return;

    axios
      .post('https://test.epdet.org/api/applicant', {
        name: name,
        date: new Date(),
        check: checked
      })
      .then(function (response) {
        success();
        setName('');
        setChecked(false)
      })
      .catch(function (error) {
        showErrorMessage();
        setName('');
      });
  };

  return (
    <>
      <Toast ref={toast} />

      <div className="create-wrapper">
        <div className='name-wrapper'>
          <div>Name</div>

          <InputText
            className="w-full"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="checkbox-wrapper">
          <Checkbox
            inputId="checked"
            onChange={(e) => setChecked(e.checked)}
            checked={checked}
          ></Checkbox>
          <label htmlFor="checked">Checked</label>
        </div>
        <Button onClick={createNewPerson} label="Create" severity="success" />
      </div>
    </>
  );
};

export default Create;
