const messages = {
    DuplicateUserEmailError: '이메일 중복',
    DuplicateSiteError: '사이트 중복',
    DuplicateDeviceError: '디바이스 중복',
    UserEmailNotFound: '등록되지 않은 이메일 입니다.',
    DeviceIdNotFound: '등록되지 않은 디바이스 입니다.',
    FailureSignIn: '아이디 혹은 비밀번호가 틀렸습니다.',
    FailureCreateToken: '토큰생성에 실패했습니다.',
    NeedLogin: '로그인이 필요합니다.',
    NeedNotLogin: '로그인하지 않은 사용자만 접근 가능합니다.',
    UnknowError: '알수없는 에러'
}

exports.createErrMsg = err => {
    return messages[err]
}