import React from "react";
export default class Main extends React.Component {
  render() {
    return (
      <header className="header">
        <h2 className="header__title">
          Around
          <sup className="header__span">
            <sup>The U.S.</sup>
          </sup>
        </h2>
        <div className="header__line"></div>
      </header>
    );
  }
}
