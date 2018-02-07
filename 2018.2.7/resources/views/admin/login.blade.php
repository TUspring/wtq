<form method="post" action="{{ url('admin/login') }}">

<table>
    @if(count($errors)>0)
        @foreach($errors->all() as $error)
            {{$error}}
        @endforeach
    @endif
    <tr>
        <td>
            用户名:<input type="username" name="name"/>
        </td>
    </tr>
    <tr>
        <td>
            密码:<input type="password" name="password"/>
        </td>
    </tr>
    <tr>
        <td>
            <input type="submit" value="登陆"/>
            {{csrf_field()}}
        </td>
    </tr>
    </table>
</form>
