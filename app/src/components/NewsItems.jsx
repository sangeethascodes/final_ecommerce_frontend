import React, { Component } from 'react'

export default class NewsItems extends Component {
    render() {
        let { title, description, author, url, LinkUrl, date, source } = this.props
        return (
            <div className='container mt-4'>
                <div className='card'>
                    <img src={url} alt="not found" className='card-mg-top' />

                    <div className="card-body">
                        <span className='badge rounded-pill bg-danger text-light'
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                position: "absolute",
                                right: "0px",
                                top: "0px",
                            }}
                        >{source}</span>
                        <h5 className='card-title text-success'>{title}...</h5>
                        <p className='card-text'>{description ? description : "No description"}</p>
                        <p>By: {author ? author : "Anonymous"}</p>
                        <hr />
                        <p>Published At: {date}</p>
                        <a href={LinkUrl || "#"} className='btn btn-danger' target="_blank" rel="noreferrer">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}