const authUser = document.getElementById('authUser')
const tableUser = document.getElementById('userTable')
const urlInfo = 'http://localhost:8080/api/user/userinfo'

function user() {
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
            tableUser.innerHTML = temp
            authUser.innerHTML = '<h5> ${user.email} ' +
                'with roles:' +
                ' ${user.roles.map(role => " " + role.role.substring(5))} </h5>'
        })
}