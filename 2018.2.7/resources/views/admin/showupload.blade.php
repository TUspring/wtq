<table>
    <form method="post" action="{{url('admin/upload/upload')}}" enctype="multipart/form-data">
        @if(count($errors)>0)
            @foreach($errors->all() as $error)
                {{$error}}
            @endforeach
        @endif
        <input type="file" name="index_banner_1">
        <tr>
            <td>
                {{csrf_field()}}
                <input type="submit" value="提交">
            </td>
        </tr>
    </form>
</table>