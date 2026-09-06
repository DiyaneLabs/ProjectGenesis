const state = {
    user:{name:"Ntsikelelo",email:"ntsikelelod@mabtechnologies.co.za"},
    selectedDate:null, selectedTime:null, month:new Date(2026,8,1),
    bookings:[
      {title:"Project Planning Meeting",
        date:"Thu, 04 Sep 2026",
        time:"09:00 – 10:00",
        status:"Upcoming"},

      {title:"Client Presentation",
        date:"Fri, 05 Sep 2026",
        time:"14:00 – 15:00",
        status:"Upcoming"},

      {title:"Team Review",
        date:"Mon, 08 Sep 2026",
        time:"11:00 – 12:00",
        status:"Upcoming"}
    ]
  };

  const times=[ "08:00 – 09:00",
                "09:00 – 10:00",
                "10:00 – 11:00",
                "11:00 – 12:00",
                "13:00 – 14:00",
                "14:00 – 15:00",
                "15:00 – 16:00",
                "16:00 – 17:00"];

  function showLogin(){
    document.getElementById("public").style.display="none";
    document.getElementById("login").style.display="flex";
    document.getElementById("app").style.display="none";
    window.scrollTo(0,0);
  }
  function showPublic(){
    document.getElementById("public").style.display="block";
    document.getElementById("login").style.display="none";
    document.getElementById("app").style.display="none";
    window.scrollTo(0,0);
  }
  function enterApp(){
    const email=document.getElementById("email").value;
    state.user.email=email;
    const raw=email.split("@")[0] || "User";
    state.user.name=raw.split(/[._-]/).map(x=>x.charAt(0).toUpperCase()+x.slice(1)).join(" ");
    document.getElementById("login").style.display="none";
    document.getElementById("public").style.display="none";
    document.getElementById("app").style.display="block";
    updateUser();
    renderBookings();
    renderCalendar();
    openPage("dashboard");
    window.scrollTo(0,0);
  }
  function updateUser(){
    document.getElementById("welcomeName").textContent=state.user.name;
    document.getElementById("headerName").textContent=state.user.name;
    document.getElementById("avatar").textContent=state.user.name[0];
    document.getElementById("profileAvatar").textContent=state.user.name[0];
    document.getElementById("profileName").textContent=state.user.name;
    document.getElementById("profileFullName").value=state.user.name;
    document.getElementById("profileEmail").value=state.user.email;
  }
  function openPage(id,button){
    document.querySelectorAll(".page-section").forEach(s=>s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    document.querySelectorAll(".side-link").forEach(b=>b.classList.remove("active"));
    if(button && button.classList.contains("side-link")) button.classList.add("active");
    document.querySelectorAll(".mobile-nav button").forEach(b=>b.classList.remove("active"));
    if(id==="dashboard") renderBookings();
    if(id==="calendar") renderCalendar();
    window.scrollTo(0,0);
  }

  function buildCalendar(){
    const grid=document.getElementById("calendarGrid");
    const y=state.month.getFullYear(),m=state.month.getMonth();
    document.getElementById("monthLabel").textContent=new Intl.DateTimeFormat("en",{month:"long",year:"numeric"}).format(state.month);
    const names=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    grid.innerHTML=names.map(n=>`<div class="day-name">${n}</div>`).join("");
    const first=new Date(y,m,1).getDay(), days=new Date(y,m+1,0).getDate();
    const prev=new Date(y,m,0).getDate();
    for(let i=0;i<first;i++) grid.innerHTML+=`<button class="day muted">${prev-first+i+1}</button>`;
    for(let d=1;d<=days;d++){
      const date=new Date(y,m,d);
      const selected=state.selectedDate && state.selectedDate.toDateString()===date.toDateString();
      grid.innerHTML+=`<button class="day ${selected?"selected":""}" onclick="selectDate(${d})">${d}</button>`;
    }
  }
  function changeMonth(delta){state.month.setMonth(state.month.getMonth()+delta);buildCalendar()}
  function selectDate(d){
    state.selectedDate=new Date(state.month.getFullYear(),state.month.getMonth(),d);
    state.selectedTime=null;
    buildCalendar();
    document.getElementById("selectedDateText").textContent=new Intl.DateTimeFormat("en",{weekday:"long",day:"2-digit",month:"long",year:"numeric"}).format(state.selectedDate);
    document.getElementById("timeList").innerHTML=times.map(t=>`<button class="time-btn" onclick="selectTime(this,'${t}')">${t}</button>`).join("");
  }
  function selectTime(el,time){
    document.querySelectorAll(".time-btn").forEach(x=>x.classList.remove("selected"));
    el.classList.add("selected");
    state.selectedTime=time;
  }
  function setStep(n){
    [1,2,3].forEach(i=>{
      const el=document.getElementById("step"+i);
      el.classList.toggle("active",i===n);el.classList.toggle("done",i<n);
    });
    document.getElementById("bookingStep1").style.display=n===1?"block":"none";
    document.getElementById("bookingStep2").style.display=n===2?"block":"none";
    document.getElementById("bookingStep3").style.display=n===3?"block":"none";
  }
  function goStep1(){setStep(1)}
  function goStep2(){
    if(!state.selectedDate || !state.selectedTime){alert("Please select a date and time first.");return}
    setStep(2);
  }
  function goStep3(){
    if(!document.getElementById("meetingTitle").value.trim()){alert("Please enter a meeting title.");return}
    const dateText=new Intl.DateTimeFormat("en",{weekday:"long",day:"2-digit",month:"long",year:"numeric"}).format(state.selectedDate);
    document.getElementById("confirmDate").textContent=dateText+" · "+state.selectedTime;
    document.getElementById("confirmTitle").textContent=document.getElementById("meetingTitle").value;
    document.getElementById("confirmAttendees").textContent=document.getElementById("attendees").value;
    document.getElementById("confirmPurpose").textContent=document.getElementById("purpose").value;
    document.getElementById("confirmNotes").textContent=document.getElementById("notes").value || "None";
    setStep(3);
  }
  function confirmBooking(){
    const date=new Intl.DateTimeFormat("en",{weekday:"short",day:"2-digit",month:"short",year:"numeric"}).format(state.selectedDate);
    state.bookings.unshift({
      title:document.getElementById("meetingTitle").value,
      date:date,time:state.selectedTime,status:"Upcoming"
    });
    document.getElementById("bookingStep3").style.display="none";
    document.querySelector(".steps").style.display="none";
    document.getElementById("bookingSuccess").style.display="block";
    document.getElementById("upcomingCount").textContent=state.bookings.length;
    renderBookings();
  }
  function resetBooking(){
    document.getElementById("bookingSuccess").style.display="none";
    document.querySelector(".steps").style.display="flex";
    document.getElementById("meetingTitle").value="";
    document.getElementById("notes").value="";
    state.selectedDate=null;state.selectedTime=null;
    document.getElementById("selectedDateText").textContent="Select a date";
    document.getElementById("timeList").innerHTML="";
    setStep(1);buildCalendar();
  }
  function bookingHTML(b){
    return `<div class="booking-row"><div class="calendar-icon">▣</div><div><h4>${b.title}</h4><p>${b.date} · ${b.time}</p></div><span class="badge">${b.status}</span><button class="btn btn-outline" onclick="alert('Prototype: booking actions will be connected to the backend later.')">•••</button></div>`
  }
  function renderBookings(){
    document.getElementById("dashboardBookings").innerHTML=state.bookings.slice(0,3).map(bookingHTML).join("");
    document.getElementById("allBookings").innerHTML=state.bookings.map(bookingHTML).join("");
  }
  function renderCalendar(){
    const el=document.getElementById("monthView");
    const y=2026,m=8;
    const days=new Date(y,m+1,0).getDate();
    const first=new Date(y,m,1).getDay();
    el.innerHTML="";
    for(let i=0;i<first;i++) el.innerHTML+=`<div class="month-cell"></div>`;
    for(let d=1;d<=days;d++){
      let event="";
      if(d===4) event=`<div class="event">09:00 Project Planning</div>`;
      if(d===5) event=`<div class="event">14:00 Client Presentation</div>`;
      if(d===8) event=`<div class="event">11:00 Team Review</div>`;
      el.innerHTML+=`<div class="month-cell"><div class="date">${d}</div>${event}</div>`;
    }
  }

  buildCalendar();
  document.getElementById("timeList").innerHTML="";
