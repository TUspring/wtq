var valRule={
    mobile:(rule, value, callback, source, options) => {
        var errors = [];
        if (!/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value)) {
            callback(new Error('手机号码格式不正确'));
        }
        callback(errors);
    }
}

export default valRule;