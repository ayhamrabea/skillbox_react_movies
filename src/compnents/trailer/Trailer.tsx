import { Loader } from "../loader/Loader";
import { useState } from "react";

interface TrailerProps {
    url: string,
    onClose: () => void;
}

function extractYouTubeId(url: string): string | null {
    const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : null;
}

export const Trailer = ({ url , onClose }: TrailerProps) => {
    const videoId = extractYouTubeId(url);
    const [isLoading, setIsLoading] = useState(true);

    if (!videoId) return null;

    return (
        <div className="trailer">
            <div className="container">
                <div className="trailer__box">
            {isLoading && <Loader />}
                <iframe
                height={540}
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    onLoad={() => setIsLoading(false)}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ display: isLoading ? "none" : "block" }}
                ></iframe>
                <button className="trailer__close" type="button" onClick={onClose} style={{ display: isLoading ? "none" : "block" }}>
                    <svg className="trailer__close-icon" width="24" height="24" aria-hidden="true">
                        <use xlinkHref="/vite.svg#icon-close" />
                    </svg>
                </button>
                </div>
            </div>
            
        </div>
    );
};