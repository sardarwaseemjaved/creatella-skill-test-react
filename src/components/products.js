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
                                    <div className="d-flex justify-content-center h-40">
                                        <p className=" mx-auto" style={{ fontSize: item.size + 'px' }}>{item.face}</p>
                                    </div>
                                    <div className="card-body">
                                        {/* <h5 className="card-title App">{convertPrice(item.price)}</h5> */}
                                        <p class="text-muted">{item.id}</p>
                                        <div className="row">
                                            <div className="col">
                                                <p class="text-muted">Price:<strong>{convertPrice(item.price)}</strong></p>
                                            </div>
                                            <div className="col">
                                                <p class="text-muted">Size:<strong>{item.size}</strong></p>
                                            </div>
                                        </div>
                                        <p className="card-text"><small class="text-muted">{calculateDaysAgo(item.date)}</small></p>
                                    </div>
                                    <button class="btn card-footer">
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