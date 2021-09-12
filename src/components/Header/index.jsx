import logo from '../../images/twitter.svg';

import './styles.css';

export const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Twitter logo" className="logo" />
      <h1>Twitter Trends</h1>
    </header>
  );
};
