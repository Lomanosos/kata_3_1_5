const authUser = document.getElementById('authUser')


const header3 = document.getElementById('userHeader3')
const header4 = document.getElementById('userHeader4')
const urlInfo = '/api/user/userinfo'


async function getUserInfo1() {
    let temp = await fetch(urlInfo)
    if (temp.ok) {
        let user = await temp.json()
        let email = user.email
        let roles = user.roles
        getUser2(user)
        getNavBar2({email, roles})
    } else {
        alert('Error, ${temp.status}')
    }

}
function getNavBar2({email, roles}) {
    let roles1 = ''
    for (let el of roles) {
        roles1 += ' '
        roles1 += el.role.toString()
            .replaceAll("ROLE_", "");
    }
    header3.innerHTML = email
    header4.innerHTML = roles1
}
function getUser2(user) {
    let rtemp2 =[]
    for (let rel of user.roles) {
        rtemp2.push(" " + rel.role.toString()
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
          <td>${rtemp2}</td> 
         </tr>`;
    authUser.innerHTML = temp
}
getUserInfo1()