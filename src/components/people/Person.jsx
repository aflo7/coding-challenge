import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useSearchParams,useNavigate } from 'react-router-dom';
import '../../styles/person.scss';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Person = () => {
  const [person, setPerson] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id');
  const toast = useRef(null);
  const navigate = useNavigate();

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

  const deletePerson = () => {
    if (!id) return;

    axios
      .delete(`https://test.epdet.org/api/applicant/?id=${id}`)
      .then(function (response) {
        // success();
        // console.log(response);
        // setId('')
        // Navigate('')
        navigate("/");
      })
      .catch(function (error) {
        showErrorMessage();
        // console.log(error);
        // setId('')
      });
  };

  return (
    <>
      <Toast ref={toast} />

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
                  <Button severity="primary" disabled>
                    Edit
                  </Button>
                </td>
                <td>
                  <Button onClick={deletePerson} severity="danger">
                    Delete
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p className="loading-text">Loading...</p>
        )}
      </div>
    </>
  );
};

export default Person;
