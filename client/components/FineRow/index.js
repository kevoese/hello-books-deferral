import React from 'react';
import { getDateStr } from '@clientUtils';
import { Link } from 'react-router-dom';

const FineRowData = ({
    id,
    created_on,
    type,
    description,
    amount,
    status,
    paid_at
}) => {
    return (
        <tr className="hover:bg-gray-10 border-b-2 border-gray-10 ">
            <td className="py-4 font-raleway px-4 text-left text-sm">
                {created_on && getDateStr(created_on)}
            </td>
            <td className="py-6 font-raleway px-4  text-sm">{type}</td>
            <td className="py-4 font-raleway px-4  text-sm">{description}</td>
            <td className="py-4 font-raleway px-4  text-sm">{amount}</td>
            <td className="py-4 font-raleway px-4  text-sm">{status}</td>
            <td className="py-4 font-raleway px-4 text-blue-450 text-sm">
                <div className="flex justify-center">
                    <div className="flex  ">
                        {paid_at ? (
                            `Paid on ${paid_at && getDateStr(paid_at)}`
                        ) : (
                            <Link
                                to="/fines"
                                className=" bg-green-400 px-4 py-1 text-white rounded-full"
                            >
                                Pay
                            </Link>
                        )}
                    </div>
                </div>
            </td>
        </tr>
    );
};

export default FineRowData;
