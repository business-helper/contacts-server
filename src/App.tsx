import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";

import { DefaultLayout } from 'layouts/DefaultLayout';
import { HomePage } from 'pages/Home';
import { AddContactPage } from 'pages/AddContactPage';
import { store } from 'store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <DefaultLayout>
          <Routes>
            {/* <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="contacts" element={<HomePage />}>
              <Route path="add" element={<AddContactPage />} />
              <Route index element={<HomePage />} />
            </Route>
          </Route> */}
            <Route path="/" element={<HomePage />} />
            <Route path="contacts" element={<HomePage />} />
            <Route path="contacts/add" element={<AddContactPage />} />
            <Route index element={<HomePage />} />
          </Routes>
        </DefaultLayout>
      </BrowserRouter >
    </Provider>
  );
}

export default App;
