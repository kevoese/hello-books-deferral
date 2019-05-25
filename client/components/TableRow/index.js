import React from 'react';
import { Link } from 'react-router-dom';

const TableRowItems = ({ id, title, copiesAvailable, year, isbn, authors }) => {
    return (
        <tr className="hover:bg-gray-10 border-b-2 border-gray-10 ">
            <td className="py-4 font-raleway px-4 text-left text-sm">
                {title}
            </td>
            <td className="py-6 font-raleway px-4  text-sm">{authors && authors[0].name || ''}</td>
            <td className="py-4 font-raleway px-4  text-sm">{year}</td>
            <td className="py-4 font-raleway px-4  text-sm">{isbn}</td>
            <td className="py-4 font-raleway px-4  text-sm">
                {copiesAvailable}
            </td>
            <td className="py-4 font-raleway px-4 text-blue-450 text-sm">
                <div className="flex justify-center">
                    <div className="flex  ">
                        <Link to="/admin-dashboard" className=" border-r pr-4">
                            View
                        </Link>
                    </div>
                    <div className="flex ">
                        <Link
                            to="/admin-dashboard"
                            className=" border-r pl-4  pr-4"
                        >
                            Edit
                        </Link>{' '}
                    </div>
                    <div className="flex ">
                        <Link to="/admin-dashboard" className="  pl-4">
                            Delete
                        </Link>
                    </div>
                </div>
            </td>
        </tr>
    );
};

export default TableRowItems;
