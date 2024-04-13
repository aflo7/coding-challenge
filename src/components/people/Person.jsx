import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../../styles/person.scss';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';
import sleep from '../../functions/sleep';

const Person = () => {
  const [person, setPerson] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id');
  const toast = useRef(null);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const [modalName, setModalName] = useState('');
  const [modalDate, setModalDate] = useState('');
  const [modalCheck, setModalCheck] = useState('');
  const [modalId, setModalId] = useState()

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
        navigate('/');
      })
      .catch(function (error) {
        showErrorMessage();
      });
  };

  const handleUpdate = () => {
    if (!modalId) return

    axios({
      method: 'patch',
      url: `https://test.epdet.org/api/applicant/?id=${modalId}`,
      data: {
        name: modalName,
        date: new Date(),
        check: modalCheck
      }
    }).then((res) => {
      navigate(0)
    }).catch((error ) => {
      showErrorMessage();

    })
  };

  const footerContent = (
    <div className="footer-wrapper">
    <Button
      className="btn"
      label="Cancel"

      severity="danger"
      onClick={() => setVisible(false)}
      // autoFocus
    />

    <Button
      className="btn"
      label="Update"
      onClick={() => {
        setVisible(false);
        handleUpdate();
      }}
    />
  </div>
  );

  return (
    <>
      <div className="card flex justify-content-center">
        <Dialog
          header="Edit"
          visible={visible}
          className="dialog-wrapper"
          style={{
            maxWidth: '600px',
            width: '100%',
            border: '1px solid black'
          }}
          onHide={() => setVisible(false)}
          footer={footerContent}
          draggable={false}
        >
          <div className="dialog-content">
            <div className="name-wrapper">
              <div>Name</div>
              <input
                value={modalName}
                onChange={(e) => setModalName(e.target.value)}
                type="text"
              />
            </div>

            <div className="date-wrapper">
              <div>Date</div>
              <input
                className="date-textbox"
                value={modalDate}
                type="text"
                readOnly={true}
              />
            </div>

            <div className="checkbox-wrapper">
              <div>Check</div>
              <input
                checked={modalCheck}
                onChange={() => setModalCheck(prev => !prev)}
                type="checkbox"
              />
            </div>

           
          </div>
        </Dialog>
      </div>

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
                <td className="edit-table-cell">
                  <Button
                    className="btn"
                    severity="primary"
                    onClick={() => {
                      setVisible(true);
                      setModalName(person.name);
                      setModalDate(person.date);
                      setModalCheck(person.check);
                      setModalId(person._id)
                    }}
                  >
                    Edit
                  </Button>
                </td>
                <td className="delete-table-cell">
                  <Button
                    className="btn"
                    onClick={deletePerson}
                    severity="danger"
                  >
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
