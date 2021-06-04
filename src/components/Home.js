import React, { useState } from "react"
import InputBase from '@material-ui/core/InputBase'
import "../styles/Home.css"
import SearchIcon from '@material-ui/icons/Search'
import { 
  ListItem, 
  List, 
  ListItemText, 
  Divider, 
  Avatar, 
  ListItemAvatar,
  IconButton,
  Paper,
  Typography,
  LinearProgress
} from "@material-ui/core"
import { Link } from 'react-router-dom';

const Home = () => {

  const [username, setUsername] = useState("")
  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(false)

  

  const connectAPI = async () => {
    setLoading(true)
    const response = await fetch(`https://api.github.com/search/users?q=${username}`)
    const data = await response.json()
    if(!response.ok){
      setUsers(null)
      alert("An error has ocurred")
      console.log(data.errors)
      /*
        Code to handle error 
        ...
      */
      setLoading(false)
      return
    }
    if(data.total_count > 0) setUsers(data.items)
    else setUsers(null)
    setLoading(false)
  }

  const handleClick = () => {
    console.log("click")
  }

  const renderList = () => {
    return (
      <Paper>
        <List>
          {
            users.map(item => (
              <Link 
                to={`/${item.login}`} 
                style={{ color: 'inherit', textDecoration: 'inherit'}}
              >
                <ListItem 
                  key={item.id}
                  button style={{display:"inline-flex"}} 
                  onClick={handleClick}
                >
                <ListItemAvatar style={{display:"flex", marginTop:'5pt'}} >
                    <Avatar alt={item.login} src={item.avatar_url} />
                  </ListItemAvatar>
                  <Divider orientation="vertical" flexItem/>
                  <ListItemText 
                    style={{margin:'5pt', justifyContent:'center'}} 
                    primary={item.login} 
                  />
                </ListItem>
                <Divider style={{margin:'10pt'}}/>
              </Link>
            ))
          }
        </List>
      </Paper>
    )
  }

  if(loading) {
    return(
      <LinearProgress />
    )
  }

  return (
    <div className="container">
      <div className="searchBar">
        <Paper component="form" elevation={5}>
          <div style={{display:"inline-flex", margin:'5pt'}}/>
          <InputBase
            placeholder="Search Users"
            inputProps={{ 'aria-label': 'buscar usuarios' }}
            onChange={e => setUsername(e.target.value)}
          />
          <IconButton aria-label="search" onClick={connectAPI}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>

      <div className="Results">
        
        {
          users ? 
          renderList() :
          <Typography style={{color: '#AAA6CA'}}>
            Users will appear below, just type an existing username and click on the search button.
          </Typography>
        }
      </div>
    </div>
  );
};

export default Home;
