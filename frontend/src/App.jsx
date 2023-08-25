import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserRegistration from './components/UserRegistration';
import UserLogin from './components/UserLogin';
import UserProfile from './components/UserProfile';

function App() {
    return (
        <Router>
            <div className="App">
                <h1>UbiSec Trains</h1>
                <Switch>
                    <Route path="/register" component={UserRegistration} />
                    <Route path="/login" component={UserLogin} />
                    <Route path="/profile" component={UserProfile} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
