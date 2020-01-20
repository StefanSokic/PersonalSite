import React from 'react';
import './App.css';
import icon from '@react95/icons';
import Icon from '@react95/core/Icon';
import Alert from '@react95/core/Alert';
import List from '@react95/core/List';

import styled from 'styled-components';

// TODO
/*
- change type to be windows 95 compliant

maybe
- music feature, in a modal?
*/


const Footer = styled.button`
  min-width: 100vw;
  min-height: 5vh;

  background-color: #c3c7cb;
  padding: 7px 20px 5px;
  border: none;
  font-size: 12px;
  box-shadow: inset 1px 1px 0px 1px #ffffff, inset 0 0 0 1px #868a8e,
    1px 1px 0 0px #000;

  position:fixed;
  bottom:0;

  // &:disabled {
  //   color: #868a8e;
  // }
  &:focus {
    outline: none;
  }
  //   box-shadow: inset 1px 1px 0px 1px #ffffff,
  //     inset -0.5px -0.5px 0px 1px #868a8e, 1px 1px 0 1px #000;
  //   outline: 1px dotted #000;
  //   outline-offset: -5px;
  // &:active {
  //   padding: 8px 20px 5px;
  //   outline: 1px dotted #000;
  //   outline-offset: -5px;
  //   box-shadow: inset 0 0 0 1px #868a8e, 0 0 0 1px #000;
  // }
`;

const StartBtn = styled.button`
  min-width: 3em;

  background-color: #c3c7cb;
  // padding: 7px 20px 5px;
  border: none;
  font-size: 12px;
  box-shadow: inset 1px 1px 0px 1px #ffffff, inset 0 0 0 1px #868a8e,
    1px 1px 0 0px #000;

  &:disabled {
    color: #868a8e;
  }
  &:focus {
      box-shadow: inset 1px 1px 0px 1px #ffffff,
        inset -0.5px -0.5px 0px 1px #868a8e, 1px 1px 0 1px #000;
      outline: 1px dotted #000;
      outline-offset: -5px;
  }
  &:active {
    // padding: 8px 20px 5px;
    outline: 1px dotted #000;
    outline-offset: -5px;
    box-shadow: inset 0 0 0 1px #868a8e, 0 0 0 1px #000;
  }
`;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      time: new Date().toLocaleTimeString()
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  tick() {
    this.setState({time: new Date().toLocaleTimeString()})
  }
  render() {
    return (
      <div className="App">
        <div>
        <Alert title="Info" type="info" message="Hi! My name is Stefan and yes this is my personal site. Have fun exploring!">Click me!</Alert>
        </div>
        <div>
          <Icon name="computer" message="computer"/>
          <Icon name="earth"/>
          <Icon name="folder"/>
          <Icon name="file_text"/>
          <Icon name="notepad"/>
        </div>
        <List>
            <List.Item icon="folder_exe2">
              <List>
                <List.Item icon="microsoft_exchange">
                  Microsoft Exchange
                </List.Item>
                <List.Divider />
                <List.Item icon="windows_explorer">Windows Explorer</List.Item>
              </List>
              Programs
            </List.Item>
          </List>
          <div>
            <Footer>
              <span className="split-footer">
                <StartBtn>
                  <span id="split-footer-logo">
                    <Icon name="logo" width="20"/>
                    <span>Start</span>
                  </span>
                </StartBtn>
                <StartBtn>
                  <span id="split-footer-logo">
                    <Icon name="unmute" width="20"/>
                    <span>{this.state.time}</span>
                  </span>
                </StartBtn>
              </span>
            </Footer>
          </div>
      </div>
    );
  }
}

export default App;
