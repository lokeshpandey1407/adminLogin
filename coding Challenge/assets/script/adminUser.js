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
        <input class="checkbox" type="checkbox" id=${this.data.id}  />
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
      const checkBox = tableBody.querySelectorAll("input");
      const deleteBtn = tableBody.querySelectorAll("button");
      singleDeletion(deleteBtn, tableBody);
      mouseHoveStylling(deleteBtn);
      multiSelectionDeletion(checkBox, this.checkBoxlist);
    };
    fetchData();
  }
}

function multiSelectionDeletion(checkBox, checkBoxlist) {
  checkBox.forEach((check) => {
    check.addEventListener("click", () => {
      if (checkBoxlist.includes(check.parentElement.parentElement)) {
        const newcheckBoxList = checkBoxlist.filter(
          (item) => item !== check.parentElement.parentElement
        );
        checkBoxlist = [...newcheckBoxList];
        return;
      }
      checkBoxlist.push(check.parentElement.parentElement);
      const deleteSelected = document.querySelector(".del-sel");
      deleteSelected.addEventListener("click", () => {
        multiSelectDeletion(checkBoxlist, checkBoxlist.length);
      });
    });
  });
}

function multiSelectDeletion(thedeleteList, number) {
  if (thedeleteList.length !== 0) {
    for (const item of thedeleteList) {
      item.remove();
    }
    thedeleteList.splice(0, thedeleteList.length);
    alertModal(`${number} item(s) deleted`, 2000);
    return;
  }
}

function singleDeletion(delButton, source) {
  delButton = source.querySelectorAll("button");
  delButton.forEach((btn) => {
    btn.addEventListener("click", () => {
      deleteList(btn);
    });
  });
}

const alertModal = (message, time) => {
  const alertBox = document.querySelector(".alert-modal");
  alertBox.textContent = message;
  alertBox.style.opacity = 1;
  setTimeout(() => {
    alertBox.style.opacity = 0;
  }, time);
};

function mouseHoveStylling(deleteBtn) {
  deleteBtn.forEach((btn) => {
    btn.addEventListener("mouseenter", () =>
      mouseHover(btn, "crimson", "white")
    );
    btn.addEventListener("mouseout", () => mouseHover(btn, "white", "black"));
  });
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
