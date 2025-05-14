import { Button } from "../button/Button";
import Icon from "../icon/Icon";
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
            <div className="container" onClick={e => e.stopPropagation()}>
                <div className="trailer__content">
                    <Button className="trailer__close" type="button" onClick={onClose}>
                        <Icon className="trailer__close-icon" name="close" />
                    </Button>
                    <div className="trailer__box">
                        {isLoading && <Loader />}
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title="YouTube video player"
                            frameBorder="0"
                            onLoad={() => setIsLoading(false)}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ display: isLoading ? "none" : "block" }}>
                        </iframe>
                    </div>
                </div>
            </div>
            
        </div>
    );
};