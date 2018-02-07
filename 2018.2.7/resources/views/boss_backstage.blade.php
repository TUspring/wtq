<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta id="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" href="{{ asset('logo/zhonghui_icon.ico') }}" type="img/x-ico"/>
    <title>汇大师管理后台</title>
</head>
<body>
<div id="app">
    <router-view></router-view>
</div>

@if( env('APP_ENV') != 'local' && env('APP_ENV') != 'hot')
    <script src="//cdn.bootcss.com/vue/2.5.2/vue.min.js"></script>
    <script src="//cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js"></script>
    <script src="//cdn.bootcss.com/vuex/3.0.1/vuex.min.js"></script>
    <script src="//cdn.bootcss.com/axios/0.15.3/axios.min.js"></script>
    <script src="//cdn.bootcss.com/iview/2.8.0/iview.min.js"></script>
@else
    @if( env('APP_ENV') == 'hot')
        <?php $hotSrc ='http://' . env('DEVSERVER_HOST') . ':' .env('DEVSERVER_PORT') . '/'; ?>
        <script type="text/javascript" src="{{$hotSrc}}js/vue.js"></script>
        <script type="text/javascript" src="{{$hotSrc}}js/vue-router.min.js"></script>
        <script type="text/javascript" src="{{$hotSrc}}js/vuex.min.js"></script>
        <script type="text/javascript" src="{{$hotSrc}}js/axios.min.js"></script>
        <script type="text/javascript" src="{{$hotSrc}}js/iview.min.js"></script>
    @else
        <script src="{{ asset('js/vue.js') }}"></script>
        <script src="{{ asset('js/vue-router.min.js') }}"></script>
        <script src="{{ asset('js/vuex.min.js') }}"></script>
        <script src="{{ asset('js/axios.min.js') }}"></script>
        <script src="{{ asset('js/iview.min.js') }}"></script>
    @endif
@endif
@if( env('APP_ENV') != 'hot' )
    <script src="{{ mix(env('APP_ENV').'/boss/main.js') }}"></script>
@else
    <script type="text/javascript" src="{{$hotSrc}}local/boss/main.js"></script>
@endif

</body>
</html>
