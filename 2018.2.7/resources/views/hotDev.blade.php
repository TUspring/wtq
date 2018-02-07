<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta id="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=1300">
    <link rel="icon" href="{{ asset('./images/logo_icon.ico') }}" type="img/x-ico"/>
    <title>贝威云</title>
</head>
<body>
<div id="app">
    <router-view></router-view>
</div>
{{--<div>{{env('DEVSERVER_HOST')}} {{env('DEVSERVER_PORT')}}</div>--}}
{{--<script type="text/javascript" src="http://192.168.88.3:9099/local/index/main.js"></script>--}}
{{--<script src="{{ mix(env('APP_ENV').'/index/main.js') }}"></script>--}}
<script src="//cdn.bootcss.com/vue/2.4.2/vue.min.js"></script>
<script src="//cdn.bootcss.com/vuex/2.0.0/vuex.min.js"></script>
<script src="//cdn.bootcss.com/axios/0.15.3/axios.min.js"></script>
<script src="//cdn.bootcss.com/iview/2.2.0/iview.min.js"></script>
<script type="text/javascript" src="http://{{env('DEVSERVER_HOST')}}:{{env('DEVSERVER_PORT')}}/local/index/main.js"></script>
</body>
</html>
