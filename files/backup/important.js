app.post("/user-main", urlencodedParser, (request, response) => {
    
  var username = request.body.username.toLowerCase();
  if (!database.profiles.includes(username)||!username) {
    return response.send('🔏 **Whoops!** There is no such user with this name!'
                        +'<br><br><button onclick="location.replace(window.location.hostname+`/register`)">Register an account.</button>');
  }else
  var post_number, posts_list = "";
  var badge_number, badge_list = "";
  /*for (amount in database.posts) {list +=  "<br>"+database.posts[request.body.username.toLowerCase()][1] ;}
*/
/* Old badges if(typeof database.user[request.body.username.toLowerCase()].badges !== "undefined"){
  for (badge_number in database.user[request.body.username.toLowerCase()].badges) {
    badge_list += database.user[request.body.username.toLowerCase()].badges[badge_number]
  }}*/
    if(database.badges.creator.includes(username)){badge_list += "Creator";}
    if(database.badges.developer.includes(username)){if(database.badges.creator.includes(username)){badge_list += ", "};badge_list += "Developer";}
    if(database.badges.moderator.includes(username)){if(database.badges.developer.includes(username)){badge_list += ", "};badge_list += "Moderator";}
    if(database.badges.early_member.includes(username)){if(database.badges.moderator.includes(username)){badge_list += ", "};badge_list += "Early Member";}
    if(database.badges.long_user.includes(username)){if(database.badges.early_member.includes(username)){badge_list += ", "};badge_list += "Long Time User";}
    if(database.badges.testing.includes(username)){if(database.badges.long_user.includes(username)){badge_list += ", "};badge_list += "Testing";}
  
    if(typeof database.posts[request.body.username.toLowerCase()] !== "undefined"){
    
  for (post_number in database.posts[request.body.username.toLowerCase()]) {
    posts_list +=  `
<div class="w3-container w3-card w3-white w3-round w3-margin" id="post-${[post_number]}"><br>
        <img src="${`${database.user[username].avatar}`}" alt="User_Avatar" class="w3-circle" style="width:60px">
        <span class="w3-right w3-opacity">#${post_number}</span>
        <h4>${username}</h4><br>
        <hr class="w3-clear">
        <p>${database.posts[username][post_number]}</p>
      </div>  

` ;
  }}
response.send(
    `<!DOCTYPE html>
<html>
<title>Mittz Chat</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-blue-grey.css">
<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Open+Sans'>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>html, body, h1, h2, h3, h4, h5 {font-family: "Open Sans", sans-serif}</style>
<body class="w3-theme-l5">

<!-- Navbar -->
<div class="w3-top">
 <div class="w3-bar w3-theme-d2 w3-left-align w3-large">
  <a class="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2" href="javascript:void(0);" onclick="openNav()"><i class="fa fa-bars"></i></a>
  <a href="#" class="w3-bar-item w3-button w3-padding-large w3-theme-d4"><i class="fa fa-home w3-margin-right"></i>Mittz Chat</a>
  <!--
  <a href="#" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="News"><i class="fa fa-globe"></i></a>
  <a href="#" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Account Settings"><i class="fa fa-user"></i></a>
  <a href="#" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Messages"><i class="fa fa-envelope"></i></a>
  -->
  <div class="w3-dropdown-hover w3-hide-small">
    <button class="w3-button w3-padding-large" title="Notifications"><i class="fa fa-bell"></i><span class="w3-badge w3-right w3-small w3-green">3</span></button>     
    <div class="w3-dropdown-content w3-card-4 w3-bar-block" style="width:300px">
      <a href="#" class="w3-bar-item w3-button">Item-1</a>
      <a href="#" class="w3-bar-item w3-button">Item-2</a>
      <a href="#" class="w3-bar-item w3-button">Item-3</a>
    </div>
  </div>
  <a href="#" class="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white" title="My Account">
    <img src="/w3images/avatar2.png" class="w3-circle" style="height:23px;width:23px" alt="Avatar">
  </a>
 </div>
</div>

<!-- Navbar on small screens -->
<div id="navDemo" class="w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium w3-large">
  <a href="#" class="w3-bar-item w3-button w3-padding-large">Chat-Room</a>
  <a href="#" class="w3-bar-item w3-button w3-padding-large">Link 2</a>
  <a href="#" class="w3-bar-item w3-button w3-padding-large">Link 3</a>
  <a href="#" class="w3-bar-item w3-button w3-padding-large">My Profile</a>
</div>

<!-- Page Container -->
<div class="w3-container w3-content" style="max-width:1400px;margin-top:80px">    
  <!-- The Grid -->
  <div class="w3-row">
    <!-- Left Column -->
    <div class="w3-col m3">
      <!-- Profile -->
      <div class="w3-card w3-round w3-white">
        <div class="w3-container">
         <h4 class="w3-center" style="color:${database.user[username].color}">${username} </h4>
         <p class="w3-center"><img src="${`${database.user[username].avatar}`}" class="w3-circle" style="height:106px;width:106px" alt="User Avatar"></p>
         <hr>
         <p><i class="fa fa-home fa-fw w3-margin-right w3-text-theme"></i> ${`${database.user[username].description}`}</p>
         <p><i class="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i> ${database.user[username].creation_date}</p>
        <p><i class="fa fa-money fa-fw w3-margin-right w3-text-theme"></i> ${database.user[username].coins}</p>
        </div>
      </div>
      <br>
      
      <!-- Accordion -->
      <div class="w3-card w3-round">
        <div class="w3-white">
          <button onclick="accordion('Demo1')" class="w3-button w3-block w3-theme-l1 w3-left-align"><i class="fa fa-circle-o-notch fa-fw w3-margin-right"></i> My Groups</button>
          <div id="Demo1" class="w3-hide w3-container">
            <p>Some text..</p>
          </div>
          <button onclick="accordion('Demo2')" class="w3-button w3-block w3-theme-l1 w3-left-align"><i class="fa fa-calendar-check-o fa-fw w3-margin-right"></i> My Events</button>
          <div id="Demo2" class="w3-hide w3-container">
            <p>Some other text..</p>
          </div>

        </div>      
      </div>
      <br>
      
      <!-- Interests --> 
      <div class="w3-card w3-round w3-white w3-hide-small">
        <div class="w3-container">
          <p>Interests</p>
          <p>
          </p>
        </div>
      </div>
      <br>
      
      <!-- Alert Box -->
      <div class="w3-container w3-display-container w3-round w3-theme-l4 w3-border w3-theme-border w3-margin-bottom w3-hide-small">
        <span onclick="this.parentElement.style.display='none'" class="w3-button w3-theme-l3 w3-display-topright">
          <i class="fa fa-remove"></i>
        </span>
        <p><strong>Hello!</strong></p>
        <p>This is a notification box which currently has no use :p</p>
      </div>
    
    <!-- End Left Column -->
    </div>
    
    <!-- Middle Column -->
    <div class="w3-col m7">
    
      <div class="w3-row-padding">
        <div class="w3-col m12">
          <div class="w3-card w3-round w3-white">
            <div class="w3-container w3-padding">
              <h6 class="w3-opacity">Top text</h6>
              <p contenteditable="true" class="w3-border w3-padding">Useless input bar</p>
              <button type="button" class="w3-button w3-theme"><i class="fa fa-pencil"></i>  Button</button> 
            </div>
          </div>
        </div>
      </div>

        <div class="w3-container w3-card w3-white w3-round w3-margin"><br>
        <img src="https://images.vexels.com/media/users/3/163191/isolated/lists/3404f798db8118b2a5bd33cab9c1455c-leather-stitch-badge.png" alt="Badge Card" class="w3-left w3-circle w3-margin-right" style="width:60px">
        <h4>User Badges</h4><br>
        <p>Badges: ${badge_list}</p>
      </div> 

    ${posts_list}
<!--
      <div class="w3-container w3-card w3-white w3-round w3-margin"><br>
        <img src="" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:60px">
        <span class="w3-right w3-opacity">Timestamp (to be coded)</span>
        <h4>Username (add soon)</h4><br>
        <hr class="w3-clear">
        <p></p>
      </div>-->

    <!-- End Middle Column -->
    </div>
    
    <!-- Right Column -->
    <div class="w3-col m2">

      <br>
      
      <div class="w3-card w3-round w3-white w3-padding-16 w3-center">
        <p>ADS</p></div>
      <br>
      <div class="w3-card w3-round w3-white w3-padding-32 w3-center">
        <p><i class="fa fa-bug w3-xxlarge"></i><br>Report bugs</p>
      </div>
    <!-- End Right Column -->
    </div>
  <!-- End Grid -->
  </div>
<!-- End Page Container -->
</div>
<br>

 <footer class="w3-container w3-theme-d5">
  <p>Designed by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a></p>
</footer>

<script>
// Accordion
function accordion(id) {
  var x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
    x.previousElementSibling.className += " w3-theme-d1";
  } else { 
    x.className = x.className.replace("w3-show", "");
    x.previousElementSibling.className = 
    x.previousElementSibling.className.replace(" w3-theme-d1", "");
  }
}
// Used to toggle the menu on smaller screens when clicking on the menu button
function openNav() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else { 
    x.className = x.className.replace(" w3-show", "");
  }
}
</script>
</body>
</html> 

`
  
  );
});
