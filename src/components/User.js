import React, {useEffect, useState} from 'react'
import {
  LinearProgress,
  ListItem,
  Avatar,
  Typography,
  ListItemText,
  Paper,
  Divider,
} from '@material-ui/core'
import '../styles/User.css';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const User = (props) => {
  const [user, setUser] = useState(null)
  const [repos, setRepos] = useState(null)
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    connectToUsersAPI()
    connectToReposAPI()
  }, [])

  const connectToReposAPI = async() => {
    const response = await fetch(`https://api.github.com/users/${props.match.params.username}/repos`)
    const data = await response.json()
    if(!response.ok){
      alert("An error has ocurred")
      console.log(data.errors)
      /*
        Code to handle error 
        ...
      */
      return
    }
    setRepos(data)
  }

  const connectToUsersAPI = async() => {
    const response = await fetch(`https://api.github.com/users/${props.match.params.username}`)
    const data = await response.json()
    if(!response.ok){
      alert("An error has ocurred")
      console.log(data.errors)
      /*
        Code to handle error 
        ...
      */
      return
    }
    setUser(data)
  }

  if(!user){
    return(
      <LinearProgress />
    )
  }

  return (
    <div className="container">
      <div className="results">
        <Paper elevation={5}>
          <div className="paperContainer">
            <div className="divFlex">
              <Avatar 
                style={{width:"150pt",height:"150pt"}} 
                alt={user.login} 
                src={user.avatar_url} 
              />
              <Typography 
                style={{marginTop:'30pt',marginLeft:'10pt',marginBottom:'20pt'}} 
                variant="h4"
              >
              {user.name? user.name : user.login}
              </Typography>
            </div>
            <div className="divFlex2">
              <Typography variant="button">
              {`Followers: ${user.followers}`}
              </Typography>
              <Divider style={{margin:'20pt'}} orientation="vertical"/>
              <Typography variant="button">{`Following: ${user.following}`}</Typography>
            </div>
            <div>
                {
                  user.company?
                  (<Typography>
                    {`Company: ${user.company}`}
                  </Typography>)
                  :
                  (<Typography style={{fontStyle: 'italic', color: 'gray'}}>
                    There's not company to show
                  </Typography>)
                }    
            </div>
            <div className="infoContainer">
              {
                user.bio?
                (<Typography variant="subtitle">
                  {user.bio}
                </Typography>) 
                :
                (<Typography  
                  variant="subtitle" 
                  style={{fontStyle: 'italic', color: 'gray'}}
                  >
                There's not Bio to show
                </Typography>) 
              }
            </div>
          </div>
          <div className="repos">
            <ListItem button onClick={handleClick}>
                <ListItemText>
                  <Typography variant="button">
                    {open ? "Hide repositories" : "Show repositories"}
                  </Typography>
                </ListItemText>
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                {
                  repos?
                  (
                    repos.map(item => (
                      <div>
                        <ListItem key={repos.id}>
                          <ListItemText
                            style={{margin:'5pt', justifyContent:'center'}} 
                            primary={item.name} 
                          />
                        </ListItem>
                        <Divider style={{margin:'10pt'}}/>
                      </div>
                    ))
                  )
                  :
                  <Typography style={{fontStyle:'italic', color: 'gray'}}>
                    There's not repos to show
                  </Typography>
                }
              </Collapse>
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default User
