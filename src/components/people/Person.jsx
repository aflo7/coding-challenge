import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import '../../styles/person.scss';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';

const Person = () => {
  const [person, setPerson] = useState({});
  let [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    if (!id) return;

    axios
      .get(`https://test.epdet.org/api/applicant/?id=${id}`)
      .then((response) => {
        setPerson(response.data);
      });
  }, [id]);

  return (
    <div className="person-wrapper">
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Check</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          <tr>
            <td>{person.name}</td>
            <td>{person.date}</td>
            <td>
              <Checkbox checked={person.check}></Checkbox>
            </td>
            <td>
              <Button severity="primary">Edit</Button>
            </td>
            <td>
              <Button severity="danger">Delete</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Person;
