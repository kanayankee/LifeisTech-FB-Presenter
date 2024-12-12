function urlCheck() {
    console.log('urlCheck');
    var url = window.location.href;
    var has_redirect = url.includes('CHRONOLOGICAL');
    var is_groupspage = url.match(/.*\/groups\/[a-zA-Z0-9.?=&_]{7,}$/);
    var is_groupspage2 = url.match(/.*\/groups\/[a-zA-Z0-9.?=&_]{7,}\/\?[a-zA-Z0-9.?=&_].*$/);
    if (!has_redirect && (is_groupspage || is_groupspage2)) {
        var new_url = url.split('?')[0] + '?sorting_setting=CHRONOLOGICAL';
        window.location.replace(new_url);
    }

    function addPresentationButton() {
        if ((is_groupspage || is_groupspage2) && !document.querySelector('#presentation')) {
            const composerElement = document.querySelector('[data-pagelet="GroupInlineComposer"]');
            if (composerElement) {
                const fullscreenButton = document.createElement('div');
                fullscreenButton.style.marginBottom = '16px';
                fullscreenButton.style.display = 'flex';
                fullscreenButton.innerHTML = '<button id="presentation" style="background:#0765FF;color:white;padding:10px 15px;border-radius:5px;border:0;font-size:1em;cursor:pointer;white-space:nowrap;"><b>プレゼンテーションモード</b></button>';
                fullscreenButton.innerHTML += '<span style="display:block; margin:5px; user-select:none; color:var(--primary-text);" class="lit-fbp_guide">拡大したメディアを閉じる時はCommand(Alt)+左矢印を使用してください。ESCを押すとプレゼンテーションモードが終了します。</span>'
                composerElement.appendChild(fullscreenButton);
                addButtonListener(fullscreenButton);
            }
        }
    }
    addPresentationButton();
    setInterval(addPresentationButton, 2000);

    let isFullscreen = false;
    let hiddenDivs = [];
    let customStyle = null;

    document.addEventListener('fullscreenchange', () => {
        isFullscreen = !!document.fullscreenElement;

        if (!isFullscreen) {
            hiddenDivs.forEach(div => {
                div.style.display = '';
            });
            hiddenDivs = [];
            const customLogo = document.querySelector('#lifeistech');
            if (customLogo) {
                const closestDiv = customLogo.closest('div');
                if (closestDiv) {
                    closestDiv.remove();
                }
            }
            const feedElement = document.querySelector('[role="feed"]');
            if (feedElement) {
                feedElement.style.cssText = '';
            }
            const groupFeed = document.querySelector('[data-pagelet="GroupFeed"]');
            if (groupFeed) {
                groupFeed.style.cssText = '';
            }
            if (customStyle && customStyle.parentNode) {
                customStyle.parentNode.removeChild(customStyle);
                customStyle = null;
            }
            restoreDarkMode();
        }
    });

    function addButtonListener(fullscreenButton) {
        fullscreenButton.addEventListener('click', () => {
            if (!isFullscreen) {
                const groupFeedDivs = document.querySelectorAll('[data-pagelet="GroupFeed"] div');
                if (groupFeedDivs.length > 0) {
                    groupFeedDivs[0].style.display = 'none';
                    hiddenDivs.push(groupFeedDivs[0]);
                }
                const feedDivs = document.querySelectorAll('[role="feed"] div');
                if (feedDivs.length > 0) {
                    feedDivs[0].style.display = 'none';
                    hiddenDivs.push(feedDivs[0]);
                }
                const feedFrame = document.querySelector('[role="feed"]');
                if (feedFrame) {
                    feedFrame.style.display = 'block';
                }
                changeLightMode();
                const feedElement = document.querySelector('[data-pagelet="GroupFeed"]');
                if (feedElement) {
                    if (feedElement.requestFullscreen) {
                        feedElement.requestFullscreen();
                    } else if (feedElement.mozRequestFullScreen) {
                        feedElement.mozRequestFullScreen();
                    } else if (feedElement.webkitRequestFullscreen) {
                        feedElement.webkitRequestFullscreen();
                    } else if (feedElement.msRequestFullscreen) {
                        feedElement.msRequestFullscreen();
                    }
                }
                const groupFeed = document.querySelector('[data-pagelet="GroupFeed"]');
                if (groupFeed) {
                    const feedElement = groupFeed.querySelector('[role="feed"]');
                    if (feedElement) {
                        const div = document.createElement('div');
                        div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" id="lifeistech" version="1.1" viewBox="0 0 308 59" style="width:20%;"> <defs> <style> .cls-1 { fill: #005fff; } .cls-1, .cls-2, .cls-3, .cls-4, .cls-5 { stroke-width: 0px; } .cls-2 { fill: #00aa2d; } .cls-3 { fill: #ffc300; } .cls-4 { fill: #646464; } .cls-5 { fill: red; } </style> </defs> <g> <path class="cls-4" d="M100.165,38.57v4.673h-18.308V15.744h5.214v22.826h13.094Z"/> <path class="cls-4" d="M104.681,18.255c0-1.506,1.197-2.703,2.704-2.703,1.468,0,2.665,1.197,2.665,2.703,0,1.468-1.197,2.665-2.665,2.665-1.506,0-2.704-1.197-2.704-2.665ZM104.951,23.314h4.866v19.929h-4.866v-19.929Z"/> <path class="cls-4" d="M122.6,21.886v1.429h4.094v3.708h-4.094v16.221h-4.828v-16.221h-3.09v-3.708h3.09v-1.506c0-3.515,1.738-6.18,6.527-6.18.773,0,1.816.039,2.512.116v3.746h-1.7c-1.738,0-2.51.85-2.51,2.395h0Z"/> <path class="cls-4" d="M160.279,18.255c0-1.506,1.197-2.703,2.703-2.703,1.468,0,2.665,1.197,2.665,2.703,0,1.468-1.197,2.665-2.665,2.665-1.505,0-2.703-1.197-2.703-2.665ZM160.55,23.314h4.865v19.929h-4.865v-19.929Z"/> <path class="cls-4" d="M293.7,40.54c0,1.506-1.197,2.703-2.703,2.703-1.468,0-2.666-1.197-2.666-2.703,0-1.468,1.197-2.665,2.666-2.665,1.505,0,2.703,1.197,2.703,2.665ZM293.43,35.481h-4.865V15.552h4.865v19.929Z"/> <path class="cls-4" d="M215.69,20.417h-8.806v22.826h-5.251v-22.826h-8.806v-4.673h22.864v4.673h0Z"/> <path class="cls-4" d="M279.235,30.034v13.209h-4.865v-12.397c0-2.55-1.275-3.785-3.747-3.785-2.123,0-4.441,1.468-4.441,5.021v11.162h-4.866V15.745h4.866v10.235c1.313-1.816,3.36-3.128,6.064-3.128,4.171,0,6.99,2.434,6.99,7.183h0Z"/> <path class="cls-4" d="M173.593,43.04c-1.249-.523-2.224-1.259-2.928-2.208-.703-.949-1.131-2.048-1.283-3.297l-.019-.172h4.657l.038.172c.177.879.598,1.561,1.264,2.045.665.484,1.6.726,2.804.726.773,0,1.432-.095,1.977-.287.545-.191.966-.471,1.264-.841.297-.37.447-.803.447-1.3v-.02c0-.598-.203-1.086-.609-1.463-.405-.376-1.134-.684-2.186-.927l-3.346-.745c-1.281-.293-2.351-.694-3.213-1.204-.862-.51-1.508-1.144-1.939-1.902-.431-.758-.647-1.641-.647-2.647v-.02c0-1.236.335-2.319,1.007-3.249.672-.93,1.616-1.657,2.833-2.179s2.629-.783,4.239-.783c1.673,0,3.105.28,4.296.841,1.192.561,2.113,1.313,2.767,2.256.652.943,1.004,2.001,1.055,3.173l.019.211h-4.411l-.019-.153c-.102-.815-.469-1.487-1.102-2.017-.634-.529-1.502-.794-2.605-.794-.697,0-1.302.102-1.815.306-.513.204-.907.491-1.179.86-.273.37-.409.803-.409,1.3v.02c0,.382.095.726.285,1.032s.494.57.912.793c.419.223.976.417,1.673.583l3.346.746c2.091.471,3.58,1.144,4.467,2.017s1.33,2.042,1.33,3.508v.02c0,1.274-.361,2.392-1.084,3.355-.722.962-1.721,1.708-2.995,2.237s-2.734.793-4.382.793c-1.762,0-3.267-.261-4.515-.783h.001Z"/> <g> <path class="cls-4" d="M144.114,24.007c-1.401-.848-3.058-1.271-4.971-1.271-1.926,0-3.596.439-5.009,1.319s-2.509,2.113-3.289,3.699c-.78,1.586-1.169,3.444-1.169,5.572v.02c0,2.141.386,3.995,1.16,5.562.773,1.568,1.885,2.779,3.336,3.632,1.452.854,3.185,1.281,5.199,1.281,1.305,0,2.471-.175,3.498-.525,1.027-.35,1.914-.825,2.662-1.424.748-.599,1.343-1.271,1.787-2.017.443-.745.748-1.507.912-2.284l.038-.21h-4.411l-.038.134c-.152.459-.421.885-.808,1.281-.386.395-.878.717-1.473.965-.595.249-1.286.373-2.072.373-1.053,0-1.958-.232-2.718-.698-.76-.465-1.347-1.134-1.759-2.007-.354-.752-.547-1.646-.596-2.667h14.084v-1.815c0-2.038-.377-3.823-1.131-5.352-.754-1.529-1.831-2.717-3.232-3.565h0ZM136.7,27.142c.729-.452,1.562-.678,2.5-.678.925,0,1.742.22,2.452.659.71.44,1.267,1.1,1.673,1.979.25.543.414,1.181.509,1.893h-9.357c.099-.679.263-1.297.512-1.836.412-.892.982-1.564,1.711-2.017h0Z"/> <path class="cls-4" d="M234.174,32.924c0-2.038-.377-3.823-1.131-5.352-.754-1.529-1.832-2.717-3.232-3.565-1.401-.848-3.058-1.271-4.971-1.271-1.927,0-3.596.439-5.009,1.319s-2.509,2.113-3.289,3.699c-.78,1.586-1.169,3.444-1.169,5.572v.02c0,2.141.386,3.995,1.16,5.562.773,1.568,1.885,2.779,3.336,3.632,1.452.854,3.185,1.281,5.199,1.281,1.305,0,2.471-.175,3.498-.525,1.027-.35,1.914-.825,2.662-1.424.748-.599,1.343-1.271,1.787-2.017.443-.745.748-1.507.912-2.284l.038-.21h-4.411l-.038.134c-.152.459-.421.885-.808,1.281-.386.395-.878.717-1.473.965s-1.286.373-2.072.373c-1.053,0-1.958-.232-2.718-.698-.76-.465-1.347-1.134-1.759-2.007-.354-.752-.547-1.646-.596-2.667h14.084v-1.815h0ZM222.397,27.142c.729-.452,1.562-.678,2.5-.678.925,0,1.742.22,2.452.659.71.44,1.267,1.1,1.673,1.979.25.543.414,1.181.509,1.893h-9.357c.099-.679.263-1.297.512-1.836.412-.892.982-1.564,1.711-2.017h0Z"/> </g> <path class="cls-4" d="M242.274,42.539c-1.457-.853-2.582-2.071-3.375-3.651-.792-1.58-1.188-3.453-1.188-5.62v-.02c0-2.153.399-4.017,1.198-5.591.799-1.573,1.923-2.787,3.375-3.641,1.451-.854,3.152-1.281,5.104-1.281,1.774,0,3.308.341,4.601,1.023,1.293.682,2.307,1.584,3.042,2.705.735,1.121,1.154,2.358,1.255,3.708v.134h-4.449l-.038-.153c-.19-.981-.65-1.819-1.378-2.513-.729-.695-1.721-1.042-2.975-1.042-.989,0-1.854.271-2.595.813s-1.315,1.309-1.72,2.303c-.406.994-.609,2.185-.609,3.574v.019c0,1.402.206,2.6.618,3.594.412.994.989,1.755,1.73,2.284s1.606.793,2.595.793c1.204,0,2.176-.328,2.918-.984.742-.656,1.22-1.513,1.436-2.571l.038-.172h4.467l-.019.134c-.126,1.402-.57,2.663-1.33,3.785-.76,1.121-1.781,2.01-3.061,2.667-1.28.656-2.769.984-4.467.984-1.99,0-3.713-.427-5.171-1.281h0Z"/> </g> <g> <path class="cls-5" d="M29.496-.002C13.206-.002,0,13.204,0,29.495h29.496V-.002Z"/> <path class="cls-1" d="M29.496,58.991c16.29,0,29.496-13.206,29.496-29.496h-29.496v29.496Z"/> <path class="cls-3" d="M9.832,29.495c0,10.86,8.804,19.665,19.665,19.665v-19.665H9.832Z"/> <path class="cls-2" d="M29.496,29.495v19.665c5.426,0,10.347-2.206,13.905-5.759l-13.905-13.905h0Z"/> <path class="cls-3" d="M29.496,29.495l16.222-16.222c-4.472-4.472-10.361-6.716-16.222-6.719v22.942Z"/> <path class="cls-1" d="M29.496,13.108c-9.05,0-16.387,7.337-16.387,16.387h16.387V13.108Z"/> </g><script xmlns=""/></svg>`;
                        div.style.width = '100%';
                        div.style.margin = '0 auto';
                        div.style.padding = '10px';
                        div.style.display = 'flex';
                        div.style.textAlign = 'center';
                        div.style.backgroundColor = '#eee';
                        div.style.borderBottom = '1px solid #000';
                        div.style.justifyContent = 'center';
                        div.style.alignItems = 'center';
                        div.innerHTML += '<b><span style="font-size: 2em;" id="eventName"></span></b>';
                        feedElement.parentNode.insertBefore(div, feedElement);
                    }
                }
                const firstSpan = document.querySelector('[data-pagelet="GroupFeed"] span');
                const titleTag = document.querySelector('title');
                const eventName = document.querySelector('#eventName');
                if (firstSpan && titleTag) {
                    let titleText = titleTag.textContent.replace(" | Facebook", "");
                    titleText = titleText.replace(/^$$.*?$$/, "");
                    firstSpan.textContent = titleText;
                    titleText = titleText.replace(/Life is Tech/g, "");
                    titleText = titleText.replace(/LiT/g, "");
                    titleText = titleText.replace(/!/g, "");
                    titleText = titleText.replace(/！/g, "");
                    titleText = titleText.replace(/@/g, "");
                    titleText = titleText.replace(/＠/g, "");
                    titleText = titleText.replace(/（/g, "(");
                    titleText = titleText.replace(/）/g, ")");
                    titleText = titleText.replace(/\(.*?\)/, "");
                    if (eventName) {
                        eventName.textContent = titleText;
                    }
                }
                customStyle = document.createElement('style');
                customStyle.innerHTML = `
                [role="feed"] {
                    overflow: scroll;
                    width: 100vw;
                    height: 100vh;
                    margin: 0 auto;
                }

                [data-pagelet="GroupFeed"] {
                    background-color: #eee;
                }

                [role="feed"] > * {
                    width: 50vw;
                    margin: 30px auto;
                    padding: 0;
                    box-shadow: 0 0 15px gray;
                    border-radius: 20px;
                    min-height: 20px;
                }

                [role="feed"]::-webkit-scrollbar {
                    display: none;
                }
            `;
                document.body.appendChild(customStyle);
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        });
    }
}

urlCheck();

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "tab_updated") {
            urlCheck();
            console.log('tab_updated');
        }
    }
);

function changeLightMode() {
    if (document.documentElement.classList.contains('__fb-dark-mode') ||
        (!document.documentElement.classList.contains('__fb-light-mode') && !document.body.classList.contains('__fb-dark-mode'))) {

        document.documentElement.classList.remove('__fb-dark-mode');
        document.body.classList.remove('__fb-dark-mode');

        localStorage.setItem('isLightModeChanged', 'true');
        if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            localStorage.removeItem('isLightModeChanged');
            return
        }
        const colors = {
            '--primary-text': '#050505',
            '--secondary-text': '#65676B',
            '--primary-icon': '#050505',
            '--secondary-icon': '#65676B',
            '--accent': '#1B74E4',
            '--primary-button-background': '#1B74E4',
            '--primary-background': '#FFFFFF',
            '--secondary-background': '#F0F2F5',
            '--surface-background': '#FFFFFF',
            '--wash': '#E4E6EB',
            '--web-wash': '#F0F2F5',
            '--card-background': '#FFFFFF',
            '--hover-overlay': 'rgba(0, 0, 0, 0.05)',
            '--card-background-flat': '#EFF2F5',
            '--comment-background': '#EFF2F5'
        };

        Object.entries(colors).forEach(([variable, value]) => {
            document.documentElement.style.setProperty(variable, value);
        });
    }
}

function restoreDarkMode() {
    if (localStorage.getItem('isLightModeChanged')) {
        document.documentElement.classList.add('__fb-dark-mode');
        document.body.classList.add('__fb-dark-mode');
        localStorage.removeItem('isLightModeChanged');
    }
}