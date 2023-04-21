const ed_id = document.getElementById('idEdit')
const ed_fn = document.getElementById('firstnameEdit')
const ed_ln = document.getElementById('lastNameEdit')
const ed_age = document.getElementById('ageEdit')
const ed_email = document.getElementById('emailEdit')
const ed_pw = document.getElementById('passwordEdit')
//const ed_rs = document.getElementById('rolesEdit')
const ed_form = document.getElementById('editForm')

async function contentEditModal(id) {
    $('#modalEdit').showModal()
    let ed_url2 = '/api/admin/table/' + id
    let temp = await fetch(ed_url2)
    if (temp.ok) {
        await temp.json().then(user => {
            ed_id.value = '${user.id}'
            ed_fn.value = '${user.firstName}'
            ed_ln.value = '${user.lastName}'
            ed_age.value = '${user.age}'
            ed_email.value = '${user.email}'
            ed_pw.value = '${user.password}'
        })
    } else {
        alert('error')
    }

}

async function editUser() {
    let ed_url = '/api/admin/table/' + ed_id.value
    let editRoles = []
    for (let i = 0; i < ed_form.roles.options.length; i++) {
        if (ed_form.roles.options[i].selected) {
            let temp = {};
            temp["id"] = ed_form.roles.options[i].value
            editRoles.push(temp)
        }
    }
    let method = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'firstName': ed_form.firstName.value,
            'lastName': ed_form.lastName.value,
            'age': ed_form.age.value,
            'email': ed_form.email.value,
            'password': ed_form.password.value,
            'roles': editRoles
        })
    }
    await fetch(ed_url, method).then(() => {
        $('#footered').click();
        getTable()
    })
}