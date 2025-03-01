import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import FormEditor from './modules/form-builder/Editor';
import { baseUrl } from './constants';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={`${baseUrl}`} element={<FormEditor />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
