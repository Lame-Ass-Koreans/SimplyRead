export const scrollBottom = () => {
    var d = document.documentElement;
        var offset = d.scrollTop + window.innerHeight;
        var height = d.offsetHeight;
        if (offset >= height) {
            return true
        }
    return false
}

export const isInViewport = (el : any, offset=0) => {
    if (!el) return false;
    const top = el.getBoundingClientRect().top;
    const bottom = el.getBoundingClientRect().bottom;
    return (top >= 0 && top <= window.innerHeight) || (bottom - offset > 0 && bottom <= window.innerHeight)
    || (top < 0 && bottom >= window.innerHeight);
}

export const rightSideMenuHook = (control : boolean, elIDs : Array<string>, offset=0) => {
    window.addEventListener('scroll', (event) => {
        let chosen = false;

        if (control && scrollBottom()) {
            const linkEl = document.getElementById(elIDs[elIDs.length - 1] + '-link')
            if (linkEl) {linkEl.style['color'] = '#00468B'; linkEl.style['fontWeight'] = 'bold'}


            const linkElSub = document.getElementById(elIDs[elIDs.length - 1] + '-link-sub')
            if (linkElSub) linkElSub.style['display'] = 'block'                


            for (let i = 0; i < elIDs.length - 1; i++) {
                const x = elIDs[i]
                const linkEl = document.getElementById(x + '-link')
                if (linkEl) {linkEl.style['color'] = 'black'; linkEl.style['fontWeight'] = 'normal'}
                


                const linkElSub = document.getElementById(x + '-link-sub')
                if (linkElSub) linkElSub.style['display'] = 'none'
            }
            return
        }
       
        for (let i = 0; i < elIDs.length; i++) {
            const x = elIDs[i]
            const el = document.getElementById(x)
            if (!chosen && isInViewport(el, offset)) {
                const linkEl = document.getElementById(x + '-link')
                if (linkEl) {linkEl.style['color'] = '#00468B'; linkEl.style['fontWeight'] = 'bold'
            }

                const linkElSub = document.getElementById(x + '-link-sub')
                if (linkElSub) linkElSub.style['display'] = 'block'   

                chosen = true;
            }
            else {
                const linkEl = document.getElementById(x + '-link')
                if (linkEl) {linkEl.style['color'] = 'black'; linkEl.style['fontWeight'] = 'normal'}

                const linkElSub = document.getElementById(x + '-link-sub')
                if (linkElSub) linkElSub.style['display'] = 'none'
            }
        }
    })
}