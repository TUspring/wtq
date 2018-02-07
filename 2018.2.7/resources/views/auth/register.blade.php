@extends('layouts.app')

@section('content')
<div class="container">

    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">中汇——注册页面</div>
                <div class="panel-body">
                    <form class="form-horizontal" method="POST" action="{{ route('register') }}">
                        {{ csrf_field() }}

                        <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                            <label for="name" class="col-md-4 control-label">昵称</label>

                            <div class="col-md-6">
                                <input id="name" type="text" class="form-control" name="name" value="{{ old('name') }}" required autofocus>

                                @if ($errors->has('name'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('name') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                            <label for="email" class="col-md-4 control-label">邮箱</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required>

                                @if ($errors->has('email'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div id="phone-group" class="form-group{{ $errors->has('phone') ? ' has-error' : '' }}">
                            <label for="phone" class="col-md-4 control-label">手机号</label>

                            <div class="col-md-6">
                                <input id="phone" type="text" class="form-control" name="phone" value="{{ old('phone') }}" required>
                                <br>
                                <input type="button" id="send_phone" class="btn btn-default" value="获取验证码">

                                @if ($errors->has('phone'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('phone') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('phone_verify') ? ' has-error' : '' }}">
                            <label for="phone_verify" class="col-md-4 control-label">短信验证码</label>

                            <div class="col-md-6">
                                <input id="phone_verify" type="text" class="form-control" name="phone_verify" value="{{ old('phone_verify') }}" required>

                                @if ($errors->has('phone_verify'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('phone_verify') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                            <label for="password" class="col-md-4 control-label">设置密码</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control" name="password" required>

                                @if ($errors->has('password'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="password-confirm" class="col-md-4 control-label">确认密码</label>

                            <div class="col-md-6">
                                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required>
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('invited_code') ? ' has-error' : '' }}">
                            <label for="invited_code" class="col-md-4 control-label">邀请码</label>

                            <div class="col-md-6">
                                <input id="invited_code" type="text" class="form-control" name="invited_code" value="{{ old('invited_code') }}" required>

                                @if ($errors->has('invited_code'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('invited_code') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary">
                                    注册
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- my ajax -->
<script>
    $(document).ready(function(){
        $('#send_phone').click(function(){
            var phone = $('#phone').val();
            //正则检验
            var pattern = /^1[34578]\d{9}$/;
            if(pattern.test(phone)){
                $.ajax({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    type: 'POST',
                    url: '{{ url('get_register_pc') }}',
                    data: {phone:phone} ,
                    success: function (data) {
                        var json = eval('(' + data + ')');
                        if(json.retCode == 0){
                            timedown();
                        }else{
                            alert('发送失败');
                        }
                    } ,
                    error:function (msg) {
                        if(msg){
                            var json=JSON.parse(msg.responseText);
                            $('#phone-group').attr('class','form-group has-error');
                            $('#phone-group div .help-block').empty();
                            $('#phone-group div').append("<span class='help-block'><strong>"+json.phone[0]+"</strong></span>");
                        }else{
                            alert("网络异常！");
                        }
                    }
                });
            }else{
                alert('手机号码有误,请填写正确的手机号码');
            }

        });
        function timedown() {
            var step = 59;
            $('#send_phone').val('重新发送60');
            var _res = setInterval(function()
            {
                $("#send_phone").attr("disabled", true);//设置disabled属性
                $('#send_phone').val('重新发送'+step);
                step-=1;
                if(step <= 0){
                    $("#send_phone").removeAttr("disabled"); //移除disabled属性
                    $('#send_phone').val('获取验证码');
                    clearInterval(_res);//清除setInterval
                }
            },1000);
        }
    })
</script>

@endsection
