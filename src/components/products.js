import React from 'react';
import { date_to_dd_Mon_yr, calculateDaysAgo } from '../utils/date';
export default function ({ dataArray = [], adList = [] }) {
    let adNo = 0;
    return (
        <section id="content" >
            {
                dataArray.map((item, index) => {
                    let showAd = false
                    if ((index + 1) % 20 === 0) {
                        adNo = adNo + 1 //adList[0] is sponsor ad so we'll skip that
                        showAd = true;
                    }
                    else {
                        showAd = false;
                    }
                    return (
                        <div> 
                            {
                                showAd && adList.length && adList[adNo] ?
                                    <img src={adList[adNo]}></img>
                                    : null
                            }
                            <div id="single-product" key={index} >
                                <p style={{ fontSize: item.size + 'px' }}>{item.face}</p>
                                <div>
                                    <p>Product ID:{item.id}</p>
                                    <p>Index:{index}</p>
                                    <p>Price:{item.size}</p>
                                    <p>Date:{calculateDaysAgo(item.date)}</p>
                                    <p>Size:{item.size}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </section>
    )
}