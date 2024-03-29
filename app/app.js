import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {compose} from 'recompose';
import UsersList from './components/UsersList';
import UserDetails from './components/UserDetails';
import ListBar from './components/ListBar';

import appEnhancer from './enhancers.js'
require('./app.css');
class App extends Component {
    static propTypes = {
        users: React.PropTypes.array,
        user: React.PropTypes.object,
        getPage: PropTypes.func,
        showDetail: PropTypes.func,
        hideDetail: PropTypes.func,
        onInputChange: PropTypes.func,
        search: PropTypes.string
    }
    renderItems = () => {
        return this.props.users.map(
            )
    }
    loadMore = () => {
        console.log("Load More");
    }
    renderList = () => {
        const {users, page, showDetail, getPage, onInputChange, search} = this.props;
        return [<ListBar
                    users={users.length}
                    key="listBar"
                    page={page}
                    getPage={getPage}
                    onInputChange={onInputChange}
                    search={search}/>,
                <UsersList key="userList" users={users} page={page} showDetail={showDetail}/>]
    }
    renderUserDetail = () => {
        const {user, hideDetail} = this.props;
        return (<UserDetails user={user} hideDetail={hideDetail}/>);
    }
    render() {
        const {user} = this.props;
        return <div className="app-container">
                {user && this.renderUserDetail() || this.renderList()}
                </div>
    }
}
const EnApp =  appEnhancer(App);
ReactDOM.render(<EnApp/>, document.getElementById('tate'));