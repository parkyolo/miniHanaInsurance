function isSignin() {
  const isSignin = localStorage.getItem("isSignin");
  if (isSignin == true) {
    console.log("헤더등장!");
    document.getElementById("li_header_logout").style.display = "block";
    document.getElementById("li_header_login").style.display = "none";
    document.getElementById("li_header_join").style.display = "none";

    var obj = JSON.parse(window.localStorage.getItem("userInfo"));

    const name = obj.name;
    const realname = document.getElementById("name");
    realname.innerHTML = name;
  }
}
