import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import '../../styles/person.scss';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Person = () => {
  const [person, setPerson] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    if (!id) return;

    async function onMount() {
      await sleep(1000);
      axios
        .get(`https://test.epdet.org/api/applicant/?id=${id}`)
        .then((response) => {
          setPerson(response.data);
        });
    }
    onMount();
  }, [id]);

  return (
    <div className="person-wrapper">
      {person ? (
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
                <Button severity="primary" disabled>Edit</Button>
              </td>
              <td>
                <Button severity="danger" disabled>Delete</Button>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p className="loading-text">Loading...</p>
      )}
    </div>
  );
};

export default Person;
