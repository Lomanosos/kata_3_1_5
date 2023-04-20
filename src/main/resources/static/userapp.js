const authUser = document.getElementById('authUser')


const header3 = document.getElementById('userHeader3')
const header4 = document.getElementById('userHeader4')
const urlInfo = '/api/user/'


async function getUserInfo1() {
    let temp = await fetch(urlInfo)
    if (temp.ok) {
        let user1 = await temp.json()
        let email2 = user1.email
        let roles3 = user1.roles
        getUser2(user1)
        getNavBar2({email2, roles3})
    } else {
        alert('Error, ${temp.status}')
    }

}
function getNavBar2({email2, roles3}) {
    let roles1 = ''
    for (let el of roles3) {
        roles1 += ' '
        roles1 += el.role.toString()
            .replaceAll("ROLE_", "");
    }
    header3.innerHTML = email2
    header4.innerHTML = roles1
}
function getUser2(user1) {
    let rtemp2 =[]
    for (let rel2 of user1.roles) {
        rtemp2.push(" " + rel2.role.toString()
            .replaceAll("ROLE_", ""))
    }
    let temp2 = ''
    temp2 +=
        `<tr>
          <td>${user1.id}</td>
          <td>${user1.firstName}</td>
          <td>${user1.lastName}</td>
          <td>${user1.age}</td>
          <td>${user1.email}</td>
          <td>${rtemp2}</td> 
         </tr>`;
    authUser.innerHTML = temp2
}
getUserInfo1()