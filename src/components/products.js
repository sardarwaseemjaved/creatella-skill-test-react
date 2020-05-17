import React from 'react';
export default function ({ dataArray = [] }) {
    return (
        <div>
            {
                dataArray.map((item, index) => (
                    <div key={index}>
                        <h2>{item.face}</h2>
                        <p>Price:{item.size}</p>
                        <p>date:{item.date}</p>
                        <p>Size:{item.size}</p>
                    </div>
                ))
            }
        </div>
    )
}