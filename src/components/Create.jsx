import { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import '../styles/create.scss';
import axios from 'axios';

const Create = () => {
  const [name, setName] = useState('');

  const createNewPerson = () => {
    if (!name) return

    axios.post('https://test.epdet.org/api/applicant', {
      name: name,
      date: new Date(),
      check: false
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {
    console.log(name);
  }, [name]);

  return (
    <div className="create-wrapper">
      <div>Name</div>

      <InputText
        // placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button onClick={createNewPerson} label="Create" severity="success"/>
    </div>
  );
};

export default Create;
