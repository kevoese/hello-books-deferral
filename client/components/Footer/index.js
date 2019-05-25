import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="pt-6 bg-gray-50">
            <div className="flex flex-col lg:flex-row ">
                <div className="flex flex-col w-3/3 md:w-1/3 m-auto pt-8 pl-10">
                    <h6 className="font-raleway font-bold text-base pb-5">
                        Links
                    </h6>

                    <div className="leading-tight pb-3">
                        <Link className="font-raleway text-sm " to="/books">
                            Library Catalogue
                        </Link>
                    </div>
                    <div className="leading-tight pb-3">
                        <Link className="font-raleway text-sm " to="/">
                            FAQs
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col w-3/3 md:w-1/3 m-auto pt-8 pl-10 lg:pl-20">
                    <h6 className="font-raleway font-bold text-base pb-5">
                        Connect with us
                    </h6>

                    <div className="leading-tight pb-3">
                        <Link className="font-raleway text-sm " to="/">
                            Twitter
                        </Link>
                    </div>
                    <div className="leading-tight pb-3">
                        <Link className="font-raleway text-sm " to="/">
                            Facebook
                        </Link>
                    </div>
                    <div className="leading-tight pb-3">
                        <Link className="font-raleway text-sm " to="/">
                            Instagram
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col w-3/3 md:w-1/3 m-auto pt-8 pl-10 lg:pl-20">
                    <h6 className="font-raleway font-bold text-base pb-5">
                        Our Locations
                    </h6>
                    <div className="leading-tight pb-3">
                        <p className="font-raleway text-sm ">HQ - Internet</p>
                    </div>
                    <div className="leading-tight pb-3">
                        <p className="font-raleway text-sm pr-8">
                            234 Block 2a Maryland Mall
                            <br /> Maryland, Lagos Nigeria
                        </p>
                    </div>
                </div>
            </div>

            <p className="pt-10 pb-5 text-center font-raleway text-xs font-light">
                {' '}
                @ Copyright 2019
            </p>
        </div>
    );
};

export default Footer;
