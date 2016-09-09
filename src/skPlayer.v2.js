;
(function(window) {
    var skPlayer = function() {
        //初始化
        var playerTpl = ['<audio src="{{src}}" preload="auto"></audio>',
            '<div class="skPlayer-picture">',
            '   <img src="{{cover}}" alt="" class="skPlayer-cover">',
            '   <a href="javascript:;" class="skPlayer-play-btn">',
            '       <span class="skPlayer-left"></span>',
            '       <span class="skPlayer-right"></span>',
            '   </a>',
            '</div>',
            '<div class="skPlayer-control">',
            '   <p class="skPlayer-name">{{name}}</p>',
            '   <p class="skPlayer-author">{{author}}</p>',
            '   <div class="skPlayer-percent">',
            '       <div class="skPlayer-line"></div>',
            '   </div>',
            '   <p class="skPlayer-time">',
            '       <span class="skPlayer-cur">00:00</span>/<span class="skPlayer-total">00:00</span>',
            '   </p>',
            '   <div class="skPlayer-volume skPlayer-hasList">',
            '       <i class="skPlayer-icon" data-volume="0"></i>',
            '       <div class="skPlayer-percent">',
            '           <div class="skPlayer-line"></div>',
            '       </div>',
            '   </div>',
            '   <div class="skPlayer-list-switch">',
            '       <i class="skPlayer-list-icon"></i>',
            '   </div>',
            '</div>',
        ].join("");
        var playerSongListTpl = ['<li data-index="{{item}}" >',
            '       <i class="skPlayer-list-sign"></i>',
            '       <span class="skPlayer-list-index">{{number}}</span>',
            '       <span class="skPlayer-list-name">{{name}}</span>',
            '       <span class="skPlayer-list-author" title="{{author}}">{{author}}</span>',
            '   </li>',
        ].join("");
        var init = function(opts) {
            this.id = opts.id;
            this.autoLoop = opts.autoLoop;
            this.musicList = opts.musicList;
            this.songNumber = opts.songNumber;
            this.fetch();

        }
        init.prototype = {
            addEvents: function() {
                var that = this;
                var target = document.querySelector(that.id),
                    audio = target.querySelector('audio'),
                    playBtn = target.querySelector('.skPlayer-play-btn'),
                    currentTime = target.querySelector('.skPlayer-percent .skPlayer-line'),
                    totalTime = target.querySelector('.skPlayer-percent'),
                    currentVolume = target.querySelector('.skPlayer-volume .skPlayer-line'),
                    totalVolume = target.querySelector('.skPlayer-volume .skPlayer-percent'),
                    quietVolume = target.querySelector('.skPlayer-icon'),
                    currentTime_text = target.querySelector('.skPlayer-cur'),
                    totalTime_text = target.querySelector('.skPlayer-total'),
                    cover = target.querySelector('.skPlayer-cover'),
                    musicItem = target.querySelectorAll('.skPlayer-list li'),
                    listSwitch = target.querySelector('.skPlayer-list-switch');

                target.classList.add('skPlayer-list-on');

                audio.addEventListener('canplay', canPlayThrough);
                audio.addEventListener('durationchange', durationChange);
                audio.addEventListener('timeupdate', timeUpdate);
                audio.addEventListener('ended', audioEnd);
                totalTime.addEventListener('click', timeLineClick);
                totalVolume.addEventListener('click', volumeLineClick);
                quietVolume.addEventListener('click', volumeQuiet);
                if (this.musicAllList.length > 0) {
                    for (var item in this.musicAllList) {
                        musicItem[item].addEventListener('click', changeMusic);
                    }
                    target.querySelector('.skPlayer-list li:nth-child(1)').classList.add('skPlayer-curMusic');
                    listSwitch.addEventListener('click', switchList);
                }

                //可播放状态
                function canPlayThrough() {
                    if (that.loop === true) {
                        audio.loop = true;
                    }
                    duration = this.duration;
                    currentTime_text.innerHTML = '00:00';
                    totalTime_text.innerHTML = that.dateFormat(parseInt(duration));
                    if (audio.volume == 1) {
                        audio.volume = 0.7;
                        currentVolume.style.width = '70%';
                    }
                    playBtn.addEventListener('click', playClick);
                }
                //歌曲时长变动
                function durationChange() {
                    duration = this.duration;
                }
                //时间更新
                function timeUpdate() {
                    var curTime = parseInt(audio.currentTime);
                    var playPercent = (curTime / duration) * 100;
                    currentTime.style.width = playPercent.toFixed(2) + '%';
                    currentTime_text.innerHTML = that.dateFormat(curTime);
                }
                //播放结束
                function audioEnd() {
                    if (that.musicAllList.length>0) {
                        var index = parseInt(target.querySelector('.skPlayer-curMusic').getAttribute('data-index')) + 1;
                        if (index < music.length) {
                            if (target.querySelector('.skPlayer-curMusic').nextSibling !== 1) {
                                target.querySelector('.skPlayer-curMusic').nextSibling.nextSibling.classList.add('skPlayer-curMusic');
                            } else {
                                target.querySelector('.skPlayer-curMusic').nextSibling.classList.add('skPlayer-curMusic');
                            }
                            target.querySelector('.skPlayer-curMusic').classList.remove('skPlayer-curMusic');
                            var data = music[index];
                        } else {
                            target.querySelector('.skPlayer-list li').classList.add('skPlayer-curMusic');
                            target.querySelectorAll('.skPlayer-curMusic')[1].classList.remove('skPlayer-curMusic');
                            var data = music[0];
                        }
                        target.querySelector('.skPlayer-name').innerHTML = data.name;
                        target.querySelector('.skPlayer-author').innerHTML = data.author;
                        target.querySelector('.skPlayer-cover').src = data.cover;
                        audio.src = data.src;
                        if (playBtn.classList.contains('skPlayer-pause')) {
                            audio.play();
                        }
                    } else {
                        playBtn.classList.remove('skPlayer-pause');
                        cover.classList.remove('skPlayer-pause');
                    }
                    currentTime_text.innerHTML = '00:00';
                    currentTime.style.width = 0;
                }
                //播放控制
                function playClick() {
                    if (audio.paused) {
                        audio.play();
                    } else {
                        audio.pause();
                    }
                    if (playBtn.classList.contains('skPlayer-pause')) {
                        playBtn.classList.remove('skPlayer-pause');
                        cover.classList.remove('skPlayer-pause');
                    } else {
                        playBtn.classList.add('skPlayer-pause');
                        cover.classList.add('skPlayer-pause');
                    }
                }
                //进度控制
                function timeLineClick(event) {
                    var e = window.event || event;
                    var clickPercent;
                    if (e.pageX) {
                        clickPercent = (e.pageX - that.leftDistance(this)) / this.offsetWidth;
                    } else {
                        clickPercent = (e.clientX - that.leftDistance(this)) / this.offsetWidth;
                    }
                    currentTime.style.width = clickPercent * 100 + '%';
                    audio.currentTime = parseInt(clickPercent * duration);
                }
                //音量控制
                function volumeLineClick(event) {
                    var e = window.event || event;
                    if (quietVolume.classList.contains('skPlayer-quiet')) {
                        quietVolume.classList.remove('skPlayer-quiet');
                    }
                    var clickPercent;
                    if (e.pageX) {
                        clickPercent = (e.pageX - that.leftDistance(this)) / this.offsetWidth;
                    } else {
                        clickPercent = (e.clientX - that.leftDistance(this)) / this.offsetWidth;
                    }
                    currentVolume.style.width = clickPercent * 100 + '%';
                    audio.volume = clickPercent.toFixed(2);
                }
                //静音控制
                function volumeQuiet() {
                    if (audio.volume != 0) {
                        quietVolume.setAttribute('data-volume', audio.volume);
                        audio.volume = 0;
                        currentVolume.style.width = 0;
                        quietVolume.classList.add('skPlayer-quiet');
                    } else {
                        audio.volume = quietVolume.getAttribute('data-volume');
                        currentVolume.style.width = quietVolume.getAttribute('data-volume') * 100 + '%';
                        quietVolume.setAttribute('data-volume', '0');
                        quietVolume.classList.remove('skPlayer-quiet');
                    }
                }

                function changeMusic() {
                    if (!this.classList.contains('skPlayer-curMusic')) {
                        target.querySelector('.skPlayer-curMusic').classList.remove('skPlayer-curMusic');
                        this.classList.add('skPlayer-curMusic');
                        var index = this.getAttribute('data-index');
                        var data = that.musicAllList[index];
                        target.querySelector('.skPlayer-name').innerHTML = data.name;
                        target.querySelector('.skPlayer-author').innerHTML = data.author;
                        target.querySelector('.skPlayer-cover').src = data.cover;
                        audio.src = data.src;
                        if (playBtn.classList.contains('skPlayer-pause')) {
                            audio.play();
                        }
                        currentTime_text.innerHTML = '00:00';
                        currentTime.style.width = 0;
                    }
                }

                function switchList() {
                    target.classList.contains('skPlayer-list-on') ? target.classList.remove('skPlayer-list-on') : target.classList.add('skPlayer-list-on');

                }
            },
            fetch: function() {
                var that = this;
                if (!this.songNumber) {
                    that.render([]);
                    return;
                }
                that.ajax({
                    url: "http://120.24.162.247/api/Music?id=" + that.songNumber,
                    type: "GET",
                    data: null,
                    success: function(data) {
                        // console.log(data);
                        var result = JSON.parse(data);
                        that.render(result);

                    },
                    error: function() {
                        that.render(result);
                        console.error("请求歌曲列表失败");

                    }
                })


            },
            render: function(result) {
                var that = this;

                this.musicAllList = result = result.concat(that.musicList);

                var oPlayer = document.querySelector(that.id);

                var mainPlayer = that.htmlTpl(playerTpl, result[0]);
                oPlayer.innerHTML = mainPlayer;

                var playerSongList = result.map(function(item, i) {
                    return that.htmlTpl(playerSongListTpl, that.extend(result[i], {
                        item: i,
                        number: i + 1
                    }));
                }).join('');
                var oUl = document.createElement('ul');
                oUl.className = 'skPlayer-list';
                oUl.innerHTML = playerSongList;
                oPlayer.appendChild(oUl);
                that.addEvents();

            },
            extend: function(destination, source) {
                for (var property in source) {
                    destination[property] = source[property];
                }
                return destination;
            },
            leftDistance: function(el) {
                var left = el.offsetLeft;
                while (el.offsetParent) {
                    el = el.offsetParent;
                    left += el.offsetLeft;
                }
                return left;
            },
            dateFormat: function(time) {
                var tempMin = parseInt(time / 60);
                var tempSec = parseInt(time % 60);
                var curMin = tempMin < 10 ? ('0' + tempMin) : tempMin;
                var curSec = tempSec < 10 ? ('0' + tempSec) : tempSec;
                return curMin + ':' + curSec;
            },
            htmlTpl: function(tpl, data) {
                return tpl.replace(/{{(\w+)}}/g, function() {
                    return data[arguments[1]];
                });

            },
            ajax: function(options) {
                var options = options || {};
                var xhr = new XMLHttpRequest();
                xhr.open(options.type, options.url, true);
                xhr.send(options.data);
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4) {
                        var status = xhr.status;
                        if (status >= 200 && status < 300) {
                            options.success && options.success(xhr.responseText, xhr.responseXML);
                        } else {
                            options.error && options.error(status);
                        }
                    }
                };

            }

        }
        return init;
    }();
    window.skPlayer = skPlayer;
})(window);
//处理模块化
if(typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
    module.exports = window.skPlayer;
}
