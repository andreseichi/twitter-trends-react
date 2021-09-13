import './styles/App.css';

import axios from 'axios';

import { useEffect, useState } from 'react';

import { Header } from './components/Header';

export const App = () => {
  const [woeid, setWoeid] = useState(1);
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    getTrends();
  }, [woeid]);

  // Get Global trends
  const globalTrends = () => {
    axios
      .get(`${process.env.REACT_APP_TWITTER_BACKEND_API}/trends`)
      .then((response) => {
        const { data } = response;
        const { trends } = data[0];
        setTrends(trends);
      })
      .catch((error) => console.log(error.message));
  };

  // Get trends based on the woeid
  const woeidTrends = () => {
    axios
      .get(`${process.env.REACT_APP_TWITTER_BACKEND_API}/trends/${woeid}`)
      .then((response) => {
        const { data } = response;
        const { trends } = data[0];
        setTrends(trends);
      })
      .catch((error) => console.log(error.message));
  };

  // Get trends based on the woeid state
  const getTrends = () => {
    woeid === 1 ? globalTrends() : woeidTrends();
  };

  // Create the list for the trends array
  const returnTrends = () => {
    return (
      <ul>
        {trends.map((trend, index) => {
          return (
            <li key={index}>
              <a href={trend.url}>
                <span className="top-number">{index + 1}</span>
                {trend.name}
                {trend.tweet_volume && (
                  <span className="tweet-volume">{trend.tweet_volume}</span>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="App">
      <Header />
      <main className="main">
        <div className="woeid">
          <select
            name="trend-local"
            id="trend-local"
            defaultValue={1}
            onChange={(e) => setWoeid(e.target.value)}
            className="woeid-select"
          >
            <option value="1">Global</option>
            <option value="455820">Belém</option>
            <option value="455827">São Paulo</option>
            <option value="2459115">New York</option>
            <option value="2442047">Los Angeles</option>
            <option value="44418">London</option>
            <option value="1105779">Sydney</option>
          </select>
        </div>

        <div className="trends">{returnTrends()}</div>
      </main>
    </div>
  );
};
