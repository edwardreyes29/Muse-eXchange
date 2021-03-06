import React, { useState, useEffect } from 'react';
import { Container, Modal, Form, Image, ListGroup, Row, Col, Tabs, Tab, Jumbotron } from 'react-bootstrap';

// Components
import Sidebar from '../components/Account/Sidebar';
import BasicInfo from '../components/Account/BasicInfo';
import Songs from '../components/Account/Songs';
import Tutorials from '../components/Account/Tutorials';
// API
import API from '../utils/API';

import {
  Box,
  Button,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  TextField,
  makeStyles
} from '@material-ui/core';

import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

require('dotenv').config();


const styles = {
  h2: {
    fontSize: '20px',
    fontWeight: 700
  },
  h3: {
    fontSize: '16px',
    fontWeight: 600
  }
}

const AccountPage = () => {

  /** ===== User Profile Info ====== */
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [submit, setSubmit] = useState(1);

  // Profile 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [about, setAbout] = useState('');
  const [instruments, setInstruments] = useState('');
  const [links, setLinks] = useState('');
  const [songs, setSongs] = useState('');
  const [tutorials, setTutorials] = useState('');


  const [profession, setProfession] = useState('');
  const [link1, setLink1] = useState('');
  const [link2, setLink2] = useState('');
  const [link3, setLink3] = useState('');
  const [link4, setLink4] = useState('');

  // To handle profile info input 
  const [infoInput, setInfoInput] = useState('');

  const inputChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setInfoInput({ ...value, [name]: value })

    console.log(infoInput)
  }

  useEffect(() => {
    window.scrollTo(0, 0);

    document.title = `Music eXchange | Account`;
    if (localStorage.getItem("currentUser")) {
      const userObj = JSON.parse(localStorage.getItem("currentUser"));
      setUserId(JSON.parse(localStorage.getItem("currentUser")))
      setUserId(userObj._id)
    }
    // For demonstration purposes, we mock an API call.
    API.getSavedUsersById(userId).then((res) => {
      console.log(res.data.profile.songs)
      if (res.data) {
        setUsername(res.data.username);
        setEmail(res.data.email);
        setFirstName(res.data.profile.firstName);
        setLastName(res.data.profile.lastName);
        setProfession(res.data.profile.profession)
        setAbout(res.data.profile.about);
        setLink1(res.data.profile.link1);
        setLink2(res.data.profile.link2);
        setLink3(res.data.profile.link3);
        setLink4(res.data.profile.link4);
        setProfilePic(res.data.profile.profilePic);
        setInstruments(res.data.profile.instruments);
        setLinks(res.data.profile.links);
        setSongs(res.data.profile.songs);
        setTutorials(res.data.profile.tutorials)
      }
    });
  }, [submit, userId]);

  // Upload Profile Information
  const handleSubmit = async () => {
    if (infoInput.firstNameInput) await API.updateProfile(userId, "firstName", infoInput.firstNameInput);
    if (infoInput.lastNameInput) await API.updateProfile(userId, "lastName", infoInput.lastNameInput);
    if (infoInput.professionInput) await API.updateProfile(userId, "profession", infoInput.professionInput);
    if (infoInput.aboutInput) await API.updateProfile(userId, "about", infoInput.aboutInput);
    if (infoInput.link1Input) await API.updateProfile(userId, "link1", infoInput.link1Input);
    if (infoInput.link2Input) await API.updateProfile(userId, "link2", infoInput.link2Input);
    if (infoInput.link3Input) await API.updateProfile(userId, "link3", infoInput.link3Input);
    if (infoInput.link4Input) await API.updateProfile(userId, "link4", infoInput.link4Input);
  }

  return (<>
    <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
      <Row style={{ height: '100%', width: '100%', fontFamily: 'Kumbh Sans, sans-serif' }}>
        <Col xs={12} md={2} className='d-none d-xs-block d-sm-block d-md-block p-0 border-right' style={{ background: '#F8F8F8' }} >
          <Sidebar
            profilePic={profilePic}
            firstName={firstName}
            lastName={lastName}
          />
        </Col>
        <Col xs={12} md={10} className='p-0' style={{ height: '100%' }}>
          <Tab.Content style={{ height: '100%' }}>
            <Tab.Pane eventKey="profile" style={{ height: '100%' }}>

              <Jumbotron fluid className='p-2 mb-0 border-bottom' style={{ background: '#fff' }}>
                <Container fluid>
                  <h1 className='mt-2' style={{ fontSize: '30px', fontWeight: 700 }}>Profile Customization</h1>
                  {/* <h2 className='mt-2' style={styles.h2}>Channel name, branding, and description</h2> */}
                </Container>
              </Jumbotron>

              <Row style={{ height: '100%', overflow: 'auto' }}>
                <Col xs={12} md={9}>
                  <BasicInfo
                    userId={userId}
                    submit={submit}
                    setSubmit={setSubmit}
                    currentFirstName={firstName}
                    currentLastName={lastName}
                    profilePic={profilePic}
                    currentAbout={about}
                    currentInstruments={instruments}
                    currentLinks={links}
                  />
                  <div style={{ height: '25vh' }}></div>
                  <div className='d-block d-sm-none' style={{ height: '50vh' }}></div>
                </Col>
                <Col xs={12} md={3}></Col>
              </Row>

            </Tab.Pane>
            <Tab.Pane eventKey="songs" style={{ height: '100%', overflow: 'auto' }}>
              <Jumbotron fluid className='p-2 mb-0 border-bottom' style={{ background: '#fff' }}>
                <Container fluid>
                  <h1 className='mt-2' style={{ fontSize: '30px', fontWeight: 700 }}>Songs</h1>
                  {/* <h2 className='mt-2' style={styles.h2}>Channel name, branding, and description</h2> */}
                </Container>
              </Jumbotron>
              <Songs
                userId={userId}
                profilePic={profilePic}
                songIds={songs}
                submit={submit}
                setSubmit={setSubmit}
              />

            </Tab.Pane>
            <Tab.Pane eventKey="tutorials" style={{ height: '100%', overflow: 'auto' }}>
              <Jumbotron fluid className='p-2 mb-0 border-bottom' style={{ background: '#fff' }}>
                <Container fluid>
                  <h1 className='mt-2' style={{ fontSize: '30px', fontWeight: 700 }}>Tutorials</h1>
                </Container>
              </Jumbotron>
              <Tutorials 
                userId={userId}
                submit={submit}
                tutorialIds={tutorials}
                setSubmit={setSubmit}
              />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  </>)
}

export default AccountPage;