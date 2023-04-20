const url = '/api/admin/table'
const url2 = '/api/admin/userinfo'

//head
const header= document.getElementById('userHeader')
const header2= document.getElementById('userHeader2')

//main table
const tableId = document.getElementById('table-body')

//table for auth user
const userInfo = document.getElementById('authUserInfo')


//edit form and fields
//const ed_modal = new Modal(document.getElementById('modalEdit'))
const ed_id = document.getElementById('idEdit')
const ed_fn = document.getElementById('firstnameEdit')
const ed_ln = document.getElementById('lastNameEdit')
const ed_age = document.getElementById('ageEdit')
const ed_email = document.getElementById('emailDelete')
const ed_pw = document.getElementById('passwordEdit')
const ed_rs = document.getElementById('rolesEdit')

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


async function contentEditModal(id) {}
async function contentDeleteModal(id) {}
