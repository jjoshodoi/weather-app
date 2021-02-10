import logo from './logo.svg';
import './App.css';

function App() {
  const API_KEY = "a33e014e75b0261963e1c6981f48ea3e";
  const example = `api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}`;
  const city_name = " ";

  return (
    <div className="App">
      <form className="Search-form">
        <input classnName="Search-Bar" type= "text"/>
        <button className= "Search-button" type = "submit">
          Search
          </button>
      </form>
    </div>
  );
}

export default App;
