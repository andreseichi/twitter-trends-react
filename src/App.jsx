import logo from './images/twitter.svg';

import axios from 'axios';

import { useEffect, useState } from 'react';

export const App = () => {
  const [woeid, setWoeid] = useState(1);
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    getTrends();
  }, [woeid]);

  // Get Global trends
  const globalTrends = () => {
    axios
      .get('/trends')
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
      .get(`/trends/${woeid}`)
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
              <a href={trend.url}>{trend.name}</a>
              {trend.tweet_volume && (
                <span className="tweet-volume">{trend.tweet_volume}</span>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="App">
      <header className="header">
        <img src={logo} alt="Twitter logo" />
        <h1>Twitter Trends</h1>
      </header>
      <main>
        <div className="woeid">
          <select
            name="trend-local"
            id="trend-local"
            defaultValue={1}
            onChange={(e) => setWoeid(e.target.value)}
          >
            <option value="1">Global</option>
            <option value="2459115">New York</option>
          </select>
        </div>

        <div className="trends">{returnTrends()}</div>
      </main>
    </div>
  );
};
