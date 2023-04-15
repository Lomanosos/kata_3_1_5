const urlInfo = 'http://localhost:8080/api/admin/userinfo'
const url = 'http://localhost:8080/api/admin/table'

const header= document.getElementById('userHeader')
const tableId = document.getElementById('table-body')
const userTable = document.getElementById('authUserInfo')
function userAuth() {
    fetch(urlInfo)
        .then(response => response.json())
        .then(user => {
            let temp = '';
            temp += '<tr>' +
                '<td>${user.id}</td>' +
                '<td>${user.firstName}</td>' +
                '<td>${user.lastName}</td>' +
                '<td>${user.age}</td>' +
                '<td>${user.email}</td>' +
                '<td>${user.roles.map(role => " " + role.role.substring(5))}</td>' +
                '</tr>';
            userTable.innerHTML = temp
            header.innerHTML = '<h5> ${user.email} ' +
                'with roles:' +
                ' ${user.roles.map(role => " " + role.role.substring(5))} </h5>'
        })
}
function users() {       //sam2
    fetch(url).then(function (response){
        return response.json()
    })
        .then(function (users) {
            let temp = ""
            for (let user of users) {
                temp += '<tr>'
                temp += '<td>' + user.id + '</td>'
                temp += '<td>' + user.firstName + '</td>'
                temp += '<td>' + user.lastName + '</td>'
                temp += '<td>' + user.age + '</td>'
                temp += '<td>' + user.email + '</td>'
                let role = ""
                for (let i in user.roles) {
                    if (user.roles[i].role === "ROLE_USER") {
                        role = "USER"
                    }
                    if (user.roles[i].role === "ROLE_ADMIN") {
                        role = "ADMIN"
                    }
                    if (user.roles.length === 1) {
                        temp += '<td>' + role + "</td>"
                    } else if (i == 0) {
                        temp += '<td>' + role + ", "
                    } else {
                        temp += role + "</td>"
                    }
                }
                out += '<td>' + '<button type="button" class="btn btn-info" ' +
                    'data-bs-toggle="modal"' +
                    ' data-bs-target="#modalEdit" onclick="summonEditModal(' + user.id + ')">Edit' +
                    '</button>' + '</td>'
                out += '<td>' + '<button type="button" class="btn btn-danger" ' +
                    'data-bs-toggle="modal"' +
                    ' data-bs-target="#deleteModal" onclick="summonDeleteModal(' + user.id + ')">Delete' +
                    '</button>' + '</td>'
                temp += '</tr>'
            }
            tableId.innerHTML = temp
        })
}

function summonEditModal(id) {
fetch(url + '/' + id, {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
    }
}).then(res => {
    res.json()
        .then(userEdit => {
            document.getElementById('idEdit').value = userEdit.id
            document.getElementById('firstnameEdit').value = userEdit.firstName
            document.getElementById('lastNameEdit').value = userEdit.lastName
            document.getElementById('ageEdit').value = userEdit.age
            document.getElementById('emailEdit').value = userEdit.email
            document.getElementById('passwordEdit').value = userEdit.password
            document.getElementById('rolesEdit').value = userEdit.roles

            const selecter = document.querySelector('#rolesEdit').getElementsByName('option')
            for (let i = 0; i < selecter.length; i++) {
                if (selecter[i].value ===userEdit.roles[i].role) {
                    selecter[i].selected = true
                    if (i === selecter.length - 1) {
                        break
                    }
                } else if (selecter[i + 1].value === userEdit.roles[i].role) {
                    selecter[i + 1].selected = true
                }
            }
        })
})
}

function summonDeleteModal(id) {
    fetch(url + '/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json().then(userDelete => {
            document.getElementById('idDelete').value = userDelete.id
            document.getElementById('firstNameDelete').value = userDelete.firstName
            document.getElementById('lastNameDelete').value = userDelete.lastName
            document.getElementById('ageDelete').value = userDelete.age
            document.getElementById('emailDelete').value = userDelete.email
            document.getElementById('rolesDelete').value = userDelete.roles
        })
    })
}

function editUser() {
    event.preventDefault()
    let id = document.getElementById('idEdit').value
    let firstName = document.getElementById('firstnameEdit').value
    let lastName = document.getElementById('lastNameEdit').value
    let age = document.getElementById('ageEdit').value
    let email = document.getElementById('emailEdit').value
    let password = document.getElementById('passwordEdit').value
    let roles = $("#rolesEdit").val()
    for (let i = 0; i < roles.length; i++) {
        if (roles[i] === 'ROLE_ADMIN') {
            roles[i] = {
                'id' :2,
                'role': 'ROLE_ADMIN',
                'authority': 'ROLE_ADMIN'
            }
        }
        if (roles[i] === 'ROLE_USER') {
            roles[i] = {
                'id' :1,
                'role': 'ROLE_USER',
                'authority': 'ROLE_USER'
            }
        }
    }
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            'id': id,
            'firstName': firstName,
            'lastName': lastName,
            'age' : age,
            'email': email,
            'password': password,
            'roles': roles
        })
    }).then( () => {
        $('#rolesEdit').modal('hide')
        users()
    })
}

function deleteUser() {
    event.preventDefault()
    let id = document.getElementById('idDelete').value

    fetch(url + '/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
        .then( () => {
            $('#deleteModal').modal('hide')
            users()
        })
}

function saveUser() {
    event.preventDefault()
    let firstName = document.getElementById('newFirstName').value
    let lastName = document.getElementById('newLastName').value
    let age = document.getElementById('newage').value
    let email = document.getElementById('newemail').value
    let password = document.getElementById('newpassword').value
    let roles = $("#roleSelect").val()
    fetch(url, {method: 'POST', headers: {'Content-Type': 'application/json;charset=UTF-8'},
    body: JSON.stringify({
        'firstName': firstName,
        'lastName': lastName,
        'age': age,
        'email': email,
        'password': password,
        'roles': roles
    })
    })
        .then(() => {
            document.getElementById('nav-home-tab').click()
            users()
            document.newUserForm.reset()
        })
}

