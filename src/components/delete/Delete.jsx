import { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
// import '../styles/delete.scss';
import '../../styles/delete.scss'
import axios from 'axios';

const Delete = () => {
  const [id, setId] = useState('');

  const deletePersonById = () => {
    if (!id) return

    // axios.delete(`https://test.epdet.org/api/applicant/id=${id}`)
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  }

  return (
    <div className="delete-wrapper">
      <div>ID</div>

      <InputText
        // placeholder="Name"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <Button onClick={deletePersonById} label="Delete" severity="danger"/>
    </div>
  );
};

export default Delete;
