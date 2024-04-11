// import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const All = () => {
  const [people, setPeople] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    // https://test.epdet.org/api/applicant
    axios.get('https://test.epdet.org/api/applicant').then((response) => {
      setPeople(response.data);
      // console.log(response.data);
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
                <td>{person.check.toString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

    </div>
  );
};

export default All;
