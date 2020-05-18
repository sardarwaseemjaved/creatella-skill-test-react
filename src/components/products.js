import React, { Fragment } from 'react';
import { calculateDaysAgo } from '../utils/date';
import { convertPrice } from '../utils/price';
export default function ({ dataArray = [], adList = [] }) {
    let adNo = 0;
    return (
        <section id="content" className="display-inline-block pl-0 pr-0 card-deck">
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
                        <Fragment>
                            <div className={"col-sm-4 mb-2 mt-2"} id="single-product"  >
                                <div className="card h-100">
                                    {/* <div class="fixed-top">
                                        <h3>{convertPrice(item.price)}</h3>
                                    </div> */}
                                    <sup><span class="badge badge-secondary"><h3>{convertPrice(item.price)}</h3></span></sup>
                                    <div className="d-flex justify-content-center">
                                        <p className=" mx-auto" style={{ fontSize: item.size + 'px' }}>{item.face}</p>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col h-auto d-inline-block">
                                                <p className="text-muted mx-auto"><strong>{item.id}</strong></p>
                                            </div>
                                            {/* <div className="col">
                                                <h2>{convertPrice(item.price)}</h2>
                                            </div> */}
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <strong>Size</strong>
                                                <p>{item.size}</p>
                                            </div>
                                            <div className="col">
                                                <strong>Posted</strong>
                                                <p >{calculateDaysAgo(item.date)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn card-footer">
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                            {
                                showAd && adList.length && adList[adNo] ?
                                    <div className={"w-100 d-flex justify-content-center bg-secondary"}>
                                        <img className="img-responsive" alt={"adver" + index} src={adList[adNo]}></img>
                                    </div>
                                    : null
                            }
                        </Fragment>
                    )
                })
            }
        </section>
    )
}