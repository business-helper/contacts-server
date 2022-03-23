import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { DefaultLayout } from 'layouts/DefaultLayout';
import { ContactForm } from 'components/ContactForm'
import { HomePage } from './pages/Home';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </DefaultLayout>
    </BrowserRouter>
  );
}

export default App;
