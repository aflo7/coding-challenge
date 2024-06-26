import { useState, useEffect } from 'react';
import { Checkbox } from 'primereact/checkbox';
import axios from 'axios';
import '../../styles/all.scss';
import { Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import sleep from '../../functions/sleep';
import { ProgressSpinner } from 'primereact/progressspinner';

const All = () => {
  const [people, setPeople] = useState();
  const [searchValue, setSearchValue] = useState('');
  const [regex, setRegex] = useState(/(.*?)/);

  useEffect(() => {
    async function onMount() {
      await sleep(1000);
      axios.get('https://test.epdet.org/api/applicant').then((response) => {
        setPeople(response.data);
      });
    }
    onMount();
  }, []);

  useEffect(() => {
    if (!searchValue) return;
    setRegex(new RegExp(searchValue));
  }, [searchValue]);

  return (
    <div className="all-people-wrapper">
      <div className="table-wrapper">
        {people ? (
          <div className="search-wrapper">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}
            >
              <div>Search</div>
              <InputText
                className="w-full"
                // required
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>

            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Check</th>
                </tr>

                {people.map((person, i) => {
                  if (person.name.match(searchValue)) {
                    return (
                      <tr className="person-row" key={i}>
                        <td>
                          <Link to={`/people?id=${person._id}`}>
                            {person.name}
                          </Link>
                        </td>
                        <td>{person.date}</td>
                        <td>
                          <Checkbox checked={person.check}></Checkbox>
                        </td>
                      </tr>
                    );
                  } else {
                    return null;
                  }
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <ProgressSpinner
            style={{ width: '40px', height: '40px' }}
            strokeWidth="6"
            animationDuration=".5s"
          />
        )}
      </div>
    </div>
  );
};

export default All;
