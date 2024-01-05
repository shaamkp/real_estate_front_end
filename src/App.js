import logo from "./logo.svg";
// import './App.css';
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./components/routing/router/MainRouter";

function App() {
  return (
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  );
}

export default App;
