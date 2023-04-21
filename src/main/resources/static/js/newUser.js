//new user
const form_n = document.getElementById('newUserForm')
const roles_n = document.querySelector('#roleSelect').selectedOptions


async function newUser() {
    form_n.addEventListener('submit', newUserEvent)
}
async function newUserEvent(event) {
    event.preventDefault()
    let newRoles = [];
    for (let i = 0; i < roles_n.length; i++) {
        newRoles.push({id:roles_n[i].value})
    }
    let method = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'firstName': document.getElementById('newFirstName').value,
            'lastName': document.getElementById('newLastName').value,
            'age': document.getElementById('newage').value,
            'email': document.getElementById('newemail').value,
            'password': document.getElementById('newpassword').value,
            'roles': newRoles
        })
    }
    await fetch('/api/admin/table/', method).then(() => {
        //document.getElementById('nav-home-tab').click()
        form_n.reset();
        getTable()
    })
}