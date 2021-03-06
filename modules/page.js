class all_values {
  constructor(values, database) {
    this.values = values;
    this.database = database;
    this.config = require('../server/config');
    this.function_pack = require('./tools/functionpack');
    this.bcrypt = require("bcryptjs");
  }

  value() {
    var values = this.values, database = this.database, config = this.config,function_pack = this.function_pack,bcrypt = this.bcrypt;
    
    values.post_number = 0;
    values.post_list = "";
    values.comment_number = "";
    values.comment_list = "";
    values.role_number = "";
    values.follow_number = "";
    values.follow_list = "";
    values.follow_amount = database.user[values.id].followers.length;
    values.community_number = "";
    values.community_list = "";
    values.like_number = "";
    values.like_list = "";
    values.status = "";
    values.post_bar = "";
    values.comment_bar = "";
    values.profile_menu = "";
    values.side_bar = "";
    values.scripts = "";
    values.self_avatar ="https://cdn.glitch.com/288a0b72-7e13-4dd2-bc7a-3cc2f4db2aab%2Fuser-slash.svg";
    values.self_link = "/u#login";
    values.nav = "";
    values.nav_mobile = "";
    values.i = "";
    values.details = "";
    function add_detail(values) {
  var result="";
  var i;for (i = 0; i < values.length; i++) {
  
  var icon = values[i].icon;
  var text = values[i].value;
  if (!icon) {
    icon = "fa-question-circle";
  }
  result+=`<p><i class="simple-theme-text-2 fa ${icon} fa-fw simple-margin-right"></i><span class="simple-theme-text-1">${text}</span></p>`;
  }
  return result;
}
  if (typeof this.values === "undefined") {
    return "ERROR";
  }
  if (!this.values.id) {
    values.id = "username";
  }
  if (!this.values.category) {
    values.id = "user";
  }
  if (!this.values.me) {
    values.me = "null";
  }
  //var data_type;
  //if (values.category==="user"){data_type = database.user;}else
  //if (values.category==="community"){data_type = database.community;}else
  //{data_type=database.user}
    function get_role(username,category){
    var def = "#000000";
    var vals = {color:def,symbol:"",name:username}
    if (!database.user[username]){vals.color = def;}
    if (!category){category==="community"}
    if (category === "user"){
    var r;for (r = 0; r < Object.keys(config.role_info).length; r++) {
    if(database.user[username].roles.includes(Object.keys(config.role_info)[r]))
    {
      if (config.role_info[Object.keys(config.role_info)[r]].color){
        vals.color = config.role_info[Object.keys(config.role_info)[r]].color;
      }
      if (config.role_info[Object.keys(config.role_info)[r]].symbol){
        vals.symbol = config.role_info[Object.keys(config.role_info)[r]].symbol;
        vals.name = `${username} ${config.role_info[Object.keys(config.role_info)[r]].symbol}`;
      }else {vals.name = username};
      r=r+Object.keys(config.role_info).length;
    }
    else
    {
      vals.color = def;
    }
    }
    }else 
    {
      vals.color = def;
    }
      return vals;
    }
  if (values.me !== undefined) {

    values.self_avatar = database.user[values.me].avatar;
    values.self_link = `/u?username=${values.me}`;
    values.status = `Logged in as: ${values.me.toUpperCase()}`;
    
    this.values.profile_menu = `
    
    <a href="../dashboard" class="simple-bar-item simple-button">
    Dashboard
    </a>
    <form method="get" action="/logout">
    <button type="submit" class="simple-bar-item simple-button">Logout</button></form>`;
    
    values.nav_mobile += `<a href="../dashboard" class="simple-bar-item simple-button simple-padding-large">Dashboard</a>`;

    if (typeof values.password !== "undefined") {
      if (bcrypt.compareSync(values.password, database.user[values.me].password)) {
        /*this.values.visible.logged_in = "hidden";
        this.values.visible.logged_out = "";*/
        values.visible.postBar = ``;
        values.visible.loggedIn = ``;
        if (values.me&&values.me == values.id) {
          values.visible.postBar = ``;
        }else
        {values.visible.postBar = `simple-hide`;}
      }
    }else{
          values.profile_menu = `
    <a href="/login" class="simple-bar-item simple-button">Login</a>
    <a href="/register" class="simple-bar-item simple-button">Register</a>
    `;
      values.visible.postBar = `simple-hide`;
    }
    if (values.category === "community") {
      if (values.data_type[values.id].members.includes(values.me)) {
        /*this.values.visible.logged_in = "hidden";
        this.values.visible.logged_out = "";
        this.values.visible.post_bar = ``;*/
      }
    }
  }
    if (database[values.category][values.id]){
      if (database[values.category][values.id].audio){
      values.post_list+=
        `<audio controls  id="audio" style="display:none;">
        <source src="${database[values.category][values.id].audio.url}" >
        Your browser does not support the audio element.
        <script>
        var audio = document.getElementById("audio");audio.volume = ${database[values.category][values.id].audio.volume};
        </script>
        </audio>`
      
      values.nav +=`
        <a id="play_audio" onclick="audio.currentTime = 1;audio.play();this.style.display='none';document.getElementById('stop_audio').style.display = 'block';" style="display:block;" class="simple-theme-text-favorite simple-bar-item simple-button simple-hide-small simple-padding-large simple-hover-white" title="Follow @${this.values.id}"><i class="fa fa-volume-up"></i></a>
        <a id="stop_audio" onclick="audio.pause();this.style.display='none';document.getElementById('play_audio').style.display = 'block';" style="display:none;" class="simple-theme-text-favorite simple-bar-item simple-button simple-hide-small simple-padding-large simple-hover-white" title="Follow @${this.values.id}"><i class="fa fa-stop"></i></a>
        `
      }
    }
    
    /*else {
    this.values.status = "not logged in";
    this.values.profile_menu = `
    <a href="#login" class="simple-bar-item simple-button">Login</a>
    <a href="#register" class="simple-bar-item simple-button">Register</a>
    `;
  }*/
        var myroles = '';
    if (this.values.category === "user") {
      values.myroles = [];
      database["user"][values.id].roles.forEach(my_roles);
      function my_roles(role,index) {
        if (Object.keys(config.role_info).includes(role)){
          values.myroles+= `${config.role_info[role].name}, `
        }
      };
      values.myroles = function_pack.fix_end(values.myroles)
    }
  if (this.values.me !== undefined && this.values.me !== this.values.id && this.values.id !== "guest" &&this.values.id !== "null") {
    
    var join_type, connect_type,myroles = '';
    if (this.values.category === "user") {
      join_type = "following";
      connect_type = "follow";
    } else {
      join_type = "members";
      connect_type = "join";
    }
    if (this.values.data_type[this.values.id][join_type].includes(this.values.me)) {
      this.values.nav += `<a href="/connect?sent=${this.values.id}&method=${connect_type}" class="simple-theme-text-favorite simple-bar-item simple-button simple-hide-small simple-padding-large simple-hover-white" title="Unfollow @${this.values.id}"><i class="fa fa-heartbeat"></i></a>`;
    } else {
      this.values.nav += `<a href="/connect?sent=${this.values.id}&method=${connect_type}" class="simple-theme-text-favorite simple-bar-item simple-button simple-hide-small simple-padding-large simple-hover-white" title="Follow @${this.values.id}"><i class="fa fa-heart"></i></a>`;
    }
  }

  var post_type = "posts";
  /*if (this.values.category === "user") {
    post_type = "posts";
  } else {
    post_type = "thread";
  }*/
    
  if (typeof this.database[this.values.category][this.values.id][post_type] !== "undefined") {
    this.values.comment_list = ``;
    this.values.post_number = this.database[this.values.category][this.values.id][post_type].length-1;
    var length = this.database[this.values.category][this.values.id][post_type].length-1;
    var max = this.function_pack.max(length,length-3+1);
    var num = this.database[this.values.category][this.values.id][post_type].length-this.function_pack.max(this.database[this.values.category][this.values.id][post_type].length,)-1;
    
    //console.log(length-this.function_pack.max(this.values.post_number,3))
    //console.log(this.values.post_number)
    //console.log(length-this.function_pack.max(length,3))
    while (this.values.post_number > length-this.function_pack.max(length+1,5)) {
      
      if (typeof this.database[this.values.category][this.values.id][post_type][this.values.post_number] !== "undefined") {

        for (this.values.comment_number in this.database[this.values.category][this.values.id][post_type][this.values.post_number].comments) {
          if (typeof this.values.data_type[this.database[this.values.category][this.values.id][post_type][this.values.post_number].comments[this.values.comment_number].sender] !== "undefined") {
            this.values.comment_list += `
            <a>${this.database[this.values.category][this.values.id][post_type][this.values.post_number].comments[this.values.comment_number].sender}:
            ${this.database[this.values.category][this.values.id][post_type][this.values.post_number].comments[this.values.comment_number].text}</a>
            <br>`;
          }
        }
        if (this.values.me !== undefined) {
          this.values.comment_bar = `<form method="post" action="/edit">
<div class="simple-row-padding"><div class="simple-theme-l5 simple-theme-border simple-col m12"><div class="simple-card simple-round"><div class="simple-container simple-padding">
              <hb class="simple-opacity">Add Comment</b>
              <input type="hidden" name="sentname" value="${this.values.me}"><input type="hidden" name="sentpass" value="${this.values.me}"><input type="hidden" name="method" value="new-post-comment"><input type="hidden" name="commentid" value="${this.values.post_number}">
              <input type="text" name="sentcomment" class="simple-border simple-padding" placeholder="Comment Input" required></input>
              <button type="submit" class="simple-button simple-theme"><i class="fa fa-pencil"></i> Send</button>
            </div></div></div></div>
</form>`;
        }
      }
      
      this.values.like_list = 0;
      for (this.values.like_number in this.database[this.values.category][this.values.id][post_type][this.values.post_number].likes) {if (typeof this.database.user[this.database[this.values.category][this.values.id][post_type][this.values.post_number].likes[this.values.like_number]] !== "undefined") {this.values.like_list += 1;}}
      var sender = this.values.id;if (this.values.category === "community" && this.database[this.values.category][this.values.id][post_type][this.values.post_number].sender){sender = this.database[this.values.category][this.values.id][post_type][this.values.post_number].sender}else if (this.values.category === "community"){sender = "Deleted User"}
      
      this.values.post_list += `
      <div class="simple-theme-l5 simple-theme-border simple-theme-text-1 simple-container simple-card simple-round simple-margin" id="post-${[length-this.values.post_number-1]}"><br>
        <img src="${`${this.database.user[sender].avatar}`}" alt="User_Avatar" class="simple-circle" style="width:90px;height:90px"> 
        
        <button class="simple-right simple-opacity" onclick='menu({type:"post",id:"${sender}",number:"${values.post_number}",category:"${values.category}",likes:"${values.like_list}"});'><i class="fa fa-bars"></i></button>
        <span class="simple-right simple-opacity"><i class="fa fa-heart" ></i>:${values.like_list}</span>&nbsp;
        <span class="simple-right simple-opacity">#${this.values.post_number}</span>
        
`;

      this.values.post_list +=`
        
        <br><b style="font-size: 2em;color:${get_role(sender,"user").color};">&nbsp${function_pack.caps(get_role(sender,"user").name)}: </b>
        <a style="font-size: 1.5em;">${
          this.database[this.values.category][this.values.id][post_type][this.values.post_number].title
        } </a><br>
        <hr class="simple-clear">
        <p>${this.database[this.values.category][this.values.id][post_type][this.values.post_number].body}</p>
        <hr class="simple-clear">
        <button onclick="accordion('comments_${this.values.post_number}')" class="simple-button simple-block simple-theme-l1 simple-theme-text-2 simple-left-align"><i class="fa fa-shield fa-fw simple-margin-right"></i> Comments</button>
          <div id="comments_${this.values.post_number}" class="simple-hide simple-container">
            <p>${this.values.comment_list}${this.values.comment_bar}</p>
          </div>
      </div>`;
      this.values.comment_list = ``;

      this.values.post_number--;
    }
  }

  if (typeof this.values.data_type[this.values.id].following !== "undefined") {
    if (this.values.data_type[this.values.id].following.length - 1 < 0) {
      this.values.follow_list = "No One";
    }
    for (this.values.follow_number in this.values.data_type[this.values.id].following) {
      this.values.follow_list += `
      <span class="simple-tag simple-small simple-theme-d3" onclick="location.replace('/u?search=${this.values.data_type[this.values.id].following[this.values.follow_number]}');">${this.values.data_type[this.values.id].following[this.values.follow_number]}</span>`;
      if (this.values.data_type[this.values.id].following.length - 1 >this.values.follow_number) {
        if (this.values.data_type[this.values.id].following.length - 1 > 0) {this.values.follow_list += `, `;}
      }
    }
  }
  
  if (typeof this.values.data_type[this.values.id].communities !== "undefined") {
    if (this.values.data_type[this.values.id].communities.length - 1 < 0) {this.values.community_list = "None";}
    for (this.values.community_number in this.values.data_type[this.values.id].communities) {
      this.values.community_list += `<span class="simple-tag simple-small simple-theme-d3" onclick="location.replace('/c?search=${this.values.data_type[this.values.id].communities[this.values.community_number]}');">${
        this.values.data_type[this.values.id].communities[this.values.community_number]
      }</span>`;
      if (this.values.data_type[this.values.id].communities.length - 1 >this.values.community_number) {
        if (this.values.data_type[this.values.id].communities.length - 1 > 0) {
          this.values.community_list += `, `;
        }
      }
    }
  }
  if (values.category === "community"){values.panelname = this.database[values.category][this.values.id].preferred}
  else {values.panelname = function_pack.caps(get_role(values.id,values.category).name);}
  this.values.details = `
  <h4 class="simple-center" style="color:${get_role(values.id,values.category).color}">${values.panelname}</h4>
  <p class="simple-center">
  <img src="${this.database[values.category][this.values.id].avatar}" class="simple-circle" style="height:106px;width:106px;border: 2px solid ${get_role(values.id,values.category).color};" alt="User Avatar">
  </p>
  <hr>
  `;
    var date =new Date(Number(this.database[this.values.category][this.values.id].creation_date));
  this.values.stats=[
    {"icon":"fa-user","value":this.values.id},
    {"icon":"fa-birthday-cake","value":`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}
    ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}
  ]
    
    if (this.values.category === "user"){this.values.stats.push(
    {"icon":"fa-money","value":Number(this.database[this.values.category][this.values.id].coins.toPrecision(2))},
    {"icon":"fa-star","value":this.database[this.values.category][this.values.id].xp})
                                        }
    
  this.values.details+=add_detail(this.values.stats);
  if (this.values.category === "user") {
    this.values.buttons = `<button onclick="accordion('Demo1')" class="simple-theme-l1 simple-theme-text-2 simple-button simple-block simple-left-align"><i class="fa fa-shield fa-fw simple-margin-right"></i> Roles</button>
          <div id="Demo1" class="simple-hide simple-container">
            <p>${values.myroles}</p>
          </div>
          <button onclick="accordion('Demo2')" class="simple-theme-l1 simple-theme-text-2 simple-button simple-block simple-left-align"><i class="fa fa-heart fa-fw simple-margin-right"></i> Follows</button>
          <div id="Demo2" class="simple-hide simple-container">
            <p>Followers: ${this.values.follow_amount}</p>
            <p>Following: ${this.values.follow_list} </p>
            <p>Communities: ${this.values.community_list} </p>
          </div>`;
  }
  return this.values;
  }
  
}


module.exports = all_values;


