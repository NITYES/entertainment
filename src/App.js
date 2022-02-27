import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import SimpleBottomNavigation from './components/bottomNavigation/BottomNavbar';
import Header from './components/header/Header';
import Movie from './pages/Movie/Movie';
import Search from './pages/Search/Search';
import Trending from './pages/Trending/Trending';
import TV from './pages/TV/TV';

function App() {
  return (
    <BrowserRouter>
    <Header />
    <div className="app">
       <Container>
         <Switch>
            <Route path="/" exact component={Trending } />
            <Route path="/movie" component={Movie } />
            <Route path="/tv" component={TV } />
            <Route path="/search" component={Search} />
         </Switch>
       </Container>
    </div>
    <SimpleBottomNavigation />
    </BrowserRouter>  );
}

export default App;
