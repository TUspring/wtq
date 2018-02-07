@extends('layouts.app')

@section('content')
<div class="container">

    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">中汇——上传文件页面</div>
                <div class="panel-body">
                    <form class="form-horizontal" method="POST" action="{{ url('upload_excel') }}" enctype="multipart/form-data">
                        {{ csrf_field() }}

                        <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                            <label for="name" class="col-md-4 control-label">选择文件</label>

                            <div class="col-md-6">
                                <input id="name" type="file" class="form-control" name="name" value="{{ old('name') }}" required autofocus>

                                @if ($errors->has('name'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('name') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                            <label for="platform" class="col-md-4 control-label">平台选择</label>

                            <div class="col-md-6">
                                <input id="platform" type="radio" name="platform" value="1" >1-EWG
                                <input id="platform" type="radio" name="platform" value="2" >2-KVB
                                <input id="platform" type="radio" name="platform" value="3" >3-TERA
                                <input id="platform" type="radio" name="platform" value="4" >4-AETOS

                                @if ($errors->has('platform'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('platform') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary">
                                    上传
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection
