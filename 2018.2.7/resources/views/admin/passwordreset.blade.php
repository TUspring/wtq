<meta name="csrf-token" content="{{ csrf_token() }}">
<table>
    @if(count($errors)>0)
         @foreach($errors->all() as $error)
            {{$error}}
         @endforeach
    @endif
    <form method="post" action="{{url('admin/reset_Password')}}">
        <tr>
            <td>原密码:<input type="password" name="password_old"></td>
        </tr>
        <tr>
            {{csrf_field()}}
            <td>新密码:<input type="password" name="password"></td>
        </tr>
        <tr>
            <td>确认密码:<input type="password" name="password_confirmation"></td>
        </tr>
        <tr>
            <td><input type="submit" value="提交"></td>
        </tr>
    </form>

</table>