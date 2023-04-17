const urlInfo = 'http://localhost:8080/api/admin/userinfo'
const url = 'http://localhost:8080/api/admin/table'
import 'bootstrap';

import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;

const header= document.getElementById('userHeader')
const tableId = document.getElementById('table-body')
const userInfo = document.getElementById('authUserInfo')
const edit_modal = document.getElementById('modalEdit')
const delete_modal = document.getElementById('deleteModal')
const new_form = document.getElementById('newUserForm')

const tbody = document.querySelector('tbody')
const tbody = document.querySelector('form')
let result = ''
let option = ''

const ed_modal = new bootstrap.Modal(document.getElementById('modalEdit'))
const ed_id = document.getElementById('idEdit')
const ed_fn = document.getElementById('firstnameEdit')
const ed_ln = document.getElementById('lastNameEdit')
const ed_age = document.getElementById('ageEdit')
const ed_email = document.getElementById('emailDelete')
const ed_pw = document.getElementById('passwordEdit')
const ed_rs = document.getElementById('rolesEdit')

buttonCreate.addEventListener('click', () => {
    ed_id.value = ''
    ed_fn.value = ''
    ed_ln.value = ''
    ed_email.value = ''
    ed_age.value = ''
    ed_pw.value = ''
    ed_rs.value = ''
    new bootstrap.Modal('modalEdit').show()
    option = 'create'
})
const tableUsers = users => {
    users.forEach(el => {
        result += '<tr>' + '<td>${el.id}</td>' +
            '<td>${el.firstName}</td>' +
            '<td>${el.lastName}</td>' +
            '<td>${el.age}</td>' +
            '<td>${el.email}</td>' +
            '<td>${el.id}</td>' +
            '<td>${el.getRolesString}</td>' +
            '<td class="text-center"><a class="btnEdit btn btn-primary">Edit</a>' +
            '<a class="btnDelete btn btn-danger">Delete</a></td>' +
            '</tr>'
    })
    tbody.innerHTML = result
}

fetch(url).then(response => response.json)
    .then(data => tableUsers(data))
    .catch(error => console.log(error))
