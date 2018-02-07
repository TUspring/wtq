/*
*
*展开动画元素必须加的样式
overflow: hidden;
transition: height 0.3s ease-in-out;
*
* */
export default {
    functional: true,
    render: function (createElement, context) {
        var data = {
            props: {
                name: 'fold-transition',
                mode: 'out-in'
            },
            on: {
                enter (el) {
                    el.style.height = 'auto'
                    let endWidth = window.getComputedStyle(el).height
                    el.style.height = '0px'
                    el.offsetHeight
                    el.style.height = endWidth
                },
                afterEnter (el) {
                    el.style.height = null
                },
                leave (el) {
                    el.style.height = window.getComputedStyle(el).height
                    el.offsetHeight
                    el.style.height = '0px'
                },
                afterLeave (el) {
                    el.style.height = null
                }
            }
        }
        return createElement('transition', data, context.children)
    }
}
