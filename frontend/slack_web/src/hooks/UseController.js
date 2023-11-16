
export const useController = (viewportRef) => {
   
    let controllerState = {
        isSpaceDown: false,
        isMouseButtonDown: false,
        hasFocus: false,
        mousePos: 0,
        offset: [0,0],
        scrollPercentage: 1
    }
    
    const preventDefault = (e) => {
        e = e || window.event
        if (e.preventDefault) {
          e.preventDefault()
        }
        e.returnValue = false
    }

    const enableScroll = () => {
        document.removeEventListener('wheel', preventDefault, false)
    }

    const disableScroll = () => {
        document.addEventListener('wheel', preventDefault, {
          passive: false,
        })
    }

    const onKeyDownListener = (e) => {
        if(e.code === 'Space'){
            controllerState.isSpaceDown = true;
        }
    } 

    const onKeyUpListener = (e) => {
        if(e.code === 'Space'){
            controllerState.isSpaceDown = false;
        }
    } 

    const onMouseMoveListener = (e) => {
        if(controllerState.isMouseButtonDown && controllerState.isSpaceDown) {
            controllerState.mousePos = {
                x: e.clientX,
                y: e.clientY
            };
            viewportRef.current.style.left = (controllerState.mousePos.x + controllerState.offset[0]) + 'px';
            viewportRef.current.style.top  = (controllerState.mousePos.y + controllerState.offset[1]) + 'px';
        } 
    } 

    const onMouseDownListener = (e) => {
        if(e.button === 0) {
            controllerState.isMouseButtonDown = true;

            controllerState.offset = [
                viewportRef.current.offsetLeft - e.clientX,
                viewportRef.current.offsetTop - e.clientY,
            ];
        }
    } 
    const onMouseUpListener = (e) => {
        if(e.button === 0)
            controllerState.isMouseButtonDown = false;
    } 

    const onFocusListener = (e) => {
        controllerState.hasFocus=true;
        disableScroll();
    }

    const onFocusOutListener = (e) => {
        controllerState.hasFocus = false;
        enableScroll();
    }

    const onScrollListener = (e) => {
        if(controllerState.hasFocus) {
            controllerState.scrollPercentage += -e.deltaY * .001;
            if(controllerState.scrollPercentage < .1)
            controllerState.scrollPercentage = .1;
            if(controllerState.scrollPercentage > 2)
            controllerState.scrollPercentage = 2;

            document.documentElement.style.setProperty('--scale', controllerState.scrollPercentage); 
        }
    }

    return [
        onKeyDownListener,
        onKeyUpListener,
        onMouseMoveListener,
        onMouseDownListener,
        onMouseUpListener,
        onFocusListener,
        onFocusOutListener,
        onScrollListener
    ];
}