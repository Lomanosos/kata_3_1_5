//delete fields etc
const id_del = document.getElementById('idDelete')
const del_fn = document.getElementById('firstNameDelete')
const del_ln = document.getElementById('lastNameDelete')
const del_age = document.getElementById('ageDelete')
const del_email = document.getElementById('emailDelete')
const del_rs = document.getElementById('rolesDelete')
const del_form = document.getElementById('del_form')
async function contentDeleteModal(id) {
    $('#deleteModal').showModal()
    let del_url2 = '/api/admin/table/' + id
    let temp = await fetch(del_url2)
    if(temp.ok) {
        await temp.json().then(user => {
            id_del.value = '${user.id}'
            del_fn.value = '${user.firstName}'
            del_ln.value = '${user.lastName}'
            del_age.value = '${user.age}'
            del_email.value = '${user.email}'
            del_rs.value = '${user.roles}'
        })
    } else {
        alert('delete error')
    }
}
async function deleteUser() {
    del_form.addEventListener('submit', e => {
        e.preventDefault()
        fetch(del_url, method).then(() => {
            $('#footerdel').click()
            getTable()
        })
    })
    let del_url = '/api/admin/table/' + id_del.value;
    let method = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    }
}