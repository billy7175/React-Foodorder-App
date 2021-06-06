import {Fragment} from 'react';
import Header from '../src/component/Layout/Header.js';
import Meals from './component/Meals/Meals';

function App() {
  return (
    <Fragment>
      <Header />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
