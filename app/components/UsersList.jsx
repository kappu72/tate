import React from 'react';


import UserItem from './UserItem';

const getPayment = (payments = []) => payments.filter(p => p.default).pop();

const UsersList = ({users = [], showDetail = () => {}}) => {
    return (<ul className="users-list">
            {users.map(({username, id, email, PaymentMethods}) => <UserItem
                key={id}
                username={username}
                id={id}
                email={email}
                payment={getPayment(PaymentMethods)}
                onSelectUser={showDetail}
            />)}
        </ul>);
};

export default UsersList;
