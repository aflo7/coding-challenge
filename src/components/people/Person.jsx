import React, {useEffect} from 'react'
import { Routes, Route, useParams } from 'react-router-dom';

const Person = () => {
  let { id } = useParams();
  console.log(id)

  useEffect(() => {
  
    
  
  }, [])
  

  return (
    <div>Person</div>
  )
}

export default Person