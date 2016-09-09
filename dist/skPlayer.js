!function(e,s){var r={timeFormat:function(e){var s=parseInt(e/60),r=parseInt(e%60),a=s<10?"0"+s:s,l=r<10?"0"+r:r;return a+":"+l},leftDistance:function(e){for(var s=e.offsetLeft;e.offsetParent;)e=e.offsetParent,s+=e.offsetLeft;return s},ajax:function(e){var e=e||{},s=new XMLHttpRequest;s.open("GET",e.url),s.send(null),s.onreadystatechange=function(){if(4==s.readyState){var r=s.status;r>=200&&r<300?e.success&&e.success(s.responseText,s.responseXML):e.fail&&e.fail(r)}}}};skPlayer=function(a){function l(){a.loop===!0&&(h.loop=!0),H=this.duration,b.innerHTML="00:00",w.innerHTML=r.timeFormat(parseInt(H)),1==h.volume&&(h.volume=.7,M.style.width="70%"),S.addEventListener("click",n)}function t(){H=this.duration}function i(){var e=parseInt(h.currentTime),s=e/H*100;q.style.width=s.toFixed(2)+"%",b.innerHTML=r.timeFormat(e)}function c(){if(Array.isArray(p)&&1!==p.length){var e=parseInt(m.querySelector(".skPlayer-curMusic").getAttribute("data-index"))+1;if(e<p.length){1!==m.querySelector(".skPlayer-curMusic").nextSibling?m.querySelector(".skPlayer-curMusic").nextSibling.nextSibling.classList.add("skPlayer-curMusic"):m.querySelector(".skPlayer-curMusic").nextSibling.classList.add("skPlayer-curMusic"),m.querySelector(".skPlayer-curMusic").classList.remove("skPlayer-curMusic");var s=p[e]}else{m.querySelector(".skPlayer-list li").classList.add("skPlayer-curMusic"),m.querySelectorAll(".skPlayer-curMusic")[1].classList.remove("skPlayer-curMusic");var s=p[0]}m.querySelector(".skPlayer-name").innerHTML=s.name,m.querySelector(".skPlayer-author").innerHTML=s.author,m.querySelector(".skPlayer-cover").src=s.cover,h.src=s.src,S.classList.contains("skPlayer-pause")&&h.play()}else S.classList.remove("skPlayer-pause"),x.classList.remove("skPlayer-pause");b.innerHTML="00:00",q.style.width=0}function n(){h.paused?h.play():h.pause(),S.classList.contains("skPlayer-pause")?(S.classList.remove("skPlayer-pause"),x.classList.remove("skPlayer-pause")):(S.classList.add("skPlayer-pause"),x.classList.add("skPlayer-pause"))}function y(s){var a,l=e.event||s;a=l.pageX?(l.pageX-r.leftDistance(this))/this.offsetWidth:(l.clientX-r.leftDistance(this))/this.offsetWidth,q.style.width=100*a+"%",h.currentTime=parseInt(a*H)}function u(s){var a=e.event||s;A.classList.contains("skPlayer-quiet")&&A.classList.remove("skPlayer-quiet");var l;l=a.pageX?(a.pageX-r.leftDistance(this))/this.offsetWidth:(a.clientX-r.leftDistance(this))/this.offsetWidth,M.style.width=100*l+"%",h.volume=l.toFixed(2)}function o(){0!=h.volume?(A.setAttribute("data-volume",h.volume),h.volume=0,M.style.width=0,A.classList.add("skPlayer-quiet")):(h.volume=A.getAttribute("data-volume"),M.style.width=100*A.getAttribute("data-volume")+"%",A.setAttribute("data-volume","0"),A.classList.remove("skPlayer-quiet"))}function k(){if(!this.classList.contains("skPlayer-curMusic")){m.querySelector(".skPlayer-curMusic").classList.remove("skPlayer-curMusic"),this.classList.add("skPlayer-curMusic");var e=this.getAttribute("data-index"),s=p[e];m.querySelector(".skPlayer-name").innerHTML=s.name,m.querySelector(".skPlayer-author").innerHTML=s.author,m.querySelector(".skPlayer-cover").src=s.cover,h.src=s.src,S.classList.contains("skPlayer-pause")&&h.play(),b.innerHTML="00:00",q.style.width=0}}function d(){m.classList.contains("skPlayer-list-on")?m.classList.remove("skPlayer-list-on"):m.classList.add("skPlayer-list-on")}function P(){if(h.addEventListener("canplay",l),h.addEventListener("durationchange",t),h.addEventListener("timeupdate",i),h.addEventListener("ended",c),L.addEventListener("click",y),g.addEventListener("click",u),A.addEventListener("click",o),Array.isArray(p)){for(var e in p)T[e].addEventListener("click",k);m.querySelector(".skPlayer-list li:nth-child(1)").classList.add("skPlayer-curMusic"),E.addEventListener("click",d)}}if(Array.isArray(a.music)){for(var v in a.music)if(!(a.music[v].src&&a.music[v].name&&a.music[v].author&&a.music[v].cover))return void console.error("请正确配置对象！");var p=a.music,m=s.getElementById("skPlayer"),f='<audio src="'+p[0].src+'" preload="auto"></audio>';f+='<div class="skPlayer-picture">',f+='    <img src="'+p[0].cover+'" alt="" class="skPlayer-cover">',f+='    <a href="javascript:;" class="skPlayer-play-btn">',f+='        <span class="skPlayer-left"></span>',f+='        <span class="skPlayer-right"></span>',f+="    </a>",f+="</div>",f+='<div class="skPlayer-control">',f+='    <p class="skPlayer-name">'+p[0].name+"</p>",f+='    <p class="skPlayer-author">'+p[0].author+"</p>",f+='    <div class="skPlayer-percent">',f+='        <div class="skPlayer-line"></div>',f+="    </div>",f+='    <p class="skPlayer-time">',f+='        <span class="skPlayer-cur">00:00</span>/<span class="skPlayer-total">00:00</span>',f+="    </p>",f+='    <div class="skPlayer-volume skPlayer-hasList">',f+='        <i class="skPlayer-icon" data-volume="0"></i>',f+='        <div class="skPlayer-percent">',f+='            <div class="skPlayer-line"></div>',f+="        </div>",f+="    </div>",f+='    <div class="skPlayer-list-switch">',f+='        <i class="skPlayer-list-icon"></i>',f+="    </div>",f+="</div>",f+='<ul class="skPlayer-list">';for(var v in a.music)f+='    <li data-index="'+v+'">',f+='        <i class="skPlayer-list-sign"></i>',f+='        <span class="skPlayer-list-index">'+(parseInt(v)+1)+"</span>",f+='        <span class="skPlayer-list-name">'+a.music[v].name+"</span>",f+='        <span class="skPlayer-list-author" title=" '+a.music[v].author+' ">'+a.music[v].author+"</span>",f+="    </li>";f+="</ul>",m.innerHTML=f,"red"===a.theme&&(m.className="skPlayer-red");var h=m.querySelector("audio"),S=m.querySelector(".skPlayer-play-btn"),q=m.querySelector(".skPlayer-percent").querySelector(".skPlayer-line"),L=m.querySelector(".skPlayer-percent"),M=m.querySelector(".skPlayer-volume").querySelector(".skPlayer-line"),g=m.querySelector(".skPlayer-volume").querySelector(".skPlayer-percent"),A=m.querySelector(".skPlayer-icon"),b=m.querySelector(".skPlayer-cur"),w=m.querySelector(".skPlayer-total"),x=m.querySelector(".skPlayer-cover");if(Array.isArray(p)){var T=m.querySelectorAll(".skPlayer-list li"),E=m.querySelector(".skPlayer-list-switch");m.classList.add("skPlayer-list-on")}var H;P()}else if("object"==typeof a.music){if(!(a.music.src&&a.music.name&&a.music.author&&a.music.cover))return void console.error("请正确配置对象！");var p=a.music,m=s.getElementById("skPlayer"),f='<audio src="'+p.src+'" preload="auto"></audio>';f+='<div class="skPlayer-picture">',f+='    <img src="'+p.cover+'" alt="" class="skPlayer-cover">',f+='    <a href="javascript:;" class="skPlayer-play-btn">',f+='        <span class="skPlayer-left"></span>',f+='        <span class="skPlayer-right"></span>',f+="    </a>",f+="</div>",f+='<div class="skPlayer-control">',f+='    <p class="skPlayer-name">'+p.name+"</p>",f+='    <p class="skPlayer-author">'+p.author+"</p>",f+='    <div class="skPlayer-percent">',f+='        <div class="skPlayer-line"></div>',f+="    </div>",f+='    <p class="skPlayer-time">',f+='        <span class="skPlayer-cur">00:00</span>/<span class="skPlayer-total">00:00</span>',f+="    </p>",f+='    <div class="skPlayer-volume">',f+='        <i class="skPlayer-icon" data-volume="0"></i>',f+='        <div class="skPlayer-percent">',f+='            <div class="skPlayer-line"></div>',f+="        </div>",f+="    </div>",f+="</div>",m.innerHTML=f,"red"===a.theme&&(m.className="skPlayer-red");var h=m.querySelector("audio"),S=m.querySelector(".skPlayer-play-btn"),q=m.querySelector(".skPlayer-percent").querySelector(".skPlayer-line"),L=m.querySelector(".skPlayer-percent"),M=m.querySelector(".skPlayer-volume").querySelector(".skPlayer-line"),g=m.querySelector(".skPlayer-volume").querySelector(".skPlayer-percent"),A=m.querySelector(".skPlayer-icon"),b=m.querySelector(".skPlayer-cur"),w=m.querySelector(".skPlayer-total"),x=m.querySelector(".skPlayer-cover");if(Array.isArray(p)){var T=m.querySelectorAll(".skPlayer-list li"),E=m.querySelector(".skPlayer-list-switch");m.classList.add("skPlayer-list-on")}var H;P()}else if("number"==typeof a.music){var p,m,h,S,q,L,M,g,A,b,w,x,H,T,E,I=!1;if(r.ajax({url:"http://120.24.162.247/api/Music?id="+a.music,success:function(e){p=JSON.parse(e),m=s.getElementById("skPlayer");var r='<audio src="'+p[0].src+'" preload="auto"></audio>';r+='<div class="skPlayer-picture">',r+='    <img src="'+p[0].cover+'" alt="" class="skPlayer-cover">',r+='    <a href="javascript:;" class="skPlayer-play-btn">',r+='        <span class="skPlayer-left"></span>',r+='        <span class="skPlayer-right"></span>',r+="    </a>",r+="</div>",r+='<div class="skPlayer-control">',r+='    <p class="skPlayer-name">'+p[0].name+"</p>",r+='    <p class="skPlayer-author">'+p[0].author+"</p>",r+='    <div class="skPlayer-percent">',r+='        <div class="skPlayer-line"></div>',r+="    </div>",r+='    <p class="skPlayer-time">',r+='        <span class="skPlayer-cur">00:00</span>/<span class="skPlayer-total">00:00</span>',r+="    </p>",r+='    <div class="skPlayer-volume skPlayer-hasList">',r+='        <i class="skPlayer-icon" data-volume="0"></i>',r+='        <div class="skPlayer-percent">',r+='            <div class="skPlayer-line"></div>',r+="        </div>",r+="    </div>",r+='    <div class="skPlayer-list-switch">',r+='        <i class="skPlayer-list-icon"></i>',r+="    </div>",r+="</div>",r+='<ul class="skPlayer-list">';for(var l in p)r+='    <li data-index="'+l+'">',r+='        <i class="skPlayer-list-sign"></i>',r+='        <span class="skPlayer-list-index">'+(parseInt(l)+1)+"</span>",r+='        <span class="skPlayer-list-name">'+p[l].name+"</span>",r+='        <span class="skPlayer-list-author" title="'+p[l].author+'">'+p[l].author+"</span>",r+="    </li>";r+="</ul>",m.innerHTML=r,"red"===a.theme&&(m.className="skPlayer-red"),h=m.querySelector("audio"),S=m.querySelector(".skPlayer-play-btn"),q=m.querySelector(".skPlayer-percent").querySelector(".skPlayer-line"),L=m.querySelector(".skPlayer-percent"),M=m.querySelector(".skPlayer-volume").querySelector(".skPlayer-line"),g=m.querySelector(".skPlayer-volume").querySelector(".skPlayer-percent"),A=m.querySelector(".skPlayer-icon"),b=m.querySelector(".skPlayer-cur"),w=m.querySelector(".skPlayer-total"),x=m.querySelector(".skPlayer-cover"),T=m.querySelectorAll(".skPlayer-list li"),E=m.querySelector(".skPlayer-list-switch"),m.classList.add("skPlayer-list-on"),P()},fail:function(e){alert("歌单拉取失败！"),I=!0}}),I)return}},e.skPlayer=skPlayer}(window,document),"undefined"!=typeof module&&"undefined"!=typeof module.exports&&(module.exports=window.skPlayer);