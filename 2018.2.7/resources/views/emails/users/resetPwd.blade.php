<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>email</title>
</head>
<body>
<style>
    .email-container {
        max-width: 100%;
        width: 640px;
        margin: auto;
    }
    .email-content {
        width: 100%;
        margin:0 auto;
    }
    .email-content p{
        font-size: 16px;
        color: #999999;
    }
    .content_detail{
        width: 540px;
        margin: auto;
    }
    .email-content .top-greet {
        font-size: 20px;
        line-height: 20px;
        color: #333333;
        margin-top: 35px;
    }
    .top-introduce {
        font-size: 18px;
        color: #999999;
    }
    .detail-btn {
        width: 100%;
        text-align: center;
        margin-top: 40px;
        margin-bottom: 40px;
    }
    .detail-btn span {
        width: 150px;
        height: 50px;
        line-height: 50px;
        border-radius: 4px;
        color: #ffffff;
        background-color: #ffa114;
        cursor: pointer;
        box-shadow: 1px 1px 1px 1px #cccccc;
        display: inline-block;
    }
    .detail-btn span:hover {
        background-color: #ff9900;
    }
    .bottom-text {
        height: 16px;
        line-height: 16px;
    }
    .footer {
        margin-top: 30px;
        width: 640px;
    }
    .footer-text {
        width: 540px;
        margin: auto;
        border-top: 1px solid #cccccc;
    }
    .footer-text p {
        font-size: 12px;
        color: #999999;
    }
</style>
<div class="email-container">
    <div><img src="{{ asset('images/emails_pic.png') }}" alt=""></div>
    <div class="email-content">
        <div class="content_detail">
            <div class="top-greet">尊敬的中汇用户,您好！</div>
            <p class="top-introduce">您申请重置密码，请点击以下按钮立即重置。</p>
            <div class="detail-btn">
                <a href="{{ $url }}"><span>重置密码</span></a>
            </div>
            <p>
                如果按钮无法点击，请复制下面的链接到浏览器地址栏访问<br/>
                {{ $url }}
            </p>
            <p>如果您并未发过此请求，则可能是因为其他用户在尝试重设密码时误输入了您的电子邮箱地址而使您收到了这封邮件，那么您可以放心的忽略此邮件，无需进一步采取任何操作。</p>
        </div>
    </div>
    <div class="footer">
        <div class="footer-text">
            <p>本电子邮件包括附件,仅供指定收件人使用，并可能载有保密内容，非指定收件人请勿使用、打开、转发、复印本电子邮件及附件。若你误收到这封电子邮件，请立刻通知寄件人并请立即删除该电子邮件及附件。</p>
        </div>
    </div>
</div>
</body>
</html>