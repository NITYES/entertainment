import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Movie, SearchOutlined, Tv, Whatshot } from '@material-ui/icons';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  root: {
    width: "100%",
    position:"fixed",
    bottom:"0px",
    zIndex:"100",
    backgroundColor:"#2d313a",
    color:"#fff"
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history=useHistory();
  useEffect(()=>{
             if(value===0) history.push('/')
             else if(value===1){
            history.push('/movie')
             }else if(value===2){
               history.push('/tv')
             }else if(value===3){
               history.push('/search')
             }
  },[value,history])

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction  style={{color:"white"}} label="Trending" icon={<Whatshot />} />
      <BottomNavigationAction style={{color:"white"}}  label="Movie" icon={<Movie />} />
      <BottomNavigationAction  style={{color:"white"}}  label="TV" icon={<Tv />} />
      <BottomNavigationAction style={{color:"white"}}  label="Search" icon={<SearchOutlined/>} />

    </BottomNavigation>
  );
}
