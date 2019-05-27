import React from 'react';

export const getDateStr = str => {
    const end = str.indexOf('T');
    const rawDate = str.slice(0, end);
    const firstHyphen = rawDate.indexOf('-');
    const lastHyphen = rawDate.lastIndexOf('-');
    const year = rawDate.slice(0, firstHyphen);
    const month = rawDate.slice(firstHyphen + 1, lastHyphen);
    const day = rawDate.slice(lastHyphen + 1);
    const monthStrArr = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];
    const monthStr = monthStrArr[Number(month) - 1];
    return `${monthStr} ${day} ${year}`;
};

export function makepayment(key, email, amount, ref, callback) {
    var handler = PaystackPop.setup({
        key: key, // This is your public key only!
        email: email || 'customer@email.com', // Customers email
        amount: amount || 5000000.0, // The amount charged, I like big money lol
        ref: ref || 6019, // Generate a random reference number and put here",
        metadata: {
            // More custom information about the transaction
            custom_fields: [{}]
        },
        callback:
            callback ||
            function(response) {
                let div = document.getElementsByTagName('div')[0];
                div.innerHTML =
                    'This was the json response reference </br />' +
                    response.reference;
            },
        onClose: function() {
            alert('window closed');
        }
    });
    // Payment Request Just Fired
    handler.openIframe();
}

export default {
    getDateStr,
    makepayment
};
