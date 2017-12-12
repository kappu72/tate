import React from 'react';

const UserDetails = ({user = {}, hideDetail = () => {}}) => {

    return (<div>
                <button onClick={hideDetail}>List</button>
                <ul>
                    <li>{user.name} {user.surname}</li>
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    Payments:
                    <li>{(user.PaymentMethods || []).map((p, idx)=> (<ul key={idx}>
                        <li>{p.type} {p.currency}</li>
                        </ul>))}
                    </li>
                </ul>
            </div>);
};

export default UserDetails;
