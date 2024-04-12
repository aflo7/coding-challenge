import { useEffect, useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';
import '../../styles/delete.scss';
import { Toast } from 'primereact/toast';

const Delete = () => {
  const [id, setId] = useState('');
  const toast = useRef(null);

  const success = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Record deleted successfully',
      life: 3000
    });
  };

  const showErrorMessage = () => {
    toast.current.show({
      severity: 'error',
      summary: 'Error',
      detail: 'Error deleting record',
      life: 3000
    });
  };

  const deletePersonById = () => {
    if (!id) return;

    axios
      .delete(`https://test.epdet.org/api/applicant/?id=${id}`)
      .then(function (response) {
        success();
        console.log(response);
        setId('');
      })
      .catch(function (error) {
        showErrorMessage();
        console.log(error);
        setId('');
      });
  };

  return (
    <>
      <Toast ref={toast} />

      <div className="delete-wrapper">
        <div className='id-wrapper'>
          <div>ID</div>

          <InputText
            className="w-full"
            required
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <Button onClick={deletePersonById} label="Delete" severity="danger" />
      </div>
    </>
  );
};

export default Delete;
