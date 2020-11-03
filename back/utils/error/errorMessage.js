const messages = {
    DuplicateUserEmailError: '이메일 중복',
    DuplicateSiteError: '사이트 중복',
    UserEmailNotFound: '등록되지 않은 이메일 입니다.',
    FailureSignIn: '아이디 혹은 비밀번호가 틀렸습니다.',
    FailureCreateToken: '토큰생성에 실패했습니다.',
    UnknowError: '알수없는 에러'
}

exports.createErrMsg = err => {
    return messages[err]
}