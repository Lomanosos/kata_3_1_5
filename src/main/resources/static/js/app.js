const url = '/api/admin/table/'
const url2 = '/api/admin/userinfo'

//head
const header= document.getElementById('userHeader')
const header2= document.getElementById('userHeader2')

//main table
const tableId = document.getElementById('table-body')

//table for auth user
const userInfo = document.getElementById('authUserInfo')

//delete fields etc
const id_del = document.getElementById('idDelete')
const close_del = document.getElementById('deleteClose')
const del_fn = document.getElementById('firstNameDelete')
const del_ln = document.getElementById('lastNameDelete')
const del_age = document.getElementById('ageDelete')
const del_email = document.getElementById('emailDelete')
const del_rs = document.getElementById('rolesDelete')
const del_modal = new bootstrap.Modal(document.getElementById('deleteModal'))

//edit form and fields
let option = ''
const ed_closeBtn = document.getElementById('ed_close')
const ed_form = document.querySelector('form')
const ed_modal = new bootstrap.Modal(document.getElementById('modalEdit'))
const ed_id = document.getElementById('idEdit')
const ed_fn = document.getElementById('firstnameEdit')
const ed_ln = document.getElementById('lastNameEdit')
const ed_age = document.getElementById('ageEdit')
const ed_email = document.getElementById('emailEdit')
const ed_pw = document.getElementById('passwordEdit')
const ed_rs = document.getElementById('rolesEdit')

//new form and fields
const form_n = document.getElementById('newUserForm')
const roles_n = document.querySelector('#roleSelect').selectedOptions
form_n.addEventListener('submit', newUser)





//new user start
async function newUser(event) {
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
    await fetch(url, method).then(() => {
        document.getElementById('nav-home-tab').click()
        form_n.reset();
        getTable()
    })
}
//new user end


//getting auth user info start
async function getUserInfo() {
    let temp = await fetch(url2)
    if (temp.ok) {
        let user = await temp.json()
        let email = user.email
        let roles = user.roles
        getUser(user)
        getNavBar({email, roles})
    } else {
        alert('Error, ${temp.status}')
    }

}
function getNavBar({email, roles}) {
    let roles1 = ''
    for (let el of roles) {
        roles1 += ' '
        roles1 += el.role.toString()
            .replaceAll("ROLE_", "");
    }
    header.innerHTML = email
    header2.innerHTML = roles1
}
function getUser(user) {
    let rtemp =[]
    for (let rel of user.roles) {
        rtemp.push(" " + rel.role.toString()
            .replaceAll("ROLE_", ""))
    }
    let temp = ''
    temp +=
        `<tr>
          <td>${user.id}</td>
          <td>${user.firstName}</td>
          <td>${user.lastName}</td>
          <td>${user.age}</td>
          <td>${user.email}</td>
          <td>${rtemp}</td> 
         </tr>`;
    userInfo.innerHTML = temp
}
getUserInfo()
//getting auth user info end

//getting table start
async function getTable() {
    let temp = await fetch(url)
    if (temp.ok) {
        let listUsers = await temp.json()
        getTableUsers(listUsers)
    } else {
        alert('Error, ${temp.status}')
    }
}
function getTableUsers(listUsers) {
    let temp = '';

    for( let user of listUsers) {
        let roles1 = []
        for(let roles of user.roles) {
            roles1.push(" " + roles.role.toString()
                .replaceAll("ROLE_", ""))
        }
        temp += `<tr>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${roles1}</td>
            <td>
                <button type="button" class="btn btn-primary" data-bs-toogle="modal"
                data-bs-target="#editModal" 
                onclick="contentEditModal(${user.id})">Edit</button>
            </td>
        
            <td>
                <button class="btn btn-danger" data-bs-toogle="modal"
                data-bs-target="#deleteModal" 
                onclick="contentDeleteModal(${user.id})">Delete</button>
            </td>
        </tr>`
    }
tableId.innerHTML = temp
}
getTable();
//getting table end

//edit & delete modals start
async function contentEditModal(id) {
    ed_modal.show()
    let ed_url2 = url + id
    let temp = await fetch(ed_url2)
    if (temp.ok) {
        await temp.json().then(user => {
            ed_id.value = user.id
            ed_fn.value = user.firstName
            ed_ln.value = user.lastName
            ed_age.value = user.age
            ed_email.value = user.email
            ed_pw.value = user.password
            ed_rs.value = user.roles
        })

    } else {
        alert('error')
    }
}
async function contentDeleteModal(id) {

    let del_url2 = url + id
    let temp = await fetch(del_url2)
    if(temp.ok) {
        await temp.json().then(user => {
            id_del.value = '${user.id}'
            del_fn.value = '${user.firstName}'
            del_ln.value = '${user.lastName}'
            del_age.value = '${user.age}'
            del_email.value = '${user.email}'
            del_rs.value = user.roles.map(r => r.role).join(", ")
        })
        del_modal.show()
    } else {
        alert('delete error')
    }
}

//edit & delete modals end


//edit & delete functions start
async function editUser() {
    let ed_url = url + ed_id.value
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
            firstName: ed_form.firstName.value,
            lastName: ed_form.lastName.value,
            age: ed_form.age.value,
            email: ed_form.email.value,
            password: ed_form.password.value,
            roles: editRoles
        })
    }
    await fetch(ed_url, method).then(() => {
        ed_closeBtn.click();
        getTable()
    })
}
async function deleteUser() {
    let del_url = url + id_del.value;
    let method = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch(del_url, method).then(() => {
        close_del.click()
        getTable()
    })
}
//edit & delete functions end