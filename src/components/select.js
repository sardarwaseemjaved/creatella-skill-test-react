import React from 'react';
export default function Select({ onChange = () => { }, value, dataArray = [] }) {
    return (
        <select className="form-control form-control-sm" value={value} onChange={onChange} id="sort-by">
            {
                dataArray.map(type => <option value={type}>{type}</option>)
            }
        </select>
    )
}