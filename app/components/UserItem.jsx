import React from 'react';

const UserItem = ({username, id, email, payment, onSelectUser}) => {
    const selectUser = () => onSelectUser(id);
    return (<li onClick={selectUser}>
            <label>Id <span>{id}</span></label>
            <label>Email <span>{email}</span></label>
            <label>Username <span>{username}</span></label>
            <label>Default payment<span>{payment && payment.name || ''}</span></label>
        </li>);
};

export default UserItem;
