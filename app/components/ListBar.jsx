import React from 'react';

const ListBar = ({page, getPage, search, onInputChange, users}) => {
    return (<div className="list-bar">
                <span className="pagination">
                    <button disabled={page === 1} onClick={() => getPage(page - 1)}>{"<"}</button>
                    <span className="pages">Page: {page}</span>
                    <button disabled={users < 50}onClick={() => getPage(page + 1)}>{">"}</button>
                </span>
                <input type="text" placeholder="Search by email" value={search || ''} onChange={(evt) => onInputChange(evt.target.value)} />
            </div>);
};

export default ListBar;
