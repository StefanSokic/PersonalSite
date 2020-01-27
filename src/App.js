import React from 'react';
import ReactPlayer from 'react-player'
import styled from 'styled-components';
import './App.css';

import Icon from './components/Icon';
import Alert from './components/Alert';
import List from './components/List';
import Modal from './components/Modal';
import TextArea from './components/TextArea';

import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

import clouds from "./windows-95-clouds.jpg";
import shutdown from "./shutdown.jpg"
import logo from "./windows-95-logo.svg";




// TODO
/*

small fixes
- clean up the start menu MVP
  v - make the basic menu
  v - make it toggle with the button press
  - clean the look of the 
- toggle open/close modals
- text for the logos
- fixed time button
- rectangle thing on mousedown drag
- cursor hover types
- little sand watch thing as icon when things are loading

easy features
- resume.txt
- resume.pdf

harder features
- recycle bin can have some funny things in it around what needs to be thrown out
- music player in a modal?
- video plater in a modal?
- calculator
- text editor cache
- paint
- minesweeper
- my fav movies folder, pings letterboxd API
- my fav songs folder, pings spotify API
- my fav aesthetics, pings pinterest API
- my fav rececpies, pings idk

refactor
- styled components
- snapshot tests
- hooks
- proper fork

*/

const CoverBackground = styled.img`
  // background-image: url("startup.jpg");
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100vh;
  min-width: 100vw;
  z-index: 10000000000;
`;

const LogoSvg = styled.img`
  position: fixed;
  margin: auto;
  top: 30vh;
  left: 37.5vw;
  max-width: 25vw;
  z-index: 100000000000;
`;

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

const IconBox = styled.li`
  padding: 6px 0;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IconList = styled.ul`
  height: 100%;
  width: 5.5em;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  margin: 0.2em;
`;

const IconListRow = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const IconBoxMyComputer = styled.div`
  padding: 6px 0;
  display: flex;
  width: 6em;
  height: 4em;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WhiteSpace = styled.div`
  border: none;
  // max-height: 100%;
  border-left: 1px solid #868a8e;
  border-top: 1px solid #868a8e;
  width: 100%;
  height: 100%;

  ${({ width, height }) => `width: ${width}px; height: ${height}px;`}

  background-color: #fff;

  outline: none;
  resize: none;

  box-shadow: inset -1px -1px 0 0 #c3c7cb, inset 1px 1px 0 0 #000000,
    0.5px 0.5px 0 0.5px #ffffff;
`;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      time: new Date().toLocaleTimeString(),
      isStartMenuOpen: true,
      isNotepadOpen: true,
      isWelcomeAlertOpen: true,
      isWelcomeVideoOpen: true,
      isResumePDFOpen: true,
      isWhyModalOpen: true,
      isMyComputerOpen: true,
      isControlPanelOpen: true,
      isControlPanelAlertOpen: true,
      isDocumentsOpen: true,
      notepadTextValue: "",
      startingUp: true,
      shuttingDown: false,
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
    this.setState({
      isStartMenuOpen: false,
      isNotepadOpen: false,
      isControlPanelAlertOpen: false,
      isResumePDFOpen: false,
      isWhyModalOpen: false,
      isMyComputerOpen:false,
      isDocumentsOpen: false,
      isControlPanelOpen: false,
    })
    setInterval(
      () => this.setState({startingUp: false}),
      3000
    );
  }

  tick() {
    this.setState({time: new Date().toLocaleTimeString()})
  }

  handleChange(val) {
    this.setState({
      notepadTextValue: val,
    })
  }

  renderWelcomeAlert() {
    if (!this.state.isWelcomeAlertOpen) return;
    return <Alert 
      title="Welcome" 
      type="info" 
      message="Hi my name is Stefan and yes this is my personal site. Have fun exploring!" 
      closeAlert={() => this.setState({isWelcomeAlertOpen: false})}>
      Click me!
      </Alert>;
  }

  renderControlPanelAlert() {
    if (!this.state.isControlPanelAlertOpen) return;
    return <Alert 
      title="Error" 
      type="error" 
      message="Yeah, like I said, this does nothing" 
      closeAlert={() => this.setState({isControlPanelAlertOpen: false})}>
      Ok Thanks
      </Alert>;
  }

  renderStartMenu() {
    if (!this.state.isStartMenuOpen) {
      return;
    }
    return (
    <List id="start-menu">
        <List.Item icon="folder_exe2">
          <List>
            <List.Item icon="folder_exe">Accessories</List.Item>
            <List.Item icon="folder_exe">StartUp</List.Item>
            <List.Item icon="microsoft_exchange">Microsoft Exchange</List.Item>
            <List.Item icon="ms_dos">MS-DOS Prompt</List.Item>
            <List.Item icon="microsoft_network">
              The Microsoft Network
            </List.Item>
            <List.Item icon="windows_explorer">Windows Explorer</List.Item>
          </List>
          Programs
        </List.Item>
        <List.Item 
          icon="folder_file"
          onClick={() => this.setState({isDocumentsOpen: !this.state.isDocumentsOpen})}
          >
          Documents
        </List.Item>
        <List.Item icon="settings">
          <List>
            <List.Item 
              icon="folder_settings" 
              onClick={() => this.setState({isControlPanelOpen: true})}>
              Control Panel
            </List.Item>
            <List.Item icon="folder_print">Printers</List.Item>
          </List>
          Settings
        </List.Item>
        <List.Item icon="file_find">Find</List.Item>
        <List.Item icon="help_book">Help</List.Item>
        <List.Item icon="loader_bat">Run...</List.Item>
        <List.Divider />
        <List.Item 
          onClick={() => this.setState({shuttingDown: true})} // TODO: either link to "are you sure" window or close all tabs before displaying image
          icon="computer_3">
          Shut Down...
          </List.Item>
      </List>
    )
  }

  renderNotepad() {
    if (!this.state.isNotepadOpen) return;
    return (
      <Modal
        icon="notepad"
        title="Untitled - Notepad"
        closeModal={() => this.setState({isNotepadOpen: !this.state.isNotepadOpen})}
        // buttons={[
        //   { value: 'Ok', onClick: () => {} },
        //   { value: 'Cancel', onClick: () => {} },
        // ]}
        height={250}
        menu={[
          {
            name: 'File',
            // list: (
              // <List>
              //   <List.Item onClick={() => {}}>Exit</List.Item>
              // </List>
            // ),
          },
          {
            name: 'Edit',
            // list: (
              // <List>
              //   <List.Item>Copy</List.Item>
              // </List>
            // ),
          },
        ]}
        >
        <TextArea value={this.state.notepadTextValue} onChange={(e) => this.handleChange(e.target.value)} rows={10} cols={20} />
      </Modal>
    )
  }

  renderResumePDF() {
    if (!this.state.isResumePDFOpen) return;
    return (
      <Modal
        icon="wordpad"
        title="Resume.pdf"
        closeModal={() => this.setState({isResumePDFOpen: !this.state.isResumePDFOpen})}
        // buttons={[
        //   { value: 'Ok', onClick: () => {} },
        //   { value: 'Cancel', onClick: () => {} },
        // ]}
        height="600"
        width="600"
        >
        <Document onLoadError={console.error} onLoadSuccess={console.log("success")} file="http://localhost:3000/resume.pdf"> <Page pageNumber={1} />  </Document>
      </Modal>
    )
  }

  renderWhyModal() {
    if (!this.state.isWhyModalOpen) return;
    return (
      <Modal
        icon="file_text"
        title="Why.txt"
        closeModal={() => this.setState({isWhyModalOpen: !this.state.isWhyModalOpen})}
        buttons={[
          { value: 'Ok Thanks', onClick: () => this.setState({isWhyModalOpen: !this.state.isWhyModalOpen})},
          // { value: 'Cancel', onClick: () => {} },
        ]}
        height="500"
        width="430"
        >
        <WhiteSpace>
          <img src="https://media.giphy.com/media/l3q2zbskZp2j8wniE/giphy.gif"/>
          <div id="why-modal-text">
            Why would I do this to you/myself?
            <br></br>
            Because <span id="strikethrough">I clearly have too much time on my hands.</span> Windows 95 is my favourite user interface of all time. It was the first GUI to introduce the concept of the desktop, taskbar, start menu, and file manager - all of which remain present in current Windows versions. It made personal computing intuitive. Plus, look how it makes Bill dance.
            <br></br>
            <br></br>
            How did I build it?
            <br></br>
            Mostly React. I used styled components and built on top of the scaffolding created by the cool people behind React95.
            <br></br>
            <br></br>
            Who am I?
            <br></br>
            An easily exciteable software person based in Toronto. Here are some links to my favourite music, movies, youtube channel, nostalgia, books, meme, clothing, blog, and human. Feel free to say hi via LinkedIn or shoot me an email. I tend to respond between two and `Number.POSITIVE_INFINITY` business days.
          </div>
        </WhiteSpace>
      </Modal>
    )
  }

  renderMyComputer() {
    if (!this.state.isMyComputerOpen) return;
    return (
      <Modal
        icon="computer"
        title="My Computer"
        closeModal={() => this.setState({isMyComputerOpen: !this.state.isMyComputerOpen})}
        height="400"
        width="500"
        menu={[
          {
            name: 'File',
            list: (
              <List>
                <List.Item onClick={() => {}}>Exit</List.Item>
              </List>
            ),
          },
          {
            name: 'Edit',
            list: (
              <List>
                <List.Item>Copy</List.Item>
              </List>
            ),
          },
          {
            name: 'View',
            // list: (
              // <List>
              //   <List.Item>Copy</List.Item>
              // </List>
            // ),
          },
          {
            name: 'Help',
            // list: (
              // <List>
              //   <List.Item>Copy</List.Item>
              // </List>
            // ),
          },
        ]}
        >
        <WhiteSpace>
          <IconListRow>
            <IconBoxMyComputer>
              <Icon name="reader_disket2" />
              Floppy (A:)
            </IconBoxMyComputer>
            <IconBoxMyComputer>
              <Icon name="reader_closed" />
              (C:)
            </IconBoxMyComputer>
            <IconBoxMyComputer>
              <Icon name="reader_cd" />
              New (D:)
            </IconBoxMyComputer>
            <IconBoxMyComputer>
              <Icon name="folder_shared" />
              Dial-Up
            </IconBoxMyComputer>
            <IconBoxMyComputer onDoubleClick={() => this.setState({isControlPanelOpen: true})}>
              <Icon name="folder_settings" />
              Control Panel
            </IconBoxMyComputer>
            <IconBoxMyComputer>
              <Icon name="folder_print" />
              Printers
            </IconBoxMyComputer>
            <IconBoxMyComputer onDoubleClick={() => this.setState({isDocumentsOpen: !this.state.isDocumentsOpen})} >
              <Icon name="folder_open" />
              Documents
            </IconBoxMyComputer>
          </IconListRow>
        </WhiteSpace>
      </Modal>
    )
  }

  renderControlPanel() {
    if (!this.state.isControlPanelOpen) return;
    return (
      <Modal
        icon="folder_settings"
        title="Control Panel"
        closeModal={() => this.setState({isControlPanelOpen: false})}
        height="400"
        width="500"
        menu={[
          {
            name: 'File',
            list: (
              <List>
                <List.Item onClick={() => {}}>Exit</List.Item>
              </List>
            ),
          },
          {
            name: 'Edit',
            list: (
              <List>
                <List.Item>Copy</List.Item>
              </List>
            ),
          },
        ]}
        >
        <WhiteSpace>
          <IconListRow>
            <IconBoxMyComputer
              onDoubleClick={() => this.setState({isControlPanelAlertOpen: true})}>
              <Icon name="user" />
              None
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.setState({isControlPanelAlertOpen: true})}>
              <Icon name="window_graph" />
              Of
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.setState({isControlPanelAlertOpen: true})}>
              <Icon name="tree" />
              These
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.setState({isControlPanelAlertOpen: true})}>
              <Icon name="signup" />
              Do
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.setState({isControlPanelAlertOpen: true})}>
              <Icon name="regedit" />
              Anything
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.setState({isControlPanelAlertOpen: true})}>
              <Icon name="ms_dos" />
              Yet
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.setState({isControlPanelAlertOpen: true})}>
              <Icon name="reader_cd_2" />
              But
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.setState({isControlPanelAlertOpen: true})}>
              <Icon name="power_off" />
              I
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.setState({isControlPanelAlertOpen: true})}>
              <Icon name="power_on" />
              Think
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.setState({isControlPanelAlertOpen: true})}>
              <Icon name="mspaint" />
              The
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.setState({isControlPanelAlertOpen: true})}>
              <Icon name="keys" />
              Icons
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.setState({isControlPanelAlertOpen: true})}>
              <Icon name="issue" />
              Still
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.setState({isControlPanelAlertOpen: true})}>
              <Icon name="globe" />
              Look
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.setState({isControlPanelAlertOpen: true})}>
              <Icon name="defrag" />
              Pretty
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.setState({isControlPanelAlertOpen: true})}>
              <Icon name="file_icons" />
              Great
            </IconBoxMyComputer>
          </IconListRow>
        </WhiteSpace>
      </Modal>
    )
    // TODO: change name of <IconBoxMyComputer> to just IconBoxHorizontal or something
  }


  renderDocuments() {
    if (!this.state.isDocumentsOpen) return;
    return (
      <Modal
        icon="folder_open"
        title="Documents" // "My Digital Brain"?
        closeModal={() => this.setState({isDocumentsOpen: !this.state.isDocumentsOpen})}
        height="400"
        width="500"
        menu={[
          {
            name: 'File',
            list: (
              <List>
                <List.Item onClick={() => {}}>Exit</List.Item>
              </List>
            ),
          },
          {
            name: 'Edit',
            list: (
              <List>
                <List.Item>Copy</List.Item>
              </List>
            ),
          },
        ]}
        >
        <WhiteSpace>
          <IconListRow>
            <IconBoxMyComputer >
              <Icon name="folder" />
              Movies
            </IconBoxMyComputer>
            <IconBoxMyComputer >
              <Icon name="folder" />
              Music
            </IconBoxMyComputer>
            <IconBoxMyComputer >
              <Icon name="folder" />
              Architecture
            </IconBoxMyComputer>
            <IconBoxMyComputer >
              <Icon name="folder" />
              Books
            </IconBoxMyComputer>
          </IconListRow>
        </WhiteSpace>
      </Modal>
    )
  }

  renderRecycleBin() {
    if (!this.state.isRecycleBinOpen) return;
    return (
      <Modal
        icon="recycle_full"
        title="Recycle Bin" 
        closeModal={() => this.setState({isRecycleBinOpen: !this.state.isRecycleBinOpen})}
        height="400"
        width="500"
        menu={[
          {
            name: 'File',
            list: (
              <List>
                <List.Item onClick={() => {}}>Exit</List.Item>
              </List>
            ),
          },
          {
            name: 'Edit',
            list: (
              <List>
                <List.Item>Copy</List.Item>
              </List>
            ),
          },
        ]}
        >
        <WhiteSpace>
          <IconListRow>
            <IconBoxMyComputer >
              <Icon name="folder" />
              Fooey
            </IconBoxMyComputer>
          </IconListRow>
        </WhiteSpace>
      </Modal>
    )
  }

  renderStartupScreen() {
    if (!this.state.startingUp) return;
    return (
      <React.Fragment>
        <CoverBackground src={clouds}/>
        <LogoSvg src={logo} />
      </React.Fragment>
    );
  }

  renderShutdownScreen() {
    if (!this.state.shuttingDown) return;
    return <CoverBackground src={shutdown}/>
  }

  renderWelcomeVideo() {
    if (!this.state.isWelcomeVideoOpen) return;
    return (
      <Modal
        icon="mute"
        title="launch_party.mp4"
        closeModal={() => this.setState({isWelcomeVideoOpen: false})}
        height="390"
        width="555"
        >
          <ReactPlayer 
            url='https://www.youtube.com/watch?v=y0CRWAz09r8&t=60s' 
            playing={true}
            muted={true}
            width="540px"
            loop={true}
            youtubeConfig={{ playerVars: { controls: 0 } }}
            />
      </Modal>
    )
  }

  render() {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    return (
      <div className="App">
        {this.renderStartupScreen()}
        {this.renderShutdownScreen()}

        {this.renderWelcomeAlert()}
        {this.renderResumePDF()}
        {this.renderWhyModal()}
        {this.renderNotepad()}
        {this.renderStartMenu()}
        {this.renderMyComputer()}
        {this.renderDocuments()}
        {this.renderRecycleBin()}

        {this.renderControlPanel()}
        {this.renderControlPanelAlert()}
        {this.renderWelcomeVideo()}

        <IconList>
          <IconBox onDoubleClick={() => this.setState({isMyComputerOpen: !this.state.isMyComputerOpen})}>
            <Icon name="computer" />
            My Computer
          </IconBox>
          {/* <IconBox>
            <Icon name="earth" />
            The Internet
          </IconBox>
           */}
          <IconBox onDoubleClick={() => this.setState({isWhyModalOpen: !this.state.isWhyModalOpen})}>
            <Icon name="file_text" />
            Why.txt
          </IconBox>
          <IconBox onDoubleClick={() => this.setState({isNotepadOpen: !this.state.isNotepadOpen})}>
            <Icon name="notepad" />
            NotePad
          </IconBox>
          <IconBox>
            <Icon name="cd_music" />
            Music
          </IconBox>
          <IconBox onDoubleClick={() => this.setState({isResumePDFOpen: !this.state.isResumePDFOpen})}>
            <Icon name="wordpad" />
            Resume.pdf
          </IconBox>
          <IconBox onDoubleClick={() => this.setState({isRecycleBinOpen: !this.state.isRecycleBinOpen})}>
            <Icon name="recycle_full" />
            Recycle Bin
          </IconBox>
        </IconList>

        <Footer>
          <span className="split-footer">
            <StartBtn onClick={() => this.setState({isStartMenuOpen: !this.state.isStartMenuOpen})}>
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
    );
  }
}

export default App;
