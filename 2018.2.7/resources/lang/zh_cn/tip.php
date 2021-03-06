<?php
/**
 * Created by yuxuewen.
 * E-mail: 8586826@qq.com
 * Date: 2016/11/22
 * Time: 下午6:49
 */
/*-------------------------------------------------------- tip规范使用说明 ----------------------------------------
 *      以2开头表示请求成功的返回  以5开头表示请求不成功的返回
 * 例子：
 *      20101 （注册成功） 万位的2表示成功操作，千百位的01表示认证相关功能，十个位表示该功能下的某个方法成功提示
 *      50101 （注册失败） 万位的5表示失败操作，千百位的01表示认证相关功能，十个位表示该功能下的某个方法失败提示
 *-----------------------------------------------------------------------------------------------------------------
 * 提示码占位说明：
 * [00]--公用提示 [01]--认证相关 [02]--用户相关 [03]--MT4相关 [04]--短信相关 [05]--邮件相关 [06--导入文件相关] ...
 *
 * */

return  [
//      [20000]--公用成功类提示信息                 [50000]--公用错误类提示信息
        '20000' =>  '操作成功',                     '50000' =>  '操作失败',
        '20001' =>  '请求成功',                     '50001' =>  '请求失败',
        '20002' =>  '添加成功',                     '50002' =>  '添加失败',
        '20003' =>  '删除成功',                     '50003' =>  '删除失败',
        '20004' =>  '修改成功',                     '50004' =>  '修改失败',
        '20005' =>  '下架成功',                     '50005' =>  '下架失败',
        '20006' =>  '初始化成功',                   '50006' =>  '初始化失败',
                                                  '50007' =>  '非法参数',

//      [20100]--认证相关成功提示                   [50100]--认证相关失败提示
        '20101' => '注册成功',                      '50101' => '注册失败',
        '20102' => '登录成功',                      '50102' => '登录失败',
                                                    '50103' => '密码错误',
        '20103' => '找回密码成功',                  '50104' => '找回密码失败',
        '20104' => '退出成功',                      '50105' => '注册失败--模拟MT4账号已经分配完',
                                                    '50106' => '账号或密码错误',
                                                    '50107' => '系统正在更新，请稍后再注册',

//      [20200]--用户相关成功提示                   [50200]--用户相关失败提示
        '20201' => '重置手机号成功',                '50201' => '重置手机号失败',
        '20202' => '修改邮箱成功',                  '50202' => '修改邮箱失败',
        '20203' => '手机重置密码成功',              '50203' => '手机重置密码失败',
        '20204' => '邮箱重置密码成功',              '50204' => '邮箱重置密码失败',
        '20205' => '银行卡验证通过',                '50205' =>  '银行卡验证不通过',
        '20206' => '身份验证通过',                  '50206' =>  '身份验证失败',
                                                 '50207' =>  '身份验证通过请勿重复提交',
                                                 '50208' =>  '该银行卡已经存在',
        '20207' => '修改密码成功',                  '50209' => '修改密码失败',
        '20210' => '银行卡已经验证',                '50210' => '银行卡未验证',
        '20211' => '身份证已经验证',                '50211' => '身份证未验证',

//      [20300]--MT4相关成功提示                   [50300]--MT4相关失败提示
        '20301' => '关联成功',                     '50301' => '关联失败',
        '20302' => '重新关联成功',                 '50302' => '重新关联失败',
        '20303' => '密码修改成功',                 '50303' => '密码修改失败',
        '20304' => '成功移除关联',                 '50304' => '移除关联失败',
                                                   '50305' => '账号已经存在',
                                                   '50306' => 'MT4账号不存在',
                                                   '50307' => 'MT4列表为空',
                                                   '50308' => '没有模拟账号MT4',
                                                   '50309' => '模拟MT4账号已经分配完',
                                                   '50310' => '该模拟MT4账号不能使用',
                                                   '50311' => '正在跟随或暂停中的账号不可移除关联',
                                                   '50312' => '账号在线状态不允许更改密码',

//      [20400]--短信相关成功提示                  [50400]--短信相关失败提示
        '20401' => '短信发送成功',                 '50401' => '短信发送失败',
        '20402' => '短信验证成功',           '50402' => '手机号码有误',
                                                   '50403' => '验证码不正确',
                                                   '50404' => '短信验证码缺漏',
                                                   '50405' => '短信配置长度出错',
                                                   '50406' => '短信配置参数出错',
                                                   '50407' => '手机号码已经存在',

//      [20500]--邮箱相关成功提示                  [50500]--邮箱相关失败提示
        '20501' => '邮件发送成功',                 '50501' => '邮件发送失败',
                                                   '50502' => '邮件验证码不正确',
                                                   '50503' => '邮箱不存在',

//      [20600]--导入文件相关成功提示              [50600]--导入文件相关失败提示
        '20601' => '导入文件成功',                 '50601' => '导入文件失败',
                                                   '50602' => '文件路径或参数不正确',


//      [20700]--策略相关成功提示                   [50700]--策略相关失败提示
        '20701' => '策略发布成功',                '50701' => '策略发布失败',
        '20702' => '策略拒绝成功',                '50702' => '策略拒绝失败',
        '20703' => '设置热门成功',                '50703' => '设置热门失败',
        '20704' => '提前下架成功',                '50704' => '提前下架失败',

//      [20800]--策略跟随成功提示                   [50800]--策略跟随失败操作
        '20801' => '策略跟随暂停成功',                '50801' => '策略跟随暂停失败',
        '20802' => '策略跟随成功',                   '50802' => '策略跟随失败',
        '20803' => '策略跟随解除成功',                '50803' => '策略跟随解除失败',
        '20804' => '策略更换成功',                    '50804' => '策略更换失败',
        '20805' => '更换策略失败,原跟随已解除,请重新跟随','50805' => '更换策略失败,原跟随已断开,请联系管理员',

//      [20900]--提现相关成功提示                   [50900]--提现相关失败提示
        '20901' => '提现申请成功',                '50901' => '策略申请失败',
        '20902' => '提现拒绝成功',                '50902' => '提现拒绝失败',

//      [21000]--交易员相关成功提示                  [51000]--交易员相关失败提示
        '21001' => '注册交易员成功',              '51001' => '注册交易员失败，请联系管理员',

//      [21100]--定时项目相关成功提示                 [51100]--定时项目相关失败提示
        '21101' => '提前结束成功',               '51101' => '提前结束失败',

//      [21200] --后台的用户成功登陆提示              [51200] --后台的用户成功登陆提示
        '21201' => '登陆成功' ,                  '51201'  => '账号或密码错误',
        '21202' => '修改密码成功',               '51202'  => '原密码错误',


                                                 '51203'  => '请输入需要搜索的用户',
                                                 '51204'  => '抱歉,未搜索到相关信息',
                                                 '51205' => '后台用户不存在',

//      [21300] --后台添加等级相关提示            [51300] --后台添加等级相关提示
        '21300' => '等级添加成功',             '51300'  => '等级添加失败',
        '21301' => '等级修改成功',             '51301'  => '等级修改失败',
        '21302' => '等级删除成功',             '51302'  => '等级删除失败',
                                               '51303'  => '等级只允许添加10个',
                                               '51304'  => '直接佣金标准需比下一等级高，比上一等级低',

//      [21400] --我的客户相关              [51400] --我的客户相关
        '21400' => '客户存在',              '51400'  => '我的客户为空',
        '21401'  => '升级成功',             '51401'  => '用户不存在',
                                             '51402'  => '邀请者不存在或者未成为经纪人',
                                            '51403'  => '升级不允许跨级',
                                            '51404'  => '不允许更换到级别低的用户',
                                            '51405'  => '没有上级，不允许更换',
                                            '51406'  => '同个归属，无法更换',
                                            '51407'  => 'id冲突',
                                            '51408'  => '禁止更换到团队成员下',
                                            '51409'  => '不可以更换到无等级用户',


//      [21500] --后台项目(盈利分成)相关提示            [51500] --后台项目(盈利分成)相关提示
                                                    '51500'    =>  '其它账号信息没有改动，不能只修改密码',

        //项目-审核
        '21501' =>  '发布成功',                     '51501'   =>  '发布不成功，请重新发布，或联系跟单系统租用方。',
        '21502' =>  '拒绝发布成功',                 '51502'   =>  '拒绝失败，请重新进行尝试',

        //项目-报名中
        '21503' =>  '下架成功',                     '51503'    =>  '下架失败',
        //'21504' =>  '拒绝参与成功',                 '51504'    =>  '拒绝参与失败',
        //'21505' =>  '恢复参与成功',                 '51505'    =>  '恢复参与失败',

        //项目-进行中
        '21506' =>  '提前结束成功',                 '51506'    =>  '提前结束失败',
        '21507' =>  '暂停成功',                     '51507'    =>  '暂停失败',
        '21508' =>  '恢复成功',                     '51508'    =>  '恢复失败',

        //项目-已结束-黑名单
        '21509' =>  '添加黑名单成功',                '51509'    =>  '添加黑名单失败',
        '21510' =>  '解除黑名单成功',                '51510'    =>  '解除黑名单失败',
                                                    '51511'    =>  '非在线状态才能修改密码',
                                                    '51512'    =>  '发布不成功，该标准账号已发布项目或者策略',
                                                    '51513'    =>  '新密码与旧密码一样',

//      [21600] --佣金审核相关成功提示             [51600] --佣金审核相关失败提示
        '21600' => '佣金审核成功',                    '51600' => '佣金审核失败',

//      [21700] --参与定期项目成功提示             [51700] --参与定期项目失败提示
        '21700' => '参与定期项目成功',                 '51700' => '参与定期项目失败',

       '21800' => '初始密码成功',                 '51800' => '初始密码失败',
                                                '51801'=>'不存在启用图片，请先启用图片',
                                                '51802'=>'删除oss图片失败'
];
