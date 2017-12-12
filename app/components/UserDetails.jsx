import React from 'react';

const UserDetails = ({user = {}, hideDetail = () => {}}) => {

    return (<div>
                <div className="list-bar"><button onClick={hideDetail}>List</button></div>
                <ul className="users-list" >
                    <li>
                        <label>Name surname <span>{user.name} {user.surname}</span></label>
                        <label>Username <span>{user.username}</span></label>
                        <label>Email <span>{user.email}</span></label>
                        <label>Payments:
                        {(user.PaymentMethods || []).map((p, idx)=> (
                        <label key={idx}><span >{p.type} {p.currency}</span></label>
                        ))}
                        </label>
                    </li>
                </ul>
            </div>);
};

export default UserDetails;
