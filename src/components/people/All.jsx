import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/all.scss';
import { Checkbox } from 'primereact/checkbox';
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
                <td>{person.name}</td>
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
