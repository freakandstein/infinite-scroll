import React from 'react'
import Skeleton from 'react-loading-skeleton'
import "../style.css"

const ContactLoader = () => {
    const ANIMATION_DURATION = 0.5;
    return (
        <div className="contact-container">
            <Skeleton circle width={75} height={75} duration={ANIMATION_DURATION} />
            <div className="text-container">
            <div style={{marginBottom: 16 }}>
                <Skeleton width={200} height={21} duration={ANIMATION_DURATION} />
            </div>
                <Skeleton width={120} height={14} duration={ANIMATION_DURATION} />
            </div>
        </div>
    )
}
export default ContactLoader