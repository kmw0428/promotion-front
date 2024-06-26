import React, { useEffect } from "react";
import "./RollerRink.css";

const RollerRink: React.FC = () => {
    useEffect(() => {
        document.body.classList.add("special-page");
        return () => {
            document.body.classList.remove("special-page");
        };
    }, []);

    return (
        <>
            <div className="roller-wrapper">
                <div className="roller-block">
                    <h1 className="roller-title">
                        <span className="roller-title-text">
                            <strong>응답하라 7080</strong>
                            {" 추억의 롤러장"}
                        </span>
                    </h1>
                </div>
            </div>
        </>
    );
};

export default RollerRink;
