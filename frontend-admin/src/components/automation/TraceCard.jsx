import { useEffect, useState } from "react";

import TraceDetailsModal from "./TraceDetailsModal";

import "./TraceCard.css";

function TraceCard({ trace }) {

    const [open, setOpen] = useState(false);

    const [progress, setProgress] = useState(

        Math.floor(

            Math.random() * 15

        ) + 5

    );

    const [visible, setVisible] = useState(true);

    const [paused, setPaused] = useState(false);

    useEffect(() => {

        const interval = setInterval(() => {

            if (paused) return;

            setProgress(current => {

                const next = Math.min(

                    current +

                    Math.random() * 6 +

                    2,

                    100

                );

                if (next >= 100) {

                    setPaused(true);

                    setTimeout(() => {

                        setVisible(false);

                    }, 2000);

                    setTimeout(() => {

                        setProgress(

                            Math.floor(

                                Math.random() * 15

                            ) + 5

                        );

                        setVisible(true);

                        setPaused(false);

                    }, 2200);

                }

                return next;

            });

        }, 180);

        return () => clearInterval(interval);

    }, [paused]);

    return (

        <>

            {

                visible && (

                    <article

                        className="trace-card"

                        onClick={() =>

                            setOpen(true)

                        }

                    >

                        <div className="trace-progress">

                            <div

                                className="trace-progress-fill"

                                style={{

                                    width:

                                        `${progress}%`

                                }}

                            />

                        </div>

                    </article>

                )

            }

            <TraceDetailsModal

                open={open}

                onClose={() =>

                    setOpen(false)

                }

                trace={trace}

            />

        </>

    );

}

export default TraceCard;