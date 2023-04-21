import React from 'react';
import './video.sass'
const Video = () => {
        const isLoggedIn = localStorage.getItem("isLoggedIn")

    document.body.oncontextmenu = function (e) {
        return false;
    };

    return (
        <div className="vd-main">
            {isLoggedIn
            ?
                <video
                    id="video"
                    src={`http://185.130.44.124:8000/streaming/stream/?path=sample-5s.mp4`}
                    className="video"
                    controls
                    muted
                    preload="true"
                    autoPlay={false}>
                </video>

            : "эу ты чето попутал тебе сюда нельзя братан"
            }
        </div>
    );
};

export default Video;
