import { useEffect, useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';
import '../../styles/create.scss';
import { Toast } from 'primereact/toast';

const Create = () => {
  const [name, setName] = useState('');
  const toast = useRef(null);

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
        check: false
      })
      .then(function (response) {
        success();
        setName('')
      })
      .catch(function (error) {
        showErrorMessage();
        setName('')

      });
  };

  return (
    <>
      <Toast ref={toast} />

      <div className="create-wrapper">
        <div>Name</div>

        <InputText
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={createNewPerson} label="Create" severity="success" />
      </div>
    </>
  );
};

export default Create;
