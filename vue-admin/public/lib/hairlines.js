/**
 * @description Let browser support 0.5 px by hairlines
 * @author wzc0x0@gmail.com
 */

(function(window, document) {
    var docEl = document.documentElement,
        dpr = window.devicePixelRatio || 1

    if (dpr >= 2) {
        var fakeBody = document.createElement('body')
        var testElement = document.createElement('div')
        testElement.style.border = '.5px solid transparent'
        fakeBody.appendChild(testElement)
        docEl.appendChild(fakeBody)
        if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines')
        }
        docEl.removeChild(fakeBody)
    }

}(window, document))