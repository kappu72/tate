import React from 'react';

const UserItem = ({username, id, email, payment, onSelectUser}) => {
    const selectUser = () => onSelectUser(id);
    return (<li>{`${id} ${email} ${username}  ${payment && payment.name || ''}`} <button onClick={selectUser}>Detail</button></li>);
};

export default UserItem;
