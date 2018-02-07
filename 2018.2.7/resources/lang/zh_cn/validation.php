<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted'             => ':attribute必须被接受',
    'active_url'           => ':attribute不是有效的URL',
    'after'                => ':attribute必须在 :date 之后',
    'alpha'                => ':attribute只能包含字母',
    'alpha_dash'           => ':attribute只能包含字母，数字及破折号',
    'alpha_num'            => ':attribute只能包含字母和数字',
    'array'                => ':attribute必须是一个数组',
    'before'               => ':attribute必须在 :date 之前',
    'between'              => [
        'numeric' => ':attribute必须介于:min和:max之间',
        'file'    => ':attribute必须介于:min和:maxK之间',
        'string'  => ':attribute必须介于:min和:max字符之间',
        'array'   => ':attribute必须介于:min和:max之间',
    ],
    'boolean'              => ':attribute字段必须是真或假',
    'confirmed'            => ':attribute确认不匹配',
    'date'                 => ':attribute不是一个有效日期',
    'date_format'          => ':attribute不匹配格式 :format',
    'different'            => ':attribute和 :other 必须是不同的',
    'digits'               => ':attribute必须是 :digits 位数',
    'digits_between'       => ':attribute必须介于 :min 和 :max 位数',
    'dimensions'           => ':attribute具有无效的图像尺寸',
    'distinct'             => ':attribute字段具有重复的值',
    'email'                => ':attribute必须是一个有效的电子邮件地址',
    'exists'               => '所选择的:attribute不存在',
    'file'                 => ':attribute必须是一个文件',
    'filled'               => ':attribute字段是必需的',
    'image'                => ':attribute必须是图像',
    'in'                   => '所选择的:attribute无效',
    'in_array'             => ':attribute字段不存在 :other',
    'integer'              => ':attribute必须是整数',
    'ip'                   => ':attribute必须是一个有效的IP地址',
    'json'                 => ':attribute必须是一个有效的JSON字符串',
    'max'                  => [
        'numeric' => ':attribute不得大于:max',
        'file'    => ':attribute不得大于:maxK',
        'string'  => ':attribute不得大于:max字符',
        'array'   => ':attribute不得超出:max',
    ],
    'mimes'                => ':attribute类型必须是::values文件类型',
    'mimetypes'            => ':attribute必须是一个类型的文件::values',
    'min'                  => [
        'numeric' => ':attribute必须至少为:min',
        'file'    => ':attribute必须至少为:min K',
        'string'  => ':attribute必须至少为:min 字符',
        'array'   => ':attribute必须不能超出:min',
    ],
    'not_in'               => '选项:attribute无效',
    'numeric'              => ':attribute必须是数字',
    'present'              => ':attribute字段必须存在',
    'regex'                => ':attribute格式无效',
    'required'             => ':attribute不能为空',
    'required_if'          => ':attribute必填当 :other 是 :value',
    'required_unless'      => ':attribute必填，除非:other介于:values',
    'required_with'        => ':attribute不能为空当:values存在',
    'required_with_all'    => ':attribute不能为空当:values存在',
    'required_without'     => ':attribute不能为空当:values不存在',
    'required_without_all' => ':attribute不能为空当:values不存在',
    'same'                 => ':attribute和:other必须匹配',
    'size'                 => [
        'numeric' => ':attribute必须是:size',
        'file'    => ':attribute必须是:sizeK',
        'string'  => ':attribute必须是:size字符',
        'array'   => ':attribute必须包含:size',
    ],
    'string'               => ':attribute必须是一个字符串',
    'timezone'             => ':attribute必须是一个有效的时区',
    //'unique'               => ':attribute已被占用',
    'unique'               => ':attribute已存在',
    'uploaded'             => ':attribute上传失败',
    'url'                  => ':attribute格式无效',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    //自定义 验证信息
      /*'email' => [
            'required' => 'We need to know your e-mail address!',
        ],*/
    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap attribute place-holders
    | with something more reader friendly such as E-Mail Address instead
    | of "email". This simply helps us make messages a little cleaner.
    |
    */

];
