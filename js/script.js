const menuBtn = document.getElementById('menu')
const menu = document.getElementById('menuBox')
const menuContent = document.getElementById('menuBoxContent')
const body = document.getElementById('body')

const SmoothScroll = {
    target: document.querySelectorAll('a[href^="#"]'),
    speed: 500,
    easing: 'easeInOutCubic',
    offset: 0,
    init: function () {
        for (let i = 0; i < SmoothScroll.target.length; i++) {
            SmoothScroll.target[i].addEventListener('click', function (e) {
                e.preventDefault()
                let id = SmoothScroll.target[i].hash
                let target = document.querySelector(id)
                let targetPosition = target.getBoundingClientRect().top
                let startPosition = window.pageYOffset
                let distance = targetPosition - SmoothScroll.offset
                let startTime = null
            })
        }
    }
}


menuBtn.addEventListener('click', () => {
    menu.classList.toggle('change')
    esc = true;
    setTimeout(() => {
        menuContent.classList.toggle('change')
    }, 320)
    if (menu.classList.contains('change')) {
        body.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
        body.style.zIndex = '1'
    } else {
        body.style.backgroundColor = '#f2f2f2'
        body.style.zIndex = '0'
    }
}
)

// Closing the menu when pressing the escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        menu.classList.remove('change')
        menuContent.classList.remove('change')
        if (menu.classList.contains('change')) {
            body.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
            body.style.zIndex = '1'
        } else {
            body.style.backgroundColor = '#f2f2f2'
            body.style.zIndex = '0'
        }
    }
}
)


// Robot Portion

let status = true;
let connected = false;
const statusicon = document.getElementById('statusicon')
const ci = document.getElementById('indicator')
const connectBtn = document.getElementById('connectButton')
const serverURL = document.getElementById('serverURL')
const LockPage = document.getElementById('LockPage')
const motorControls = document.getElementById('motorControls')

if (sessionStorage.getItem('url')) {
    serverURL.value = sessionStorage.getItem('url')
}

connectBtn.addEventListener('click', () => {
    if (sessionStorage.getItem('url') != null) {
        var url = sessionStorage.getItem('url')
    } else {
        var url = serverURL.value
    }
    if (url === '') {
        alert('Please enter a valid URL')
    } else {
        let res = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "command": "connect"
            })
        })
        res.then((res) => {
            if (res.status === 200 || res.status === 201 && res.statusText === 'connected') {
                status = true
                ci.classList.remove('reddot')
                ci.classList.add('greendot')
                serverURL.disabled = true
                connectBtn.disabled = true
                connectBtn.innerHTML = 'Connected'
                //saving to session storage
                connected = true;
                sessionStorage.setItem('url', url)
                // Prevent connection loss when page is refreshed
                window.addEventListener('beforeunload', (e) => {
                    e.preventDefault()
                    e.returnValue = ''
                })
            } else {
                status = false
                ci.classList.remove('greendot')
                ci.classList.add('reddot')
            }
        }
        )
    }
})

// Lock the page and prevent access to the controls

function unlock() {
    LockPage.classList.add('unlock')
    LockPage.classList.remove('lock')
    LockPage.innerHTML = 'OFF'
    LockPage.style.backgroundColor = 'red'
    LockPage.style.color = 'white'
    LockPage.style.border = '1px solid red'
    LockPage.style.boxShadow = '0 0 10px red'
}

function lock() {
    LockPage.classList.remove('unlock')
    LockPage.classList.add('lock')
    LockPage.innerHTML = 'ON'
    LockPage.style.backgroundColor = 'green'
    LockPage.style.color = 'white'
    LockPage.style.border = '1px solid green'
    LockPage.style.boxShadow = '0 0 10px green'
}

// Locking the page
LockPage.addEventListener('click', () => {
    // Verify that the robot is connected
    if (sessionStorage.getItem('url') != null && connected === true) {
        showControls()
        if (LockPage.classList.contains('lock')) {
            unlock()
        } else {
            lock()
        }
    } else {
        alert('Please connect to the robot first')
    }
}
)

// Only allow the controls to be used when the connection is established

function showControls() {
    motorControls.classList.toggle('hidden')

}

// forward, backward bla bla bla

const forward = document.getElementById('forward')
const backward = document.getElementById('backward')
const left = document.getElementById('left')
const right = document.getElementById('right')
const stopp = document.getElementById('stop')

// WASD controls

document.addEventListener('keydown', (e) => {
    if (LockPage.classList.contains('lock')) {
        if (e.key === 'w') {
            forward.classList.add('active')
            forward.click()
            stopp.classList.remove('active')
        } else if (e.key === 'a') {
            left.classList.add('active')
            left.click()
            stopp.classList.remove('active')
        } else if (e.key === 's') {
            backward.classList.add('active')
            backward.click()
            stopp.classList.remove('active')
        } else if (e.key === 'd') {
            right.classList.add('active')
            right.click()
            stopp.classList.remove('active')
        }
    }
}
)


// Stop the robot when the key is released

document.addEventListener('keyup', (e) => {
    if (LockPage.classList.contains('lock')) {
        if (e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd') {

            forward.classList.remove('active')
            backward.classList.remove('active')
            left.classList.remove('active')
            right.classList.remove('active')

        
    }
}
})

// Stop the robot when the stop button is clicked

stopp.addEventListener('click', () => {
    if (LockPage.classList.contains('lock')) {
        stopp.classList.add('active')
        forward.classList.remove('active')
        backward.classList.remove('active')
        left.classList.remove('active')
        right.classList.remove('active')
    }
}
)

// use space to stop the robot

document.addEventListener('keydown', (e) => {
    if (LockPage.classList.contains('lock')) {
        if (e.key === ' ') {
            stopp.classList.add('active')
            forward.classList.remove('active')
            backward.classList.remove('active')
            left.classList.remove('active')
            right.classList.remove('active')
        }
    }
}
)

// keyup

document.addEventListener('keyup', (e) => {
    if (LockPage.classList.contains('lock')) {
        if (e.key === ' ') {
            stopp.classList.remove('active')
        }
    }
}
)




// Forward

forward.addEventListener('click', () => {
    // Active the button
    forward.classList.add('active')
    // Remove the active class from the other buttons
    backward.classList.remove('active')
    left.classList.remove('active')
    right.classList.remove('active')
    stopp.classList.remove('active')

    if (sessionStorage.getItem('url') != null && connected === true) {
        if (LockPage.classList.contains('lock')) {
            let res = fetch(sessionStorage.getItem('url'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "command": "forward"
                })
            })
            res.then((res) => {
                if (res.status === 200 || res.status === 201 && res.statusText === 'forward') {
                    // ..do nothing yet
                }
            }
            )
        } else {
            alert('Please unlock the controls first')
        }
    } else {
        alert('Please connect to the robot first')
    }
}
)

// Backward

backward.addEventListener('click', () => {
    // Active the button
    backward.classList.add('active')
    // Remove the active class from the other buttons
    forward.classList.remove('active')
    left.classList.remove('active')
    right.classList.remove('active')
    stopp.classList.remove('active')

    if (sessionStorage.getItem('url') != null && connected === true) {
        if (LockPage.classList.contains('lock')) {
            let res = fetch(sessionStorage.getItem('url'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "command": "backward"
                })
            })
            res.then((res) => {
                if (res.status === 200 || res.status === 201 && res.statusText === 'backward') {
                    // ..do nothing yet
                }
            }
            )
        } else {
            alert('Please unlock the controls first')
        }
    } else {
        alert('Please connect to the robot first')
    }
}
)

// Left

left.addEventListener('click', () => {
    // Active the button
    left.classList.add('active')
    // Remove the active class from the other buttons
    forward.classList.remove('active')
    backward.classList.remove('active')
    right.classList.remove('active')
    stopp.classList.remove('active')

    if (sessionStorage.getItem('url') != null && connected === true) {
        if (LockPage.classList.contains('lock')) {
            let res = fetch(sessionStorage.getItem('url'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "command": "left"
                })
            })
            res.then((res) => {
                if (res.status === 200 || res.status === 201 && res.statusText === 'left') {
                    // ..do nothing yet
                }
            }
            )
        } else {
            alert('Please unlock the controls first')
        }
    } else {
        alert('Please connect to the robot first')
    }
}
)

// Right

right.addEventListener('click', () => {
    // Active the button
    right.classList.add('active')
    // Remove the active class from the other buttons
    forward.classList.remove('active')
    backward.classList.remove('active')
    left.classList.remove('active')
    stopp.classList.remove('active')

    if (sessionStorage.getItem('url') != null && connected === true) {
        if (LockPage.classList.contains('lock')) {
            let res = fetch(sessionStorage.getItem('url'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "command": "right"
                })
            })
            res.then((res) => {
                if (res.status === 200 || res.status === 201 && res.statusText === 'right') {
                    // ..do nothing yet
                }
            }
            )
        } else {
            alert('Please unlock the controls first')
        }
    } else {
        alert('Please connect to the robot first')
    }
}
)

// Stop

stopp.addEventListener('click', () => {
    // Active the button
    stopp.classList.add('active')
    // Remove the active class from the other buttons
    forward.classList.remove('active')
    backward.classList.remove('active')
    left.classList.remove('active')
    right.classList.remove('active')

    if (sessionStorage.getItem('url') != null && connected === true) {
        if (LockPage.classList.contains('lock')) {
            let res = fetch(sessionStorage.getItem('url'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "command": "stop"
                })
            })
            res.then((res) => {
                if (res.status === 200 || res.status === 201 && res.statusText === 'stop') {
                    // ..do nothing yet
                }
            }
            )
        } else {
            alert('Please unlock the controls first')
        }
    } else {
        alert('Please connect to the robot first')
    }
}
)

// Slider's

const s1 = document.getElementById('s1')
const s1value = document.getElementById('s1v')


s1.addEventListener('input', () => {
    s1value.textContent = s1.value
}
)




// href's

const bodyHref = document.getElementById('bchr')

bodyHref.addEventListener('click', () => {
    window.location.href = '#bodyControls'
    // close menu
    menu.classList.toggle('change')
    menuContent.classList.toggle('change')
    body.style.backgroundColor = '#f2f2f2'
    body.style.zIndex = '0'
})