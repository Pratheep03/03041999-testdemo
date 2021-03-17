

  var arr = [];
  var ar = [];
  var testinfo = {
    testname: "Model Test",
    duration: "3 mins",
  };
  var past_index = 0;
  var current_index = 0;
  let ans = [];
  var currindex = 0;
  var currqn = arr[currindex];
  var curelement = ar[currindex];
  var testDetails;
  var a = 0;
  var time = '0';
  var time_length = 0;
  function startTimer(mins) {
    var seconds = mins * 60;
    var x = setInterval(function () {
      seconds = seconds - 1;
      document.getElementById(
        "timer-label"
      ).innerHTML = `${Math.trunc(seconds / 60)}M:${
        seconds % 60
      }S`;
      time = `${Math.trunc(seconds / 60)}M:${
        seconds % 60
      }S`;
      etime = `${Math.trunc(seconds / 60)}M:${
        seconds % 60
      }S`;
      if (seconds === 0) {
        clearInterval(x);
        alert("Test time over. Expired");
      }
    }, 1000);
  }
   
  function renderQn() {
    document.querySelector("#qtext").innerHTML = `${currqn["q_text"]}`;
    var math = document.getElementById("#qtext");
    resetQnIndex(currindex+1)
    curelement[current_index]["current"]="true";
    curelement[currindex]['time'].push({"start_time":String(time), "end_time":"0"})
    time_length = curelement[currindex]['time'].length;
    document.getElementById(current_index).style.backgroundColor = "#ffeb03";
    console.log("current_status", curelement)
    if(currindex == 0){
      document.getElementById("pre").style.visibility = "hidden";
    }
    else{
      document.getElementById("pre").style.visibility = "visible";
    }
    if (currindex < arr.length - 1) {
      document.getElementById("next").style.visibility = "visible";
      document.getElementById("Next").style.visibility = "visible";
    }
    else{
      document.getElementById("next").style.visibility = "hidden";
      document.getElementById("Next").style.visibility = "hidden";
    }
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,math]);
    if (currqn["ch1_text"]) {
      document.querySelector("#ch1-label").innerHTML = `${currqn["ch1_text"]}`;
    } else {
      document.querySelector("#ch1-label").remove();
      document.querySelector("#ch1").remove();
    }
    if (currqn["ch2_text"]) {
      document.querySelector("#ch2-label").innerHTML = `${currqn["ch2_text"]}`;
    } else {
      document.querySelector("#ch2-label").remove();
      document.querySelector("#ch2").remove();
    }
    if (currqn["ch3_text"]) {
      document.querySelector("#ch3-label").innerHTML = `${currqn["ch3_text"]}`;
    } else {
      document.querySelector("#ch3-label").remove();
      document.querySelector("#ch3").remove();
    }
    if (currqn["ch4_text"]) {
      document.querySelector("#ch4-label").innerHTML = `${currqn["ch4_text"]}`;
    } else {
      document.querySelector("#ch4-label").remove();
      document.querySelector("#ch4").remove();
    }
    if (currqn["q_image"]) {
      document.querySelector("qimage").innerHTML = `${currqn["q_image"]}`;
    }
    // if(currqn["ch5_text"]){
    //     document.querySelector("#ch5-label").innerHTML = `${currqn["ch5_text"]}`;
    // }
    // else{
    //     document.querySelector("#ch5-label").remove();
    //     document.querySelector("#ch5").remove();
    // }
    // if(currqn["ch6_text"]){
    //     document.querySelector("#ch6-label").innerHTML = `${currqn["ch6_text"]}`;
    // }
    // else{
    //     document.querySelector("#ch6-label").remove();
    //     document.querySelector("#ch6").remove();
    // }
    const rbs = document.querySelectorAll('input[name="choices"]');
    if (ans[currindex]) {
      if (ans[currindex] === "Choice1") {
        rbs[0].checked = true;
      }
      if (ans[currindex] === "Choice2") {
        rbs[1].checked = true;
      }
      if (ans[currindex] === "Choice3") {
        rbs[2].checked = true;
      }
      if (ans[currindex] === "Choice4") {
        rbs[3].checked = true;
      }
      if (ans[currindex] === "Choice5") {
        rbs[4].checked = true;
      }
      if (ans[currindex] === "Choice6") {
        rbs[5].checked = true;
      }
    }
  }
  
  
  $(document).ready(function () {
    //renderQn();
    loadQuestionPage();
  });

  
  function nextQn() {
    if (currindex < arr.length - 1) {
      const rbs = document.querySelectorAll('input[name="choices"]');
      let selectedValue;
      for (const rb of rbs) {
        if (rb.checked) {
          selectedValue = rb.value;
          rb.checked = false;
          break;
        }
      }
      ans[currindex] = selectedValue;
      curelement[currindex]['time'][time_length-1]["end_time"]=etime;
      currindex += 1;
      changeButtonSate(currindex);
      curelement = ar;
      currqn = arr[currindex];
      renderQn();
    }
  }
  
  
  function prevQn() {
    if (currindex > 0) {
      const rbs = document.querySelectorAll('input[name="choices"]');
      let selectedValue;
      for (const rb of rbs) {
        if (rb.checked) {
          selectedValue = rb.value;
          rb.checked = false;
          break;
        }
      }
      ans[currindex] = selectedValue;
      curelement[currindex]['time'][time_length-1]["end_time"]=etime;
      currindex -= 1;
      changeButtonSate(currindex);
      curelement = ar;
      currqn = arr[currindex];
      renderQn();
     
    }
  }
  
  function submit() {
    if (currindex === arr.length - 1) {
      const rbs = document.querySelectorAll('input[name="choices"]');
      let selectedValue;
      for (const rb of rbs) {
        if (rb.checked) {
          selectedValue = rb.value;
        }
      }
      ans[currindex] = selectedValue;
    } else {
      alert("Can only submit at the end");
    }
  }
  
  function loadQuestionPage() {
        console.log("question is ",questiondata);
        console.log(questiondata.length);
        document.getElementById('total_questions').innerHTML = questiondata.length-1;
        var s =questiondata ;
        var numQn = s.length;
        testDetails = questiondata[0];
        for (var i = 1; i < s.length; i++) {
          var element = {
            "status":"Not_Visited",
            "current": "false",
            "choice":"0",
            "time":[] //{"start_time":"0","end_time":"0"}
            }
          ar.push(element)
          arr.push(s[i]);
        }
        console.log(arr);
        curelement = ar;
        currqn = arr[0];
        document.getElementById("test-title").innerHTML = testDetails.tname;
        startTimer(testDetails.duration);
        document.getElementById(
          "test-duration"
        ).innerHTML = `${testDetails.duration} mins`;
        time = testDetails.duration+"M";
        navigateTabQn(numQn);
        renderQn();
  }
    
  
  function navigateTabQn(numQn){
      for (var i = 0; i < numQn-1; i++) {
        var para = document.createElement("BUTTON");
        para.style.borderRadius = "13px";
        para.style.border = "0";
        para.type="button";
        var t = document.createTextNode(i+1);
        para.className = "qv";
        para.id = i;
        para.value = i;
        para.onclick = function(){
          currqn = arr[this.value];
          const rbs = document.querySelectorAll('input[name="choices"]');
          let selectedValue;
          for (const rb of rbs) {
            if (rb.checked) {
              selectedValue = rb.value;
              rb.checked = false;
              break;
            }
          }
          ans[currindex] = selectedValue;
          curelement = ar;
          currindex = parseInt(this.value);
          currqn = arr[currindex];
          resetQnIndex(currindex);
          changeButtonSate(currindex);
          renderQn();
        };
        para.style.width = "45px";
        para.style.height = "40px";
        para.appendChild(t);
        document.getElementById("question_palette").appendChild(para);
      }
  }
  
  function resetQnIndex(ind){
    document.getElementById('Questions').innerHTML = ind;
  }
   
   
  function saveClick(){
    var choice = document.querySelector('input[name="choices"]:checked')
    if(choice != null) {   
      const rbs = document.querySelectorAll('input[name="choices"]');
      let selectedValue;
      for (const rb of rbs) {
        if (rb.checked) {
          selectedValue = rb.value;
          rb.checked = false;
          break;
        }
      }
      ans[currindex] = selectedValue;
      curelement = ar;
      currqn = arr[currindex];
      curelement[currindex]["choice"] = selectedValue;
      curelement[currindex]["status"] = "Answered";
      //curelement[currindex]['time']['end_time'] = etime;
    }
    else{
      alert("choice not selected");
    }   
    renderQn();
  }
  
  function clearClick(){
    const rbs = document.querySelectorAll('input[name="choices"]');
    for (const rb of rbs) {
      rb.checked=false;
    }
    ans[currindex] = '';
    curelement = ar;
    currqn = arr[currindex];
    curelement[currindex]["status"] = "Not_Answered";
    curelement[currindex]["choice"] = "0";
    curelement[currindex]['end_time'] = "0";
    renderQn();
  }
  
  function markforreviewClick(){
    curelement[currindex]["status"] = "Mark_For_Review";
    document.getElementById(currindex).style.backgroundColor = "#9211a1";
    renderQn();
  }
  
  // function changePrevSate(index){
  //   console.log("index value", index)
  //   if(curelement[current_index]["status"]=="Not_Answered"){
  //     document.getElementById(index).style.backgroundColor = "red";
  //   }
  //   else if(curelement[index]["status"]=="Answered"){
  //     document.getElementById(index).style.backgroundColor = "green";
  //   }
  //   else if(curelement[index]["status"]=="Mark_For_Review"){
  //     document.getElementById(index).style.backgroundColor = "blue";
  //   }
  //   else if(curelement[index]["status"]=="Not_Visited"){
  //     curelement[index]["status"]="Not_Answered";
  //     document.getElementById(index).style.backgroundColor = "red";
  //   }
  //   curelement[index]["current"] = "false";
  // }
  function changeButtonSate(index){
    past_index = current_index;
    current_index = index;
    curelement[current_index]["current"]="true";
    if(curelement[current_index]["current"]="true"){
      document.getElementById(current_index).style.backgroundColor = "#ffeb03";
    }
    if(curelement[past_index]["status"]=="Answered"){
      document.getElementById(past_index).style.backgroundColor = "#37ba0a";
    
    }
    else if(curelement[past_index]["status"]=="Mark_For_Review"){
      document.getElementById(past_index).style.backgroundColor = "#9211a1";
    }
    else if(curelement[past_index]["status"]=="Not_Visited"){
      curelement[past_index]["status"]="Not_Answered";
      document.getElementById(past_index).style.backgroundColor = "#bf340b";
    }
    else if(curelement[past_index]["status"]="Not_Answered")
    {
       document.getElementById(past_index).style.backgroundColor = "#bf340b";
    }
  }
  
  function openFullscreen() {
    var elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { 
      elem.msRequestFullscreen();
    }
  }
  
  function paletteHide(){
    document.getElementById("right-box").style.display = "none";
    document.getElementById("Palette-show").style.display = "inline-block";
  }
  
  function paletteShow(){
    document.getElementById("Palette-show").style.display = "none";
    document.getElementById("right-box").style.display = "inline-block";
  }