import React from 'react';
import ReactPlayer from 'react-player'
import styled from 'styled-components';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import './App.css';

import Icon from './components/Icon';
import Alert from './components/Alert';
import List from './components/List';
import Modal from './components/Modal';
import TextArea from './components/TextArea';
import Footer from './components/Footer';

import resumePdf from './resume.pdf'
import clouds from "./windows-95-clouds.jpg";
import shutdown from "./shutdown.jpg"
import logo from "./windows-95-logo.png";

// TODO: enums to alerts to open

const CoverBackground = styled.img`
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
  min-width: 25vw;
  z-index: 100000000000;
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
      isStartMenuOpen: true,
      isNotepadOpen: true,
      isWelcomeAlertOpen: true,
      isWelcomeVideoOpen: true,
      isResumePDFOpen: true,
      isWhyModalOpen: true,
      isMyComputerOpen: true,
      isControlPanelOpen: true,
      isControlPanelAlertOpen: true,
      isAwfulExperienceVideoOpen: true,
      isDocumentsOpen: true,
      isLiarPngOpen: true,
      isFloppyAlertOpen: true,
      isCDriveAlertOpen: true,
      isDDriveAlertOpen: true,
      isDialUpAlertOpen: true,
      isPrintersAlertOpen: true,
      notepadTextValue: "",
      startingUp: true,
      shuttingDown: false,
      // ex. [isNotePadOpen, isDocumentsOpen, ...], front of stack is highest z-index and on top visually
      modalPriorityStack: ["isWelcomeAlertOpen","isWelcomeVideoOpen"],
    }
  }

  componentDidMount() {
    this.setState({
      isStartMenuOpen: false,
      isNotepadOpen: false,
      isControlPanelAlertOpen: false,
      isAwfulExperienceVideoOpen: false,
      isResumePDFOpen: false,
      isWhyModalOpen: false,
      isMyComputerOpen:false,
      isDocumentsOpen: false,
      isControlPanelOpen: false,
      isLiarPngOpen: false,
      isFloppyAlertOpen: false,
      isCDriveAlertOpen: false,
      isDDriveAlertOpen: false,
      isDialUpAlertOpen: false,
      isPrintersAlertOpen: false,
    })
    setInterval(
      () => this.setState({startingUp: false}),
      3000
    );
  }

  updateModal(modalType, val) {
    let newModalPriorityStack = this.state.modalPriorityStack;
    if (val) {
      // add to stack
      if (this.state.modalPriorityStack.includes(modalType)) {
        // bring new modal to front
        newModalPriorityStack = newModalPriorityStack.filter(modal => modal !== modalType);
        newModalPriorityStack.unshift(modalType);
      } else {
        // add new modal to head
        newModalPriorityStack.unshift(modalType);
      }
    } else {
      // remove modal from stack
      newModalPriorityStack = newModalPriorityStack.filter(modal => modal !== modalType)
    }
    this.setState({
      [modalType]: val,
      modalPriorityStack: newModalPriorityStack,
    })
  }

  handleChange(val) {
    this.setState({
      notepadTextValue: val,
    })
  }

  getModalPriority(modalType) {
    let modalIndex = this.state.modalPriorityStack.indexOf(modalType)
    if (modalIndex !== -1) {
      return 1000 * (this.state.modalPriorityStack.length - modalIndex)
    }
    return 0
  }

  closeModal(event, modalType) {
    event.preventDefault();
    event.stopPropagation();
    this.updateModal(modalType, false);
  }

  renderWelcomeAlert() {
    if (!this.state.isWelcomeAlertOpen) return;
    return <Alert 
      title="Welcome" 
      type="info" 
      message="Hi my name is Stefan and yes this is my personal site. Have fun exploring!" 
      closeAlert={() => this.updateModal("isWelcomeAlertOpen", false)}
      priority={this.getModalPriority("isWelcomeAlertOpen")}
      onClickHandler={() => this.updateModal("isWelcomeAlertOpen", true)}
      closeAlert={(e) => this.closeModal(e, "isWelcomeAlertOpen")}
      >
      Click me!
      </Alert>;
  }

  renderControlPanelAlert() {
    if (!this.state.isControlPanelAlertOpen) return;
    return <Alert 
      title="Error" 
      type="error" 
      message="Yeah, like I said, this does nothing" 
      closeAlert={() => this.updateModal("isControlPanelAlertOpen", false)}
      priority={this.getModalPriority("isControlPanelAlertOpen")}
      onClickHandler={() => this.updateModal("isControlPanelAlertOpen", true)}
      closeAlert={(e) => this.closeModal(e, "isControlPanelAlertOpen")}
      >
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
          onClick={() => this.updateModal("isDocumentsOpen", true)}
          >
          Documents
        </List.Item>
        <List.Item icon="settings">
          <List>
            <List.Item 
              icon="folder_settings" 
              onClick={() => this.updateModal("isControlPanelOpen", true)}>
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
        closeModal={(e) => this.closeModal(e, "isNotepadOpen")}
        // buttons={[
        //   { value: 'Ok', onClick: () => {} },
        //   { value: 'Cancel', onClick: () => {} },
        // ]}
        height={250}
        priority={this.getModalPriority("isNotepadOpen")}
        onClickHandler={() => this.updateModal("isNotepadOpen", true)}
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
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    return (
      <Modal
        icon="wordpad"
        title="Resume.pdf"
        closeModal={(e) => this.closeModal(e, "isResumePDFOpen")}
        // buttons={[
        //   { value: 'Ok', onClick: () => {} },
        //   { value: 'Cancel', onClick: () => {} },
        // ]}
        height="585"
        width="440"
        priority={this.getModalPriority("isResumePDFOpen")}
        onClickHandler={() => this.updateModal("isResumePDFOpen", true)}
        >
        <Document file={resumePdf}> <Page scale={0.7} pageNumber={1} />  </Document>
      </Modal>
    )
  }

  renderWhyModal() {
    if (!this.state.isWhyModalOpen) return;
    return (
      <Modal
        icon="file_text"
        title="Why.txt"
        closeModal={(e) => this.closeModal(e, "isWhyModalOpen")}
        buttons={[
          { value: 'Ok Thanks', onClick: (e) => this.closeModal(e, "isWhyModalOpen")},
        ]}
        height="500"
        width="430"
        priority={this.getModalPriority("isWhyModalOpen")}
        onClickHandler={() => this.updateModal("isWhyModalOpen", true)}
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

  renderErrorAlert(message, stateToUpdate) {
    if (!this.state[stateToUpdate]) return;
    return (
      <Alert 
        title="Error" 
        type="error" 
        message={message} 
        closeAlert={() => this.updateModal(stateToUpdate, false)}
        priority={this.getModalPriority(stateToUpdate)}
        onClickHandler={() => this.updateModal(stateToUpdate, true)}
        closeAlert={(e) => this.closeModal(e, stateToUpdate)}
        />
    )
  }

  renderMyComputer() {
    if (!this.state.isMyComputerOpen) return;
    const myComputerIconList = [
      {
        title: "Floppy (A:)",
        iconName: "reader_disket2",
        stateToUpdate: "isFloppyAlertOpen",
      },
      {
        title: "(C:)",
        iconName: "reader_closed",
        stateToUpdate: "isCDriveAlertOpen",
      },
      {
        title: "New (D:)",
        iconName: "reader_cd",
        stateToUpdate: "isDDriveAlertOpen",
      },
      {
        title: "Dial-Up",
        iconName: "folder_shared",
        stateToUpdate: "isDialUpAlertOpen",
      },
      {
        title: "Control Panel",
        iconName: "folder_settings",
        stateToUpdate: "isControlPanelOpen",
      },
      {
        title: "Printers",
        iconName: "folder_print",
        stateToUpdate: "isPrintersAlertOpen",
      },
      {
        title: "Documents",
        iconName: "folder_open",
        stateToUpdate: "isDocumentsOpen",
      },
    ]
    return (
      <Modal
        icon="computer"
        title="My Computer"
        closeModal={(e) => this.closeModal(e, "isMyComputerOpen")}
        height="400"
        width="500"
        priority={this.getModalPriority("isMyComputerOpen")}
        onClickHandler={() => this.updateModal("isMyComputerOpen", true)}
        menu={[
          {
            name: 'File',
            list: (
              <List>
                <List.Item onClick={(e) => this.closeModal(e, "isMyComputerOpen")}>Exit</List.Item>
              </List>
            ),
          },
          {
            name: 'Help',
            list: (
              <List>
                <List.Item>On this website you are Helpless</List.Item>
              </List>
            ),
          },
        ]}
        >
        <WhiteSpace>
          <IconListRow>
            {
              myComputerIconList.map((item) => {
                return (
                  <IconBoxMyComputer
                    onDoubleClick={() => this.updateModal(item.stateToUpdate, true)}
                    >
                    <Icon name={item.iconName} />
                    {item.title}
                  </IconBoxMyComputer>
                )
              })
            }
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
        closeModal={(e) => this.closeModal(e, "isControlPanelOpen")}
        height="400"
        width="500"
        priority={this.getModalPriority("isControlPanelOpen")}
        onClickHandler={() => this.updateModal("isControlPanelOpen", true)}
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
              onDoubleClick={() => this.updateModal("isControlPanelAlertOpen", true)}>
              <Icon name="user" />
              None
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.updateModal("isControlPanelAlertOpen", true)}>
              <Icon name="window_graph" />
              Of
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.updateModal("isControlPanelAlertOpen", true)}>
              <Icon name="tree" />
              These
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.updateModal("isControlPanelAlertOpen", true)}>
              <Icon name="signup" />
              Do
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.updateModal("isControlPanelAlertOpen", true)}>
              <Icon name="regedit" />
              Anything
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.updateModal("isControlPanelAlertOpen", true)}>
              <Icon name="ms_dos" />
              Yet
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.updateModal("isControlPanelAlertOpen", true)}>
              <Icon name="reader_cd_2" />
              But
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.updateModal("isControlPanelAlertOpen", true)}>
              <Icon name="power_off" />
              I
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.updateModal("isControlPanelAlertOpen", true)}>
              <Icon name="power_on" />
              Think
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.updateModal("isControlPanelAlertOpen", true)}>
              <Icon name="mspaint" />
              The
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.updateModal("isControlPanelAlertOpen", true)}>
              <Icon name="keys" />
              Icons
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.updateModal("isControlPanelAlertOpen", true)}>
              <Icon name="issue" />
              Still
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.updateModal("isControlPanelAlertOpen", true)}>
              <Icon name="globe" />
              Look
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.updateModal("isControlPanelAlertOpen", true)}>
              <Icon name="defrag" />
              Pretty
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.updateModal("isControlPanelAlertOpen", true)}>
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
        closeModal={(e) => this.closeModal(e, "isDocumentsOpen")}
        height="400"
        width="500"
        priority={this.getModalPriority("isDocumentsOpen")}
        onClickHandler={() => this.updateModal("isDocumentsOpen", true)}
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
        closeModal={(e) => this.closeModal(e, "isRecycleBinOpen")}
        height="400"
        width="500"
        priority={this.getModalPriority("isRecycleBinOpen")}
        onClickHandler={() => this.updateModal("isRecycleBinOpen", true)}
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
              onDoubleClick={() => this.updateModal("isLiarPngOpen", true)}>
              <Icon name="window_graph"/>
              liar.png
            </IconBoxMyComputer>
            <IconBoxMyComputer 
              onDoubleClick={() => this.updateModal("isAwfulExperienceVideoOpen", true)}>
              <Icon name="folder" />
              bad_time.mp4
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
        closeModal={(e) => this.closeModal(e, "isWelcomeVideoOpen")}
        height="390"
        width="555"
        priority={this.getModalPriority("isWelcomeVideoOpen")}
        onClickHandler={() => this.updateModal("isWelcomeVideoOpen", true)}
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

  renderLiarPng() {
    if (!this.state.isLiarPngOpen) return;
    return (
      <Modal
        icon="window_graph"
        title="liar.png"
        closeModal={(e) => this.closeModal(e, "isLiarPngOpen")}
        height="325"
        width="400"
        priority={this.getModalPriority("isLiarPngOpen")}
        onClickHandler={() => this.updateModal("isLiarPngOpen", true)}
        >
          <img 
            src="https://i.redd.it/ti1gsbujh5n31.png"
            id="liar-png"/>
      </Modal>
    )
  }

  renderAwfulExperienceVideo() {
    if (!this.state.isAwfulExperienceVideoOpen) return;
    return (
      <Modal
        icon="window_abc"
        title="bad_time.mp4"
        closeModal={(e) => this.closeModal(e, "isAwfulExperienceVideoOpen")}
        height="390"
        width="465"
        onClickHandler={() => this.updateModal("isAwfulExperienceVideoOpen", true)}
        priority={this.getModalPriority("isAwfulExperienceVideoOpen")}
        >
          <ReactPlayer 
            url='https://www.youtube.com/watch?v=tscOUFxV3qA' 
            playing={true}
            width="450px"
            loop={true}
            youtubeConfig={{ playerVars: { controls: 0 } }}
            />
      </Modal>
    )
  }

  renderDesktopIcons() {
    const desktopIconsList = [
      {
        title: "My Computer",
        iconName: "computer",
        stateToUpdate: "isMyComputerOpen",
      },
      {
        title: "Why.txt",
        iconName: "file_text",
        stateToUpdate: "isWhyModalOpen",
      },
      // {
      //   title: "Music",
      //   iconName: "cd_music",
      //   stateToUpdate: "isMusicOpen",
      // },
      {
        title: "NotePad",
        iconName: "notepad",
        stateToUpdate: "isNotepadOpen",
      },
      {
        title: "Resume.pdf",
        iconName: "wordpad",
        stateToUpdate: "isResumePDFOpen",
      },
      {
        title: "Recycle Bin",
        iconName: "recycle_full",
        stateToUpdate: "isRecycleBinOpen",
      },
    ];
    return <IconList>
      {
        desktopIconsList.map((icon) => {
          return (
            <IconBox onDoubleClick={() => this.updateModal(icon.stateToUpdate, true)}>
              <Icon name={icon.iconName} />
              {icon.title}
            </IconBox>
          );
        })
      }
    </IconList>;
  }

  render() {
    return (
      <div className="App">
        {/* Modals rendered on load */}
        {this.renderWelcomeAlert()}
        {this.renderWelcomeVideo()}

        {/* Components rendered on load */}
        {this.renderDesktopIcons()}
        {/* TODO: put this in the footer */}
        {this.renderStartMenu()} 
        <Footer clickHandler={() => this.setState({isStartMenuOpen: !this.state.isStartMenuOpen})} />
        
        {/* Full screen images */}
        {this.renderStartupScreen()}
        {this.renderShutdownScreen()}

        {/* Modals */}
        {this.renderResumePDF()}
        {this.renderWhyModal()}
        {this.renderNotepad()}
        {this.renderMyComputer()}
        {this.renderDocuments()}
        {this.renderRecycleBin()}
        {this.renderLiarPng()}
        {this.renderAwfulExperienceVideo()}
        {this.renderControlPanel()}

        {/* Alerts */}
        {this.renderControlPanelAlert()}
        {this.renderErrorAlert("No floppy disk found", "isFloppyAlertOpen")}
        {this.renderErrorAlert("No C: drive found.", "isCDriveAlertOpen")}
        {this.renderErrorAlert("Does anyone know what a D: drive is?", "isDDriveAlertOpen")}
        {this.renderErrorAlert("This is a website. You already have internet.", "isDialUpAlertOpen")}
        {this.renderErrorAlert("No printers detected.", "isPrintersAlertOpen")}
      </div>
    );
  }
}

export default App;
