import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import FormEditor from './modules/form-builder/Editor';

const DefaultPage = () => {
  return (
    <div>
      <h1>This is just a sample page</h1>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<DefaultPage />} />
          <Route path="/editor" element={<FormEditor />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
