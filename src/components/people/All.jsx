import { useState, useEffect } from 'react';
import { Checkbox } from 'primereact/checkbox';
import axios from 'axios';
import '../../styles/all.scss';
import { Route, Link } from 'react-router-dom';

const All = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    axios.get('https://test.epdet.org/api/applicant').then((response) => {
      setPeople(response.data);
    });
  }, []);

  return (
    <div className="all-people-wrapper">
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Check</th>
          </tr>

          {people.map((person, i) => {
            return (
              <tr className="person-row" key={i}>
                <td>
                  <Link to={`/people?id=${person._id}`}>{person.name}</Link>
                </td>
                <td>{person.date}</td>
                <td>
                  <Checkbox checked={person.check}></Checkbox>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default All;
