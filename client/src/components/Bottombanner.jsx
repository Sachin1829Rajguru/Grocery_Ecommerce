import React from 'react';
import deskbanner from '../assets/bottom_banner_image.png';
import mobbanner from '../assets/bottom_banner_image_sm.png';
import { features } from '../assets/assets';

function Bottombanner() {
    return (
        <div className="w-full mt-10 relative">
            {/* Desktop Banner */}
            <img
                src={deskbanner}
                alt="Desktop Banner"
                className="hidden md:block w-full object-cover"
            />
            {/* Mobile Banner */}
            <img
                src={mobbanner}
                alt="Mobile Banner"
                className="block md:hidden w-full object-cover"
            />
            {/* Features Overlay */}
            <div
                className={`
                    absolute inset-0
                    flex flex-col
                    items-center md:items-end
                    justify-start md:justify-center
                    mt-16 md:mt-0
                    px-4 md:px-24
                    pointer-events-none
                `}
            >
                <div
                    className={`
                        w-[95vw] max-w-md md:max-w-lg
                        md:w-[420px] md:mr-16
                        bg-gradient-to-br from-white/0 via-white/0 to-white/0
                        rounded-lg 
                        p-4 md:p-8
                        flex flex-col gap-4 md:gap-6
                        pointer-events-auto
                        backdrop-blur-sm
                    `}
                >
                    <div className="flex flex-col items-start w-full">
                        <h2 className="text-green-700 text-xl md:text-2xl font-bold mb-2 md:mb-4 text-left w-full">
                            Why We Are the Best?
                        </h2>
                        {/* Line always aligned with heading start */}
                        <hr className="border-green-700 w-16 mb-4" />
                    </div>
                    <ul className="flex flex-col gap-3">
                        {features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <img src={feature.icon} alt="" className="w-7 h-7 mt-1" />
                                <div>
                                    <div className="font-semibold text-base md:text-lg text-green-800">{feature.title}</div>
                                    <div className="text-gray-700 text-sm md:text-base">{feature.description}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Bottombanner;
