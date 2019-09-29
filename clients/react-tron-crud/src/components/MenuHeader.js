import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Container, Icon, Image, Label, Menu, Visibility } from 'semantic-ui-react';

class MenuHeader extends Component {
  state = {
    menuFixed: false
  };

  renderCurrentNetLabel = (currentNet) => {
    const color = currentNet !== 'N/A' ? 'blue' : 'grey';
    const iconName = currentNet !== 'N/A' ? 'signal' : 'times';
    return (
      <Fragment>
        <Label color={ color }>
          <Icon name={ iconName }/>
          { currentNet }
        </Label>
      </Fragment>
    );
  }

  render() {
    const { menuFixed } = this.state;

    return (
      <div>
        <Visibility
            onBottomPassed={ _ => this.setState({ menuFixed: true })}
            onBottomVisible={ _ => this.setState({ menuFixed: false })}
            once={ false }      
        >
          <Menu 
            borderless
            fixed={ menuFixed ? 'top' : undefined }
            style={ menuFixed ? styles.fixedMenu : styles.menu }
          >
            <Container text>
              <Menu.Item><Image size='mini' src='https://ipfs.io/ipfs/QmRrkjush8eXoqNtZwXtMSotEDtbs76cRXiGcnyEnvGw9c'/></Menu.Item>
              <Menu.Item header>Tron CRUD Demo</Menu.Item>
              <Menu.Item link>Inventory</Menu.Item>
              <Menu.Menu position='right'>
                <Menu.Item>
                  { this.renderCurrentNetLabel(this.props.currentNet) }
                </Menu.Item>
              </Menu.Menu>
            </Container>          
          </Menu>
        </Visibility>
      </div>
    )
  }
}

const styles = {
  menu: {
    backgroundColor: '#fff',
    border: 'none',
    borderRadius: 0,
    boxShadow: 'none',
    marginBottom: '1em',
    transition: 'box-shadow 0.5s ease, padding 0.5s ease',    
  },
  fixedMenu: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',    
  }
};

function mapStateToProps({ tron }) {
  return {
    currentNet: tron.currentNet
  };
}

export default connect(mapStateToProps)(MenuHeader);
