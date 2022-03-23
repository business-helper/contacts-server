import React from 'react';
import { Contact } from 'compoments/Contact';

export const HomePage: React.FC = () => {
  return (
    <div className="">
      {
        [1, 2, 3].map(index => <Contact key={index} />)
      }
    </div>
  )
}