const logoutBtn = document.querySelector(".admin-logout");

if (!sessionStorage.getItem("userValue")) {
  window.location.href = "index.html";
}

const userWelcome = () => {
  const welcome = document.querySelector(".welcome-section");
  const userDetail = JSON.parse(sessionStorage.getItem("userValue"));
  welcome.textContent = `Welcome: ${userDetail.username}`;
};
userWelcome();

const logoutAdmin = () => {
  sessionStorage.removeItem("userValue");
  window.location.href = "index.html";
};

logoutBtn.addEventListener("click", logoutAdmin);

class Member {
  constructor(data) {
    this.data = data;
    this.render();
  }
  render() {
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `
     <tr>
      <td>
        <input type="checkbox" id=${this.data.id}  />
      </td>
      <td><h3>${this.data.name}</h3></td>
      <td><h3>${this.data.email}</h3></td>
      <td><h3>${this.data.role}</h3></td>
      <td><button title="Delete" class="del-btn">X</button></td>
    </tr>
    `;
    return tableRow;
  }
}

class MemberList {
  constructor() {}
  checkBoxlist = [];
  fetchUrlData() {
    const fetchData = async () => {
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const data = await response.json();
      const tableBody = document.querySelector(".table-body");
      const table = document.querySelector(".admin-list");

      for (const item of data) {
        const member = new Member(item);
        const tableRow = member.render();
        tableBody.append(tableRow);
      }
      table.append(tableBody);
      const deleteBtn = tableBody.querySelectorAll("button");
      deleteBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
          deleteList(btn);
        });
      });
      deleteBtn.forEach((btn) => {
        btn.addEventListener("mouseenter", () =>
          mouseHover(btn, "crimson", "white")
        );
        btn.addEventListener("mouseout", () =>
          mouseHover(btn, "white", "black")
        );
      });
      const checkBox = table.querySelectorAll("input");
      checkBox.forEach((check) => {
        check.addEventListener("click", () => {
          if (this.checkBoxlist.includes(check.parentElement.parentElement)) {
            const newcheckBoxList = this.checkBoxlist.filter(
              (item) => item !== check.parentElement.parentElement
            );
            this.checkBoxlist = [...newcheckBoxList];
            return;
          }
          this.checkBoxlist.push(check.parentElement.parentElement);
          const deleteSelected = document.querySelector(".del-sel");
          deleteSelected.addEventListener("click", () => {
            deleteSelection(this.checkBoxlist);
          });
        });
      });
    };
    fetchData();
  }
}

function deleteSelection(thedeleteList) {
  for (const item of thedeleteList) {
    item.remove();
  }
}

function mouseHover(btn, bcolor, color) {
  btn.parentElement.parentElement.style.backgroundColor = bcolor;
  btn.parentElement.parentElement.style.color = color;
}

function deleteList(btn) {
  btn.parentElement.parentElement.remove();
}

const memberlist = new MemberList();
memberlist.fetchUrlData();
