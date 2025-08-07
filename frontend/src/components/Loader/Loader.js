import React from 'react';

const Loader = () => {
    return (
        <>
            <div className="loader-overlay">
                <div className="loader" />
            </div>
            <style jsx>{`
                .loader-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background-color: rgba(255, 255, 255, 0.62);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                }

                .loader {
                    width: 60px;
                    height: 60px;
                    border: 6px solid rgba(0, 0, 255, 0.3);
                    border-top-color: rgba(0, 0, 255, 1);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </>
    );
};

export default Loader;
