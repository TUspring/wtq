
<form action='{{url('admin/menu/add_permission')}}' method="post">
    <input type="checkbox" value="1" name="permission_id[]">
    <input type="checkbox" value="2" name="permission_id[]">
    <input type="checkbox" value="3" name="permission_id[]">
    <input type="checkbox" value="4" name="permission_id[]">
    <input type="submit" value="提交">
    {{csrf_field()}}
</form>>