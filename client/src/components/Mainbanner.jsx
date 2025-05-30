import React from 'react';
import bannerimage from '../assets/main_banner_bg.png';
import smbannerimage from '../assets/main_banner_bg_sm.png';
import { useAppcontext } from '../context/appcontext';

function Mainbanner() {
    const { navigate } = useAppcontext();
    return (
        <div className="relative bg-[#e6f8ec] overflow-hidden">
            {/* Desktop Banner */}
            <div className="hidden md:block relative">
                <img src={bannerimage} alt="main banner" className="w-full object-cover" />
                <div className="absolute inset-0 flex flex-col justify-center items-start px-20 space-y-6">
                    <h1 className="text-5xl font-bold text-[#1a1a1a] max-w-xl leading-tight">
                        Freshness You Can <br /> Trust, Savings You <br /> will Love!
                    </h1>
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => {
                                navigate(`/products`);
                                scrollTo(0, 0);
                            }}
                            className="bg-[#35b567] text-white px-6 py-3 rounded-md font-medium hover:bg-[#2ea95d] transition">
                            Shop now
                        </button>
                        <a href="#" className="text-[#1a1a1a] font-medium hover:underline flex items-center">
                            Explore deals →
                        </a>
                    </div>
                </div>
            </div>

            {/* Mobile Banner */}
            <div className="md:hidden relative h-[600px] z-0">
                <img src={smbannerimage} alt="mobile banner" className="w-full h-full object-cover absolute inset-0" />

                <div className="relative z-0 h-full flex flex-col justify-between px-4 py-8">
                    {/* Top Spacer */}
                    <div className="mt-10" />

                    {/* Heading */}
                    <h1 className="text-3xl font-bold text-[#1a1a1a] text-center leading-snug">
                        Freshness You Can <br /> Trust, Savings You <br /> will Love!
                    </h1>

                    {/* Bottom Button */}
                    <div className="flex justify-center mb-10">
                        <button
                            onClick={() => {
                                navigate(`/products`);
                                scrollTo(0, 0);
                            }}
                            className="bg-[#35b567] text-white px-6 py-3 rounded-md font-medium hover:bg-[#2ea95d] transition">
                            Shop now →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mainbanner;
