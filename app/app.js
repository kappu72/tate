import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {compose} from 'recompose';
import UsersList from './components/UsersList';
import UserDetails from './components/UserDetails';
import appEnhancer from './enhancers.js'

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
        return [(<input key="searchfield" type="text" placeholder="Search by email" value={search || ''} onChange={(evt) => onInputChange(evt.target.value)} />),
                <UsersList key="userList" users={users} page={page} showDetail={showDetail}/>,
                    (<span key="pagination">
                    <button disabled={page === 1} onClick={() => getPage(page - 1)}>{"<"}</button>
                    Page: {page}
                    <button disabled={users.length < 50 } onClick={() => getPage(page + 1)}>{">"}</button>
                    </span>)]
    }
    renderUserDetail = () => {
        const {user, hideDetail} = this.props;
        return (<UserDetails user={user} hideDetail={hideDetail}/>);
    }
    render() {
        const {user} = this.props;
        return <div>
                {user && this.renderUserDetail() || this.renderList()}
                </div>
    }
}
const EnApp =  appEnhancer(App);
ReactDOM.render(<EnApp/>, document.getElementById('tate'));