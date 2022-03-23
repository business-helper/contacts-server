import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="px-8 py-6 border-b border-solid border-primary-light">
      <Link to="/" className="text-xl text-center font-bold uppercase">Contact Management</Link>
    </header>
  )
}
