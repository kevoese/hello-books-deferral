document.querySelector('.submit').addEventListener('click', () => {
    const password = document.querySelector('#password').value;
    const password_confirmation = document.querySelector(
        '#password-confirmation'
    ).value;
    const token = document.querySelector('.inputCon').getAttribute('token');
    const path = document.querySelector('.inputCon').getAttribute('path');
    const body = { password, password_confirmation, token };
    console.log(body);
    document.querySelector('.loader').classList.remove('gone');
    document.querySelector('.resp').classList.add('gone');
    const host = `${path}/api/v1/auth/reset`;
    fetch(host, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then(resp => resp.json())
        .then(res => {
            document.querySelector('.loader').classList.add('gone');
            document.querySelector('.resp').classList.remove('gone');
            console.log(res);
            if (res.data) {
                const { message } = res.data;
                document.querySelector('.resp').textContent = message;
                return;
            }
            document.querySelector('.resp').textContent =
                res.message[0].message;
        })
        .catch(err => {
            console.log(err);
        });
});
