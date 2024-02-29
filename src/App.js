import logo from './logo.svg';
import './App.css';
import MyNavBar from './components/navbar';
import AppBody from './components/appBody';

function App() {
  return (
    <div className="App">
      <MyNavBar/>
      <AppBody/>
    </div>
  );
}

export default App;